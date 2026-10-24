package com.hoshime.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import com.hoshime.app.ui.components.HoshimeBottomBar
import com.hoshime.app.ui.components.HoshimeTopBar
import com.hoshime.app.ui.screens.AnimeDetailScreen
import com.hoshime.app.ui.screens.DiaryLoggerScreen
import com.hoshime.app.ui.screens.DiscoverScreen
import com.hoshime.app.ui.screens.HomeScreen
import com.hoshime.app.ui.screens.NativeEngineScreen
import com.hoshime.app.ui.screens.ProfileScreen
import com.hoshime.app.ui.theme.BackgroundDark
import com.hoshime.app.ui.theme.HoshimeTheme
import com.hoshime.app.viewmodel.AnimeViewModel
import com.hoshime.app.viewmodel.Screen

class MainActivity : ComponentActivity() {

    private val viewModel: AnimeViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            HoshimeTheme {
                val currentScreen by viewModel.currentScreen.collectAsState()

                Scaffold(
                    modifier = Modifier.fillMaxSize(),
                    containerColor = BackgroundDark,
                    topBar = {
                        if (currentScreen !is Screen.AnimeDetail && currentScreen !is Screen.LogDiary) {
                            HoshimeTopBar(
                                onSearchClick = { viewModel.navigateTo(Screen.Discover) },
                                onNativeEngineClick = { viewModel.navigateTo(Screen.NativeEngineBenchmark) }
                            )
                        }
                    },
                    bottomBar = {
                        if (currentScreen !is Screen.AnimeDetail && currentScreen !is Screen.LogDiary) {
                            HoshimeBottomBar(
                                currentScreen = currentScreen,
                                onNavigate = { viewModel.navigateTo(it) }
                            )
                        }
                    }
                ) { innerPadding ->
                    Box(modifier = Modifier.padding(innerPadding)) {
                        when (val screen = currentScreen) {
                            is Screen.Home -> {
                                HomeScreen(
                                    viewModel = viewModel,
                                    onAnimeClick = { animeId ->
                                        viewModel.navigateTo(Screen.AnimeDetail(animeId))
                                    }
                                )
                            }
                            is Screen.Discover -> {
                                DiscoverScreen(
                                    viewModel = viewModel,
                                    onAnimeClick = { animeId ->
                                        viewModel.navigateTo(Screen.AnimeDetail(animeId))
                                    }
                                )
                            }
                            is Screen.Profile -> {
                                ProfileScreen(
                                    viewModel = viewModel
                                )
                            }
                            is Screen.NativeEngineBenchmark -> {
                                NativeEngineScreen(
                                    viewModel = viewModel
                                )
                            }
                            is Screen.AnimeDetail -> {
                                AnimeDetailScreen(
                                    animeId = screen.animeId,
                                    viewModel = viewModel,
                                    onBack = { viewModel.navigateTo(Screen.Home) }
                                )
                            }
                            is Screen.LogDiary -> {
                                DiaryLoggerScreen(
                                    animeId = screen.animeId,
                                    viewModel = viewModel,
                                    onBack = { viewModel.navigateTo(Screen.Home) }
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
