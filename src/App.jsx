import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import ForgetPassword from "./pages/Forgetpassword";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";

import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import UserAdd from "./pages/UserAdd";
import DeliveryPartner from "./pages/DeliveryPartner";
import Orders from "./pages/Orders";
import Transactions from "./pages/Transactions";
import Complaint from "./pages/Complaint";
import Earnings from "./pages/Earnings";
import Notifications from "./pages/Notifications";
import Categories from "./pages/Categories";
import Locations from "./pages/Locations";
import Restaurants from "./pages/Restaurants";
import Offers from "./pages/Offers";
import Reports from "./pages/Reports";
import SettingsLayout from "./pages/settings/SettingsLayout";
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
import ThirdPartyIntegrations from "./pages/settings/ThirdPartyIntegrations";
import GeneralSettings from "./pages/settings/GeneralSettings";
import TeamUsers from "./pages/TeamUsers";
import ActivityLogs from "./pages/ActivityLogs";
import PaymentSettings from "./pages/settings/PaymentSettings";

import { NotificationProvider } from "./context/NotificationContext";

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<User />} />
              <Route path="/users/add" element={<UserAdd />} />
              <Route path="/delivery-partners" element={<DeliveryPartner />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/complaints" element={<Complaint />} />
              <Route path="/earnings" element={<Earnings />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/team-users" element={<TeamUsers />} />
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
              </Route>
            </Route>
          </Route>
        </Routes>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
