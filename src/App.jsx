import { BrowserRouter, Route, Routes } from "react-router-dom";

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
import Settings from "./pages/Settings";
import GeneralSettings from "./pages/settings/GeneralSettings";
import TeamUsers from "./pages/TeamUsers";
import ActivityLogs from "./pages/ActivityLogs";

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
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/general" element={<GeneralSettings />} />
              <Route path="/settings/commission" element={<Settings />} />
              <Route path="/settings/payment" element={<Settings />} />
              <Route path="/team-users" element={<TeamUsers />} />
              <Route path="/activity-logs" element={<ActivityLogs />} />
            </Route>
          </Route>
        </Routes>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
