import { apiRequest } from "./apiClient";

export async function getCategories() {
  return apiRequest("/categories", {}, "Failed to fetch categories");
}

export async function getCategoryById(id) {
  return apiRequest(`/categories/${id}`, {}, "Failed to fetch category");
}

export async function getCategoriesByParentId(parentId) {
  return apiRequest(`/categories?parentId=${parentId}`, {}, "Failed to fetch child categories");
}

export async function createCategory(categoryData) {
  return apiRequest("/categories", {
    method: "POST",
    body: JSON.stringify(categoryData),
  }, "Failed to create category");
}

export async function updateCategory(id, categoryData) {
  return apiRequest(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(categoryData),
  }, "Failed to update category");
}

export async function deleteCategory(id) {
  return apiRequest(`/categories/${id}`, {
    method: "DELETE",
  }, "Failed to delete category");
}
