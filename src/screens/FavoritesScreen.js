import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { theme, layout } from "../theme";
import CarCard from "../components/CarCard";

export default function FavoritesScreen({
  favoriteCars,
  onViewDetail,
  favoriteIds,
  onFavoriteToggle,
}) {
  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <Text style={styles.sectionTitle}>Избранное</Text>
      <View style={styles.notice}>
        <Text style={styles.bodyText}>
          Сохраняйте интересные автомобили, чтобы вернуться к ним позже и
          следить за изменением цены.
        </Text>
      </View>

      {favoriteCars.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Пока ничего нет</Text>
          <Text style={styles.emptyText}>
            Нажмите сердечко на карточке автомобиля, и объявление появится здесь.
          </Text>
        </View>
      ) : (
        favoriteCars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onPress={() => onViewDetail(car)}
            isFavorite={favoriteIds.includes(car.id)}
            onFavoriteToggle={onFavoriteToggle}
          />
        ))
      )}
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
  notice: {
    backgroundColor: theme.colors.secondaryBackground,
    borderRadius: layout.radius.card,
    padding: layout.padding,
    marginBottom: layout.spacing,
  },
  bodyText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body.size,
    lineHeight: 22,
  },
  emptyState: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: layout.radius.card,
    padding: layout.padding,
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
});
