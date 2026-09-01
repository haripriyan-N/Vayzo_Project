import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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

import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import Select from "../../components/ui/Select";
import { generalSettings } from "../../mock/vayzoApiMock";

const settingsMenu = [
  { label: "General Settings", path: "/settings/general", icon: LayoutGrid },
  { label: "Site Settings", path: "/settings", icon: Globe },
  { label: "Commission Settings", path: "/settings/commission", icon: TrendingUp },
  { label: "Payment Settings", path: "/settings/payment", icon: CreditCard },
  { label: "Delivery Settings", path: "/settings", icon: Truck },
  { label: "Notification Settings", path: "/settings", icon: Bell },
  { label: "Email Settings", path: "/settings", icon: Mail },
  { label: "SMS Settings", path: "/settings", icon: Smartphone },
  { label: "App Settings", path: "/settings", icon: Smartphone },
  { label: "Security Settings", path: "/settings", icon: Shield },
  { label: "SEO Settings", path: "/settings", icon: FileText },
  { label: "Maintenance Mode", path: "/settings", icon: MonitorCog },
  { label: "Third Party Integrations", path: "/settings", icon: Database },
];

function GeneralSettings() {
  const location = useLocation();
  const [formValues, setFormValues] = useState({
    platformName: generalSettings.platformName,
    platformTagline: generalSettings.platformTagline,
    supportEmail: generalSettings.supportEmail,
    supportPhone: generalSettings.supportPhone,
    timezone: generalSettings.timezone,
    dateFormat: generalSettings.dateFormat,
    timeFormat: generalSettings.timeFormat,
    defaultCurrency: generalSettings.defaultCurrency,
    currencyPosition: generalSettings.currencyPosition,
    numberFormat: generalSettings.numberFormat,
    language: generalSettings.language,
    contactAddress: generalSettings.contactAddress,
    facebook: generalSettings.socialLinks.facebook,
    instagram: generalSettings.socialLinks.instagram,
    twitter: generalSettings.socialLinks.twitter,
    platformStatus: true,
    maintenanceMode: generalSettings.maintenanceMode,
  });
  const [saveMessage, setSaveMessage] = useState("");

  const activePath =
    location.pathname === "/settings" || location.pathname === "/settings/general"
      ? "/settings/general"
      : location.pathname;

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (saveMessage) setSaveMessage("");
  };

  const handleSave = (event) => {
    event.preventDefault();
    setSaveMessage("Changes saved successfully.");
  };

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-5 text-2xl font-semibold text-foreground">Settings</h1>

        <div className="flex flex-col gap-5 xl:flex-row">
          <aside className="w-full xl:max-w-[280px]">
            <div className="rounded-2xl border border-border bg-surface p-3 shadow-sm">
              <div className="mb-3 flex items-center gap-2 px-2 py-2">
                <SettingsIcon size={18} className="text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  Settings Menu
                </span>
              </div>

              <nav className="space-y-1">
                {settingsMenu.map(({ label, path, icon: Icon }) => {
                  const isActive = activePath === path;

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

          <div className="flex-1 space-y-5">
            <form onSubmit={handleSave} className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted">
                    Ready for configuration
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-foreground">
                    General Settings
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  {saveMessage ? (
                    <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                      {saveMessage}
                    </span>
                  ) : (
                    <span className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-medium text-primary">
                      Ready
                    </span>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  id="platformName"
                  label="Platform Name"
                  value={formValues.platformName}
                  onChange={(event) => handleChange("platformName", event.target.value)}
                />

                <Input
                  id="platformTagline"
                  label="Platform Tagline"
                  value={formValues.platformTagline}
                  onChange={(event) => handleChange("platformTagline", event.target.value)}
                />

                <Input
                  id="supportEmail"
                  label="Support Email"
                  type="email"
                  value={formValues.supportEmail}
                  onChange={(event) => handleChange("supportEmail", event.target.value)}
                />

                <Input
                  id="supportPhone"
                  label="Support Phone"
                  value={formValues.supportPhone}
                  onChange={(event) => handleChange("supportPhone", event.target.value)}
                />

                <Select
                  id="timezone"
                  label="Default Timezone"
                  value={formValues.timezone}
                  onChange={(event) => handleChange("timezone", event.target.value)}
                >
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                  <option value="UTC">UTC</option>
                  <option value="Asia/Dubai">Asia/Dubai</option>
                  <option value="America/New_York">America/New_York</option>
                </Select>

                <Select
                  id="dateFormat"
                  label="Date Format"
                  value={formValues.dateFormat}
                  onChange={(event) => handleChange("dateFormat", event.target.value)}
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </Select>

                <Select
                  id="timeFormat"
                  label="Time Format"
                  value={formValues.timeFormat}
                  onChange={(event) => handleChange("timeFormat", event.target.value)}
                >
                  <option value="12 Hour">12 Hour</option>
                  <option value="24 Hour">24 Hour</option>
                </Select>

                <Select
                  id="defaultCurrency"
                  label="Default Currency"
                  value={formValues.defaultCurrency}
                  onChange={(event) => handleChange("defaultCurrency", event.target.value)}
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="AED">AED</option>
                </Select>

                <Select
                  id="currencyPosition"
                  label="Currency Position"
                  value={formValues.currencyPosition}
                  onChange={(event) => handleChange("currencyPosition", event.target.value)}
                >
                  <option value="Prefix">Prefix</option>
                  <option value="Suffix">Suffix</option>
                </Select>

                <Select
                  id="numberFormat"
                  label="Number Format"
                  value={formValues.numberFormat}
                  onChange={(event) => handleChange("numberFormat", event.target.value)}
                >
                  <option value="1,234.56">1,234.56</option>
                  <option value="1.234,56">1.234,56</option>
                </Select>

                <Select
                  id="language"
                  label="Language"
                  value={formValues.language}
                  onChange={(event) => handleChange("language", event.target.value)}
                >
                  <option value="English">English</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Hindi">Hindi</option>
                </Select>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Platform Logo
                  </label>
                  <div className="flex flex-col gap-3 rounded-xl border border-dashed border-border bg-primary-light/30 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white">
                        V
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">VAYZO Logo</p>
                        <p className="text-xs text-muted">PNG, JPG up to 2MB</p>
                      </div>
                    </div>
                    <Button type="button" variant="secondary" size="sm">
                      Upload Logo
                    </Button>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Favicon
                  </label>
                  <div className="flex flex-col gap-3 rounded-xl border border-dashed border-border bg-primary-light/30 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
                        V
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">favicon.ico</p>
                        <p className="text-xs text-muted">Recommended 32x32</p>
                      </div>
                    </div>
                    <Button type="button" variant="secondary" size="sm">
                      Upload Icon
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button type="submit" size="md">Save Changes</Button>
              </div>
            </form>

            <div className="grid gap-5 xl:grid-cols-[1.7fr_0.9fr]">
              <div className="space-y-5">
                <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                  <h3 className="mb-3 text-base font-semibold text-foreground">Contact Address</h3>
                  <textarea
                    rows={4}
                    value={formValues.contactAddress}
                    onChange={(event) => handleChange("contactAddress", event.target.value)}
                    className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  />
                </div>

                <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                  <h3 className="mb-3 text-base font-semibold text-foreground">Social Links</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      id="facebook"
                      label="Facebook"
                      value={formValues.facebook}
                      onChange={(event) => handleChange("facebook", event.target.value)}
                    />
                    <Input
                      id="instagram"
                      label="Instagram"
                      value={formValues.instagram}
                      onChange={(event) => handleChange("instagram", event.target.value)}
                    />
                    <div className="md:col-span-2">
                      <Input
                        id="twitter"
                        label="Twitter / X"
                        value={formValues.twitter}
                        onChange={(event) => handleChange("twitter", event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                  <h3 className="mb-3 text-base font-semibold text-foreground">Upload Banners</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className="flex h-28 items-center justify-center rounded-xl border border-dashed border-border bg-primary-light/20 text-sm text-muted"
                      >
                        Banner {index}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                  <h3 className="mb-3 text-base font-semibold text-foreground">System Info</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-primary-light/30 p-3">
                      <p className="text-xs uppercase tracking-wide text-muted">App Version</p>
                      <p className="mt-1 text-base font-semibold text-foreground">1.0.0</p>
                    </div>
                    <div className="rounded-xl bg-primary-light/30 p-3">
                      <p className="text-xs uppercase tracking-wide text-muted">Build</p>
                      <p className="mt-1 text-base font-semibold text-foreground">stable-release</p>
                    </div>
                    <div className="rounded-xl bg-primary-light/30 p-3">
                      <p className="text-xs uppercase tracking-wide text-muted">Environment</p>
                      <p className="mt-1 text-base font-semibold text-foreground">Production</p>
                    </div>
                    <div className="rounded-xl bg-primary-light/30 p-3">
                      <p className="text-xs uppercase tracking-wide text-muted">Last Updated</p>
                      <p className="mt-1 text-base font-semibold text-foreground">12 Aug 2026</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                  <h3 className="mb-4 text-base font-semibold text-foreground">Site Status</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3 rounded-xl bg-primary-light/30 p-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">Platform Status</p>
                        <p className="text-xs text-muted">
                          {formValues.platformStatus ? "Live" : "Offline"}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label="Toggle platform status"
                        onClick={() => handleChange("platformStatus", !formValues.platformStatus)}
                        className={`relative h-6 w-11 rounded-full transition-colors ${
                          formValues.platformStatus ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                            formValues.platformStatus ? "left-6" : "left-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-3 rounded-xl bg-primary-light/30 p-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">Maintenance Mode</p>
                        <p className="text-xs text-muted">
                          {formValues.maintenanceMode ? "Enabled" : "Disabled"}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label="Toggle maintenance mode"
                        onClick={() => handleChange("maintenanceMode", !formValues.maintenanceMode)}
                        className={`relative h-6 w-11 rounded-full transition-colors ${
                          formValues.maintenanceMode ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                            formValues.maintenanceMode ? "left-6" : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                  <h3 className="mb-4 text-base font-semibold text-foreground">Quick Links</h3>
                  <div className="space-y-2 text-sm text-muted">
                    <a href="/dashboard" className="block rounded-lg bg-primary-light/30 px-3 py-2 text-primary hover:bg-primary-light">
                      Admin Dashboard
                    </a>
                    <a href="/orders" className="block rounded-lg bg-primary-light/30 px-3 py-2 text-primary hover:bg-primary-light">
                      Orders
                    </a>
                    <a href="/transactions" className="block rounded-lg bg-primary-light/30 px-3 py-2 text-primary hover:bg-primary-light">
                      Payments
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GeneralSettings;
