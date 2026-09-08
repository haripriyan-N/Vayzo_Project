import { API_BASE_URL } from "./config";

const API_URL = `${API_BASE_URL}/users`;

export async function getAdminUsers(filters = {}) {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Unable to load admin users");
  }

  let data = await response.json();

  // Filter for only admin roles
  data = data.filter(user => user.role === "Admin" || user.role === "Super Admin" || user.role === "Manager");

  if (filters.role && filters.role !== "All Roles") {
    data = data.filter(user => user.role === filters.role);
  }

  if (filters.status && filters.status !== "All Status") {
    data = data.filter(user => 
      user.status === filters.status || 
      user.status === filters.status.toUpperCase() ||
      user.status?.toLowerCase() === filters.status.toLowerCase()
    );
  }

  if (filters.searchQuery) {
    const q = filters.searchQuery.toLowerCase();
    data = data.filter(user => 
      user.name?.toLowerCase().includes(q) || 
      user.email?.toLowerCase().includes(q) ||
      user.mobileNumber?.includes(q)
    );
  }

  return data;
}

export async function getAdminUserById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to load admin user details");
  }
  return await response.json();
}

export async function createAdminUser(userData) {
  // Business Logic Validation
  const allAdmins = await getAdminUsers();
  
  if (allAdmins.length >= 2) {
    throw new Error("Maximum admin user limit reached. Only one Super Admin and one Admin are allowed.");
  }

  const hasSuperAdmin = allAdmins.some(a => a.role === "Super Admin");
  const hasAdmin = allAdmins.some(a => a.role === "Admin");

  if (userData.role === "Super Admin" && hasSuperAdmin) {
    throw new Error("Only one Super Admin user is allowed.");
  }

  if (userData.role === "Admin" && hasAdmin) {
    throw new Error("Only one Admin user is allowed.");
  }

  if (userData.role !== "Admin" && userData.role !== "Super Admin") {
    throw new Error("Invalid role for Admin Users.");
  }

  // Assign auto-generated ID since it's mock API
  const newUser = {
    ...userData,
    id: `ADM${Date.now()}`,
    userId: `ADM${Date.now()}`,
    lastLogin: "-",
    joinedDate: new Date().toISOString().split('T')[0]
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error("Failed to create admin user");
  }
  return await response.json();
}

export async function updateAdminUser(id, userData) {
  const existingUser = await getAdminUserById(id);
  
  if (existingUser.role === "Super Admin" && userData.role !== "Super Admin") {
    throw new Error("Super Admin role cannot be changed.");
  }
  
  if (existingUser.role === "Admin" && userData.role === "Super Admin") {
    throw new Error("Cannot change Admin to Super Admin.");
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...existingUser, ...userData }),
  });

  if (!response.ok) {
    throw new Error("Failed to update admin user");
  }
  return await response.json();
}

export async function deleteAdminUser(id) {
  const existingUser = await getAdminUserById(id);
  
  if (existingUser.role === "Super Admin") {
    throw new Error("Super Admin cannot be deleted.");
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete admin user");
  }
  return true;
}

