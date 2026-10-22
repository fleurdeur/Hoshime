export type WatchStatus = 'Watching' | 'Plan to Watch' | 'Completed' | 'On Hold' | 'Dropped';

export type TitleFormat = 'english' | 'romaji' | 'native';

export type AppTheme = 'dark' | 'starry' | 'light';

export type AccentColor = 'gold' | 'purple' | 'pink' | 'emerald';

export interface AnimeTitle {
  english: string;
  romaji: string;
  native: string;
}

export interface CharacterCast {
  id: string;
  name: string;
  role: 'Main' | 'Supporting';
  image: string;
  voiceActor: {
    name: string;
    language: string;
    image: string;
  };
}

export interface StreamingService {
  name: string;
  badge: string;
  url: string;
}

export interface EpisodeInfo {
  number: number;
  title: string;
  airDate: string;
  synopsis?: string;
}

export interface Anime {
  id: string;
  title: AnimeTitle;
  coverImage: string;
  bannerImage: string;
  score: number; // 0.5 to 5.0 scale (Hoshime average)
  malScore: number; // 1-10 MAL reference
  rank: number;
  format: 'TV' | 'Movie' | 'OVA' | 'ONA' | 'Special';
  status: 'Airing' | 'Finished' | 'Upcoming';
  episodes: number;
  durationMinutes: number;
  season: 'Winter' | 'Spring' | 'Summer' | 'Fall';
  year: number;
  genres: string[];
  studios: string[];
  producers: string[];
  source: 'Manga' | 'Light Novel' | 'Original' | 'Visual Novel' | 'Web Manga' | 'Game';
  ageRating: 'G' | 'PG' | 'PG-13' | 'R-17' | 'R+';
  synopsis: string;
  trailerYoutubeId?: string;
  scoreDistribution: Record<string, number>; // "5.0": 18200, "4.5": 14100...
  streamingLinks: StreamingService[];
  characters: CharacterCast[];
  themeSongs: {
    op: string[];
    ed: string[];
  };
  episodesList: EpisodeInfo[];
}

export interface UserAnimeEntry {
  animeId: string;
  status: WatchStatus;
  episodesWatched: number;
  score: number; // 0.5 - 5.0 (0 = unrated)
  isFavorite: boolean;
  rewatchCount: number;
  startDate?: string;
  finishDate?: string;
  notes?: string;
  updatedAt: string;
}

export interface ReviewComment {
  id: string;
  userHandle: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: string;
  likes: number;
}

export interface LogEntry {
  id: string;
  userId: string;
  userName: string;
  userHandle: string;
  userAvatar: string;
  isVip?: boolean;
  animeId: string;
  animeTitle: AnimeTitle;
  animeCover: string;
  animeFormat: string;
  rating: number; // 0.5 to 5.0
  isLike: boolean;
  episodeLogged?: number; // undefined if full season/movie
  isRewatch: boolean;
  rewatchCount: number;
  dateWatched: string;
  reviewText?: string;
  hasSpoilers: boolean;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  isLikedByMe?: boolean;
  isBookmarked?: boolean;
  comments?: ReviewComment[];
  createdAt: string;
}

export interface CustomListItem {
  animeId: string;
  rank?: number;
  commentary?: string;
}

export interface CustomList {
  id: string;
  title: string;
  description: string;
  isRanked: boolean;
  privacy: 'public' | 'unlisted' | 'private';
  bannerCover?: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    isVip?: boolean;
  };
  items: CustomListItem[];
  likes: number;
  isLikedByMe?: boolean;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'mention' | 'follow' | 'episode' | 'system';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  avatar?: string;
  targetId?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  banner: string;
  bio: string;
  website?: string;
  pronouns?: string;
  joinedDate: string;
  isVip: boolean;
  star4: string[]; // animeIds of user's top 4 favorites
  followersCount: number;
  followingCount: number;
}
