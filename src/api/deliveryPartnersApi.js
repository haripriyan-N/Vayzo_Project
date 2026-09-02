const API_URL = "http://localhost:3001/deliveryPartners";

export async function getDeliveryPartners() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to load delivery partners");
  }

  return response.json();
}

export async function getDeliveryPartnerById(partnerId) {
  const response = await fetch(`${API_URL}?partnerId=${partnerId}`);

  if (!response.ok) {
    throw new Error("Unable to load delivery partner");
  }

  const data = await response.json();

  if (!data.length) {
    throw new Error("Delivery partner not found");
  }

  return data[0];
}

export async function createDeliveryPartner(partnerData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(partnerData),
  });

  if (!response.ok) {
    throw new Error("Unable to create delivery partner");
  }

  return response.json();
}

export async function updateDeliveryPartner(id, partnerData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(partnerData),
  });

  if (!response.ok) {
    throw new Error("Unable to update delivery partner");
  }

  return response.json();
}

export async function deleteDeliveryPartner(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Unable to delete delivery partner");
  }
  
  return true;
}
