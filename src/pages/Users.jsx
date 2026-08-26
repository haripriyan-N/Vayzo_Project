import Button from "../components/ui/Button";
import Select from "../components/ui/select";
import Modal from "../components/ui/Modal";
import { useState } from "react";
import Badge from "../components/ui/Badge";
import Table from "../components/ui/Table";

function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //   let users = {
  //     Name: "Hari",
  //     Email: "hari@gamil.com",
  //     Status: "Active",
  //     Action: "Edit",
  //   };

  let users = [
    {
      Name: "Hari",
      Email: "hari@gamil.com",
      Status: "Active",
      Action: "Edit",
    },
    {
      Name: "Mani",
      Email: "mani@gamil.com",
      Status: "Active",
      Action: "Edit",
    },
  ];
  return (
    <div className="flex flex-wrap gap-3 p-6">
      <Button children={"Add +"}></Button>
      <Button variant="secondary " children={"Secodary"} />
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
        
        {users.map((item, index) => {
          return (
            <tr>
              <td children={item?.Name}></td>
              <td children={item?.Email}></td>
              <td children={item?.Status}></td>
              <td children={item?.Action}></td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
}

export default Users;
