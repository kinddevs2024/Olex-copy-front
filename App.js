import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { theme } from "./src/theme";
import { fallbackCars, filterFields } from "./src/data";
import { fetchCars } from "./src/api/cars";
import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import AddScreen from "./src/screens/AddScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import CarDetailScreen from "./src/screens/CarDetailScreen";
import BottomNav from "./src/components/BottomNav";

const tabs = ["Home", "Search", "Add", "Favorites", "Profile"];

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedChip, setSelectedChip] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cars, setCars] = useState(fallbackCars);
  const [selectedCar, setSelectedCar] = useState(fallbackCars[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCars() {
      setIsLoading(true);
      setError("");

      try {
        const backendCars = await fetchCars();
        if (Array.isArray(backendCars) && backendCars.length > 0) {
          setCars(backendCars);
          setSelectedCar(backendCars[0]);
        }
      } catch (backendError) {
        console.warn("Failed to load backend cars", backendError);
        setError(
          "Unable to load listings from backend; using local demo data.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const matchesChip = selectedChip === "All" || car.category === selectedChip;
    const matchesQuery = car.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesChip && matchesQuery;
  });

  const renderScreen = () => {
    switch (activeTab) {
      case "Home":
        return (
          <HomeScreen
            filteredCars={filteredCars}
            selectedChip={selectedChip}
            onChipPress={setSelectedChip}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onCarSelect={(car) => {
              setSelectedCar(car);
              setActiveTab("Car Detail");
            }}
            isLoading={isLoading}
            error={error}
          />
        );
      case "Search":
        return <SearchScreen filterFields={filterFields} />;
      case "Add":
        return <AddScreen />;
      case "Favorites":
        return (
          <FavoritesScreen
            selectedCar={selectedCar}
            onViewDetail={() => setActiveTab("Car Detail")}
          />
        );
      case "Profile":
        return <ProfileScreen />;
      case "Car Detail":
        return <CarDetailScreen selectedCar={selectedCar} />;
      default:
        return (
          <HomeScreen
            filteredCars={filteredCars}
            selectedChip={selectedChip}
            onChipPress={setSelectedChip}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onCarSelect={(car) => {
              setSelectedCar(car);
              setActiveTab("Car Detail");
            }}
            isLoading={isLoading}
            error={error}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      {renderScreen()}
      <BottomNav tabs={tabs} activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
