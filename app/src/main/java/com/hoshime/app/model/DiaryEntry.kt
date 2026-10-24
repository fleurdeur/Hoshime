package com.hoshime.app.model

data class DiaryEntry(
    val id: String,
    val animeId: Long,
    val animeTitle: String,
    val animeCoverUrl: String,
    val episodeWatched: Int,
    val starRating: Double, // 0.5 to 5.0
    val rewatched: Boolean,
    val reviewNotes: String,
    val tags: List<String>,
    val loggedAtTimestamp: Long,
    val nativeChecksum: Long // Native C++ FNV-1a checksum
)

data class UserProfile(
    val id: String,
    val username: String,
    val displayName: String,
    val bio: String,
    val avatarUrl: String,
    val bannerUrl: String,
    val completedCount: Int,
    val episodesWatched: Int,
    val daysWatched: Double,
    val favoriteAnimeIds: List<Long>,
    val starRatingsDistribution: List<Double>
)
