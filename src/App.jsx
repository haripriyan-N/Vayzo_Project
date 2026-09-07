import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Forgetpassword from "./pages/Forgetpassword";
import OtpVerification from "./pages/OtpVerification";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import UsersAdd from "./pages/UsersAdd";
import UsersDetails from "./pages/UsersDetails";
import Orders from "./pages/Orders";
import Notifications from "./pages/Notifications";
import Complaints from "./pages/Complaints";
import OrderDetails from "./pages/OrderDetails";

import { NotificationProvider } from "./context/NotificationContext";
import DeliveryPartner from "./pages/DeliveryPartner";
import DeliveryPartners from "./pages/DeliveryPartners";
import DeliveryPartnersAdd from "./pages/DeliveryPartnersAdd";
import Categories from "./pages/Categories";
import CategoriesAdd from "./pages/CategoriesAdd";
import CategoriesDetails from "./pages/CategoriesDetails";
import Offers from "./pages/Offers";
import OffersAdd from "./pages/OffersAdd";
import OffersDetails from "./pages/OffersDetails";
import Locations from "./pages/Locations";
import LocationsAdd from "./pages/LocationsAdd";
import Earnings from "./pages/Earnings";
import Restaurants from "./pages/Restaurants";
import RestaurantsAdd from "./pages/RestaurantsAdd";
import RestaurantsDetails from "./pages/RestaurantsDetails";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";  
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
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<Forgetpassword />} />
          <Route path="/otp" element={<OtpVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<ProfileEdit />} />

              <Route path="/users" element={<Users />} />
              <Route path="/users/add" element={<UsersAdd />} />
              <Route path="/users/edit/:userId" element={<UsersAdd />} />
              <Route path="/users/:userId" element={<UsersDetails />} />

              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:orderId" element={<OrderDetails />} />

              <Route path="/delivery" element={<DeliveryPartners />} />
              <Route path="/delivery/add" element={<DeliveryPartnersAdd />} />
              <Route
                path="/delivery/edit/:partnerId"
                element={<DeliveryPartnersAdd />}
              />
              <Route
                path="/delivery/:partnerId"
                element={<DeliveryPartner />}
              />

              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/add" element={<CategoriesAdd />} />
              <Route
                path="/categories/edit/:categoryId"
                element={<CategoriesAdd />}
              />
              <Route
                path="/categories/:categoryId"
                element={<CategoriesDetails />}
              />

              <Route path="/offers" element={<Offers />} />
              <Route path="/offers/add" element={<OffersAdd />} />
              <Route path="/offers/edit/:offerId" element={<OffersAdd />} />
              <Route path="/offers/:offerId" element={<OffersDetails />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/locations/add" element={<LocationsAdd />} />
              <Route path="/earnings" element={<Earnings />} />

              <Route path="/notifications" element={<Notifications />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/restaurants/add" element={<RestaurantsAdd />} />
              <Route path="/restaurants/edit/:restaurantId" element={<RestaurantsAdd />} />
              <Route path="/restaurants/:restaurantId" element={<RestaurantsDetails />} />
              <Route path="/settings" element={<SettingsLayout />}>
                <Route index element={<GeneralSettings />} />
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
