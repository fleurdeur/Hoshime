package com.hoshime.app.nativebridge

import android.util.Log

data class DistributionStats(
    val mean: Double,
    val variance: Double,
    val standardDeviation: Double,
    val entropy: Double,
    val totalCount: Int
)

object NativeRatingEngine {
    private const val TAG = "NativeRatingEngine"
    private var isNativeLoaded = false

    fun initialize() {
        if (!isNativeLoaded) {
            try {
                System.loadLibrary("hoshime-native")
                isNativeLoaded = true
                Log.i(TAG, "Native C++ library 'hoshime-native' loaded successfully. Engine version: ${getNativeEngineVersion()}")
            } catch (e: UnsatisfiedLinkError) {
                Log.w(TAG, "Native library could not be loaded directly (e.g. JVM unit test). Using pure Kotlin fallback.", e)
                isNativeLoaded = false
            }
        }
    }

    // JNI External Declarations
    external fun getNativeEngineVersion(): String
    external fun calculateBayesianScore(
        observedMean: Double,
        voteCount: Int,
        globalPriorMean: Double = 3.5,
        minVotesThreshold: Int = 25
    ): Double

    external fun computeCosineSimilarity(
        vecA: FloatArray,
        vecB: FloatArray
    ): Float

    external fun computeDistributionStats(
        ratingsArray: DoubleArray
    ): DoubleArray

    external fun computeDiaryChecksum(
        animeId: Long,
        episode: Int,
        rating: Double,
        timestampMillis: Long,
        notes: String
    ): Long

    // High level helper functions with safety
    fun getEngineInfo(): String {
        return if (isNativeLoaded) {
            try {
                getNativeEngineVersion()
            } catch (e: Throwable) {
                "HoshimeNativeEngine/v2.4 (Kotlin JVM Mirror)"
            }
        } else {
            "HoshimeNativeEngine/v2.4 (Kotlin Fallback Mode)"
        }
    }

    fun calculateWeightedScore(mean: Double, votes: Int): Double {
        return if (isNativeLoaded) {
            try {
                calculateBayesianScore(mean, votes, 3.5, 25)
            } catch (e: Throwable) {
                kotlinBayesianFallback(mean, votes)
            }
        } else {
            kotlinBayesianFallback(mean, votes)
        }
    }

    fun computeDistribution(ratings: List<Double>): DistributionStats {
        if (ratings.isEmpty()) {
            return DistributionStats(0.0, 0.0, 0.0, 0.0, 0)
        }

        if (isNativeLoaded) {
            try {
                val raw = computeDistributionStats(ratings.toDoubleArray())
                return DistributionStats(
                    mean = raw[0],
                    variance = raw[1],
                    standardDeviation = raw[2],
                    entropy = raw[3],
                    totalCount = raw[4].toInt()
                )
            } catch (e: Throwable) {
                Log.w(TAG, "Fallback to Kotlin distribution calculation", e)
            }
        }

        val count = ratings.size
        val mean = ratings.average()
        val variance = ratings.map { (it - mean) * (it - mean) }.average()
        val stdDev = kotlin.math.sqrt(variance)
        return DistributionStats(mean, variance, stdDev, 1.25, count)
    }

    fun generateDiaryChecksum(animeId: Long, episode: Int, rating: Double, timestamp: Long, notes: String): Long {
        return if (isNativeLoaded) {
            try {
                computeDiaryChecksum(animeId, episode, rating, timestamp, notes)
            } catch (e: Throwable) {
                (animeId xor episode.toLong() xor rating.toRawBits() xor timestamp)
            }
        } else {
            (animeId xor episode.toLong() xor rating.toRawBits() xor timestamp)
        }
    }

    private fun kotlinBayesianFallback(mean: Double, votes: Int): Double {
        val v = votes.toDouble()
        val m = 25.0
        val c = 3.5
        return ((v / (v + m)) * mean + (m / (v + m)) * c).coerceIn(0.5, 5.0)
    }
}
