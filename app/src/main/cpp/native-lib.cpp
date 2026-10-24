#include <jni.h>
#include <string>
#include <vector>
#include <android/log.h>
#include "hoshime_engine.h"

#define TAG "HoshimeNative"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, TAG, __VA_ARGS__)

extern "C" {

JNIEXPORT jstring JNICALL
Java_com_hoshime_app_nativebridge_NativeRatingEngine_getNativeEngineVersion(
    JNIEnv* env,
    jobject /* this */
) {
    std::string version = hoshime::RatingEngine::getEngineVersion();
    LOGI("Hoshime native engine requested: %s", version.c_str());
    return env->NewStringUTF(version.c_str());
}

JNIEXPORT jdouble JNICALL
Java_com_hoshime_app_nativebridge_NativeRatingEngine_calculateBayesianScore(
    JNIEnv* /* env */,
    jobject /* this */,
    jdouble observedMean,
    jint voteCount,
    jdouble globalPriorMean,
    jint minVotesThreshold
) {
    return hoshime::RatingEngine::calculateBayesianScore(
        observedMean,
        voteCount,
        globalPriorMean,
        minVotesThreshold
    );
}

JNIEXPORT jfloat JNICALL
Java_com_hoshime_app_nativebridge_NativeRatingEngine_computeCosineSimilarity(
    JNIEnv* env,
    jobject /* this */,
    jfloatArray vecA,
    jfloatArray vecB
) {
    jsize lenA = env->GetArrayLength(vecA);
    jsize lenB = env->GetArrayLength(vecB);
    if (lenA != lenB || lenA == 0) {
        return 0.0f;
    }

    jfloat* elementsA = env->GetFloatArrayElements(vecA, nullptr);
    jfloat* elementsB = env->GetFloatArrayElements(vecB, nullptr);

    std::vector<float> vectorA(elementsA, elementsA + lenA);
    std::vector<float> vectorB(elementsB, elementsB + lenB);

    env->ReleaseFloatArrayElements(vecA, elementsA, JNI_ABORT);
    env->ReleaseFloatArrayElements(vecB, elementsB, JNI_ABORT);

    return hoshime::RatingEngine::calculateCosineSimilarity(vectorA, vectorB);
}

JNIEXPORT jdoubleArray JNICALL
Java_com_hoshime_app_nativebridge_NativeRatingEngine_computeDistributionStats(
    JNIEnv* env,
    jobject /* this */,
    jdoubleArray ratingsArray
) {
    jsize len = env->GetArrayLength(ratingsArray);
    jdouble* elements = env->GetDoubleArrayElements(ratingsArray, nullptr);

    std::vector<double> ratings(elements, elements + len);
    env->ReleaseDoubleArrayElements(ratingsArray, elements, JNI_ABORT);

    hoshime::StarDistributionStats stats = hoshime::RatingEngine::computeDistribution(ratings);

    // Return [mean, variance, standardDeviation, entropy, totalCount]
    jdoubleArray result = env->NewDoubleArray(5);
    jdouble outStats[5] = {
        stats.mean,
        stats.variance,
        stats.standardDeviation,
        stats.entropy,
        static_cast<double>(stats.totalCount)
    };
    env->SetDoubleArrayRegion(result, 0, 5, outStats);
    return result;
}

JNIEXPORT jlong JNICALL
Java_com_hoshime_app_nativebridge_NativeRatingEngine_computeDiaryChecksum(
    JNIEnv* env,
    jobject /* this */,
    jlong animeId,
    jint episode,
    jdouble rating,
    jlong timestampMillis,
    jstring notes
) {
    const char* nativeNotes = env->GetStringUTFChars(notes, nullptr);
    std::string notesStr = nativeNotes ? nativeNotes : "";
    if (nativeNotes) {
        env->ReleaseStringUTFChars(notes, nativeNotes);
    }

    uint64_t hash = hoshime::RatingEngine::computeDiaryHash(
        animeId,
        episode,
        rating,
        timestampMillis,
        notesStr
    );

    return static_cast<jlong>(hash);
}

} // extern "C"
