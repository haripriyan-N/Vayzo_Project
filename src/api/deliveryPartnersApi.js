import { apiRequest } from "./apiClient";

export async function getDeliveryPartners() {
  return apiRequest("/deliveryPartners", {}, "Unable to load delivery partners");
}

export async function getDeliveryPartnerById(partnerId) {
  const data = await apiRequest(`/deliveryPartners?partnerId=${partnerId}`, {}, "Unable to load delivery partner");

  if (!data || !data.length) {
    throw new Error("Delivery partner not found");
  }

  return data[0];
}

export async function createDeliveryPartner(partnerData) {
  return apiRequest("/deliveryPartners", {
    method: "POST",
    body: JSON.stringify(partnerData),
  }, "Unable to create delivery partner");
}

export async function updateDeliveryPartner(id, partnerData) {
  return apiRequest(`/deliveryPartners/${id}`, {
    method: "PUT",
    body: JSON.stringify(partnerData),
  }, "Unable to update delivery partner");
}

export async function deleteDeliveryPartner(id) {
  await apiRequest(`/deliveryPartners/${id}`, {
    method: "DELETE",
  }, "Unable to delete delivery partner");
  
  return true;
}

export async function getDeliveryPartnerLocation(partnerId) {
  // Simulating an endpoint that returns location data specifically.
  // In the future this can be updated to fetch from a dedicated backend endpoint
  // like GET /api/delivery-partners/:partnerId/location
  const data = await apiRequest(`/deliveryPartners?partnerId=${partnerId}`, {}, "Unable to load delivery partner location");

  if (!data || !data.length) {
    throw new Error("Delivery partner not found");
  }

  const partner = data[0];
  return {
    success: true,
    data: {
      address: partner.address || "",
      latitude: partner.latitude || null,
      longitude: partner.longitude || null
    }
  };
}
