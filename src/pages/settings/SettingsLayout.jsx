import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Bell,
  CreditCard,
  Database,
  FileText,
  Globe,
  LayoutGrid,
  Mail,
  MonitorCog,
  Settings as SettingsIcon,
  Shield,
  Smartphone,
  TrendingUp,
  Truck,
} from "lucide-react";

const settingsMenu = [
  { label: "General Settings", path: "/settings/general", icon: LayoutGrid },
  { label: "Site Settings", path: "/settings/site", icon: Globe },
  { label: "Commission Settings", path: "/settings/commission", icon: TrendingUp },
  { label: "Payment Settings", path: "/settings/payment", icon: CreditCard },
  { label: "Delivery Settings", path: "/settings/delivery", icon: Truck },
  { label: "Notification Settings", path: "/settings/notification", icon: Bell },
  { label: "Email Settings", path: "/settings/email", icon: Mail },
  { label: "SMS Settings", path: "/settings/sms", icon: Smartphone },
  { label: "App Settings", path: "/settings/app", icon: Smartphone },
  { label: "Security Settings", path: "/settings/security", icon: Shield },
  { label: "SEO Settings", path: "/settings/seo", icon: FileText },
  { label: "Maintenance Mode", path: "/settings/maintenance", icon: MonitorCog },
  { label: "Third Party Integrations", path: "/settings/integrations", icon: Database },
];

function SettingsLayout() {
  const location = useLocation();

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 xl:flex-row">
          <aside className="w-full xl:max-w-[280px] sticky top-6 h-fit">
            <div className="rounded-2xl border border-border bg-surface p-3 shadow-sm">
              <div className="mb-3 flex items-center gap-2 px-2 py-2">
                <SettingsIcon size={18} className="text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  Settings Menu
                </span>
              </div>

              <nav className="space-y-1">
                {settingsMenu.map(({ label, path, icon: Icon }) => {
                  // Ensure strict matching for root "/settings" or start matching for others
                  const isActive = location.pathname === path || (path !== "/settings" && location.pathname.startsWith(path));

                  return (
                    <NavLink
                      key={label}
                      to={path}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                        isActive
                          ? "bg-primary text-white shadow-sm"
                          : "text-muted hover:bg-primary-light hover:text-primary"
                      }`}
                    >
                      <Icon size={16} className="shrink-0" />
                      <span>{label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SettingsLayout;
