package com.hoshime.app.data

import com.hoshime.app.model.Anime
import com.hoshime.app.model.AnimeFormat
import com.hoshime.app.model.DiaryEntry
import com.hoshime.app.model.Review
import com.hoshime.app.model.Season
import com.hoshime.app.model.UserProfile
import com.hoshime.app.nativebridge.NativeRatingEngine
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import java.util.UUID

object AnimeRepository {

    private val initialAnimeList = listOf(
        Anime(
            id = 1L,
            title = "Frieren: Beyond Journey's End",
            japaneseTitle = "葬送のフリーレン",
            romajiTitle = "Sousou no Frieren",
            synopsis = "The adventure is over but life goes on for an elf mage just beginning to learn what living is all about. The elf mage Frieren and her courageous fellow adventurers have defeated the Demon King and brought peace to the land.",
            bannerImageUrl = "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200",
            coverImageUrl = "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600",
            format = AnimeFormat.TV,
            episodes = 28,
            durationMinutes = 24,
            studio = "Madhouse",
            season = Season.FALL,
            year = 2023,
            genres = listOf("Adventure", "Drama", "Fantasy"),
            averageScore = 4.88,
            totalRatingsCount = 14200,
            bayesianScore = NativeRatingEngine.calculateWeightedScore(4.88, 14200),
            genreVector = floatArrayOf(0.9f, 0.8f, 0.95f, 0.2f, 0.1f, 0.7f, 0.3f, 0.4f)
        ),
        Anime(
            id = 2L,
            title = "Steins;Gate",
            japaneseTitle = "シュタインズ・ゲート",
            romajiTitle = "Shutainzu Geeto",
            synopsis = "Self-proclaimed mad scientist Rintarou Okabe accidentally discovers the ability to send text messages to the past using a customized microwave, triggering unpredictable consequences across divergence timelines.",
            bannerImageUrl = "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200",
            coverImageUrl = "https://images.unsplash.com/photo-1563089145-599997674d42?w=600",
            format = AnimeFormat.TV,
            episodes = 24,
            durationMinutes = 24,
            studio = "White Fox",
            season = Season.SPRING,
            year = 2011,
            genres = listOf("Sci-Fi", "Thriller", "Psychological"),
            averageScore = 4.82,
            totalRatingsCount = 28500,
            bayesianScore = NativeRatingEngine.calculateWeightedScore(4.82, 28500),
            genreVector = floatArrayOf(0.1f, 0.7f, 0.1f, 0.95f, 0.85f, 0.2f, 0.9f, 0.3f)
        ),
        Anime(
            id = 3L,
            title = "Apothecary Diaries",
            japaneseTitle = "薬屋のひとりごと",
            romajiTitle = "Kusuriya no Hitorigoto",
            synopsis = "In the imperial court of ancient fantasy China, Maomao, an apothecary's daughter with a deep knowledge of medicine and poisons, solves palace mysteries and political conspiracies.",
            bannerImageUrl = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200",
            coverImageUrl = "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600",
            format = AnimeFormat.TV,
            episodes = 24,
            durationMinutes = 23,
            studio = "TOHO animation & OLM",
            season = Season.FALL,
            year = 2023,
            genres = listOf("Mystery", "Historical", "Drama"),
            averageScore = 4.65,
            totalRatingsCount = 9800,
            bayesianScore = NativeRatingEngine.calculateWeightedScore(4.65, 9800),
            genreVector = floatArrayOf(0.3f, 0.85f, 0.4f, 0.1f, 0.3f, 0.9f, 0.95f, 0.5f)
        ),
        Anime(
            id = 4L,
            title = "Cyberpunk: Edgerunners",
            japaneseTitle = "サイバーパンク エッジランナーズ",
            romajiTitle = "Saibaapanku Ejjirannaazu",
            synopsis = "In a dystopia riddled with corruption and cybernetic implants, a talented but reckless street kid strives to become an edgerunner: a mercenary outlaw known as a cyberpunk.",
            bannerImageUrl = "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200",
            coverImageUrl = "https://images.unsplash.com/photo-1563089145-599997674d42?w=600",
            format = AnimeFormat.ONA,
            episodes = 10,
            durationMinutes = 25,
            studio = "Trigger",
            season = Season.FALL,
            year = 2022,
            genres = listOf("Action", "Sci-Fi", "Cyberpunk"),
            averageScore = 4.70,
            totalRatingsCount = 18900,
            bayesianScore = NativeRatingEngine.calculateWeightedScore(4.70, 18900),
            genreVector = floatArrayOf(0.95f, 0.8f, 0.2f, 0.95f, 0.6f, 0.1f, 0.7f, 0.8f)
        ),
        Anime(
            id = 5L,
            title = "Bocchi the Rock!",
            japaneseTitle = "ぼっち・ざ・ろっく！",
            romajiTitle = "Bocchi za Rokku!",
            synopsis = "Hitori Gotoh, a lonely high school girl with severe social anxiety who spends all her time practicing guitar, finds herself joining Kessoku Band and stepping onto live house stages.",
            bannerImageUrl = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200",
            coverImageUrl = "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600",
            format = AnimeFormat.TV,
            episodes = 12,
            durationMinutes = 23,
            studio = "CloverWorks",
            season = Season.FALL,
            year = 2022,
            genres = listOf("Comedy", "Music", "Slice of Life"),
            averageScore = 4.78,
            totalRatingsCount = 15300,
            bayesianScore = NativeRatingEngine.calculateWeightedScore(4.78, 15300),
            genreVector = floatArrayOf(0.2f, 0.4f, 0.1f, 0.05f, 0.1f, 0.2f, 0.1f, 0.95f)
        )
    )

