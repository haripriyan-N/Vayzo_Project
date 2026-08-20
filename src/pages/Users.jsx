import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import UserFilters from "../components/users/UserFilters";
import UserTable from "../components/users/UserTable";
import UserPagination from "../components/users/UserPagination";
import AddUserModal from "../components/users/AddUserModal";
import "../components/Sidebar.css";
import "../components/Header.css";
import "../components/users/UserFilters.css";
import "../components/users/UserTable.css";
import "../components/users/UserPagination.css";
import "../components/users/AddUserModal.css";
import "./Users.css";

const users = [
  ["USR12563", "Ravi Kumar", "+91 98765 43210", "ravi@gmail.com", "Customer", "Active", true, "12 May 2024"],
  ["USR12562", "Priya Sharma", "+91 87643 21009", "priya@gmail.com", "Customer", "Active", true, "12 May 2024"],
  ["USR12561", "Kannan P", "+91 96543 21008", "kannan@gmail.com", "Customer", "Active", true, "11 May 2024"],
  ["USR12560", "Ananya R", "+91 91234 56789", "ananya@gmail.com", "Customer", "Inactive", false, "11 May 2024"],
  ["USR12559", "Vikram J", "+91 99887 76655", "vikram@gmail.com", "Customer", "Active", true, "10 May 2024"],
  ["USR12558", "Sangeetha M", "+91 80776 66544", "sangeetha@gmail.com", "Customer", "Active", true, "10 May 2024"],
  ["USR12557", "Arjun N", "+91 77445 55433", "arjun@gmail.com", "Customer", "Active", true, "09 May 2024"],
  ["USR12556", "Deepak R", "+91 66564 43322", "deepak@gmail.com", "Customer", "Inactive", false, "09 May 2024"],
  ["USR12555", "Selvam R", "+91 87654 32109", "selvam@gmail.com", "Delivery Partner", "Active", true, "08 May 2024"],
  ["USR12554", "Murgan K", "+91 98764 32100", "murgan@gmail.com", "Delivery Partner", "Active", true, "08 May 2024"],
];

export default function Users() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [type, setType] = useState("All User Type");
  const [verified, setVerified] = useState("All Verified");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const filteredUsers = useMemo(() => users.filter((user) => [user[0], user[1], user[2], user[3]].join(" ").toLowerCase().includes(search.toLowerCase()) && (status === "All Status" || user[5] === status) && (type === "All User Type" || user[4] === type) && (verified === "All Verified" || (verified === "Verified") === user[6])), [search, status, type, verified]);
  const resetFilters = () => { setSearch(""); setStatus("All Status"); setType("All User Type"); setVerified("All Verified"); setPage(1); };

  return <div className="reference-dashboard users-page"><Sidebar active="Users" help /><main className="reference-main"><Header title="Users List" /><div className="users-content"><UserFilters search={search} setSearch={(value) => { setSearch(value); setPage(1); }} status={status} setStatus={setStatus} type={type} setType={setType} verified={verified} setVerified={setVerified} onReset={resetFilters} onAdd={() => setShowModal(true)} /><UserTable users={filteredUsers} /><UserPagination page={page} setPage={setPage} count={filteredUsers.length} /></div></main>{showModal && <AddUserModal onClose={() => setShowModal(false)} />}</div>;
}
