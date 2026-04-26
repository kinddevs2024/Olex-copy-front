import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { theme, layout } from "./src/theme";
import { carData, filterFields } from "./src/data";
import CarCard from "./src/components/CarCard";
import BottomNav from "./src/components/BottomNav";

const tabs = ["Home", "Search", "Add", "Favorites", "Profile"];
const chips = ["All", "Electric", "SUV", "Sport", "Luxury"];

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedChip, setSelectedChip] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCar, setSelectedCar] = useState(carData[0]);

  const filteredCars = carData.filter((car) => {
    const matchesChip = selectedChip === "All" || car.category === selectedChip;
    const matchesQuery = car.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesChip && matchesQuery;
  });

  const renderHome = () => (
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
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.chipRow}>
        {chips.map((chip) => (
          <Pressable
            key={chip}
            onPress={() => setSelectedChip(chip)}
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
      </View>

      {filteredCars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          onPress={() => {
            setSelectedCar(car);
            setActiveTab("Car Detail");
          }}
        />
      ))}
    </ScrollView>
  );

  const renderCarDetail = () => (
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

  const renderSearch = () => (
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

  const renderAdd = () => (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <Text style={styles.sectionTitle}>Add new listing</Text>
      {[
        "Photo upload",
        "Car model",
        "Price",
        "Year",
        "Mileage",
        "Fuel type",
        "Description",
      ].map((label) => (
        <View key={label} style={styles.inputGroup}>
          <Text style={styles.inputLabel}>{label}</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder={`Enter ${label.toLowerCase()}`}
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>
      ))}
      <Pressable style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Submit listing</Text>
      </Pressable>
    </ScrollView>
  );

  const renderFavorites = () => (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <Text style={styles.sectionTitle}>Saved cars</Text>
      <Text style={styles.bodyText}>
        Tap any car on Home to add it to favorites.
      </Text>
      <CarCard car={selectedCar} onPress={() => setActiveTab("Car Detail")} />
    </ScrollView>
  );

  const renderProfile = () => (
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

  const content = {
    Home: renderHome,
    Search: renderSearch,
    Add: renderAdd,
    Favorites: renderFavorites,
    Profile: renderProfile,
    "Car Detail": renderCarDetail,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      {content[activeTab] ? content[activeTab]() : renderHome()}
      <BottomNav tabs={tabs} activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
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
  detailHeader: {
    marginBottom: layout.spacing,
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
  bodyText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body.size,
    lineHeight: 22,
  },
  caption: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.size,
  },
});
