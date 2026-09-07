const API_URL = "http://localhost:3000/locations";

export async function getLocations() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to load locations");
  }

  return response.json();
}

export async function getLocationById(id) {
  const response = await fetch(`${API_URL}?id=${id}`);

  if (!response.ok) {
    throw new Error("Unable to load location");
  }

  const data = await response.json();

  if (!data.length) {
    throw new Error("Location not found");
  }

  return data[0];
}

export async function createLocation(locationData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(locationData),
  });

  if (!response.ok) {
    throw new Error("Unable to create location");
  }

  return response.json();
}

export async function updateLocation(id, updateData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    throw new Error("Unable to update location");
  }

  return response.json();
}

export async function deleteLocation(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Unable to delete location");
  }

  return response.json();
}

