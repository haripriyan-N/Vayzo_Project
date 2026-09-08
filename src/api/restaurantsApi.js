import { apiRequest } from "./apiClient";

export async function getRestaurants() {
  return apiRequest("/restaurants", {}, "Unable to load restaurants");
}

export async function getRestaurantById(id) {
  return apiRequest(`/restaurants/${id}`, {}, "Restaurant not found");
}

export async function createRestaurant(data) {
  return apiRequest("/restaurants", {
    method: "POST",
    body: JSON.stringify(data),
  }, "Unable to create restaurant");
}

export async function updateRestaurant(id, data) {
  return apiRequest(`/restaurants/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }, "Unable to update restaurant");
}

export async function deleteRestaurant(id) {
  await apiRequest(`/restaurants/${id}`, { method: "DELETE" }, "Unable to delete restaurant");
  return true;
}
