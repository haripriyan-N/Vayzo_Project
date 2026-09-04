const API_URL = "http://localhost:3000/categories";

export async function getCategories() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getCategoryById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch category");
  const data = await res.json();
  return data;
}

export async function getCategoriesByParentId(parentId) {
  const res = await fetch(`${API_URL}?parentId=${parentId}`);
  if (!res.ok) throw new Error("Failed to fetch child categories");
  return res.json();
}

export async function createCategory(categoryData) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });
  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}

export async function updateCategory(id, categoryData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });
  if (!res.ok) throw new Error("Failed to update category");
  return res.json();
}

export async function deleteCategory(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete category");
  return res.json();
}
