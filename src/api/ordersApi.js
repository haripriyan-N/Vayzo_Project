const API_URL = "http://localhost:3001/orders";

export async function getOrders() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to load orders");
  }

  return response.json();
}

export async function getOrderById(orderId) {
  const response = await fetch(`${API_URL}?orderId=${orderId}`);

  if (!response.ok) {
    throw new Error("Unable to load order");
  }

  const data = await response.json();

  if (!data.length) {
    throw new Error("Order not found");
  }

  return data[0];
}

export async function createOrder(orderData) {
  const newOrder = {
    ...orderData,
    orderId: `ORD${Date.now()}`,
    orderDate: new Date().toISOString(),
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder),
  });

  if (!response.ok) {
    throw new Error("Unable to create order");
  }

  return response.json();
}
