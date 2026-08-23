import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import AdminLayout from "./components/layout/AdminLayout";
import Button from "./components/ui/button";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path="dashboard"
            element={
              <div className="flex flex-wrap gap-3 p-6">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Delete</Button>
                <Button variant="ghost">Cancel</Button>
                
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
