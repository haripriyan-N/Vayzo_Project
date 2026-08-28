import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgetPassword from "./pages/Forgetpassword";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/User";
import AddUser from "./pages/UserAdd";
import DeliveryPartner from "./pages/DeliveryPartner";
import Orders from "./pages/Orders";
import Transactions from "./pages/Transactions";
import Complaint from "./pages/Complaint";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/delivery-partners" element={<DeliveryPartner />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/complaints" element={<Complaint />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
