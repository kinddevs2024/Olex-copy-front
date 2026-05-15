import { Platform } from "react-native";

const BACKEND_URL =
  Platform.OS === "android" ? "http://10.0.2.2:4000" : "http://localhost:4000";

export async function fetchCars() {
  const response = await fetch(`${BACKEND_URL}/api/cars`);

  if (!response.ok) {
    throw new Error(`Backend request failed with status ${response.status}`);
  }

  return response.json();
}

export async function createCar(carData) {
  const response = await fetch(`${BACKEND_URL}/api/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  });

  if (!response.ok) {
    throw new Error(`Create car failed with status ${response.status}`);
  }

  return response.json();
}

export async function updateCar(id, carData) {
  const response = await fetch(`${BACKEND_URL}/api/cars/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  });

  if (!response.ok) {
    throw new Error(`Update car failed with status ${response.status}`);
  }

  return response.json();
}

export async function deleteCar(id) {
  const response = await fetch(`${BACKEND_URL}/api/cars/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Delete car failed with status ${response.status}`);
  }
}
