package com.hoshime.app

import android.app.Application
import android.util.Log
import com.hoshime.app.nativebridge.NativeRatingEngine

class HoshimeApplication : Application() {

    companion object {
        private const val TAG = "HoshimeApp"
        lateinit var instance: HoshimeApplication
            private set
    }

    override fun onCreate() {
        super.onCreate()
        instance = this
        Log.i(TAG, "Initializing Hoshime Android Application with Native C++ Rating Engine")
        NativeRatingEngine.initialize()
    }
}
