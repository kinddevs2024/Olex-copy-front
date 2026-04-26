import React from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { theme, layout } from "../theme";
import CarCard from "../components/CarCard";

const chips = ["All", "Electric", "SUV", "Sport", "Luxury"];

export default function HomeScreen({
  filteredCars,
  selectedChip,
  onChipPress,
  searchQuery,
  onSearchChange,
  onCarSelect,
  isLoading,
  error,
}) {
  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Premium car marketplace</Text>
        <Text style={styles.heroSubtitle}>
          Discover rare cars with calm, luxury, and clarity.
        </Text>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search cars, brands, models"
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>

      <View style={styles.chipRow}>
        {chips.map((chip) => (
          <Pressable
            key={chip}
            onPress={() => onChipPress(chip)}
            style={[styles.chip, selectedChip === chip && styles.chipActive]}
          >
            <Text
              style={[
                styles.chipText,
                selectedChip === chip && styles.chipTextActive,
              ]}
            >
              {chip}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured listings</Text>
        <Text style={styles.sectionCaption}>
          {filteredCars.length} premium cars available
        </Text>
        {isLoading && (
          <Text style={styles.statusText}>Loading listings from backend…</Text>
        )}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      {filteredCars.map((car) => (
        <CarCard key={car.id} car={car} onPress={() => onCarSelect(car)} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: layout.padding,
    paddingBottom: 120,
  },
  heroCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: layout.radius.card,
    padding: layout.padding,
    marginBottom: layout.spacing,
  },
  heroTitle: {
    color: theme.colors.buttonText,
    fontSize: theme.typography.heroTitle.size,
    fontWeight: theme.typography.heroTitle.weight,
    letterSpacing: theme.typography.heroTitle.letterSpacing,
    marginBottom: 8,
  },
  heroSubtitle: {
    color: theme.colors.buttonText,
    fontSize: theme.typography.body.size,
    lineHeight: 22,
  },
  searchRow: {
    marginBottom: layout.spacing,
  },
  searchInput: {
    backgroundColor: theme.colors.secondaryBackground,
    borderRadius: layout.radius.input,
    padding: 16,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body.size,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: layout.spacing,
  },
  chip: {
    borderRadius: layout.radius.chip,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.background,
    marginRight: 10,
    marginBottom: 10,
  },
  chipActive: {
    backgroundColor: theme.colors.textPrimary,
    borderColor: theme.colors.textPrimary,
  },
  chipText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.size,
  },
  chipTextActive: {
    color: theme.colors.buttonText,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sectionTitle.size,
    fontWeight: theme.typography.sectionTitle.weight,
    marginBottom: 4,
  },
  sectionCaption: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.size,
  },
  statusText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.size,
    marginTop: 4,
  },
  errorText: {
    color: "#B00020",
    fontSize: theme.typography.body.size,
    marginTop: 4,
  },
});
