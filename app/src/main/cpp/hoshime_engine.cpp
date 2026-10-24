#include "hoshime_engine.h"
#include <cmath>
#include <numeric>
#include <algorithm>
#include <sstream>
#include <iomanip>

namespace hoshime {

double RatingEngine::calculateBayesianScore(
    double observedMean,
    int voteCount,
    double globalPriorMean,
    int minVotesThreshold
) {
    if (voteCount <= 0) {
        return globalPriorMean;
    }
    double v = static_cast<double>(voteCount);
    double m = static_cast<double>(minVotesThreshold);
    // IMDB / Letterboxd style Bayesian weighted mean
    double weightedScore = (v / (v + m)) * observedMean + (m / (v + m)) * globalPriorMean;
    return std::clamp(weightedScore, 0.5, 5.0);
}

float RatingEngine::calculateCosineSimilarity(
    const std::vector<float>& vecA,
    const std::vector<float>& vecB
) {
    if (vecA.empty() || vecA.size() != vecB.size()) {
        return 0.0f;
    }

    double dotProduct = 0.0;
    double normA = 0.0;
    double normB = 0.0;

    for (size_t i = 0; i < vecA.size(); ++i) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }

    if (normA <= 0.0 || normB <= 0.0) {
        return 0.0f;
    }

    return static_cast<float>(dotProduct / (std::sqrt(normA) * std::sqrt(normB)));
}

StarDistributionStats RatingEngine::computeDistribution(
    const std::vector<double>& ratings
) {
    StarDistributionStats stats{};
    stats.totalCount = static_cast<int>(ratings.size());
    if (ratings.empty()) {
        return stats;
    }

    double sum = std::accumulate(ratings.begin(), ratings.end(), 0.0);
    stats.mean = sum / stats.totalCount;

    double sqDiffSum = 0.0;
    // 10 possible discrete buckets (0.5 to 5.0 step 0.5)
    std::vector<int> histogram(10, 0);

    for (double r : ratings) {
        double diff = r - stats.mean;
        sqDiffSum += diff * diff;

        int bucket = std::clamp(static_cast<int>(std::round((r - 0.5) * 2.0)), 0, 9);
        histogram[bucket]++;
    }

    stats.variance = sqDiffSum / stats.totalCount;
    stats.standardDeviation = std::sqrt(stats.variance);

    // Compute Shannon Entropy in bits
    double entropy = 0.0;
    for (int count : histogram) {
        if (count > 0) {
            double p = static_cast<double>(count) / stats.totalCount;
            entropy -= p * std::log2(p);
        }
    }
    stats.entropy = entropy;

    return stats;
}

uint64_t RatingEngine::computeDiaryHash(
    int64_t animeId,
    int32_t episode,
    double rating,
    int64_t timestampMillis,
    const std::string& notes
) {
    // 64-bit FNV-1a Hash
    const uint64_t FNV_PRIME = 1099511628211ULL;
    const uint64_t FNV_OFFSET_BASIS = 14695981039346656037ULL;

    uint64_t hash = FNV_OFFSET_BASIS;

    auto updateHashWithBytes = [&](const uint8_t* data, size_t length) {
        for (size_t i = 0; i < length; ++i) {
            hash ^= data[i];
            hash *= FNV_PRIME;
        }
    };

    updateHashWithBytes(reinterpret_cast<const uint8_t*>(&animeId), sizeof(animeId));
    updateHashWithBytes(reinterpret_cast<const uint8_t*>(&episode), sizeof(episode));
    updateHashWithBytes(reinterpret_cast<const uint8_t*>(&rating), sizeof(rating));
    updateHashWithBytes(reinterpret_cast<const uint8_t*>(&timestampMillis), sizeof(timestampMillis));
    updateHashWithBytes(reinterpret_cast<const uint8_t*>(notes.data()), notes.size());

    return hash;
}

std::string RatingEngine::getEngineVersion() {
    return "HoshimeNativeEngine/v2.4-arm64 (C++17 AVX/NEON Optimized)";
}

} // namespace hoshime
