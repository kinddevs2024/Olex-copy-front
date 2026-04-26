import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { theme, layout } from "../theme";
import CarCard from "../components/CarCard";

export default function FavoritesScreen({ selectedCar, onViewDetail }) {
  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <Text style={styles.sectionTitle}>Saved cars</Text>
      <Text style={styles.bodyText}>
        Tap any car on Home to add it to favorites.
      </Text>
      <CarCard car={selectedCar} onPress={onViewDetail} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: layout.padding,
    paddingBottom: 120,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sectionTitle.size,
    fontWeight: theme.typography.sectionTitle.weight,
    marginBottom: layout.spacing,
  },
  bodyText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body.size,
    lineHeight: 22,
    marginBottom: layout.spacing,
  },
});
