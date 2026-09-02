import { useState, useEffect } from "react";
import { AlertCircle, ArrowLeft, Eye, EyeOff, ShieldCheck, UserRound } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import StatusSelect from "../components/ui/StatusSelect";
import { createCategory, getCategoryById, updateCategory } from "../api/categoriesApi";

const types = [
  "Select type",
  "Product",
  "Service",
];

const statusOptions = ["Active", "Inactive"];

function RequiredLabel({ text }) {
  return (
    <span className="flex items-center gap-1.5">
      {text}
      <AlertCircle size={12} className="text-warning" strokeWidth={3} />
    </span>
  );
}

function CategoriesAdd() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const isEditing = !!categoryId;
  
  const [form, setForm] = useState({
    name: "",
    categoryId: "",
    type: types[0],
    itemCount: 0,
    status: statusOptions[0],
    description: "",
  });
  
  const [dbId, setDbId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditing) {
      loadCategoryData();
    }
  }, [categoryId]);

  const loadCategoryData = async () => {
    try {
      setLoading(true);
      const data = await getCategoryById(categoryId);
      if (data) {
        setDbId(data.id);
        const toTitleCase = (str) => {
          if (!str) return "";
          return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        };

        setForm({
          name: data.name || "",
          categoryId: data.categoryId || "",
          type: data.type || types[0],
          itemCount: data.itemCount || 0,
          status: data.status ? toTitleCase(data.status) : statusOptions[0],
          description: data.description || "",
        });
      }
    } catch (err) {
      setError("Unable to load category details.");
    } finally {
      setLoading(false);
    }
  };

  const update = (key) => (event) => {
    setForm({ ...form, [key]: event.target.value });
  };

  const field = (id, label, key, type = "text", placeholder) => (
    <Input
      id={id}
      label={<RequiredLabel text={label} />}
      type={type}
      placeholder={placeholder}
      value={form[key]}
      onChange={update(key)}
      required
    />
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.type === types[0]) {
      alert("Please select a valid type.");
      return;
    }

    try {
      setLoading(true);
      
      const payload = {
        name: form.name,
        categoryId: form.categoryId || `CAT${Math.floor(1000 + Math.random() * 9000)}`,
        type: form.type,
        itemCount: Number(form.itemCount),
        status: form.status,
        description: form.description,
      };

      if (isEditing) {
        await updateCategory(dbId, payload);
      } else {
        payload.createdDate = new Date().toISOString().split("T")[0];
        await createCategory(payload);
      }

      navigate("/categories");
    } catch (err) {
      setError("Unable to save category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,2.2fr)_minmax(300px,0.8fr)] items-start">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col rounded-xl border border-border bg-surface shadow-sm"
          >
            <div className="border-b border-border p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/categories")}
                  className="mr-1 rounded-md p-1 hover:bg-background transition-colors text-muted hover:text-foreground"
                >
                  <ArrowLeft size={18} />
                </button>
                {isEditing ? "Edit Category" : "Add New Category"}
              </h2>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                {field("category-name", "Category Name", "name", "text", "Enter category name")}
                {field("category-id", "Category ID", "categoryId", "text", "e.g., CAT1001 (leave empty for auto)")}
                {field("item-count", "Item Count", "itemCount", "number", "Enter item count")}
                
                <StatusSelect
                  id="category-type"
                  label={<RequiredLabel text="Type" />}
                  value={form.type}
                  options={types}
                  onChange={update("type")}
                  required
                />
                
                <StatusSelect
                  id="category-status"
                  label={<RequiredLabel text="Status" />}
                  value={form.status}
                  options={statusOptions}
                  onChange={update("status")}
                  required
                />
              </div>

              <div className="mt-8">
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Description
                </label>
                <textarea
                  className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  rows={4}
                  value={form.description}
                  onChange={update("description")}
                  placeholder="Enter a brief description..."
                />
              </div>

              {error && (
                <div className="mt-6 rounded-xl border border-danger/30 bg-danger/5 p-4 text-center text-sm font-medium text-danger">
                  {error}
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-end gap-3 p-6 sm:p-8 bg-background/50 rounded-b-xl">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/categories")}
                className="px-6"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" className="px-8" disabled={loading}>
                {loading ? "Saving..." : isEditing ? "Save Changes" : "Create Category"}
              </Button>
            </div>
          </form>

          {/* Right Side Panel */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm flex flex-col items-center text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck size={32} />
              </div>
              <h3 className="mb-1 font-semibold text-foreground">
                {isEditing ? "Category Management" : "New Category"}
              </h3>
              <p className="text-sm text-muted mb-4">
                {isEditing 
                  ? "Update the category's details, status, and classification." 
                  : "Fill out the required information to create a new category in the Vayzo system."}
              </p>
              
              <div className="w-full flex items-center justify-between py-3 border-y border-border">
                <span className="text-xs font-medium text-muted">Status Preference</span>
                <Badge variant={form.status === "Active" ? "success" : "danger"} className="px-2">
                  {form.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoriesAdd;
