import { useState } from "react";
import {
  ArrowLeft,
  CloudUpload,
  Eye,
  EyeOff,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { createUser } from "../api/usersApi";

const types = [
  "Select user type",
  "Customer",
  "Business",
  "Delivery Partner",
  "Merchant",
];
const roles = ["Select role", "Admin", "Manager", "Support", "Operations", "User"];

function AddUsers() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    type: types[0],
    role: roles[0],
    password: "",
    confirm: "",
  });
  const update = (key) => (event) =>
    setForm({ ...form, [key]: event.target.value });
  const field = (id, label, key, type = "text", placeholder = "") => (
    <Input
      id={id}
      label={label}
      type={type}
      value={form[key]}
      onChange={update(key)}
      placeholder={placeholder}
      required
    />
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createUser({
        name: form.name,
        email: form.email,
        mobileNumber: form.mobile,
        userType: form.type,
        role: form.role,
      });

      navigate("/users");
    } catch (err) {
      setError("Unable to create user.");
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
              <h2 className="text-lg font-semibold text-foreground">
                User Information
              </h2>
              
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  {field("full-name", "Full Name", "name", "text", "Enter full name")}
                  {field("email", "Email Address", "email", "email", "Enter email address")}
                  {field("mobile", "Mobile Number", "mobile", "tel", "Enter mobile number")}
                </div>

                <div className="flex flex-col">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">
                    Profile Image
                  </span>
                  <label htmlFor="profile-image" className="cursor-pointer flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background hover:bg-surface-hover hover:border-primary/40 transition-all text-center p-6 group">
                    <input type="file" id="profile-image" className="hidden" accept="image/png, image/jpeg, image/webp" />
                    <CloudUpload size={32} className="text-primary mb-4 transition-transform group-hover:scale-110" />
                    <p className="text-sm font-medium text-foreground">
                      Click to upload
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      or drag and drop
                    </p>
                    <p className="mt-2 text-[10px] text-muted">
                      JPG, PNG or WEBP (Max 2MB)
                    </p>
                  </label>
                </div>
              </div>

              <div className="mt-6 grid gap-8 md:grid-cols-2">
                <Select
                  id="user-type"
                  label="User Type *"
                  value={form.type}
                  onChange={update("type")}
                  required
                >
                  {types.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </Select>

                <Select
                  id="user-role"
                  label="Role *"
                  value={form.role}
                  onChange={update("role")}
                  required
                >
                  {roles.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </Select>

                <Select
                  id="user-status"
                  label="Status *"
                  value="Active"
                  onChange={() => {}}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Blocked">Blocked</option>
                </Select>

                <div className="flex flex-col">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">
                    Email Verified
                  </span>
                  <div className="flex h-[42px] items-center justify-between rounded-lg border border-border bg-background px-4">
                    <span className="text-xs text-muted">If enabled, the user will be marked as email verified.</span>
                    <button
                      type="button"
                      onClick={() => setEmailVerified(!emailVerified)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${emailVerified ? "bg-primary" : "bg-border"}`}
                      role="switch"
                      aria-checked={emailVerified}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${emailVerified ? "translate-x-2" : "-translate-x-2"}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-foreground">
                Password
              </h2>
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div className="relative">
                  {field(
                    "password",
                    "Password *",
                    "password",
                    showPassword ? "text" : "password",
                    "Enter password",
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 bottom-2.5 text-muted hover:text-foreground transition-colors"
                    aria-label="Toggle password"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="relative">
                  {field(
                    "confirm-password",
                    "Confirm Password *",
                    "confirm",
                    showConfirm ? "text" : "password",
                    "Confirm password",
                  )}
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 bottom-2.5 text-muted hover:text-foreground transition-colors"
                    aria-label="Toggle confirm password"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-auto flex justify-end gap-4 border-t border-border p-6 bg-surface-hover/30 rounded-b-xl">
              <Button
                variant="secondary"
                type="button"
                onClick={() => navigate("/users")}
                className="w-full sm:w-auto h-11 px-8 font-medium"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="w-full sm:w-auto h-11 px-8 font-medium">
                {loading ? "Creating..." : "Create User"}
              </Button>
            </div>
          </form>
          
          <aside className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <h2 className="text-base font-semibold text-foreground border-b border-border pb-4 mb-4">
                User Type & Role Guide
              </h2>
              <div className="space-y-4">
                {[
                  ["Customer", "Normal app users who can place orders and avail services."],
                  [
                    "Delivery Partner",
                    "Delivery partners who can accept and deliver orders.",
                  ],
                  ["Admin", "System administrators who can access the admin panel."],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-lg bg-background p-4 border border-border/50">
                    <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <UserRound size={16} className="text-primary" />
                      {title}
                    </p>
                    <p className="mt-1.5 text-xs text-muted leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <h2 className="text-base font-semibold text-foreground border-b border-border pb-4 mb-4">
                Status Guide
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Active", text: "User can login and access the system.", color: "text-success", bg: "bg-success", varName: "success" },
                  { title: "Inactive", text: "User cannot login and access the system.", color: "text-warning", bg: "bg-warning", varName: "warning" },
                  { title: "Blocked", text: "User is blocked and cannot access the system.", color: "text-danger", bg: "bg-danger", varName: "danger" },
                ].map(({title, text, color, bg, varName}) => (
                  <div key={title} className="rounded-lg bg-background p-4 border-l-[3px] shadow-sm" style={{borderLeftColor: `var(--color-${varName})`, borderTop: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)'}}>
                    <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <span className={`h-2.5 w-2.5 rounded-full ${bg}`}></span>
                      <span className={color}>{title}</span>
                    </p>
                    <p className="mt-1.5 text-xs text-muted leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default AddUsers;
