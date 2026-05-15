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
import { autoSections, popularSearches } from "../data";

const chips = ["Все", ...autoSections];

export default function HomeScreen({
  filteredCars,
  selectedChip,
  onChipPress,
  searchQuery,
  onSearchChange,
  onCarSelect,
  onPostPress,
  favoriteIds,
  onFavoriteToggle,
  isLoading,
  error,
}) {
  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.logo}>OLEX Auto</Text>
        <View style={styles.headerLinks}>
          <Text style={styles.headerLink}>Сообщения</Text>
          <Text style={styles.headerLink}>RU</Text>
        </View>
      </View>

      <Pressable style={styles.postButton} onPress={onPostPress}>
        <Text style={styles.postButtonText}>Подать объявление</Text>
      </Pressable>

      <View style={styles.searchPanel}>
        <Text style={styles.heroTitle}>Найдите машину в Узбекистане</Text>
        <Text style={styles.heroSubtitle}>
          Новые и б/у автомобили, электромобили, седаны и кроссоверы рядом с
          вами.
        </Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Что ищете? Например: cobalt, byd, camry"
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        <View style={styles.locationInput}>
          <Text style={styles.locationText}>Весь Узбекистан</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Авто-разделы</Text>
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
        <Text style={styles.sectionTitle}>VIP-объявления</Text>
        <Text style={styles.sectionCaption}>
          {filteredCars.length} объявлений по автомобилям
        </Text>
        {isLoading && (
          <Text style={styles.statusText}>Загружаем объявления с backend...</Text>
        )}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      {filteredCars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          onPress={() => onCarSelect(car)}
          isFavorite={favoriteIds.includes(car.id)}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}

      <View style={styles.popularBlock}>
        <Text style={styles.sectionTitle}>Популярные запросы</Text>
        <View style={styles.popularGrid}>
          {popularSearches.map((item) => (
            <Pressable
              key={item}
              style={styles.popularItem}
              onPress={() => onSearchChange(item)}
            >
              <Text style={styles.popularText}>{item}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.infoTitle}>Автобазар в Узбекистане</Text>
        <Text style={styles.infoText}>
          Здесь собраны объявления о продаже легковых автомобилей: от городских
          Chevrolet и Daewoo до гибридных BYD, Toyota и бизнес-седанов. Выбирайте
          машину по цене, региону, пробегу, году выпуска и типу топлива.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: layout.padding,
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  logo: {
    color: theme.colors.primary,
    fontSize: 28,
    fontWeight: "900",
  },
  headerLinks: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerLink: {
    color: theme.colors.primary,
    fontSize: theme.typography.caption.size,
    fontWeight: "700",
    marginLeft: 14,
  },
  postButton: {
    backgroundColor: theme.colors.background,
    borderWidth: 4,
    borderColor: theme.colors.accent,
    borderRadius: layout.radius.button,
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: layout.spacing,
  },
  postButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.body.size,
    fontWeight: "800",
  },
  searchPanel: {
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
    marginBottom: 14,
  },
  searchInput: {
    backgroundColor: theme.colors.background,
    borderRadius: layout.radius.input,
    padding: 16,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body.size,
    marginBottom: 10,
  },
  locationInput: {
    backgroundColor: theme.colors.background,
    borderRadius: layout.radius.input,
    padding: 16,
  },
  locationText: {
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
    backgroundColor: theme.colors.accentMuted,
    borderColor: theme.colors.accent,
  },
  chipText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.size,
  },
  chipTextActive: {
    color: theme.colors.primary,
    fontWeight: "800",
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
    color: theme.colors.danger,
    fontSize: theme.typography.body.size,
    marginTop: 4,
  },
  popularBlock: {
    marginTop: layout.spacing,
  },
  popularGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  popularItem: {
    backgroundColor: theme.colors.secondaryBackground,
    borderRadius: layout.radius.button,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  popularText: {
    color: theme.colors.primary,
    fontSize: theme.typography.body.size,
    fontWeight: "700",
  },
  infoBlock: {
    backgroundColor: theme.colors.secondaryBackground,
    borderRadius: layout.radius.card,
    padding: layout.padding,
    marginTop: layout.spacing,
  },
  infoTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.cardTitle.size,
    fontWeight: theme.typography.cardTitle.weight,
    marginBottom: 8,
  },
  infoText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.size,
    lineHeight: 22,
  },
});
