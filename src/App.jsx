import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";

import Dashboard from "./pages/Dashboard";
import User from "./pages/Users";
import UsersAdd from "./pages/UsersAdd";
import UsersDetails from "./pages/UsersDetails";
import Orders from "./pages/Orders";
import Notifications from "./pages/Notifications";
import Complaints from "./pages/Complaints";
import OrderDetails from "./pages/OrderDetails";

import { NotificationProvider } from "./context/NotificationContext";

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/users" element={<User />} />
              <Route path="/users/:userId" element={<UsersDetails />} />
              <Route path="/users/add" element={<UsersAdd />} />

              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:orderId" element={<OrderDetails />} />

              <Route path="/delivery" element={<Complaints />} />
              <Route path="/notifications" element={<Notifications />} />

              <Route path="/complaints" element={<Complaints />} />
            </Route>
          </Route>
        </Routes>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
