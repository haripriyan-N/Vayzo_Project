const API_URL = "http://localhost:3000/users";

export async function getUsers() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to load users");
  }

  return response.json();
}

export async function getUserById(userId) {
  const response = await fetch(`${API_URL}?userId=${userId}`);

  if (!response.ok) {
    throw new Error("Unable to load user");
  }

  const data = await response.json();

  if (!data.length) {
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
    status: "ACTIVE",
    isVerified: false,
    joinedOn: new Date().toISOString().split("T")[0],
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error("Unable to create user");
  }

  return response.json();
}