import { generalSettings, paymentSettings } from "../mock/vayzoApiMock";

const API_URL = "http://localhost:3000/settings";

export async function getGeneralSettings() {
  // Simulate delay
  await new Promise((res) => setTimeout(res, 500));
  
  try {
    const res = await fetch(`${API_URL}/general`);
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch general settings from mock server, falling back to static mock", error);
  }
  return generalSettings;
}

export async function saveGeneralSettings(settings) {
  await new Promise((res) => setTimeout(res, 500));
  return { success: true, message: "Settings saved successfully" };
}

export async function getPaymentSettings() {
  await new Promise((res) => setTimeout(res, 500));
  
  try {
    const res = await fetch(`${API_URL}/payment`);
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch payment settings from mock server, falling back to static mock", error);
  }
  return paymentSettings;
}

export async function savePaymentSettings(settings) {
  await new Promise((res) => setTimeout(res, 500));
  return { success: true, message: "Settings saved successfully" };
}

export async function getCommissionSettings() {
  await new Promise((res) => setTimeout(res, 500));
  
  try {
    const res = await fetch(`${API_URL}/commission`);
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch commission settings from mock server", error);
  }
  return [];
}

export async function saveCommissionSettings(settings) {
  await new Promise((res) => setTimeout(res, 500));
  return { success: true, message: "Settings saved successfully" };
}

export async function getDeliverySettings() {
  await new Promise((res) => setTimeout(res, 500));
  
  try {
    const res = await fetch(`${API_URL}/delivery`);
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch delivery settings from mock server", error);
  }
  return {};
}

export async function saveDeliverySettings(settings) {
  await new Promise((res) => setTimeout(res, 500));
  return { success: true, message: "Settings saved successfully" };
}

// --------------------------------------------------
// RESTORED SETTINGS PAGES
// --------------------------------------------------

export async function getEmailSettings() {
  await new Promise((res) => setTimeout(res, 500));
  try {
    const res = await fetch(`${API_URL}/email`);
    if (res.ok) return await res.json();
  } catch (error) {}
  return {};
}

export async function saveEmailSettings(settings) {
  await new Promise((res) => setTimeout(res, 500));
  return { success: true, message: "Settings saved successfully" };
}

export async function getSMSSettings() {
  await new Promise((res) => setTimeout(res, 500));
  try {
    const res = await fetch(`${API_URL}/sms`);
    if (res.ok) return await res.json();
  } catch (error) {}
  return {};
}

export async function saveSMSSettings(settings) {
  await new Promise((res) => setTimeout(res, 500));
  return { success: true, message: "Settings saved successfully" };
}

export async function getNotificationSettings() {
  await new Promise((res) => setTimeout(res, 500));
  try {
    const res = await fetch(`${API_URL}/notification`);
    if (res.ok) return await res.json();
  } catch (error) {}
  return {};
}

export async function saveNotificationSettings(settings) {
  await new Promise((res) => setTimeout(res, 500));
  return { success: true, message: "Settings saved successfully" };
}

export async function getSEOSettings() {
  await new Promise((res) => setTimeout(res, 500));
  try {
    const res = await fetch(`${API_URL}/seo`);
    if (res.ok) return await res.json();
  } catch (error) {}
  return {};
}

export async function saveSEOSettings(settings) {
  await new Promise((res) => setTimeout(res, 500));
  return { success: true, message: "Settings saved successfully" };
}

export async function getAppSettings() {
  await new Promise((res) => setTimeout(res, 500));
  try {
    const res = await fetch(`${API_URL}/app`);
    if (res.ok) return await res.json();
  } catch (error) {}
  return {};
}

export async function saveAppSettings(settings) {
  await new Promise((res) => setTimeout(res, 500));
  return { success: true, message: "Settings saved successfully" };
}

export async function getSecuritySettings() {
  await new Promise((res) => setTimeout(res, 500));
  try {
    const res = await fetch(`${API_URL}/security`);
    if (res.ok) return await res.json();
  } catch (error) {}
  return {};
}

export async function saveSecuritySettings(settings) {
  await new Promise((res) => setTimeout(res, 500));
  return { success: true, message: "Settings saved successfully" };
}

export async function getMaintenanceModeSettings() {
  await new Promise((res) => setTimeout(res, 500));
  try {
    const res = await fetch(`${API_URL}/maintenance`);
    if (res.ok) return await res.json();
  } catch (error) {}
  return {};
}

export async function saveMaintenanceModeSettings(settings) {
  await new Promise((res) => setTimeout(res, 500));
  return { success: true, message: "Settings saved successfully" };
}

export async function getIntegrationSettings() {
  await new Promise((res) => setTimeout(res, 500));
  try {
    const res = await fetch(`${API_URL}/integrations`);
    if (res.ok) return await res.json();
  } catch (error) {}
  return {};
}

export async function saveIntegrationSettings(settings) {
  await new Promise((res) => setTimeout(res, 500));
  return { success: true, message: "Settings saved successfully" };
}
