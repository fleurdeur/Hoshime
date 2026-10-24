package com.hoshime.app.ui.components

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Bookmark
import androidx.compose.material.icons.filled.Explore
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import com.hoshime.app.ui.theme.BackgroundDark
import com.hoshime.app.ui.theme.StarGold
import com.hoshime.app.ui.theme.SurfaceDark
import com.hoshime.app.ui.theme.TextMuted
import com.hoshime.app.ui.theme.TextPrimary
import com.hoshime.app.viewmodel.Screen

@Composable
fun HoshimeBottomBar(
    currentScreen: Screen,
    onNavigate: (Screen) -> Unit
) {
    NavigationBar(
        containerColor = SurfaceDark
    ) {
        NavigationBarItem(
            selected = currentScreen is Screen.Home,
            onClick = { onNavigate(Screen.Home) },
            icon = { Icon(Icons.Filled.Home, contentDescription = "Home") },
            label = { Text("Diary") },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = StarGold,
                selectedTextColor = StarGold,
                indicatorColor = BackgroundDark,
                unselectedIconColor = TextMuted,
                unselectedTextColor = TextMuted
            )
        )
        NavigationBarItem(
            selected = currentScreen is Screen.Discover,
            onClick = { onNavigate(Screen.Discover) },
            icon = { Icon(Icons.Filled.Explore, contentDescription = "Discover") },
            label = { Text("Discover") },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = StarGold,
                selectedTextColor = StarGold,
                indicatorColor = BackgroundDark,
                unselectedIconColor = TextMuted,
                unselectedTextColor = TextMuted
            )
        )
        NavigationBarItem(
            selected = currentScreen is Screen.NativeEngineBenchmark,
            onClick = { onNavigate(Screen.NativeEngineBenchmark) },
            icon = { Icon(Icons.Filled.AutoAwesome, contentDescription = "C++ NDK") },
            label = { Text("C++ Engine") },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = StarGold,
                selectedTextColor = StarGold,
                indicatorColor = BackgroundDark,
                unselectedIconColor = TextMuted,
                unselectedTextColor = TextMuted
            )
        )
        NavigationBarItem(
            selected = currentScreen is Screen.Profile,
            onClick = { onNavigate(Screen.Profile) },
            icon = { Icon(Icons.Filled.Person, contentDescription = "Profile") },
            label = { Text("Profile") },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = StarGold,
                selectedTextColor = StarGold,
                indicatorColor = BackgroundDark,
                unselectedIconColor = TextMuted,
                unselectedTextColor = TextMuted
            )
        )
    }
}
