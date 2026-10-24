# Hoshime (星アニメ) — Native Android Application
### Built with Kotlin, Jetpack Compose (Material 3), and C/C++ (NDK + CMake)

This directory contains the complete native Android codebase for **Hoshime**, the anime star diary and review platform.

---

## Architecture Overview

```
.
├── settings.gradle.kts                     # Gradle root settings & module definitions
├── build.gradle.kts                        # Root project build configuration
├── gradle.properties                       # AndroidX, JVM optimization flags
├── gradle/
│   ├── libs.versions.toml                  # Version Catalog (Kotlin 2.0.21, AGP 8.7.2, Compose BOM)
│   └── wrapper/gradle-wrapper.properties   # Gradle 8.10.2 distribution
└── app/
    ├── build.gradle.kts                    # App build config (CMake + Compose + NDK ABIs)
    ├── proguard-rules.pro                  # JNI Native & Kotlin proguard keeps
    └── src/main/
        ├── AndroidManifest.xml             # Android Application Manifest
        ├── cpp/                            # C/C++ Native NDK Rating Engine
        │   ├── CMakeLists.txt              # CMake build script for libhoshime-native.so
        │   ├── hoshime_engine.h            # C++ Engine header definitions
        │   ├── hoshime_engine.cpp          # High-performance Bayesian, SIMD & FNV-1a algorithms
        │   └── native-lib.cpp              # JNI Bridge functions linking C++ to Kotlin
        ├── java/com/hoshime/app/
        │   ├── HoshimeApplication.kt       # Application class (loads native lib)
        │   ├── MainActivity.kt             # Jetpack Compose Edge-to-Edge Activity
        │   ├── nativebridge/
        │   │   └── NativeRatingEngine.kt   # Kotlin JNI bindings to C++ library
        │   ├── model/
        │   │   ├── Anime.kt                # Anime data models & vectors
        │   │   └── DiaryEntry.kt           # Diary & profile models
        │   ├── data/
        │   │   └── AnimeRepository.kt      # Repository interacting with C++ Native Engine
        │   ├── viewmodel/
        │   │   └── AnimeViewModel.kt       # Compose ViewModel & live benchmark
        │   └── ui/
        │       ├── theme/                  # Starry dark theme, Color.kt, Type.kt, Theme.kt
        │       ├── components/             # StarRatingSelector, HoshimeTopBar, HoshimeBottomBar
        │       └── screens/                # HomeScreen, DiscoverScreen, AnimeDetailScreen,
        │                                   # DiaryLoggerScreen, ProfileScreen, NativeEngineScreen
        └── res/values/
            ├── strings.xml
            ├── colors.xml
            └── themes.xml
```

---

## C/C++ Native Engine (NDK + CMake)

Located in `app/src/main/cpp/`, compiled as `libhoshime-native.so`:

1. **Bayesian Score Calculation**:
   $$\text{Score} = \left(\frac{v}{v + m}\right) \cdot R + \left(\frac{m}{v + m}\right) \cdot C$$
   Normalized between 0.5 and 5.0 stars for robust outlier rejection.

2. **Vectorized Cosine Similarity**:
   Computes high-speed cosine distance between user anime taste vectors and anime genre vectors in C++.

3. **Shannon Entropy & Variance Analysis**:
   Calculates star rating diversity and dispersion across user diaries.

4. **FNV-1a 64-bit Checksum**:
   Cryptographic integrity hash ensuring tamper-evident offline anime diary records.

---

## Jetpack Compose UI (Material 3)

- **StarRatingSelector**: Fluid 0.5 to 5.0 star selector with half-star granularity.
- **HomeScreen**: Diary feed, seasonal highlights, and native C++ statistics banner.
- **DiscoverScreen**: Bayesian-rated catalog with instantaneous search and filtering.
- **AnimeDetailScreen**: Detailed synopsis, studio info, and entry point to star logger.
- **DiaryLoggerScreen**: Full diary recording with episode tracker, notes, and live C++ checksum.
- **NativeEngineScreen**: Interactive benchmark demonstrating C++ NDK vs JVM execution speeds.

---

## How to Build the APK

### Requirements:
- Android Studio Ladybug / Meerkat (or newer)
- Android SDK 35+
- Android NDK (Side by side 25+ or 26+)
- CMake 3.22.1+

### CLI Build Commands:
```bash
# Build Debug APK with C++ NDK shared libraries:
./gradlew assembleDebug

# Build Release APK:
./gradlew assembleRelease
```
The resulting debug APK is output to:
`app/build/outputs/apk/debug/app-debug.apk`

---

## Standalone Android Package
A complete standalone archive containing all build configuration, wrappers, C++ NDK sources, and Kotlin Jetpack Compose code is bundled in:
- `hoshime-android-project.tar.gz`
- `public/hoshime-android-project.tar.gz`

