import { mockAdmin, mockAdminCredentials } from "../mock/vayzoApiMock";
import { apiRequest } from "./apiClient";

export async function login(email, password) {
  // Try to find user in API
  try {
    const users = await apiRequest(`/users?email=${email}`);
    if (users && users.length > 0) {
      const user = users[0];
      // Note: for this mock, we accept the mock password or the saved password
      if (
        user.password === password ||
        (password === mockAdminCredentials.password && email === mockAdminCredentials.email)
      ) {
        return { success: true, user };
      }
    }
  } catch (err) {
    console.error("Login fetch error:", err);
  }

  // Fallback to mock credentials if API fails or user not found, 
  // but we prefer the API so that profile edits persist across logins.
  if (
    email === mockAdminCredentials.email &&
    password === mockAdminCredentials.password
  ) {
    // If they used the mock credentials but the user isn't in db.json with this email,
    // we fetch the primary admin by ID to ensure persistence works for the default admin.
    try {
      const defaultAdmin = await apiRequest(`/users/${mockAdmin.id}`);
      if (defaultAdmin) {
        return { success: true, user: defaultAdmin };
      }
    } catch (e) {
      // Ignore
    }
    return { success: true, user: mockAdmin };
  }

  throw new Error("Invalid email or password");
}

export async function requestLoginOtp(contact) {
  if (!contact) {
    throw new Error("Contact is required");
  }

  const mockOtp = "123456"; // Predictable test OTP

  // Clean up any existing OTP for this contact
  const existing = await apiRequest(`/otpSessions?contact=${contact}`);
  const sessions = Array.isArray(existing) ? existing : [];
  for (const session of sessions) {
    await apiRequest(`/otpSessions/${session.id}`, { method: "DELETE" });
  }

  // Create new OTP session in json-server
  await apiRequest("/otpSessions", {
    method: "POST",
    body: JSON.stringify({ contact, otp: mockOtp, createdAt: Date.now() }),
  }, "Failed to send OTP");

  return { success: true, message: "OTP sent successfully" };
}

export async function verifyLoginOtp(contact, otp) {
  const data = await apiRequest(`/otpSessions?contact=${contact}&otp=${otp}`);
  const sessions = Array.isArray(data) ? data : [];

  if (sessions.length > 0) {
    // Delete the verified session
    await apiRequest(`/otpSessions/${sessions[0].id}`, { method: "DELETE" });
    
    // Try to find the user by contact
    try {
      // First try email
      let users = await apiRequest(`/users?email=${contact}`);
      if (!users || users.length === 0) {
        // Then try mobile
        users = await apiRequest(`/users?mobileNumber=${contact}`);
      }
      
      if (users && users.length > 0) {
        return { success: true, user: users[0], message: "OTP verified" };
      }
      
      // Fallback to default admin ID
      const defaultAdmin = await apiRequest(`/users/${mockAdmin.id}`);
      if (defaultAdmin) {
        return { success: true, user: defaultAdmin, message: "OTP verified" };
      }
    } catch (err) {
      console.error("OTP user fetch error:", err);
    }
    
    return { success: true, user: mockAdmin, message: "OTP verified" };
  }

  throw new Error("Invalid OTP");
}

export async function resetPassword(contact, newPassword) {
  await new Promise((res) => setTimeout(res, 500));
  // In a real app this updates the user DB
  return { success: true, message: "Password reset successfully" };
}

export async function requestPasswordReset(email) {
  // Simulate delay
  await new Promise((res) => setTimeout(res, 500));

  if (email !== mockAdminCredentials.email) {
    throw new Error("Admin email not found");
  }

  // In a real app this would send an email with a reset token
  return { success: true, message: "Reset link sent successfully" };
}
