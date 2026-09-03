with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('import Settings from "./pages/Settings";', '''import SettingsLayout from "./pages/settings/SettingsLayout";
import SiteSettings from "./pages/settings/SiteSettings";
import CommissionSettings from "./pages/settings/CommissionSettings";
import DeliverySettings from "./pages/settings/DeliverySettings";
import NotificationSettings from "./pages/settings/NotificationSettings";
import EmailSettings from "./pages/settings/EmailSettings";
import SmsSettings from "./pages/settings/SMSSettings";
import AppSettings from "./pages/settings/AppSettings";
import SecuritySettings from "./pages/settings/SecuritySettings";
import SeoSettings from "./pages/settings/SEOSettings";
import MaintenanceMode from "./pages/settings/MaintenanceMode";
import ThirdPartyIntegrations from "./pages/settings/ThirdPartyIntegrations";''')

content = content.replace('import { BrowserRouter, Route, Routes } from "react-router-dom";', 'import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";')

old_routes = '''              <Route path="/settings" element={<GeneralSettings />} />
              <Route path="/settings/general" element={<GeneralSettings />} />
              <Route path="/settings/commission" element={<Settings />} />
              <Route path="/team-users" element={<TeamUsers />} />
              <Route path="/activity-logs" element={<ActivityLogs />} />
              <Route path="/settings/payment" element={<PaymentSettings />} />'''

new_routes = '''              <Route path="/team-users" element={<TeamUsers />} />
              <Route path="/activity-logs" element={<ActivityLogs />} />
              
              <Route path="/settings" element={<SettingsLayout />}>
                <Route index element={<Navigate to="general" replace />} />
                <Route path="general" element={<GeneralSettings />} />
                <Route path="site" element={<SiteSettings />} />
                <Route path="commission" element={<CommissionSettings />} />
                <Route path="payment" element={<PaymentSettings />} />
                <Route path="delivery" element={<DeliverySettings />} />
                <Route path="notification" element={<NotificationSettings />} />
                <Route path="email" element={<EmailSettings />} />
                <Route path="sms" element={<SmsSettings />} />
                <Route path="app" element={<AppSettings />} />
                <Route path="security" element={<SecuritySettings />} />
                <Route path="seo" element={<SeoSettings />} />
                <Route path="maintenance" element={<MaintenanceMode />} />
                <Route path="integrations" element={<ThirdPartyIntegrations />} />
              </Route>'''

content = content.replace(old_routes, new_routes)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
