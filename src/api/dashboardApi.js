import { API_BASE_URL } from "./config";
const API_URL = `${API_BASE_URL}/dashboard`;

export async function getDashboardData() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to load dashboard data");
  }

  return response.json();
}