    private val _animeList = MutableStateFlow(initialAnimeList)
    val animeList: StateFlow<List<Anime>> = _animeList.asStateFlow()

    private val _diaryEntries = MutableStateFlow<List<DiaryEntry>>(listOf(
        DiaryEntry(
            id = UUID.randomUUID().toString(),
            animeId = 1L,
            animeTitle = "Frieren: Beyond Journey's End",
            animeCoverUrl = "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600",
            episodeWatched = 28,
            starRating = 5.0,
            rewatched = false,
            reviewNotes = "A profound meditation on mortality, companionship, and the fleeting beauty of human lifetimes. Beautifully animated by Madhouse.",
            tags = listOf("Masterpiece", "Emotional", "Elf"),
            loggedAtTimestamp = System.currentTimeMillis() - 86400000L,
            nativeChecksum = NativeRatingEngine.generateDiaryChecksum(1L, 28, 5.0, System.currentTimeMillis() - 86400000L, "Frieren")
        ),
        DiaryEntry(
            id = UUID.randomUUID().toString(),
            animeId = 5L,
            animeTitle = "Bocchi the Rock!",
            animeCoverUrl = "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600",
            episodeWatched = 12,
            starRating = 4.5,
            rewatched = true,
            reviewNotes = "Hilarious visual gags and genuine love for indie band culture. The guitar solos are stellar.",
            tags = listOf("Kessoku Band", "Music"),
            loggedAtTimestamp = System.currentTimeMillis() - 172800000L,
            nativeChecksum = NativeRatingEngine.generateDiaryChecksum(5L, 12, 4.5, System.currentTimeMillis() - 172800000L, "Bocchi")
        )
    ))
    val diaryEntries: StateFlow<List<DiaryEntry>> = _diaryEntries.asStateFlow()

    private val _userProfile = MutableStateFlow(
        UserProfile(
            id = "user_stellar_01",
            username = "stargazer",
            displayName = "Astral Walker",
            bio = "Cataloging starry nights and unforgettable anime journeys. 0.5 to 5.0 star enthusiast.",
            avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
            bannerUrl = "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200",
            completedCount = 142,
            episodesWatched = 2840,
            daysWatched = 47.3,
            favoriteAnimeIds = listOf(1L, 2L, 5L),
            starRatingsDistribution = listOf(5.0, 4.5, 4.0, 5.0, 4.5, 3.5, 5.0, 4.0, 4.5, 5.0)
        )
    )
    val userProfile: StateFlow<UserProfile> = _userProfile.asStateFlow()

    fun logDiaryEntry(
        animeId: Long,
        episode: Int,
        rating: Double,
        rewatched: Boolean,
        notes: String,
        tags: List<String>
    ): DiaryEntry {
        val anime = _animeList.value.firstOrNull { it.id == animeId }
            ?: throw IllegalArgumentException("Anime not found")

        val timestamp = System.currentTimeMillis()
        val checksum = NativeRatingEngine.generateDiaryChecksum(
            animeId = animeId,
            episode = episode,
            rating = rating,
            timestamp = timestamp,
            notes = notes
        )

        val newEntry = DiaryEntry(
            id = UUID.randomUUID().toString(),
            animeId = animeId,
            animeTitle = anime.title,
            animeCoverUrl = anime.coverImageUrl,
            episodeWatched = episode,
            starRating = rating,
            rewatched = rewatched,
            reviewNotes = notes,
            tags = tags,
            loggedAtTimestamp = timestamp,
            nativeChecksum = checksum
        )

        _diaryEntries.value = listOf(newEntry) + _diaryEntries.value
        return newEntry
    }

    fun getAnimeById(id: Long): Anime? {
        return _animeList.value.firstOrNull { it.id == id }
    }

    fun calculateRecommendations(userTasteVector: FloatArray): List<Pair<Anime, Float>> {
        return _animeList.value.map { anime ->
            val similarity = if (userTasteVector.size == anime.genreVector.size) {
                try {
                    NativeRatingEngine.computeCosineSimilarity(userTasteVector, anime.genreVector)
                } catch (e: Throwable) {
                    0.85f
                }
            } else {
                0.80f
            }
            anime to similarity
        }.sortedByDescending { it.second }
    }
}
