const API_URL = "http://localhost:3001/offers";

export async function getOffers() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to load offers");
  }

  return response.json();
}

export async function getOfferById(offerId) {
  const response = await fetch(`${API_URL}?offerId=${offerId}`);

  if (!response.ok) {
    throw new Error("Unable to load offer");
  }

  const data = await response.json();

  if (!data.length) {
    throw new Error("Offer not found");
  }

  return data[0];
}

export async function createOffer(offerData) {
  const newOffer = {
    ...offerData,
    offerId: `OFF${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOffer),
  });

  if (!response.ok) {
    throw new Error("Unable to create offer");
  }

  return response.json();
}

export async function updateOffer(id, updateData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    throw new Error("Unable to update offer");
  }

  return response.json();
}

export async function deleteOffer(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Unable to delete offer");
  }

  return response.json();
}
