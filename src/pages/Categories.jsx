import { useState } from "react";
import { Edit2, Eye, MoreVertical, Plus, Search, Trash2, X } from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { categories, categoryStats } from "../mock/vayzoApiMock";

const ITEMS_PER_PAGE = 5;

function Categories() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newItemName, setNewItemName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    description: "",
    status: "Active",
  });

  const [localCategories, setLocalCategories] = useState(categories);

  const handleSearch = (value) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  // Filter categories
  const filtered = localCategories.filter(
    (cat) =>
      (cat.name.toLowerCase().includes(query.toLowerCase()) ||
        cat.description.toLowerCase().includes(query.toLowerCase())) &&
      (status === "All Status" || cat.status === status)
  );

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handleAddCategory = () => {
    const newCategory = {
      categoryId: `CAT${Date.now()}`,
      name: formData.name,
      icon: formData.icon,
      description: formData.description,
      status: formData.status,
      items: 0,
      order: localCategories.length + 1,
      createdAt: new Date().toLocaleString(),
      itemsList: [],
    };
    setLocalCategories([newCategory, ...localCategories]);
    setFormData({ name: "", icon: "", description: "", status: "Active" });
    setShowAddModal(false);
  };

  const handleEditCategory = () => {
    setLocalCategories(
      localCategories.map((cat) =>
        cat.categoryId === selectedCategory.categoryId
          ? { ...cat, ...formData }
          : cat
      )
    );
    setShowEditModal(false);
  };

  const handleDeleteCategory = () => {
    setLocalCategories(
      localCategories.filter((cat) => cat.categoryId !== selectedCategory.categoryId)
    );
    setShowMoreMenu(null);
  };

  const handleAddItemToCategory = () => {
    if (newItemName.trim()) {
      setLocalCategories(
        localCategories.map((cat) =>
          cat.categoryId === selectedCategory.categoryId
            ? {
                ...cat,
                items: cat.items + 1,
                itemsList: [...(cat.itemsList || []), newItemName],
              }
            : cat
        )
      );
      setNewItemName("");
      setSelectedCategory((prev) => ({
        ...prev,
        items: prev.items + 1,
        itemsList: [...(prev.itemsList || []), newItemName],
      }));
    }
  };

  const openViewModal = (cat) => {
    setSelectedCategory(cat);
    setShowViewModal(true);
  };

  const openEditModal = (cat) => {
    setSelectedCategory(cat);
    setFormData({
      name: cat.name,
      icon: cat.icon,
      description: cat.description,
      status: cat.status,
    });
    setShowEditModal(true);
    setShowMoreMenu(null);
  };

  const badgeVariant = { Active: "success", Inactive: "warning" };
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <p className="text-xs text-muted">Dashboard &gt; Categories</p>
            <h1 className="mt-1 text-2xl font-semibold text-foreground">
              Categories
            </h1>
          </div>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {categoryStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-surface p-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">{stat.label}</span>
              </div>
              <div className="mt-2 flex items-end justify-between">
                <b className="text-xl text-foreground">{stat.value}</b>
                <span className="text-[10px] text-emerald-600">↑ {stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="category-search"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search category by name..."
                className="h-11 w-full rounded-lg border border-border bg-white pl-9 pr-3 text-sm text-foreground outline-none transition focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <select
                  id="category-status"
                  value={status}
                  onChange={(e) => handleStatusFilter(e.target.value)}
                  className="h-11 min-w-[150px] appearance-none rounded-lg border border-border bg-white px-3 pr-9 text-sm text-foreground outline-none transition focus:border-primary"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted">⌄</span>
              </div>

              <div className="relative">
                <select
                  id="category-parent"
                  defaultValue="All Parent Categories"
                  className="h-11 min-w-[180px] appearance-none rounded-lg border border-border bg-white px-3 pr-9 text-sm text-foreground outline-none transition focus:border-primary"
                >
                  <option>All Parent Categories</option>
                  <option>Food</option>
                  <option>Grocery</option>
                  <option>Pharmacy</option>
                  <option>Retail</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted">⌄</span>
              </div>

              <button
                type="button"
                className="flex h-11 items-center justify-center rounded-lg border border-border bg-white px-4 text-sm font-medium text-foreground transition hover:bg-background"
              >
                <span className="mr-2">⏷</span>
                Filter
              </button>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="flex h-11 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white transition hover:opacity-90"
              >
                + Add Category
              </button>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <colgroup>
                <col className="w-[12%]" />
                <col className="w-[16%]" />
                <col className="w-[16%]" />
                <col className="w-[10%]" />
                <col className="w-[8%]" />
                <col className="w-[10%]" />
                <col className="w-[14%]" />
                <col className="w-[14%]" />
              </colgroup>
              <thead className="bg-primary-light">
                <tr>
                  {[
                    "Icon",
                    "Category Name",
                    "Description",
                    "Status",
                    "Items",
                    "Order",
                    "Created At",
                    "Actions",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-2 py-3 font-semibold text-foreground"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((cat) => (
                  <tr
                    key={cat.categoryId}
                    className="border-t border-border hover:bg-primary-light/40"
                  >
                    <td className="px-2 py-3 text-center text-lg">{cat.icon}</td>
                    <td className="truncate px-2 py-3 font-medium text-foreground">
                      {cat.name}
                    </td>
                    <td className="truncate px-2 py-3 text-[10px] text-muted">
                      {cat.description}
                    </td>
                    <td className="px-2 py-3">
                      <Badge
                        variant={badgeVariant[cat.status]}
                        className="h-5 text-[9px]"
                      >
                        {cat.status}
                      </Badge>
                    </td>
                    <td className="px-2 py-3 text-muted">{cat.items}</td>
                    <td className="px-2 py-3 text-muted">{cat.order}</td>
                    <td className="px-2 py-3 text-[10px] text-muted">
                      {cat.createdAt}
                    </td>
                    <td className="px-2 py-3">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => openViewModal(cat)}
                          className="flex h-7 w-7 items-center justify-center rounded border border-border text-primary hover:bg-primary-light"
                          aria-label="View items"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditModal(cat)}
                          className="flex h-7 w-7 items-center justify-center rounded border border-border text-primary hover:bg-primary-light"
                          aria-label="Edit category"
                        >
                          <Edit2 size={14} />
                        </button>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setShowMoreMenu(
                                showMoreMenu === cat.categoryId
                                  ? null
                                  : cat.categoryId
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center rounded border border-border text-muted hover:bg-primary-light"
                            aria-label="More options"
                          >
                            <MoreVertical size={14} />
                          </button>
                          {showMoreMenu === cat.categoryId && (
                            <div className="absolute right-0 top-8 z-20 rounded border border-border bg-surface shadow-lg">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedCategory(cat);
                                  handleDeleteCategory();
                                }}
                                className="block w-full px-3 py-2 text-left text-xs text-danger hover:bg-background"
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedCategory(null);
                                  setShowMoreMenu(null);
                                }}
                                className="block w-full px-3 py-2 text-left text-xs text-muted hover:bg-background"
                              >
                                Close
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-center gap-1">
            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`h-8 w-8 rounded text-xs font-semibold transition ${
                  page === currentPage
                    ? "bg-primary text-white"
                    : "border border-border text-foreground hover:bg-primary-light"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/30 p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-surface p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Add Category
              </h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <Input
                id="cat-name"
                label="Category Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter category name"
              />
              <Input
                id="cat-icon"
                label="Icon (Emoji)"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                placeholder="🍔"
              />
              <Input
                id="cat-desc"
                label="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter description"
              />
              <Select
                id="cat-status"
                label="Status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option>Active</option>
                <option>Inactive</option>
              </Select>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleAddCategory}>
                Add Category
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/30 p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-surface p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Edit Category
              </h2>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <Input
                id="edit-cat-name"
                label="Category Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <Input
                id="edit-cat-icon"
                label="Icon (Emoji)"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
              />
              <Input
                id="edit-cat-desc"
                label="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <Select
                id="edit-cat-status"
                label="Status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option>Active</option>
                <option>Inactive</option>
              </Select>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleEditCategory}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Items Modal */}
      {showViewModal && selectedCategory && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/30 p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-surface p-5 shadow-xl max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                {selectedCategory.name} - Items ({selectedCategory.items})
              </h2>
              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4">
              <div className="flex gap-2">
                <Input
                  id="new-item"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Add new item..."
                  className="h-10"
                />
                <Button
                  size="sm"
                  onClick={handleAddItemToCategory}
                  className="whitespace-nowrap"
                >
                  <Plus size={14} /> Add
                </Button>
              </div>
            </div>

            {selectedCategory.itemsList &&
              selectedCategory.itemsList.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    Items in this category:
                  </h3>
                  <div className="space-y-2">
                    {selectedCategory.itemsList.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded border border-border bg-background p-2 text-sm text-foreground flex items-center justify-between"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          className="text-danger hover:text-red-600"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            <div className="mt-5 flex justify-end">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Categories;
