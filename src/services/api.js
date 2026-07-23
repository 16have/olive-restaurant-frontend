const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Generic fetch wrapper. Handles JSON parsing and error handling
 * consistently across every API call in the app.
 */
async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.detail || data?.error || "Something went wrong.";
    throw new Error(message);
  }

  return data;
}

// ---------- Menu ----------

export function getCategories() {
  return request("/categories/");
}

export function getFoodItems() {
  return request("/food-items/");
}

// ---------- Orders ----------

export function createOrder(orderData) {
  return request("/orders/", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
}

export function getOrder(id) {
  return request(`/orders/${id}/`);
}