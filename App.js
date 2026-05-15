import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { theme } from "./src/theme";
import { fallbackCars, filterFields } from "./src/data";
import {
  fetchCars,
  createCar,
  updateCar,
  deleteCar,
} from "./src/api/cars";
import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import AddScreen from "./src/screens/AddScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import CarDetailScreen from "./src/screens/CarDetailScreen";
import BottomNav from "./src/components/BottomNav";

const tabs = [
  { key: "Home", label: "Главная" },
  { key: "Search", label: "Каталог" },
  { key: "Add", label: "Подать" },
  { key: "Favorites", label: "Избранное" },
  { key: "Profile", label: "Профиль" },
];

const defaultFilters = {
  priceFrom: "",
  priceTo: "",
  yearFrom: "",
  yearTo: "",
  brand: "",
  model: "",
  mileage: "",
  fuel: "",
  transmission: "",
  region: "",
  onlyPhoto: false,
  currency: "all",
  promoted: "all",
};

function parseNumber(value) {
  const parsed = Number(String(value).replace(/[^\d]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function includesText(value, query) {
  return String(value || "").toLowerCase().includes(query.trim().toLowerCase());
}

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedChip, setSelectedChip] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [catalogFilters, setCatalogFilters] = useState(defaultFilters);
  const [sortMode, setSortMode] = useState("recommended");
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [isSavingListing, setIsSavingListing] = useState(false);
  const [listingMessage, setListingMessage] = useState("");
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
          "Не удалось загрузить объявления с backend; показываем локальные демо-данные.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const normalizedQuery = searchQuery.toLowerCase();
    const matchesChip =
      selectedChip === "Все" ||
      selectedChip === "Легковые автомобили" ||
      car.category === selectedChip ||
      car.bodyType === selectedChip;
    const matchesQuery = [
      car.title,
      car.brand,
      car.model,
      car.location,
      car.fuel,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
    const priceFrom = parseNumber(catalogFilters.priceFrom);
    const priceTo = parseNumber(catalogFilters.priceTo);
    const yearFrom = parseNumber(catalogFilters.yearFrom);
    const yearTo = parseNumber(catalogFilters.yearTo);
    const mileageTo = parseNumber(catalogFilters.mileage);
    const matchesPriceFrom = !priceFrom || car.priceValue >= priceFrom;
    const matchesPriceTo = !priceTo || car.priceValue <= priceTo;
    const matchesYearFrom = !yearFrom || car.year >= yearFrom;
    const matchesYearTo = !yearTo || car.year <= yearTo;
    const matchesMileage = !mileageTo || car.mileage <= mileageTo;
    const matchesBrand =
      !catalogFilters.brand || includesText(car.brand, catalogFilters.brand);
    const matchesModel =
      !catalogFilters.model || includesText(car.model, catalogFilters.model);
    const matchesFuel =
      !catalogFilters.fuel || includesText(car.fuel, catalogFilters.fuel);
    const matchesTransmission =
      !catalogFilters.transmission ||
      includesText(car.transmission, catalogFilters.transmission);
    const matchesRegion =
      !catalogFilters.region || includesText(car.location, catalogFilters.region);
    const matchesPhoto = !catalogFilters.onlyPhoto || Boolean(car.image);
    const matchesCurrency =
      catalogFilters.currency === "all" || car.currency === catalogFilters.currency;
    const matchesPromoted =
      catalogFilters.promoted === "all" ||
      car.promoted === catalogFilters.promoted;

    return (
      matchesChip &&
      matchesQuery &&
      matchesPriceFrom &&
      matchesPriceTo &&
      matchesYearFrom &&
      matchesYearTo &&
      matchesMileage &&
      matchesBrand &&
      matchesModel &&
      matchesFuel &&
      matchesTransmission &&
      matchesRegion &&
      matchesPhoto &&
      matchesCurrency &&
      matchesPromoted
    );
  });

  const sortedCars = [...filteredCars].sort((firstCar, secondCar) => {
    if (sortMode === "newest") {
      return Number(secondCar.id) - Number(firstCar.id);
    }

    if (sortMode === "priceAsc") {
      return firstCar.priceValue - secondCar.priceValue;
    }

    if (sortMode === "priceDesc") {
      return secondCar.priceValue - firstCar.priceValue;
    }

    const promotionRank = { VIP: 2, TOP: 1 };
    return (
      (promotionRank[secondCar.promoted] || 0) -
      (promotionRank[firstCar.promoted] || 0)
    );
  });

  const favoriteCars = cars.filter((car) => favoriteIds.includes(car.id));
  const ownCars = cars.filter((car) => car.isOwn);

  const updateFilter = (key, value) => {
    setCatalogFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setCatalogFilters(defaultFilters);
    setSearchQuery("");
    setSelectedChip("Все");
  };

  const toggleFavorite = (carId) => {
    setFavoriteIds((currentIds) =>
      currentIds.includes(carId)
        ? currentIds.filter((id) => id !== carId)
        : [...currentIds, carId],
    );
  };

  const openCarDetail = (car) => {
    setSelectedCar(car);
    setActiveTab("Car Detail");
  };

  const openAddScreen = () => {
    setEditingCar(null);
    setListingMessage("");
    setActiveTab("Add");
  };

  const openEditScreen = (car) => {
    setEditingCar(car);
    setListingMessage("");
    setActiveTab("Add");
  };

  const handleSaveListing = async (carData) => {
    setIsSavingListing(true);
    setListingMessage("");

    try {
      if (editingCar) {
        const updatedCar = await updateCar(editingCar.id, carData);
        setCars((currentCars) =>
          currentCars.map((car) =>
            car.id === updatedCar.id ? updatedCar : car,
          ),
        );
        setSelectedCar(updatedCar);
        setListingMessage("Объявление обновлено.");
        setEditingCar(null);
        setActiveTab("Profile");
        return;
      }

      const createdCar = await createCar(carData);
      setCars((currentCars) => [createdCar, ...currentCars]);
      setSelectedCar(createdCar);
      setListingMessage("Объявление опубликовано.");
      setActiveTab("Car Detail");
    } catch (saveError) {
      console.warn("Failed to save listing", saveError);

      if (editingCar) {
        const localUpdatedCar = { ...editingCar, ...carData, id: editingCar.id };
        setCars((currentCars) =>
          currentCars.map((car) =>
            car.id === localUpdatedCar.id ? localUpdatedCar : car,
          ),
        );
        setSelectedCar(localUpdatedCar);
        setListingMessage(
          "Backend недоступен, изменения сохранены локально до перезапуска.",
        );
        setEditingCar(null);
        setActiveTab("Profile");
        return;
      }

      const localCar = {
        ...carData,
        id: String(Date.now()),
        publishedAt: "Только что",
      };
      setCars((currentCars) => [localCar, ...currentCars]);
      setSelectedCar(localCar);
      setListingMessage(
        "Backend недоступен, объявление добавлено локально до перезапуска.",
      );
      setActiveTab("Car Detail");
    } finally {
      setIsSavingListing(false);
    }
  };

  const handleDeleteListing = async (carId) => {
    try {
      await deleteCar(carId);
    } catch (deleteError) {
      console.warn("Failed to delete listing from backend", deleteError);
    } finally {
      setCars((currentCars) => currentCars.filter((car) => car.id !== carId));
      setFavoriteIds((currentIds) => currentIds.filter((id) => id !== carId));
      if (selectedCar?.id === carId) {
        setSelectedCar(cars.find((car) => car.id !== carId) || fallbackCars[0]);
      }
    }
  };

  const handleTabPress = (tabKey) => {
    if (tabKey === "Add") {
      openAddScreen();
      return;
    }

    setActiveTab(tabKey);
  };

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
            onCarSelect={openCarDetail}
            onPostPress={openAddScreen}
            favoriteIds={favoriteIds}
            onFavoriteToggle={toggleFavorite}
            isLoading={isLoading}
            error={error}
          />
        );
      case "Search":
        return (
          <SearchScreen
            cars={sortedCars}
            filterFields={filterFields}
            filters={catalogFilters}
            sortMode={sortMode}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFilterChange={updateFilter}
            onResetFilters={resetFilters}
            onSortChange={setSortMode}
            onCarSelect={openCarDetail}
            favoriteIds={favoriteIds}
            onFavoriteToggle={toggleFavorite}
          />
        );
      case "Add":
        return (
          <AddScreen
            editingCar={editingCar}
            isSaving={isSavingListing}
            statusMessage={listingMessage}
            onSubmit={handleSaveListing}
            onCancelEdit={() => {
              setEditingCar(null);
              setActiveTab("Profile");
            }}
          />
        );
      case "Favorites":
        return (
          <FavoritesScreen
            favoriteCars={favoriteCars}
            onViewDetail={openCarDetail}
            favoriteIds={favoriteIds}
            onFavoriteToggle={toggleFavorite}
          />
        );
      case "Profile":
        return (
          <ProfileScreen
            ownCars={ownCars}
            favoriteCount={favoriteIds.length}
            onViewCar={openCarDetail}
            onEditCar={openEditScreen}
            onDeleteCar={handleDeleteListing}
          />
        );
      case "Car Detail":
        return (
          <CarDetailScreen
            selectedCar={selectedCar}
            isFavorite={favoriteIds.includes(selectedCar.id)}
            onFavoriteToggle={() => toggleFavorite(selectedCar.id)}
          />
        );
      default:
        return (
          <HomeScreen
            filteredCars={filteredCars}
            selectedChip={selectedChip}
            onChipPress={setSelectedChip}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onCarSelect={openCarDetail}
            onPostPress={openAddScreen}
            favoriteIds={favoriteIds}
            onFavoriteToggle={toggleFavorite}
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
      <BottomNav tabs={tabs} activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
