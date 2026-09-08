import { API_BASE_URL } from "./config";

export async function apiRequest(endpoint, options = {}, customErrorMessage = "API request failed") {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(customErrorMessage);
  }

  // Some operations (like DELETE in json-server) return empty body.
  const text = await response.text();
  return text ? JSON.parse(text) : true;
}
