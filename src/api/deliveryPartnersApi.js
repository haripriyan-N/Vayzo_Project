import { apiRequest } from "./apiClient";

const ENDPOINT = "/api/v1/admin/partners";

export async function getDeliveryPartners(filters = {}) {
  // Querying against the new normalized /partners collection
  let url = ENDPOINT;
  
  const queryParams = [];
  if (filters.accountStatus) {
    queryParams.push(`accountStatus=${filters.accountStatus}`);
  }
  if (filters.verificationStatus) {
    queryParams.push(`verificationStatus=${filters.verificationStatus}`);
  }
  if (filters.availabilityStatus) {
    queryParams.push(`availabilityStatus=${filters.availabilityStatus}`);
  }
  
  if (queryParams.length > 0) {
    url += `?${queryParams.join("&")}`;
  }
  
  let data = await apiRequest(url, {}, "Unable to load delivery partners");
  
  if (filters.partnerTypes) {
    // Deterministic local filtering for array containment
    data = data.filter(partner => 
      partner.partnerTypes && partner.partnerTypes.includes(filters.partnerTypes)
    );
  }
  
  return data;
}

export async function getDeliveryPartnerById(partnerId) {
  // Try matching by partnerId or json-server's id
  let data = await apiRequest(`${ENDPOINT}?partnerId=${partnerId}`, {}, "Unable to load delivery partner");
  
  if (!data || !data.length) {
    data = await apiRequest(`${ENDPOINT}?id=${partnerId}`, {}, "Unable to load delivery partner");
  }

  if (!data || !data.length) {
    throw new Error("Delivery partner not found");
  }

  const partner = data[0];

  // Fetch associated models
  try {
    // For these sub-resources, we should probably map them too if they existed, but
    // since we only listed the primary endpoints, let's map them to the same admin structure
    const documents = await apiRequest(`/api/v1/admin/partner-documents?partnerId=${partner.partnerId}`);
    const vehicles = await apiRequest(`/api/v1/admin/partner-vehicles?partnerId=${partner.partnerId}`);
    const banks = await apiRequest(`/api/v1/admin/partner-bank-accounts?partnerId=${partner.partnerId}`);
    
    partner.documents = documents || [];
    partner.vehicles = vehicles || [];
    partner.bank_accounts = banks || [];
  } catch (err) {
    console.error("Failed to load associated partner data", err);
  }

  return partner;
}

export async function createDeliveryPartner(partnerData) {
  console.warn("MISSING REQUIREMENT: Backend generation of business partnerId is unavailable. Falling back to json-server internal id.");
  const newPartner = {
    ...partnerData
  };

  return apiRequest(ENDPOINT, {
    method: "POST",
    body: JSON.stringify(newPartner),
  }, "Unable to create delivery partner");
}

export async function updateDeliveryPartner(id, partnerData) {
  // Safe update: fetch existing first or use PATCH if supported.
  // json-server supports PATCH for partial updates safely.
  return apiRequest(`${ENDPOINT}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(partnerData),
  }, "Unable to update delivery partner");
}

export async function deleteDeliveryPartner(id) {
  await apiRequest(`${ENDPOINT}/${id}`, {
    method: "DELETE",
  }, "Unable to delete delivery partner");
  
  return true;
}
