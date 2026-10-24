package com.hoshime.app.ui.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.StarHalf
import androidx.compose.material.icons.outlined.StarOutline
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.hoshime.app.ui.theme.StarGold
import com.hoshime.app.ui.theme.TextMuted

@Composable
fun StarRatingSelector(
    rating: Double,
    onRatingChange: (Double) -> Unit,
    modifier: Modifier = Modifier,
    starSize: Dp = 32.dp,
    showScoreText: Boolean = true
) {
    Row(
        modifier = modifier,
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        for (starIndex in 1..5) {
            val fullStarValue = starIndex.toDouble()
            val halfStarValue = fullStarValue - 0.5

            Box(
                modifier = Modifier
                    .size(starSize)
                    .clickable(
                        interactionSource = remember { MutableInteractionSource() },
                        indication = null
                    ) {
                        // Toggle between half star and full star
                        if (rating == fullStarValue) {
                            onRatingChange(halfStarValue)
                        } else if (rating == halfStarValue) {
                            onRatingChange(fullStarValue - 1.0)
                        } else {
                            onRatingChange(fullStarValue)
                        }
                    },
                contentAlignment = Alignment.Center
            ) {
                when {
                    rating >= fullStarValue -> {
                        Icon(
                            imageVector = Icons.Filled.Star,
                            contentDescription = "Full Star $starIndex",
                            tint = StarGold,
                            modifier = Modifier.size(starSize)
                        )
                    }
                    rating >= halfStarValue -> {
                        Icon(
                            imageVector = Icons.Filled.StarHalf,
                            contentDescription = "Half Star $starIndex",
                            tint = StarGold,
                            modifier = Modifier.size(starSize)
                        )
                    }
                    else -> {
                        Icon(
                            imageVector = Icons.Outlined.StarOutline,
                            contentDescription = "Empty Star $starIndex",
                            tint = TextMuted,
                            modifier = Modifier.size(starSize)
                        )
                    }
                }
            }
        }

        if (showScoreText) {
            Text(
                text = String.format("%.1f", rating),
                style = MaterialTheme.typography.titleLarge,
                color = StarGold,
                modifier = Modifier.align(Alignment.CenterVertically)
            )
        }
    }
}
