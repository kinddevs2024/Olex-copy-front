import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { theme, layout } from "../theme";

export default function BottomNav({ tabs, activeTab, onTabPress }) {
  return (
    <View style={styles.navContainer}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.key}
          onPress={() => onTabPress(tab.key)}
          style={styles.tabButton}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText,
            ]}
          >
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: layout.padding,
    paddingVertical: 14,
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
  },
  tabText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.size,
    fontWeight: "700",
  },
  activeTabText: {
    color: theme.colors.primary,
  },
});
