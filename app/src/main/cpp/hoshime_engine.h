#ifndef HOSHIME_ENGINE_H
#define HOSHIME_ENGINE_H

#include <vector>
#include <string>
#include <cstdint>

namespace hoshime {

struct StarDistributionStats {
    double mean;
    double variance;
    double standardDeviation;
    double entropy;
    int totalCount;
};

class RatingEngine {
public:
    static double calculateBayesianScore(
        double observedMean,
        int voteCount,
        double globalPriorMean = 3.5,
        int minVotesThreshold = 25
    );

    static float calculateCosineSimilarity(
        const std::vector<float>& vecA,
        const std::vector<float>& vecB
    );

    static StarDistributionStats computeDistribution(
        const std::vector<double>& ratings
    );

    static uint64_t computeDiaryHash(
        int64_t animeId,
        int32_t episode,
        double rating,
        int64_t timestampMillis,
        const std::string& notes
    );

    static std::string getEngineVersion();
};

} // namespace hoshime

#endif // HOSHIME_ENGINE_H
