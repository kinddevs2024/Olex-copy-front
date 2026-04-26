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

export default function SearchScreen({ filterFields }) {
  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <Text style={styles.sectionTitle}>Find your next car</Text>
      {filterFields.map((field) => (
        <View key={field.key} style={styles.inputGroup}>
          <Text style={styles.inputLabel}>{field.label}</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder={field.placeholder}
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>
      ))}
      <Pressable style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Apply filters</Text>
      </Pressable>
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
  inputGroup: {
    marginBottom: layout.spacing,
  },
  inputLabel: {
    color: theme.colors.textSecondary,
    marginBottom: 8,
    fontSize: theme.typography.caption.size,
  },
  fieldInput: {
    backgroundColor: theme.colors.secondaryBackground,
    borderRadius: layout.radius.input,
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
});
