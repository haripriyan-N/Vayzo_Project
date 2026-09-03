import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Eye, MoreVertical, Pencil, Plus, RotateCcw, 
  Trash2, LayoutGrid, CheckCircle, AlertCircle, 
  Filter, ShoppingBag, Utensils, Pill, Store,
  Carrot, Baby, Milk, Coffee
} from "lucide-react";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import StatusSelect from "../components/ui/StatusSelect";
import Table from "../components/ui/Table";
import Card from "../components/ui/Card";
import Modal from "../components/ui/Modal";
import StatCard from "../components/ui/StatCard";
import ActionMenu from "../components/ui/ActionMenu";

import { getCategories, deleteCategory } from "../api/categoriesApi";

const statusBadgeMap = {
  Active: "success",
  Inactive: "danger",
};

const statusOptions = [
  "All Status",
  "Active",
  "Inactive",
];

const parentOptions = [
  "All Parent Categories",
  "Food",
  "Grocery",
  "Retail",
];

const categoryTableHeaders = [
  "No.",
  "Category Name",
  "Parent Category",
  "Description",
  "Status",
  "Items",
  "Order",
  "Created At",
  "Actions",
];

// Helper to assign a random icon based on name
const getCategoryIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes('food') || n.includes('restaurant')) return <Utensils size={18} className="text-success" />;
  if (n.includes('grocer') || n.includes('retail')) return <ShoppingBag size={18} className="text-warning" />;
  if (n.includes('pharmacy') || n.includes('medicine')) return <Pill size={18} className="text-primary" />;
  if (n.includes('fruit') || n.includes('veg')) return <Carrot size={18} className="text-success" />;
  if (n.includes('baby')) return <Baby size={18} className="text-primary" />;
  if (n.includes('beverage') || n.includes('drink')) return <Coffee size={18} className="text-info" />;
  return <Store size={18} className="text-primary" />;
};

const getCategoryIconBg = (name) => {
  const n = name.toLowerCase();
  if (n.includes('food') || n.includes('restaurant') || n.includes('fruit') || n.includes('veg')) return "bg-success/10";
  if (n.includes('grocer') || n.includes('retail')) return "bg-warning/10";
  if (n.includes('beverage') || n.includes('drink')) return "bg-info/10";
  return "bg-primary/10";
};

// Removed custom CategoryStatCard, relying on updated StatCard instead

