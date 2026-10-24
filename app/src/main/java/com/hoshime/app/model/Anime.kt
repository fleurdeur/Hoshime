package com.hoshime.app.model

enum class AnimeFormat {
    TV, MOVIE, OVA, ONA, SPECIAL
}

enum class WatchStatus {
    WATCHING, COMPLETED, ON_HOLD, DROPPED, PLAN_TO_WATCH
}

enum class Season {
    WINTER, SPRING, SUMMER, FALL
}

data class Anime(
    val id: Long,
    val title: String,
    val japaneseTitle: String,
    val romajiTitle: String,
    val synopsis: String,
    val bannerImageUrl: String,
    val coverImageUrl: String,
    val format: AnimeFormat,
    val episodes: Int,
    val durationMinutes: Int,
    val studio: String,
    val season: Season,
    val year: Int,
    val genres: List<String>,
    val averageScore: Double, // 0.5 to 5.0
    val totalRatingsCount: Int,
    val bayesianScore: Double, // Computed by C++ Native Engine
    val genreVector: FloatArray = FloatArray(8) { 0.5f }
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Anime

        if (id != other.id) return false
        if (title != other.title) return false
        return true
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }
}

data class Review(
    val id: String,
    val animeId: Long,
    val userId: String,
    val username: String,
    val userAvatarUrl: String,
    val rating: Double, // 0.5 to 5.0
    val headline: String,
    val body: String,
    val containsSpoilers: Boolean,
    val likesCount: Int,
    val timestamp: Long
)
