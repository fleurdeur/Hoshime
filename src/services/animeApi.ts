import { Anime, CharacterCast } from '../types/anime';

// AniList GraphQL API endpoint (Free, official, no API key required)
const ANILIST_GRAPHQL_ENDPOINT = 'https://graphql.anilist.co';

const POPULAR_ANIME_QUERY = `
query ($page: Int, $perPage: Int, $search: String, $sort: [MediaSort], $genre: String) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
    }
    media(type: ANIME, search: $search, sort: $sort, genre: $genre) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        extraLarge
        large
        color
      }
      bannerImage
      averageScore
      meanScore
      format
      status
      episodes
      duration
      season
      seasonYear
      genres
      studios(isMain: true) {
        nodes {
          name
        }
      }
      source
      description(asHtml: false)
      trailer {
        id
        site
      }
      characters(perPage: 4, sort: ROLE) {
        edges {
          role
          node {
            id
            name {
              full
            }
            image {
              large
            }
          }
          voiceActors(language: JAPANESE) {
            id
            name {
              full
            }
            image {
              large
            }
            languageV2
          }
        }
      }
    }
  }
}
`;

// Helper to convert AniList API media object into our clean Hoshime Anime type
export function transformAniListMedia(media: any): Anime {
  // Convert AniList score (0-100) to Hoshime 0.5-5.0 scale
  const rawScore = media.averageScore || media.meanScore || 80;
  const hoshimeScore = Number((rawScore / 20).toFixed(2));
  const malScore = Number((rawScore / 10).toFixed(2));

  // Transform characters
  const characters: CharacterCast[] = (media.characters?.edges || []).map((edge: any, index: number) => {
    const charNode = edge.node;
    const vaNode = edge.voiceActors?.[0];
    return {
      id: String(charNode?.id || `char_${index}`),
      name: charNode?.name?.full || 'Character',
      role: edge.role === 'MAIN' ? 'Main' : 'Supporting',
      image: charNode?.image?.large || media.coverImage?.large,
      voiceActor: {
        name: vaNode?.name?.full || 'Unknown VA',
        language: vaNode?.languageV2 || 'Japanese',
        image: vaNode?.image?.large || charNode?.image?.large || media.coverImage?.large
      }
    };
  });

  // Calculate synthetic score distribution matching average score
  const totalRatings = Math.floor(rawScore * 350 + 2000);
  const scoreDist: Record<string, number> = {
    '5.0': Math.floor(totalRatings * (rawScore >= 85 ? 0.55 : 0.35)),
    '4.5': Math.floor(totalRatings * 0.25),
    '4.0': Math.floor(totalRatings * 0.12),
    '3.5': Math.floor(totalRatings * 0.05),
    '3.0': Math.floor(totalRatings * 0.02),
    '2.5': Math.floor(totalRatings * 0.007),
    '2.0': Math.floor(totalRatings * 0.002),
    '1.0': Math.floor(totalRatings * 0.001)
  };

  // Clean description html tags if any
  const cleanSynopsis = (media.description || 'No synopsis provided.')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .trim();

  const studioNames = (media.studios?.nodes || []).map((s: any) => s.name);
  if (studioNames.length === 0) studioNames.push('Animation Studio');

  const englishTitle = media.title?.english || media.title?.romaji || 'Anime';
  const romajiTitle = media.title?.romaji || media.title?.english || 'Anime';
  const nativeTitle = media.title?.native || romajiTitle;

  const coverUrl = media.coverImage?.extraLarge || media.coverImage?.large;
  const trailerThumb = media.trailer?.site === 'youtube' && media.trailer.id 
    ? `https://img.youtube.com/vi/${media.trailer.id}/maxresdefault.jpg` 
    : undefined;
  const bannerUrl = media.bannerImage || trailerThumb || coverUrl;

  return {
    id: String(media.id),
    title: {
      english: englishTitle,
      romaji: romajiTitle,
      native: nativeTitle
    },
    coverImage: coverUrl,
    bannerImage: bannerUrl,
    score: hoshimeScore,
    malScore: malScore,
    rank: 1,
    format: media.format === 'MOVIE' ? 'Movie' : media.format === 'OVA' ? 'OVA' : media.format === 'ONA' ? 'ONA' : 'TV',
    status: media.status === 'RELEASING' ? 'Airing' : media.status === 'NOT_YET_RELEASED' ? 'Upcoming' : 'Finished',
    episodes: media.episodes || 12,
    durationMinutes: media.duration || 24,
    season: media.season ? (media.season.charAt(0) + media.season.slice(1).toLowerCase()) as any : 'Fall',
    year: media.seasonYear || new Date().getFullYear(),
    genres: media.genres || ['Action', 'Fantasy'],
    studios: studioNames,
    producers: studioNames,
    source: (media.source === 'LIGHT_NOVEL' ? 'Light Novel' : media.source === 'ORIGINAL' ? 'Original' : media.source === 'VISUAL_NOVEL' ? 'Visual Novel' : 'Manga') as any,
    ageRating: 'PG-13',
    synopsis: cleanSynopsis,
    trailerYoutubeId: media.trailer?.site === 'youtube' ? media.trailer.id : undefined,
    scoreDistribution: scoreDist,
    streamingLinks: [
      { name: 'Crunchyroll', badge: 'CR', url: 'https://www.crunchyroll.com' },
      { name: 'Netflix', badge: 'NFX', url: 'https://www.netflix.com' }
    ],
    characters: characters.length > 0 ? characters : [
      {
        id: 'c_lead',
        name: 'Protagonist',
        role: 'Main',
        image: coverUrl,
        voiceActor: {
          name: 'Lead Voice Actor',
          language: 'Japanese',
          image: coverUrl
        }
      }
    ],
    themeSongs: {
      op: ['Official Opening Theme'],
      ed: ['Official Ending Theme']
    },
    episodesList: Array.from({ length: Math.min(media.episodes || 12, 12) }).map((_, i) => ({
      number: i + 1,
      title: `Episode ${i + 1}`,
      airDate: `${media.seasonYear || 2024}`
    }))
  };
}

