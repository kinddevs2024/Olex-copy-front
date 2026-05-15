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

const sortOptions = [
  { key: "recommended", label: "Рекомендованное" },
  { key: "newest", label: "Самые новые" },
  { key: "priceAsc", label: "Дешевле" },
  { key: "priceDesc", label: "Дороже" },
];

export default function SearchScreen({
  cars,
  filterFields,
  filters,
  sortMode,
  searchQuery,
  onSearchChange,
  onFilterChange,
  onResetFilters,
  onSortChange,
  onCarSelect,
  favoriteIds,
  onFavoriteToggle,
}) {
  const textFields = filterFields.filter(
    (field) => !["price", "year"].includes(field.key),
  );

  const setQuickFilter = (key, value) => {
    onFilterChange(key, filters[key] === value ? "all" : value);
  };

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <Text style={styles.breadcrumbs}>
        Главная / Транспорт / Легковые автомобили
      </Text>
      <Text style={styles.sectionTitle}>Авто: машины и их продажа</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск по названию, марке или модели"
        placeholderTextColor={theme.colors.textSecondary}
        value={searchQuery}
        onChangeText={onSearchChange}
      />

      <View style={styles.quickRow}>
        <Pressable
          style={[styles.quickChip, filters.onlyPhoto && styles.quickActive]}
          onPress={() => onFilterChange("onlyPhoto", !filters.onlyPhoto)}
        >
          <Text style={styles.quickText}>Только с фото</Text>
        </Pressable>
        <Pressable
          style={[
            styles.quickChip,
            filters.currency === "UZS" && styles.quickActive,
          ]}
          onPress={() => setQuickFilter("currency", "UZS")}
        >
          <Text style={styles.quickText}>сум</Text>
        </Pressable>
        <Pressable
          style={[
            styles.quickChip,
            filters.currency === "USD" && styles.quickActive,
          ]}
          onPress={() => setQuickFilter("currency", "USD")}
        >
          <Text style={styles.quickText}>у.е.</Text>
        </Pressable>
        {["TOP", "VIP"].map((item) => (
          <Pressable
            key={item}
            style={[
              styles.quickChip,
              filters.promoted === item && styles.quickActive,
            ]}
            onPress={() => setQuickFilter("promoted", item)}
          >
            <Text style={styles.quickText}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.filterPanel}>
        <View style={styles.panelHeader}>
          <Text style={styles.cardTitle}>Фильтры</Text>
          <Pressable onPress={onResetFilters}>
            <Text style={styles.resetText}>Сбросить</Text>
          </Pressable>
        </View>
        <View style={styles.twoColumn}>
          <TextInput
            style={styles.compactInput}
            placeholder="Цена от"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="numeric"
            value={filters.priceFrom}
            onChangeText={(value) => onFilterChange("priceFrom", value)}
          />
          <TextInput
            style={styles.compactInput}
            placeholder="Цена до"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="numeric"
            value={filters.priceTo}
            onChangeText={(value) => onFilterChange("priceTo", value)}
          />
        </View>
        <View style={styles.twoColumn}>
          <TextInput
            style={styles.compactInput}
            placeholder="Год от"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="numeric"
            value={filters.yearFrom}
            onChangeText={(value) => onFilterChange("yearFrom", value)}
          />
          <TextInput
            style={styles.compactInput}
            placeholder="Год до"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="numeric"
            value={filters.yearTo}
            onChangeText={(value) => onFilterChange("yearTo", value)}
          />
        </View>
        {textFields.map((field) => (
          <View key={field.key} style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{field.label}</Text>
            <TextInput
              style={styles.fieldInput}
              placeholder={field.placeholder}
              placeholderTextColor={theme.colors.textSecondary}
              value={filters[field.key]}
              onChangeText={(value) => onFilterChange(field.key, value)}
            />
          </View>
        ))}
        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Применить фильтры</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Сохранить параметры поиска</Text>
        </Pressable>
      </View>

      <View style={styles.catalogHeader}>
        <Text style={styles.cardTitle}>Найдено {cars.length} объявлений</Text>
        <View style={styles.sortRow}>
          {sortOptions.map((option) => (
            <Pressable
              key={option.key}
              style={[
                styles.sortButton,
                sortMode === option.key && styles.sortButtonActive,
              ]}
              onPress={() => onSortChange(option.key)}
            >
              <Text
                style={[
                  styles.sortText,
                  sortMode === option.key && styles.sortTextActive,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {cars.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Объявления не найдены</Text>
          <Text style={styles.emptyText}>
            Попробуйте убрать часть фильтров или изменить поисковый запрос.
          </Text>
        </View>
      ) : (
        cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onPress={() => onCarSelect(car)}
            isFavorite={favoriteIds.includes(car.id)}
            onFavoriteToggle={onFavoriteToggle}
          />
        ))
      )}

      <View style={styles.pagination}>
        {["1", "2", "3", "...", "25"].map((page) => (
          <Text key={page} style={styles.pageItem}>
            {page}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: layout.padding,
    paddingBottom: 120,
  },
  breadcrumbs: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.size,
    marginBottom: 8,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sectionTitle.size,
    fontWeight: theme.typography.sectionTitle.weight,
    marginBottom: layout.spacing,
  },
  searchInput: {
    backgroundColor: theme.colors.background,
    borderRadius: layout.radius.input,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body.size,
    marginBottom: layout.spacing,
  },
  quickRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  quickChip: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: layout.radius.chip,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginRight: 8,
    marginBottom: 8,
  },
  quickActive: {
    backgroundColor: theme.colors.accentMuted,
    borderColor: theme.colors.accent,
  },
  quickText: {
    color: theme.colors.primary,
    fontSize: theme.typography.caption.size,
    fontWeight: "700",
  },
  filterPanel: {
    backgroundColor: theme.colors.secondaryBackground,
    borderRadius: layout.radius.card,
    padding: layout.padding,
    marginBottom: layout.spacing,
  },
  panelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.cardTitle.size,
    fontWeight: theme.typography.cardTitle.weight,
    marginBottom: 12,
  },
  resetText: {
    color: theme.colors.primary,
    fontSize: theme.typography.caption.size,
    fontWeight: "800",
  },
  twoColumn: {
    flexDirection: "row",
    gap: 10,
    marginBottom: layout.spacing,
  },
  compactInput: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderRadius: layout.radius.input,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body.size,
  },
  inputGroup: {
    marginBottom: layout.spacing,
  },
  inputLabel: {
    color: theme.colors.textSecondary,
    marginBottom: 8,
    fontSize: theme.typography.caption.size,
  },
  fieldInput: {
    backgroundColor: theme.colors.background,
    borderRadius: layout.radius.input,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body.size,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: layout.radius.button,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: layout.spacing,
  },
  primaryButtonText: {
    color: theme.colors.buttonText,
    fontSize: theme.typography.body.size,
    fontWeight: "700",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: layout.radius.button,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  secondaryButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.body.size,
    fontWeight: "700",
  },
  catalogHeader: {
    marginBottom: 12,
  },
  sortRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sortButton: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: layout.radius.button,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  sortButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  sortText: {
    color: theme.colors.primary,
    fontSize: theme.typography.caption.size,
    fontWeight: "700",
  },
  sortTextActive: {
    color: theme.colors.buttonText,
  },
  emptyState: {
    backgroundColor: theme.colors.secondaryBackground,
    borderRadius: layout.radius.card,
    padding: layout.padding,
    marginBottom: layout.spacing,
  },
  emptyTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.cardTitle.size,
    fontWeight: theme.typography.cardTitle.weight,
    marginBottom: 6,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.size,
    lineHeight: 22,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: layout.spacing,
  },
  pageItem: {
    color: theme.colors.primary,
    fontSize: theme.typography.body.size,
    fontWeight: "800",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
