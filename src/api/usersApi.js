import { apiRequest } from "./apiClient";

export async function getUsers() {
  return apiRequest("/users", {}, "Unable to load users");
}

export async function getUserById(userId) {
  const data = await apiRequest(`/users?userId=${userId}`, {}, "Unable to load user");

  if (!data || !data.length) {
    throw new Error("User not found");
  }

  return data[0];
}

export async function createUser(userData) {
  const newUser = {
    userId: `USR${Date.now()}`,
    name: userData.name,
    email: userData.email,
    mobileNumber: userData.mobileNumber,
    userType: userData.userType,
    role: userData.role,
    password: userData.password,
    status: "ACTIVE",
    isVerified: false,
    joinedOn: new Date().toISOString().split("T")[0],
  };

  return apiRequest("/users", {
    method: "POST",
    body: JSON.stringify(newUser),
  }, "Unable to create user");
}

export async function updateUser(id, userData) {
  return apiRequest(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
  }, "Unable to update user");
}

export async function deleteUser(id) {
  return apiRequest(`/users/${id}`, {
    method: "DELETE",
  }, "Unable to delete user");
}
