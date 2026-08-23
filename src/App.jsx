import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import AdminLayout from "./components/layout/AdminLayout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<div>Dashboard</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
