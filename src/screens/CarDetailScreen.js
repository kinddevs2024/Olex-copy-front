import React from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { theme, layout } from "../theme";

export default function CarDetailScreen({
  selectedCar,
  isFavorite,
  onFavoriteToggle,
}) {
  const details = [
    { label: "Частное лицо/бизнес", value: selectedCar.sellerType },
    { label: "Марка", value: selectedCar.brand },
    { label: "Модель", value: selectedCar.model },
    { label: "Тип кузова", value: selectedCar.bodyType },
    { label: "Год выпуска", value: selectedCar.year },
    {
      label: "Пробег",
      value: `${Number(selectedCar.mileage || 0).toLocaleString("ru-RU")} км`,
    },
    { label: "Коробка передач", value: selectedCar.transmission },
    { label: "Цвет", value: selectedCar.color },
    { label: "Топливо", value: selectedCar.fuel },
    { label: "Состояние", value: selectedCar.condition },
    { label: "Количество хозяев", value: selectedCar.owners },
  ];

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <Text style={styles.breadcrumbs}>
        Главная / Транспорт / Легковые автомобили
      </Text>

      <Image source={{ uri: selectedCar.image }} style={styles.heroImage} />
      <View style={styles.thumbRow}>
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.thumb} />
        ))}
      </View>

      <View style={styles.detailHeader}>
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>{selectedCar.title}</Text>
          <Pressable
            onPress={onFavoriteToggle}
            style={[styles.favoriteButton, isFavorite && styles.favoriteActive]}
          >
            <Text style={styles.favoriteText}>{isFavorite ? "♥" : "♡"}</Text>
          </Pressable>
        </View>
        <Text style={styles.price}>{selectedCar.price}</Text>
        <Text style={styles.caption}>
          {selectedCar.location} · {selectedCar.publishedAt}
        </Text>
      </View>

      <View style={styles.detailCard}>
        <Text style={styles.cardTitle}>Параметры</Text>
        {details.map((item) => (
          <View key={item.label} style={styles.specRow}>
            <Text style={styles.specLabel}>{item.label}</Text>
            <Text style={styles.specValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.detailCard}>
        <Text style={styles.cardTitle}>Описание</Text>
        <Text style={styles.bodyText}>{selectedCar.description}</Text>
        <Text style={styles.adId}>ID объявления: {selectedCar.id}</Text>
      </View>

      <View style={styles.sellerCard}>
        <View style={styles.sellerHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{selectedCar.sellerName?.[0]}</Text>
          </View>
          <View style={styles.sellerInfo}>
            <Text style={styles.cardTitle}>{selectedCar.sellerName}</Text>
            <Text style={styles.caption}>
              На сервисе с апреля 2024 · Онлайн
            </Text>
          </View>
        </View>
        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Сообщение</Text>
        </Pressable>
        <Pressable style={styles.phoneButton}>
          <Text style={styles.phoneButtonText}>Показать телефон</Text>
          <Text style={styles.phoneMasked}>xxx xxx xx xx</Text>
        </Pressable>
      </View>

      <Pressable style={styles.reportButton}>
        <Text style={styles.reportText}>Пожаловаться на объявление</Text>
      </Pressable>
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
    marginBottom: 10,
  },
  heroImage: {
    width: "100%",
    height: 260,
    borderRadius: layout.radius.card,
    backgroundColor: theme.colors.secondaryBackground,
    marginBottom: 10,
  },
  thumbRow: {
    flexDirection: "row",
    marginBottom: layout.spacing,
  },
  thumb: {
    width: 64,
    height: 48,
    borderRadius: layout.radius.button,
    backgroundColor: theme.colors.secondaryBackground,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: 8,
  },
  detailHeader: {
    marginBottom: layout.spacing,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sectionTitle.size,
    fontWeight: theme.typography.sectionTitle.weight,
    marginBottom: 8,
    lineHeight: 28,
    flex: 1,
    marginRight: 12,
  },
  favoriteButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  favoriteActive: {
    backgroundColor: theme.colors.accentMuted,
    borderColor: theme.colors.accent,
  },
  favoriteText: {
    color: theme.colors.primary,
    fontSize: 25,
    lineHeight: 25,
  },
  price: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: theme.typography.price.weight,
    marginBottom: 6,
  },
  caption: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.size,
  },
  detailCard: {
    backgroundColor: theme.colors.background,
    borderRadius: layout.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: layout.padding,
    marginBottom: layout.spacing,
  },
  sellerCard: {
    backgroundColor: theme.colors.secondaryBackground,
    borderRadius: layout.radius.card,
    padding: layout.padding,
    marginBottom: layout.spacing,
  },
  sellerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: layout.spacing,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: theme.colors.buttonText,
    fontSize: 22,
    fontWeight: "800",
  },
  sellerInfo: {
    flex: 1,
  },
  cardTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.cardTitle.size,
    fontWeight: theme.typography.cardTitle.weight,
    marginBottom: 10,
  },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  specLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.size,
    flex: 1,
    marginRight: 12,
  },
  specValue: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body.size,
    fontWeight: "700",
    flex: 1,
    textAlign: "right",
  },
  bodyText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body.size,
    lineHeight: 22,
  },
  adId: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.size,
    marginTop: 14,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: layout.radius.button,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 10,
  },
  primaryButtonText: {
    color: theme.colors.buttonText,
    fontSize: theme.typography.body.size,
    fontWeight: "800",
  },
  phoneButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: layout.radius.button,
    paddingVertical: 14,
    alignItems: "center",
  },
  phoneButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.body.size,
    fontWeight: "800",
  },
  phoneMasked: {
    color: theme.colors.primary,
    fontSize: theme.typography.caption.size,
    marginTop: 3,
  },
  reportButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  reportText: {
    color: theme.colors.danger,
    fontSize: theme.typography.body.size,
    fontWeight: "700",
  },
});
