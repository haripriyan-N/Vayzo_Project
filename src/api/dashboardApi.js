import { apiRequest } from "./apiClient";

export async function getDashboardData() {
  return apiRequest("/dashboard", {}, "Unable to load dashboard data");
}
