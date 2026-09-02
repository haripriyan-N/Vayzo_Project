import { mockAdmin, mockAdminCredentials } from "../mock/vayzoApiMock";

const API_URL = "http://localhost:3001/otpSessions";

export async function login(email, password) {
  // Simulate delay
  await new Promise(res => setTimeout(res, 500));
  if (email === mockAdminCredentials.email && password === mockAdminCredentials.password) {
    return {
      success: true,
      user: mockAdmin,
    };
  }
  throw new Error("Invalid email or password");
}

export async function requestLoginOtp(contact) {
  if (!contact) {
    throw new Error("Contact is required");
  }
  
  const mockOtp = "123456"; // Predictable test OTP
  
  // Clean up any existing OTP for this contact
  const res = await fetch(`${API_URL}?contact=${contact}`);
  const existing = await res.json();
  for (const session of existing) {
    await fetch(`${API_URL}/${session.id}`, { method: "DELETE" });
  }

  // Create new OTP session in json-server
  const createRes = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contact, otp: mockOtp, createdAt: Date.now() })
  });

  if (!createRes.ok) throw new Error("Failed to send OTP");

  return { success: true, message: "OTP sent successfully" };
}

export async function verifyLoginOtp(contact, otp) {
  const res = await fetch(`${API_URL}?contact=${contact}&otp=${otp}`);
  const sessions = await res.json();

  if (sessions.length > 0) {
    // Delete the verified session
    await fetch(`${API_URL}/${sessions[0].id}`, { method: "DELETE" });
    return { success: true, user: mockAdmin, message: "OTP verified" };
  }
  
  throw new Error("Invalid OTP");
}

export async function resetPassword(contact, newPassword) {
  await new Promise(res => setTimeout(res, 500));
  // In a real app this updates the user DB
  return { success: true, message: "Password reset successfully" };
}

export async function requestPasswordReset(email) {
  // Simulate delay
  await new Promise(res => setTimeout(res, 500));
  
  if (email !== mockAdminCredentials.email) {
    throw new Error("Admin email not found");
  }

  // In a real app this would send an email with a reset token
  return { success: true, message: "Reset link sent successfully" };
}
