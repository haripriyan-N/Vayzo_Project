const API_URL = "http://localhost:3001/complaints";

export async function getComplaints() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to load complaints");
  }

  return response.json();
}

export async function getComplaintById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Unable to load complaint details");
  }

  return response.json();
}

export async function updateComplaint(id, complaintData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(complaintData),
  });

  if (!response.ok) {
    throw new Error("Unable to update complaint");
  }

  return response.json();
}

export async function deleteComplaint(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Unable to delete complaint");
  }

  return true;
}
