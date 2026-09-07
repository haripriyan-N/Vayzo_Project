import { apiRequest } from "./apiClient";

export async function getEarnings() {
  const data = await apiRequest("/earnings", {}, "Unable to load earnings data");

  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }
  
  return null;
}

export async function deleteEarning(id) {
  return apiRequest(`/earnings/${id}`, {
    method: 'DELETE',
  }, "Unable to delete earning");
}
