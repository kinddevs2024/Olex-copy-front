import React from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { theme, layout } from "../theme";

const menuItems = [
  ["Сообщения", "Диалоги по автомобилям"],
  ["Сохраненные поиски", "Фильтры и уведомления"],
  ["Платные услуги", "TOP, VIP и поднятия"],
  ["Настройки профиля", "Имя, телефон, email"],
];

export default function ProfileScreen({
  ownCars,
  favoriteCount,
  onViewCar,
  onEditCar,
  onDeleteCar,
}) {
  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.sectionTitle}>Aziz Auto</Text>
          <Text style={styles.bodyText}>+998 90 123 45 67</Text>
          <Text style={styles.caption}>На сервисе с апреля 2024</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{ownCars.length}</Text>
          <Text style={styles.caption}>активных</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.caption}>на модерации</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{favoriteCount}</Text>
          <Text style={styles.caption}>избранных</Text>
        </View>
      </View>

      <View style={styles.myListings}>
        <Text style={styles.blockTitle}>Мои объявления</Text>
        {ownCars.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Нет активных объявлений</Text>
            <Text style={styles.emptyText}>
              Подайте первое объявление, и оно появится в этом разделе.
            </Text>
          </View>
        ) : (
          ownCars.map((car) => (
            <View key={car.id} style={styles.listingRow}>
              <Pressable style={styles.listingInfo} onPress={() => onViewCar(car)}>
                <Text style={styles.cardTitle}>{car.title}</Text>
                <Text style={styles.caption}>
                  {car.price} · {car.location}
                </Text>
              </Pressable>
              <View style={styles.actionsRow}>
                <Pressable
                  style={styles.smallButton}
                  onPress={() => onEditCar(car)}
                >
                  <Text style={styles.smallButtonText}>Изм.</Text>
                </Pressable>
                <Pressable
                  style={[styles.smallButton, styles.deleteButton]}
                  onPress={() => onDeleteCar(car.id)}
                >
                  <Text style={styles.deleteButtonText}>Удалить</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </View>

      <View style={styles.cardGroup}>
        {menuItems.map(([title, caption]) => (
          <View key={title} style={styles.profileRow}>
            <View style={styles.rowText}>
              <Text style={styles.cardTitle}>{title}</Text>
              <Text style={styles.caption}>{caption}</Text>
            </View>
            <Text style={styles.action}>Открыть</Text>
          </View>
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
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: layout.spacing,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  avatarText: {
    color: theme.colors.buttonText,
    fontSize: 28,
    fontWeight: "900",
  },
  profileInfo: {
    flex: 1,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sectionTitle.size,
    fontWeight: theme.typography.sectionTitle.weight,
    marginBottom: 4,
  },
  bodyText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body.size,
    lineHeight: 22,
  },
  caption: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.size,
    lineHeight: 18,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: theme.colors.secondaryBackground,
    borderRadius: layout.radius.card,
    padding: layout.padding,
    marginBottom: layout.spacing,
  },
  statItem: {
    flex: 1,
  },
  statValue: {
    color: theme.colors.primary,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 3,
  },
  myListings: {
    backgroundColor: theme.colors.background,
    borderRadius: layout.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: layout.padding,
    marginBottom: layout.spacing,
  },
  blockTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sectionTitle.size,
    fontWeight: theme.typography.sectionTitle.weight,
    marginBottom: 12,
  },
  listingRow: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: 14,
    marginTop: 14,
  },
  listingInfo: {
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: "row",
  },
  smallButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: layout.radius.button,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  smallButtonText: {
    color: theme.colors.buttonText,
    fontSize: theme.typography.caption.size,
    fontWeight: "800",
  },
  deleteButton: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.danger,
  },
  deleteButtonText: {
    color: theme.colors.danger,
    fontSize: theme.typography.caption.size,
    fontWeight: "800",
  },
  emptyState: {
    backgroundColor: theme.colors.secondaryBackground,
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
  cardGroup: {
    backgroundColor: theme.colors.background,
    borderRadius: layout.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: layout.padding,
  },
  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  rowText: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.cardTitle.size,
    fontWeight: theme.typography.cardTitle.weight,
    marginBottom: 3,
    lineHeight: 22,
  },
  action: {
    color: theme.colors.primary,
    fontSize: theme.typography.caption.size,
    fontWeight: "800",
  },
});
