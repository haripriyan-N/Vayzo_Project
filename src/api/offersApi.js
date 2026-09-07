import { apiRequest } from "./apiClient";

export async function getOffers() {
  return apiRequest("/offers", {}, "Unable to load offers");
}

export async function getOfferById(offerId) {
  const data = await apiRequest(`/offers?offerId=${offerId}`, {}, "Unable to load offer");

  if (!data || !data.length) {
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

  return apiRequest("/offers", {
    method: "POST",
    body: JSON.stringify(newOffer),
  }, "Unable to create offer");
}

export async function updateOffer(id, updateData) {
  return apiRequest(`/offers/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updateData),
  }, "Unable to update offer");
}

export async function deleteOffer(id) {
  return apiRequest(`/offers/${id}`, {
    method: "DELETE",
  }, "Unable to delete offer");
}