const apiSearchCache = new Map<string, Anime[]>();

// Fast, dedicated live API search for reviews, Top 3 picking, and lists
export async function searchAnimeApi(search: string, limit: number = 20): Promise<Anime[]> {
  const clean = search.trim();
  if (!clean) return [];

  const cacheKey = `${clean.toLowerCase()}_${limit}`;
  if (apiSearchCache.has(cacheKey)) {
    return apiSearchCache.get(cacheKey)!;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(ANILIST_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query: POPULAR_ANIME_QUERY,
        variables: {
          search: clean,
          page: 1,
          perPage: limit,
          sort: ['SEARCH_MATCH', 'POPULARITY_DESC']
        }
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const mediaList = data?.data?.Page?.media || [];
      const anime = mediaList.map((m: any, idx: number) => {
        const transformed = transformAniListMedia(m);
        transformed.rank = idx + 1;
        return transformed;
      });
      apiSearchCache.set(cacheKey, anime);
      return anime;
    }
  } catch (err) {
    console.warn('Live AniList search error:', err);
  }

  return [];
}

// Fetch single anime by ID from AniList
export async function getAnimeByIdApi(id: string): Promise<Anime | null> {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) return null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const query = `
      query ($id: Int) {
        Media(id: $id, type: ANIME) {
          id
          title { romaji english native }
          coverImage { extraLarge large color }
          bannerImage
          averageScore
          meanScore
          format
          status
          episodes
          duration
          season
          seasonYear
          genres
          studios(isMain: true) { nodes { name } }
          source
          description(asHtml: false)
          trailer { id site }
          characters(perPage: 6, sort: ROLE) {
            edges {
              role
              node { id name { full } image { large } }
              voiceActors(language: JAPANESE) { id name { full } image { large } languageV2 }
            }
          }
        }
      }
    `;

    const res = await fetch(ANILIST_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ query, variables: { id: numericId } }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data?.data?.Media) {
        return transformAniListMedia(data.data.Media);
      }
    }
  } catch (e) {
    console.warn(`Failed to fetch anime ID ${id}:`, e);
  }
  return null;
}

// Fetch live catalog from AniList
export async function fetchLiveAnimeCatalog(params: {
  page?: number;
  perPage?: number;
  search?: string;
  genre?: string;
  sort?: string[];
}): Promise<{ anime: Anime[]; total: number; hasNextPage: boolean }> {
  try {
    const variables: any = {
      page: params.page || 1,
      perPage: params.perPage || 24,
      sort: params.sort || ['POPULARITY_DESC']
    };

    if (params.search && params.search.trim()) {
      variables.search = params.search.trim();
    }
    if (params.genre && params.genre !== 'All') {
      variables.genre = params.genre;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const res = await fetch(ANILIST_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query: POPULAR_ANIME_QUERY,
        variables
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`AniList HTTP error: ${res.status}`);
    }

    const data = await res.json();
    const mediaList = data?.data?.Page?.media || [];
    const pageInfo = data?.data?.Page?.pageInfo || {};

    const anime = mediaList.map((m: any, idx: number) => {
      const transformed = transformAniListMedia(m);
      transformed.rank = (params.page ? (params.page - 1) * (params.perPage || 24) : 0) + idx + 1;
      return transformed;
    });

    return {
      anime,
      total: pageInfo.total || anime.length,
      hasNextPage: !!pageInfo.hasNextPage
    };
  } catch (err) {
    console.warn('Live AniList fetch error:', err);
    return { anime: [], total: 0, hasNextPage: false };
  }
}