function Categories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteModalId, setDeleteModalId] = useState(null);

  // Filters
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [parentFilter, setParentFilter] = useState("All Parent Categories");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError("Unable to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchSearch =
        searchText === "" ||
        category.name?.toLowerCase().includes(searchText.toLowerCase());

      const matchStatus =
        statusFilter === "All Status" || category.status === statusFilter;

      // Note: Since real data might not have parentCategory, this is just visual mock logic
      const parentCat = category.parentCategory || "-";
      const matchParent =
        parentFilter === "All Parent Categories" || parentCat === parentFilter;

      return matchSearch && matchStatus && matchParent;
    });
  }, [categories, searchText, statusFilter, parentFilter]);

  const hasFilters =
    searchText !== "" ||
    statusFilter !== "All Status" ||
    parentFilter !== "All Parent Categories";

  const resetFilters = () => {
    setSearchText("");
    setStatusFilter("All Status");
    setParentFilter("All Parent Categories");
  };

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, statusFilter, parentFilter]);

  const handleDeleteCategory = async () => {
    if (!deleteModalId) return;
    try {
      await deleteCategory(deleteModalId);
      setCategories(categories.filter((c) => c.id !== deleteModalId));
      setDeleteModalId(null);
      const newFilteredLength = filteredCategories.length - 1;
      const newTotalPages = Math.ceil(newFilteredLength / itemsPerPage) || 1;
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
    } catch (err) {
      alert("Failed to delete category");
    }
  };

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      
      {/* Stat Cards Row */}
      <div className="mb-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          variant="horizontal"
          title="Total Categories"
          value={categories.length > 0 ? categories.length : 48}
          trend="12.5%"
          icon={LayoutGrid}
          colorClass="text-primary"
          bgClass="bg-primary/10"
        />
        <StatCard
          variant="horizontal"
          title="Active Categories"
          value={categories.length > 0 ? categories.filter((c) => c.status === "Active").length : 42}
          trend="10.3%"
          icon={CheckCircle}
          colorClass="text-success"
          bgClass="bg-success/10"
        />
        <StatCard
          variant="horizontal"
          title="Inactive Categories"
          value={categories.length > 0 ? categories.filter((c) => c.status === "Inactive").length : 5}
          trend="8.2%"
          isNegative
          icon={AlertCircle}
          colorClass="text-warning"
          bgClass="bg-warning/10"
        />
        <StatCard
          variant="horizontal"
          title="Deleted Categories"
          value="1"
          trend="50%"
          isNegative
          icon={Trash2}
          colorClass="text-danger"
          bgClass="bg-danger/10"
        />
      </div>

      <Card noPadding className="flex flex-col">
        {/* Filter Section */}
        <div className="p-4 sm:p-6 pb-4 border-b border-border">
          <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:justify-between">
            {/* Search Input */}
            <div className="flex-1 w-full min-w-0 xl:max-w-md">
              <SearchInput
                id="category-search"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search category by name..."
              />
            </div>

            {/* Selects and Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:flex xl:flex-row gap-4 w-full xl:w-auto items-center">
              <StatusSelect
                id="category-status"
                value={statusFilter}
                options={statusOptions}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full xl:w-[150px]"
              />

              <StatusSelect
                id="category-parent"
                value={parentFilter}
                options={parentOptions}
                onChange={(event) => setParentFilter(event.target.value)}
                className="w-full xl:w-[200px]"
              />

              <Button
                variant="secondary"
                size="sm"
                className="h-10 px-4 w-full xl:w-auto flex items-center justify-center gap-2"
              >
                <Filter size={16} />
                Filter
              </Button>

              <Button
                size="sm"
                onClick={() => navigate("/categories/add")}
                className="h-10 w-full xl:w-auto px-5 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Plus size={18} strokeWidth={2.5} />
                Add Category
              </Button>
            </div>
          </div>
        </div>

        {error ? (
          <div className="m-6 rounded-xl border border-danger/30 bg-danger/5 p-8 text-center text-sm font-medium text-danger">
            {error}
          </div>
        ) : (
          <Table
            headers={categoryTableHeaders}
            currentCount={paginatedCategories.length}
            totalCount={filteredCategories.length}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            minWidth="1000px"
            className="border-0 shadow-none rounded-none"
          >
            {loading ? (
              <tr>
                <td
                  colSpan={categoryTableHeaders.length}
                  className="p-10 text-center text-sm text-muted"
                >
                  Loading categories...
                </td>
              </tr>
            ) : paginatedCategories.length ? (
              paginatedCategories.map((category, index) => (
                <tr
                  key={category.id}
                  className="border-b border-border last:border-0 transition-colors hover:bg-background"
                >
                  <td className="whitespace-nowrap px-3 py-3 font-medium text-foreground">
                    {String((currentPage - 1) * itemsPerPage + index + 1).padStart(2, "0")}
                  </td>
                  {/* Category Name with Icon */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${getCategoryIconBg(category.name)}`}>
                        {getCategoryIcon(category.name)}
                      </div>
                      <span className="font-semibold text-foreground text-sm">
                        {category.name}
                      </span>
                    </div>
                  </td>

                  {/* Parent Category */}
                  <td className="px-4 py-4 text-sm text-muted">
                    {category.parentCategory || "-"}
                  </td>

                  {/* Description */}
                  <td className="px-4 py-4 text-sm text-muted max-w-[200px] truncate">
                    {category.description || "-"}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${
                      category.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    }`}>
                      {category.status || "Active"}
                    </span>
                  </td>

                  {/* Items */}
                  <td className="px-4 py-4 text-sm font-medium text-muted">
                    {category.itemCount || (Math.floor(Math.random() * 100) + 10)}
                  </td>

                  {/* Order */}
                  <td className="px-4 py-4 text-sm text-muted">
                    {index + 1}
                  </td>

                  {/* Created At */}
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {category.createdDate ? new Date(category.createdDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "12 May 2024"}
                      </span>
                      <span className="text-xs text-muted">
                        10:15 AM
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <ActionMenu
                        actions={[
                          {
                            label: "View",
                            icon: Eye,
                            onClick: () => navigate(`/categories/${category.id}`),
                          },
                          {
                            label: "Edit",
                            icon: Pencil,
                            onClick: () => navigate(`/categories/edit/${category.id}`),
                          },
                          {
                            label: "Delete",
                            icon: Trash2,
                            danger: true,
                            onClick: () => setDeleteModalId(category.id),
                          },
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={categoryTableHeaders.length}
                  className="p-10 text-center text-sm text-muted"
                >
                  No categories found.
                </td>
              </tr>
            )}
          </Table>
        )}
      </Card>
      
      <Modal 
        isOpen={!!deleteModalId} 
        onClose={() => setDeleteModalId(null)} 
        title="Delete Category"
      >
        <p className="text-sm text-muted">Are you sure you want to delete this category? This action cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteModalId(null)}>Cancel</Button>
          <Button className="bg-danger hover:bg-danger/90 text-white" onClick={handleDeleteCategory}>Delete</Button>
        </div>
      </Modal>
    </section>
  );
}

export default Categories;
