import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import AdminLayout from "./components/layout/AdminLayout";
import Button from "./components/ui/Button";
import Select from "./components/ui/select";
import Modal from "./components/ui/Modal";
import { useState } from "react";
import Badge from "./components/ui/Badge";
import Table from "./components/ui/Table";
import Dashboard from "./pages/Dashboard";
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  let users = {
    Name: "Hari",
    Email: "hari@gamil.com",
    Status: "Active",
    Action: "Edit",
  };

  // let use = users.values();
  // console.log(
  //   // users.forEach((use) => {
  //   //   return use;
  //   // })
  //   use.next().value.Email,
  // );
  // const newUsers = users.map((users) => {
  //   return users;
  // });

  // console.log(newUsers);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="Users"
            element={
              <div className="flex flex-wrap gap-3 p-6">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Delete</Button>
                <Button variant="ghost">Cancel</Button>
                <Select id="role" label="Role">
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                </Select>
                <div className="p-10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="rounded-lg bg-primary px-4 py-2 text-white"
                    children={"Open the Modal"}
                  ></button>

                  <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Test Modal"
                  >
                    <p className="text-foreground">Modal is working!</p>
                  </Modal>
                </div>

                <Badge variant="danger" children={"Blocked"}></Badge>
                <Badge variant="warning" children={"Pending"}></Badge>
                <Badge variant="info" children={"info"}></Badge>
                <Table headers={["Name", "Email", "Status", "Action"]}>
                  <tr>
                    <td children={users.Name}></td>
                    <td children={users.Email}></td>
                    <td children={users.Status}></td>
                    <td children={users.Action}></td>
                  </tr>
                </Table>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
