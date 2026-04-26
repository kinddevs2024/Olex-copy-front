export const fallbackCars = [
  {
    id: "1",
    title: "No-name GT 2025",
    price: "$189,000",
    category: "Sport",
    description:
      "An iconic premium sport car with a minimal, luxurious finish.",
    specs: [
      { label: "Engine", value: "V8 Twin Turbo" },
      { label: "Year", value: "2025" },
      { label: "Mileage", value: "4,200 km" },
      { label: "Fuel", value: "Petrol" },
      { label: "Transmission", value: "Automatic" },
    ],
  },
  {
    id: "2",
    title: "No-name Electric XC",
    price: "$129,000",
    category: "Electric",
    description: "A refined electric flagship with premium luxury features.",
    specs: [
      { label: "Range", value: "510 km" },
      { label: "Year", value: "2024" },
      { label: "Mileage", value: "1,800 km" },
      { label: "Fuel", value: "Electric" },
      { label: "Transmission", value: "Automatic" },
    ],
  },
];

export const filterFields = [
  { key: "brand", label: "Brand", placeholder: "Enter brand" },
  { key: "model", label: "Model", placeholder: "Enter model" },
  { key: "price", label: "Price range", placeholder: "Enter price range" },
  { key: "year", label: "Year", placeholder: "Enter year" },
  { key: "mileage", label: "Mileage", placeholder: "Enter mileage" },
  { key: "fuel", label: "Fuel", placeholder: "Enter fuel type" },
];
