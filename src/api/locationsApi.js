import { apiRequest } from "./apiClient";

export async function getLocations() {
  return apiRequest("/locations", {}, "Unable to load locations");
}

export async function getLocationById(id) {
  const data = await apiRequest(`/locations?id=${id}`, {}, "Unable to load location");

  if (!data || !data.length) {
    throw new Error("Location not found");
  }

  return data[0];
}

export async function createLocation(locationData) {
  return apiRequest("/locations", {
    method: "POST",
    body: JSON.stringify(locationData),
  }, "Unable to create location");
}

export async function updateLocation(id, updateData) {
  return apiRequest(`/locations/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updateData),
  }, "Unable to update location");
}

export async function deleteLocation(id) {
  return apiRequest(`/locations/${id}`, {
    method: "DELETE",
  }, "Unable to delete location");
}
