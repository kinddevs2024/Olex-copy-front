import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { theme, layout } from "../theme";

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.sectionTitle}>No-name Client</Text>
          <Text style={styles.bodyText}>+1 555 0100</Text>
        </View>
      </View>
      <View style={styles.cardGroup}>
        {["My listings", "Favorites", "Messages", "Settings"].map((item) => (
          <View key={item} style={styles.profileRow}>
            <Text style={styles.cardTitle}>{item}</Text>
            <Text style={styles.caption}>Manage</Text>
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
    backgroundColor: theme.colors.border,
    marginRight: 16,
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
  cardGroup: {
    backgroundColor: theme.colors.secondaryBackground,
    borderRadius: layout.radius.card,
    padding: layout.padding,
  },
  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  cardTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.cardTitle.size,
    fontWeight: theme.typography.cardTitle.weight,
  },
  caption: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.size,
  },
});
