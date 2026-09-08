import { apiRequest } from "./apiClient";

export async function getOrders() {
  return apiRequest("/orders", {}, "Unable to load orders");
}

export async function getOrderById(orderId) {
  const data = await apiRequest(`/orders?orderId=${orderId}`, {}, "Unable to load order");

  if (!data || !data.length) {
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

  return apiRequest("/orders", {
    method: "POST",
    body: JSON.stringify(newOrder),
  }, "Unable to create order");
}

export async function deleteOrder(id) {
  return apiRequest(`/orders/${id}`, {
    method: 'DELETE',
  }, "Unable to delete order");
}

export async function updateOrder(id, orderData) {
  return apiRequest(`/orders/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(orderData),
  }, "Unable to update order");
}
