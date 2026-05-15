import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { theme, layout } from "../theme";

export default function CarCard({
  car,
  onPress,
  isFavorite = false,
  onFavoriteToggle,
}) {
  const handleFavoritePress = (event) => {
    event.stopPropagation();
    onFavoriteToggle?.(car.id);
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: car.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.title}>{car.title}</Text>
          <Pressable
            onPress={handleFavoritePress}
            style={[styles.favoriteButton, isFavorite && styles.favoriteActive]}
          >
            <Text
              style={[
                styles.favorite,
                isFavorite && styles.favoriteTextActive,
              ]}
            >
              {isFavorite ? "♥" : "♡"}
            </Text>
          </Pressable>
        </View>
        <Text style={styles.price}>{car.price}</Text>
        <Text style={styles.meta}>
          {car.year} · {Number(car.mileage || 0).toLocaleString("ru-RU")} км ·{" "}
          {car.fuel}
        </Text>
        <Text style={styles.location}>{car.location}</Text>
        <View style={styles.footerRow}>
          <Text style={styles.date}>{car.publishedAt}</Text>
          {car.promoted ? (
            <Text style={styles.promoted}>{car.promoted}</Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: layout.radius.card,
    marginBottom: layout.spacing,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 190,
    backgroundColor: theme.colors.secondaryBackground,
  },
  content: {
    padding: layout.padding,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.cardTitle.size,
    fontWeight: theme.typography.cardTitle.weight,
    flex: 1,
    lineHeight: 22,
    marginRight: 12,
  },
  price: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.price.size,
    fontWeight: theme.typography.price.weight,
    marginBottom: 8,
  },
  favoriteButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteActive: {
    backgroundColor: theme.colors.accentMuted,
  },
  favorite: {
    color: theme.colors.primary,
    fontSize: 22,
    lineHeight: 22,
  },
  favoriteTextActive: {
    color: theme.colors.primary,
  },
  meta: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.size,
    marginBottom: 6,
  },
  location: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.size,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    color: theme.colors.muted,
    fontSize: theme.typography.caption.size,
  },
  promoted: {
    backgroundColor: theme.colors.warning,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.caption.size,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: layout.radius.button,
  },
});
