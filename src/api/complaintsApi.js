import { apiRequest } from "./apiClient";

export async function getComplaints() {
  return apiRequest("/complaints", {}, "Unable to load complaints");
}

export async function getComplaintById(id) {
  return apiRequest(`/complaints/${id}`, {}, "Unable to load complaint details");
}

export async function updateComplaint(id, complaintData) {
  return apiRequest(`/complaints/${id}`, {
    method: "PUT",
    body: JSON.stringify(complaintData),
  }, "Unable to update complaint");
}

export async function deleteComplaint(id) {
  await apiRequest(`/complaints/${id}`, {
    method: "DELETE",
  }, "Unable to delete complaint");
  return true;
}
