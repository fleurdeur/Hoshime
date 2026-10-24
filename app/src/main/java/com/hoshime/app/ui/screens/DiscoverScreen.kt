package com.hoshime.app.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.TrendingUp
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.hoshime.app.model.Anime
import com.hoshime.app.ui.theme.AnimeCyan
import com.hoshime.app.ui.theme.StarGold
import com.hoshime.app.ui.theme.SurfaceDark
import com.hoshime.app.ui.theme.SurfaceVariantDark
import com.hoshime.app.ui.theme.TextMuted
import com.hoshime.app.ui.theme.TextPrimary
import com.hoshime.app.ui.theme.TextSecondary
import com.hoshime.app.viewmodel.AnimeViewModel

@Composable
fun DiscoverScreen(
    viewModel: AnimeViewModel,
    onAnimeClick: (Long) -> Unit
) {
    val animeList by viewModel.animeList.collectAsState()
    val searchQuery by viewModel.searchQuery.collectAsState()

    val filteredList = animeList.filter {
        it.title.contains(searchQuery, ignoreCase = true) ||
        it.japaneseTitle.contains(searchQuery, ignoreCase = true) ||
        it.genres.any { genre -> genre.contains(searchQuery, ignoreCase = true) }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp)
    ) {
        Spacer(modifier = Modifier.height(8.dp))

        // Search Bar
        OutlinedTextField(
            value = searchQuery,
            onValueChange = { viewModel.updateSearchQuery(it) },
            modifier = Modifier.fillMaxWidth(),
            placeholder = { Text("Search by title, genre, or studio...", color = TextMuted) },
            leadingIcon = { Icon(Icons.Filled.Search, contentDescription = "Search", tint = TextMuted) },
            singleLine = true,
            shape = RoundedCornerShape(12.dp),
            colors = OutlinedTextFieldDefaults.colors(
                focusedContainerColor = SurfaceDark,
                unfocusedContainerColor = SurfaceDark,
                focusedBorderColor = StarGold,
                unfocusedBorderColor = SurfaceVariantDark,
                focusedTextColor = TextPrimary,
                unfocusedTextColor = TextPrimary
            )
        )

        Spacer(modifier = Modifier.height(16.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Trending & Top Bayesian Rated",
                style = MaterialTheme.typography.titleLarge,
                color = TextPrimary
            )
            Icon(Icons.Filled.TrendingUp, contentDescription = "Trending", tint = AnimeCyan)
        }

        Spacer(modifier = Modifier.height(12.dp))

        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            items(filteredList) { anime ->
                AnimeCatalogItem(
                    anime = anime,
                    onClick = { onAnimeClick(anime.id) }
                )
            }

            item {
                Spacer(modifier = Modifier.height(64.dp))
            }
        }
    }
}

@Composable
fun AnimeCatalogItem(
    anime: Anime,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() },
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = SurfaceDark)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = anime.format.name,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = AnimeCyan
                    )
                    Text(" • ${anime.episodes} eps • ${anime.studio}", fontSize = 11.sp, color = TextMuted)
                }

                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = anime.title,
                    style = MaterialTheme.typography.titleLarge,
                    color = TextPrimary,
                    maxLines = 1
                )
                Text(
                    text = anime.japaneseTitle,
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextSecondary,
                    maxLines = 1
                )

                Spacer(modifier = Modifier.height(6.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    anime.genres.take(3).forEach { g ->
                        Text(
                            text = g,
                            fontSize = 11.sp,
                            color = TextMuted
                        )
                    }
                }
            }

            Column(
                horizontalAlignment = Alignment.End,
                modifier = Modifier.padding(start = 12.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Filled.Star,
                        contentDescription = "Rating",
                        tint = StarGold,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = String.format("%.2f", anime.bayesianScore),
                        style = MaterialTheme.typography.titleLarge,
                        color = StarGold,
                        fontWeight = FontWeight.Bold
                    )
                }
                Text(
                    text = "${anime.totalRatingsCount} votes",
                    fontSize = 10.sp,
                    color = TextMuted
                )
                Text(
                    text = "C++ Bayesian",
                    fontSize = 9.sp,
                    color = AnimeCyan
                )
            }
        }
    }
}
