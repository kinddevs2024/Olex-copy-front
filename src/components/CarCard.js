import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { theme, layout } from "../theme";

export default function CarCard({ car, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.title}>{car.title}</Text>
        <Text style={styles.price}>{car.price}</Text>
      </View>
      <Text style={styles.description}>{car.description}</Text>
      <View style={styles.tagRow}>
        <Text style={styles.tagText}>{car.category}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.secondaryBackground,
    borderRadius: layout.radius.card,
    padding: layout.padding,
    marginBottom: layout.spacing,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.cardTitle.size,
    fontWeight: theme.typography.cardTitle.weight,
  },
  price: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.price.size,
    fontWeight: theme.typography.price.weight,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.size,
    marginBottom: 10,
  },
  tagRow: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: layout.radius.chip,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tagText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.caption.size,
    fontWeight: "700",
  },
});
