import { API_BASE_URL } from "./config";

const pendingRequests = new Map();

export async function apiRequest(endpoint, options = {}, customErrorMessage = "API request failed") {
  const url = `${API_BASE_URL}${endpoint}`;
  const method = options.method || "GET";

  if (method === "GET") {
    const key = url;
    if (pendingRequests.has(key)) {
      return pendingRequests.get(key);
    }
  }

  const requestPromise = (async () => {
    try {
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

      const text = await response.text();
      return text ? JSON.parse(text) : true;
    } finally {
      if (method === "GET") {
        pendingRequests.delete(url);
      }
    }
  })();

  if (method === "GET") {
    pendingRequests.set(url, requestPromise);
  }

  return requestPromise;
}
