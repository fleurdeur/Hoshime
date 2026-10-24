package com.hoshime.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Remove
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableDoubleStateOf
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.hoshime.app.data.AnimeRepository
import com.hoshime.app.nativebridge.NativeRatingEngine
import com.hoshime.app.ui.components.StarRatingSelector
import com.hoshime.app.ui.theme.AnimeCyan
import com.hoshime.app.ui.theme.BackgroundDark
import com.hoshime.app.ui.theme.StarGold
import com.hoshime.app.ui.theme.SurfaceDark
import com.hoshime.app.ui.theme.SurfaceVariantDark
import com.hoshime.app.ui.theme.TextMuted
import com.hoshime.app.ui.theme.TextPrimary
import com.hoshime.app.ui.theme.TextSecondary
import com.hoshime.app.viewmodel.AnimeViewModel

@Composable
fun DiaryLoggerScreen(
    animeId: Long,
    viewModel: AnimeViewModel,
    onBack: () -> Unit
) {
    val anime = AnimeRepository.getAnimeById(animeId) ?: return

    var rating by remember { mutableDoubleStateOf(4.5) }
    var episode by remember { mutableIntStateOf(1) }
    var notes by remember { mutableStateOf("") }
    var rewatched by remember { mutableStateOf(false) }
    var tagsText by remember { mutableStateOf("Masterpiece, Great OST") }

    val liveChecksum = remember(rating, episode, notes) {
        NativeRatingEngine.generateDiaryChecksum(
            animeId = animeId,
            episode = episode,
            rating = rating,
            timestamp = System.currentTimeMillis(),
            notes = notes
        )
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundDark)
            .verticalScroll(rememberScrollState())
    ) {
        // App bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onBack) {
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                    contentDescription = "Back",
                    tint = TextPrimary
                )
            }
            Text(
                text = "Log to Diary",
                style = MaterialTheme.typography.titleLarge,
                color = TextPrimary
            )
        }

        Column(modifier = Modifier.padding(horizontal = 16.dp)) {
            Text(
                text = anime.title,
                style = MaterialTheme.typography.headlineMedium,
                color = TextPrimary
            )
            Text(
                text = "Episode progress and star score evaluation",
                style = MaterialTheme.typography.bodyMedium,
                color = TextSecondary
            )

            Spacer(modifier = Modifier.height(20.dp))

            // Star Rating Section
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = SurfaceDark)
            ) {
                Column(
                    modifier = Modifier.padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "STAR RATING (0.5 – 5.0)",
                        style = MaterialTheme.typography.labelSmall,
                        color = TextMuted,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(12.dp))

                    StarRatingSelector(
                        rating = rating,
                        onRatingChange = { rating = it },
                        starSize = 38.dp,
                        showScoreText = true
                    )
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Episode Selector
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = SurfaceDark)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(text = "Episode Watched", color = TextPrimary, fontWeight = FontWeight.SemiBold)
                        Text(text = "Total: ${anime.episodes} episodes", color = TextMuted, fontSize = 12.sp)
                    }

                    Row(verticalAlignment = Alignment.CenterVertically) {
                        IconButton(
                            onClick = { if (episode > 1) episode-- },
                            modifier = Modifier.background(SurfaceVariantDark, RoundedCornerShape(8.dp))
                        ) {
                            Icon(Icons.Filled.Remove, contentDescription = "Decrease", tint = TextPrimary)
                        }
                        Text(
                            text = "$episode",
                            style = MaterialTheme.typography.titleLarge,
                            color = TextPrimary,
                            modifier = Modifier.padding(horizontal = 16.dp)
                        )
                        IconButton(
                            onClick = { if (episode < anime.episodes) episode++ },
                            modifier = Modifier.background(SurfaceVariantDark, RoundedCornerShape(8.dp))
                        ) {
                            Icon(Icons.Filled.Add, contentDescription = "Increase", tint = TextPrimary)
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Rewatch Checkbox
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Checkbox(
                    checked = rewatched,
                    onCheckedChange = { rewatched = it },
                    colors = CheckboxDefaults.colors(
                        checkedColor = StarGold,
                        checkmarkColor = BackgroundDark,
                        uncheckedColor = TextMuted
                    )
                )
                Text(text = "Mark as rewatch", color = TextPrimary)
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Review Notes
            OutlinedTextField(
                value = notes,
                onValueChange = { notes = it },
                label = { Text("Diary Notes / Review", color = TextMuted) },
                placeholder = { Text("What made this episode or series memorable?", color = TextMuted) },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(120.dp),
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

            Spacer(modifier = Modifier.height(12.dp))

            // Tags
            OutlinedTextField(
                value = tagsText,
                onValueChange = { tagsText = it },
                label = { Text("Tags (comma separated)", color = TextMuted) },
                modifier = Modifier.fillMaxWidth(),
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

            Spacer(modifier = Modifier.height(12.dp))

            // Native Checksum Security Banner
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "Native C++ Integrity Hash:",
                    fontSize = 11.sp,
                    color = TextMuted
                )
                Text(
                    text = "0x${liveChecksum.toString(16).uppercase()}",
                    fontSize = 11.sp,
                    color = AnimeCyan,
                    fontWeight = FontWeight.Bold
                )
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Save Button
            Button(
                onClick = {
                    val parsedTags = tagsText.split(",").map { it.trim() }.filter { it.isNotEmpty() }
                    viewModel.logRating(
                        animeId = anime.id,
                        episode = episode,
                        rating = rating,
                        notes = notes,
                        rewatched = rewatched,
                        tags = parsedTags
                    )
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(containerColor = StarGold, contentColor = BackgroundDark)
            ) {
                Icon(Icons.Filled.Check, contentDescription = "Save Log")
                Spacer(modifier = Modifier.width(8.dp))
                Text("Save Diary Entry", fontWeight = FontWeight.Bold, fontSize = 16.sp)
            }

            Spacer(modifier = Modifier.height(48.dp))
        }
    }
}
