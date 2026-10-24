# Keep JNI native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

-keep class com.hoshime.app.nativebridge.** { *; }
-keep class com.hoshime.app.model.** { *; }
