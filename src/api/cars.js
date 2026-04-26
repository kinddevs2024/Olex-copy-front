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
