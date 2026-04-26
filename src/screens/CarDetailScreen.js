import React from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { theme, layout } from "../theme";

export default function CarDetailScreen({ selectedCar }) {
  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <View style={styles.detailHeader}>
        <Text style={styles.sectionTitle}>{selectedCar.title}</Text>
        <Text style={styles.price}>{selectedCar.price}</Text>
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.cardTitle}>Specifications</Text>
        {selectedCar.specs.map((item) => (
          <View key={item.label} style={styles.specRow}>
            <Text style={styles.specLabel}>{item.label}</Text>
            <Text style={styles.specValue}>{item.value}</Text>
          </View>
        ))}
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.cardTitle}>Seller</Text>
        <Text style={styles.bodyText}>No-name Motors</Text>
        <Text style={styles.bodyText}>Contact for premium purchase</Text>
      </View>
      <Pressable style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Contact seller</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: layout.padding,
    paddingBottom: 120,
  },
  detailHeader: {
    marginBottom: layout.spacing,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sectionTitle.size,
    fontWeight: theme.typography.sectionTitle.weight,
    marginBottom: 8,
  },
  price: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.price.size,
    fontWeight: theme.typography.price.weight,
  },
  detailCard: {
    backgroundColor: theme.colors.secondaryBackground,
    borderRadius: layout.radius.card,
    padding: layout.padding,
    marginBottom: layout.spacing,
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
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  specLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.size,
  },
  specValue: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body.size,
    fontWeight: "600",
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
});
