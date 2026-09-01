const API_URL = "http://localhost:3000/dashboard";

export async function getDashboardData() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to load dashboard data");
  }

  return response.json();
}
