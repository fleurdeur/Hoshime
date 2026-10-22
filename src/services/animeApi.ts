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
  const totalRatings = Math.floor(rawScore * 350 + Math.random() * 5000);
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
  // If bannerImage is missing, use YouTube trailer high-res maxresdefault thumbnail or cover
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

// Fetch live anime list from AniList
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

    const res = await fetch(ANILIST_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query: POPULAR_ANIME_QUERY,
        variables
      })
    });

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
    console.warn('Live AniList fetch failed, attempting Jikan API fallback:', err);
    // If AniList fails or rate-limits, fall back to official Jikan (MyAnimeList) API
    return fetchJikanAnimeCatalog({
      page: params.page,
      search: params.search,
      limit: params.perPage
    });
  }
}

// Jikan v4 REST API (Official MyAnimeList Open Source API for anime images and data)
const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';

export async function fetchJikanAnimeCatalog(params: {
  page?: number;
  search?: string;
  limit?: number;
}): Promise<{ anime: Anime[]; total: number; hasNextPage: boolean }> {
  try {
    const page = params.page || 1;
    const limit = params.limit || 24;
    let url = `${JIKAN_BASE_URL}/top/anime?page=${page}&limit=${limit}`;

    if (params.search && params.search.trim()) {
      url = `${JIKAN_BASE_URL}/anime?q=${encodeURIComponent(params.search.trim())}&page=${page}&limit=${limit}`;
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Jikan HTTP error: ${res.status}`);
    }

    const data = await res.json();
    const items = data.data || [];
    const pagination = data.pagination || {};

    const anime: Anime[] = items.map((item: any, idx: number) => {
      const malScore = item.score || 8.0;
      const hoshimeScore = Number((malScore / 2).toFixed(2));
      const coverUrl = item.images?.webp?.large_image_url || item.images?.jpg?.large_image_url || item.images?.webp?.image_url;
      const trailerThumb = item.trailer?.images?.maximum_image_url || item.trailer?.images?.large_image_url;
      const bannerUrl = trailerThumb || coverUrl;

      return {
        id: `mal_${item.mal_id}`,
        title: {
          english: item.title_english || item.title || 'Anime',
          romaji: item.title || item.title_english || 'Anime',
          native: item.title_japanese || item.title || ''
        },
        coverImage: coverUrl,
        bannerImage: bannerUrl,
        score: hoshimeScore,
        malScore: malScore,
        rank: (page - 1) * limit + idx + 1,
        format: item.type === 'Movie' ? 'Movie' : item.type === 'OVA' ? 'OVA' : 'TV',
        status: item.status === 'Currently Airing' ? 'Airing' : item.status === 'Not yet aired' ? 'Upcoming' : 'Finished',
        episodes: item.episodes || 12,
        durationMinutes: 24,
        season: item.season ? (item.season.charAt(0).toUpperCase() + item.season.slice(1)) as any : 'Fall',
        year: item.year || new Date().getFullYear(),
        genres: (item.genres || []).map((g: any) => g.name),
        studios: (item.studios || []).map((s: any) => s.name),
        producers: (item.producers || []).map((p: any) => p.name),
        source: item.source || 'Manga',
        ageRating: item.rating || 'PG-13',
        synopsis: (item.synopsis || 'No synopsis available.').trim(),
        trailerYoutubeId: item.trailer?.youtube_id || undefined,
        scoreDistribution: {
          '5.0': 35000,
          '4.5': 18000,
          '4.0': 8000,
          '3.5': 2000,
          '3.0': 500,
          '2.5': 200,
          '2.0': 100,
          '1.0': 50
        },
        streamingLinks: [
          { name: 'Crunchyroll', badge: 'CR', url: 'https://www.crunchyroll.com' },
          { name: 'Netflix', badge: 'NFX', url: 'https://www.netflix.com' }
        ],
        characters: [
          {
            id: `c_${item.mal_id}`,
            name: 'Lead Character',
            role: 'Main',
            image: coverUrl,
            voiceActor: {
              name: 'Japanese Cast',
              language: 'Japanese',
              image: coverUrl
            }
          }
        ],
        themeSongs: {
          op: ['Official Opening Theme'],
          ed: ['Official Ending Theme']
        },
        episodesList: Array.from({ length: Math.min(item.episodes || 12, 12) }).map((_, i) => ({
          number: i + 1,
          title: `Episode ${i + 1}`,
          airDate: `${item.year || 2024}`
        }))
      };
    });

    return {
      anime,
      total: pagination.items?.total || anime.length,
      hasNextPage: !!pagination.has_next_page
    };
  } catch (e) {
    console.warn('Jikan fetch failed:', e);
    return { anime: [], total: 0, hasNextPage: false };
  }
}

