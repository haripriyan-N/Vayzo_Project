const API_URL = "http://localhost:3000/restaurants";

export async function getRestaurants() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Unable to load restaurants");
  return response.json();
}

export async function getRestaurantById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Restaurant not found");
  return response.json();
}

export async function createRestaurant(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Unable to create restaurant");
  return response.json();
}

export async function updateRestaurant(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Unable to update restaurant");
  return response.json();
}

export async function deleteRestaurant(id) {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Unable to delete restaurant");
  return true;
}
