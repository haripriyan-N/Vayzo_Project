import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/User";
import Complaints from "./pages/Complaints";
import AdminLayout from "./components/layout/AdminLayout";
import User from "./pages/Users";
import UsersAdd from "./pages/UsersAdd";
import UsersDetails from "./pages/UsersDetails";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/users" element={<User />} />
            <Route path="/users/:userId" element={<UsersDetails />} />
            <Route path="/users/add" element={<UsersAdd />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/users" element={<Users />} /> */}

            <Route path="/complaints" element={<Complaints />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
