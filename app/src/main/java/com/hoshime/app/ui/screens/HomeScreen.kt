package com.hoshime.app.ui.screens

import androidx.compose.foundation.background
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
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SuggestionChip
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.hoshime.app.model.DiaryEntry
import com.hoshime.app.ui.theme.AnimeCyan
import com.hoshime.app.ui.theme.AnimePurple
import com.hoshime.app.ui.theme.StarGold
import com.hoshime.app.ui.theme.SurfaceDark
import com.hoshime.app.ui.theme.SurfaceVariantDark
import com.hoshime.app.ui.theme.TextMuted
import com.hoshime.app.ui.theme.TextPrimary
import com.hoshime.app.ui.theme.TextSecondary
import com.hoshime.app.viewmodel.AnimeViewModel
import com.hoshime.app.viewmodel.Screen

@Composable
fun HomeScreen(
    viewModel: AnimeViewModel,
    onAnimeClick: (Long) -> Unit
) {
    val diaryEntries by viewModel.diaryEntries.collectAsState()
    val nativeStats by viewModel.nativeStats.collectAsState()

    Box(modifier = Modifier.fillMaxSize()) {
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                Spacer(modifier = Modifier.height(8.dp))
                // Native C++ Stats Banner
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = SurfaceVariantDark)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(
                                text = "ANIME DIARY & STARRY RATINGS",
                                style = MaterialTheme.typography.labelSmall,
                                color = AnimeCyan,
                                fontWeight = FontWeight.Bold
                            )
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    imageVector = Icons.Filled.CheckCircle,
                                    contentDescription = "Native Verified",
                                    tint = AnimeCyan,
                                    modifier = Modifier.size(14.dp)
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(
                                    text = "C++ NDK Engine",
                                    fontSize = 11.sp,
                                    color = AnimeCyan
                                )
                            }
                        }

                        Spacer(modifier = Modifier.height(10.dp))
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Column {
                                Text(
                                    text = String.format("%.2f ★", nativeStats.mean),
                                    style = MaterialTheme.typography.headlineMedium,
                                    color = StarGold,
                                    fontWeight = FontWeight.Bold
                                )
                                Text("Mean Rating", style = MaterialTheme.typography.bodyMedium, color = TextMuted)
                            }
                            Column {
                                Text(
                                    text = String.format("±%.2f", nativeStats.standardDeviation),
                                    style = MaterialTheme.typography.headlineMedium,
                                    color = TextPrimary,
                                    fontWeight = FontWeight.Bold
                                )
                                Text("Std Dev", style = MaterialTheme.typography.bodyMedium, color = TextMuted)
                            }
                            Column {
                                Text(
                                    text = "${nativeStats.totalCount}",
                                    style = MaterialTheme.typography.headlineMedium,
                                    color = AnimePurple,
                                    fontWeight = FontWeight.Bold
                                )
                                Text("Entries", style = MaterialTheme.typography.bodyMedium, color = TextMuted)
                            }
                        }
                    }
                }
            }

            item {
                Text(
                    text = "Recent Star Diary Logs",
                    style = MaterialTheme.typography.titleLarge,
                    color = TextPrimary
                )
            }

            items(diaryEntries) { entry ->
                DiaryEntryCard(
                    entry = entry,
                    onClick = { onAnimeClick(entry.animeId) }
                )
            }

            item {
                Spacer(modifier = Modifier.height(72.dp))
            }
        }

        // Floating Action Button to quickly open C++ Native Logger
        FloatingActionButton(
            onClick = {
                // Log for top anime
                viewModel.navigateTo(Screen.LogDiary(1L))
            },
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .padding(24.dp),
            containerColor = StarGold,
            contentColor = SurfaceDark
        ) {
            Icon(Icons.Filled.Add, contentDescription = "Log Anime")
        }
    }
}

@Composable
fun DiaryEntryCard(
    entry: DiaryEntry,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() },
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = SurfaceDark)
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = entry.animeTitle,
                    style = MaterialTheme.typography.titleLarge,
                    color = TextPrimary,
                    maxLines = 1,
                    modifier = Modifier.weight(1f)
                )

                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Filled.Star,
                        contentDescription = "Rating",
                        tint = StarGold,
                        modifier = Modifier.size(18.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = String.format("%.1f", entry.starRating),
                        style = MaterialTheme.typography.titleLarge,
                        color = StarGold,
                        fontWeight = FontWeight.Bold
                    )
                }
            }

            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = "Episode ${entry.episodeWatched} • ${if (entry.rewatched) "Rewatched" else "First Watch"}",
                style = MaterialTheme.typography.bodyMedium,
                color = TextSecondary
            )

            if (entry.reviewNotes.isNotBlank()) {
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = entry.reviewNotes,
                    style = MaterialTheme.typography.bodyLarge,
                    color = TextPrimary,
                    maxLines = 3
                )
            }

            Spacer(modifier = Modifier.height(10.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    entry.tags.take(3).forEach { tag ->
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(6.dp))
                                .background(SurfaceVariantDark)
                                .padding(horizontal = 8.dp, vertical = 4.dp)
                        ) {
                            Text(text = "#$tag", fontSize = 11.sp, color = TextSecondary)
                        }
                    }
                }

                Text(
                    text = "Hash: 0x${entry.nativeChecksum.toString(16).takeLast(6)}",
                    fontSize = 10.sp,
                    color = TextMuted
                )
            }
        }
    }
}
