const API_URL = "http://localhost:3001/earnings";

export async function getEarnings() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to load earnings data");
  }

  const data = await response.json();
  
  // Return the first earnings config object
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }
  
  return null;
}
