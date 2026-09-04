import { useState, useEffect } from "react";
import { ArrowLeft, User, Mail, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function ProfileEdit() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Super Admin",
  });

  useEffect(() => {
    const userStr = localStorage.getItem("vayzo_admin_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setForm({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "Super Admin",
      });
    }
  }, []);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(r => setTimeout(r, 800));

    // Update localStorage
    const userStr = localStorage.getItem("vayzo_admin_user");
    const user = userStr ? JSON.parse(userStr) : {};
    
    const updatedUser = {
      ...user,
      name: form.name,
      email: form.email,
    };
    
    localStorage.setItem("vayzo_admin_user", JSON.stringify(updatedUser));
    
    setLoading(false);
    navigate("/profile");
  };

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="mx-auto max-w-4xl space-y-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col rounded-xl border border-border bg-surface shadow-sm"
        >
          <div className="border-b border-border p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="mr-1 rounded-md p-1 hover:bg-background transition-colors text-muted hover:text-foreground"
              >
                <ArrowLeft size={18} />
              </button>
              Edit Profile
            </h2>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-medium text-foreground">
                  Full Name <span className="text-danger">*</span>
                </label>
                <div className="relative">
                   <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                   <Input 
                     className="pl-10" 
                     placeholder="Enter your full name" 
                     value={form.name} 
                     onChange={(e) => update("name", e.target.value)} 
                     required 
                   />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-medium text-foreground">
                  Email Address <span className="text-danger">*</span>
                </label>
                <div className="relative">
                   <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                   <Input 
                     type="email"
                     className="pl-10" 
                     placeholder="Enter your email" 
                     value={form.email} 
                     onChange={(e) => update("email", e.target.value)} 
                     required 
                   />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-medium text-foreground">
                  Role
                </label>
                <div className="relative">
                   <Shield size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                   <Input 
                     className="pl-10 bg-background/50 text-muted" 
                     value={form.role} 
                     disabled
                   />
                </div>
                <span className="text-xs text-muted ml-1">Roles can only be changed by system administrators.</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-3 p-6 sm:p-8 bg-background/50 rounded-b-xl">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/profile")}
              className="px-6"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" className="px-8" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
