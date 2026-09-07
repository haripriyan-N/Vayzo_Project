import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";

import Login from "./pages/Login";
import ForgetPassword from "./pages/Forgetpassword";
import OtpVerification from "./pages/OtpVerification";
import ResetPassword from "./pages/ResetPassword";

import ProtectedRoute from "./components/layout/ProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";

import Dashboard from "./pages/Dashboard";

// Users
import Users from "./pages/Users";
import UsersAdd from "./pages/UsersAdd";
import UsersDetails from "./pages/UsersDetails";

// Delivery Partners
import DeliveryPartners from "./pages/DeliveryPartners";
import DeliveryPartnersAdd from "./pages/DeliveryPartnersAdd";
import DeliveryPartner from "./pages/DeliveryPartner";

// Orders & Transactions
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Transactions from "./pages/Transactions";

// Support
import Complaints from "./pages/Complaints";
import Notifications from "./pages/Notifications";

// Catalog
import Categories from "./pages/Categories";
import CategoriesAdd from "./pages/CategoriesAdd";
import CategoriesDetails from "./pages/CategoriesDetails";
import Restaurants from "./pages/Restaurants";

// Marketing
import Offers from "./pages/Offers";
import OffersAdd from "./pages/OffersAdd";
import OffersDetails from "./pages/OffersDetails";

// Locations & Earnings
import Locations from "./pages/Locations";
import LocationsAdd from "./pages/LocationsAdd";
import Earnings from "./pages/Earnings";

// Admin Extras
import Reports from "./pages/Reports";
import TeamUsers from "./pages/TeamUsers";
import ActivityLogs from "./pages/ActivityLogs";

// Settings
import SettingsLayout from "./pages/settings/SettingsLayout";
import GeneralSettings from "./pages/settings/GeneralSettings";
import SiteSettings from "./pages/settings/SiteSettings";
import CommissionSettings from "./pages/settings/CommissionSettings";
import PaymentSettings from "./pages/settings/PaymentSettings";
import DeliverySettings from "./pages/settings/DeliverySettings";
import NotificationSettings from "./pages/settings/NotificationSettings";
import EmailSettings from "./pages/settings/EmailSettings";
import SmsSettings from "./pages/settings/SMSSettings";
import AppSettings from "./pages/settings/AppSettings";
import SecuritySettings from "./pages/settings/SecuritySettings";
import SeoSettings from "./pages/settings/SEOSettings";
import MaintenanceMode from "./pages/settings/MaintenanceMode";
import ThirdPartyIntegrations from "./pages/settings/ThirdPartyIntegrations";

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/otp" element={<OtpVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Users */}
              <Route path="/users" element={<Users />} />
              <Route path="/users/add" element={<UsersAdd />} />
              <Route path="/users/edit/:userId" element={<UsersAdd />} />
              <Route path="/users/:userId" element={<UsersDetails />} />

              {/* Orders */}
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:orderId" element={<OrderDetails />} />
              <Route path="/transactions" element={<Transactions />} />

              {/* Delivery */}
              <Route path="/delivery" element={<DeliveryPartners />} />
              <Route path="/delivery/add" element={<DeliveryPartnersAdd />} />
              <Route path="/delivery/edit/:partnerId" element={<DeliveryPartnersAdd />} />
              <Route path="/delivery/:partnerId" element={<DeliveryPartner />} />

              {/* Categories */}
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/add" element={<CategoriesAdd />} />
              <Route path="/categories/edit/:categoryId" element={<CategoriesAdd />} />
              <Route path="/categories/:categoryId" element={<CategoriesDetails />} />

              {/* Offers */}
              <Route path="/offers" element={<Offers />} />
              <Route path="/offers/add" element={<OffersAdd />} />
              <Route path="/offers/:offerId" element={<OffersDetails />} />
              
              {/* Locations */}
              <Route path="/locations" element={<Locations />} />
              <Route path="/locations/add" element={<LocationsAdd />} />
              
              {/* Earnings & Notifications & Complaints */}
              <Route path="/earnings" element={<Earnings />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/complaints" element={<Complaints />} />
              
              {/* Restaurants */}
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/restaurants/add" element={<Restaurants />} />

              {/* Admin Extras */}
              <Route path="/reports" element={<Reports />} />
              <Route path="/team-users" element={<TeamUsers />} />
              <Route path="/activity-logs" element={<ActivityLogs />} />

              {/* Settings */}
              <Route path="/settings" element={<SettingsLayout />}>
                <Route index element={<Navigate to="/settings/general" replace />} />
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
