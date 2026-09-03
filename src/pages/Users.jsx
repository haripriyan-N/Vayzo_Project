import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, RotateCcw, Eye, Pencil as Edit, Trash2, Check, X, MoreVertical } from "lucide-react";
import Avatar from "../components/ui/Avatar";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import StatusSelect from "../components/ui/StatusSelect";
import DateRangeInput from "../components/ui/DateRangeInput";
import Table from "../components/ui/Table";
import Card from "../components/ui/Card";
import Modal from "../components/ui/Modal";

import ActionMenu from "../components/ui/ActionMenu";

import { getUsers, deleteUser } from "../api/usersApi";

const statusBadgeMap = {
  Active: "success",
  Verified: "info",
  Pending: "warning",
  Blocked: "danger",
  Inactive: "danger",
};

const statusOptions = [
  "All Status",
  "Active",
  "Verified",
  "Pending",
  "Blocked",
];

const userTypeOptions = [
  "All User Type",
  "Customer",
  "Business",
  "Delivery Partner",
  "Merchant",
];

const verificationOptions = ["All Verified", "Verified", "Not Verified"];

const userTableHeaders = [
  "No.",
  "ID",
  "User",
  "Mobile",
  "Email",
  "User Type",
  "Status",
  "Verified",
  "Joined On",
  "Actions",
];

function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteModalId, setDeleteModalId] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [userTypeFilter, setUserTypeFilter] = useState("All User Type");
  const [verificationFilter, setVerificationFilter] = useState("All Verified");
  const [joinedFrom, setJoinedFrom] = useState("");
  const [joinedTo, setJoinedTo] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getUsers();

        if (isMounted) {
          setUsers(data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Unable to load users.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return users.filter((user) => {
      const isVerified = user.isVerified === true;
      const matchesSearch =
        !query ||
        [user.name, user.email, user.mobileNumber, user.userId, user.userType]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All Status" ||
        user.status?.toLowerCase() === statusFilter.toLowerCase();

      const matchesUserType =
        userTypeFilter === "All User Type" || user.userType === userTypeFilter;

      const matchesVerification =
        verificationFilter === "All Verified" ||
        (verificationFilter === "Verified" && isVerified) ||
        (verificationFilter === "Not Verified" && !isVerified);

      const matchesJoinedDate =
        (!joinedFrom || user.joinedOn >= joinedFrom) &&
        (!joinedTo || user.joinedOn <= joinedTo);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesUserType &&
        matchesVerification &&
        matchesJoinedDate
      );
    });
  }, [
    searchText,
    users,
    statusFilter,
    userTypeFilter,
    verificationFilter,
    joinedFrom,
    joinedTo,
  ]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, statusFilter, userTypeFilter, verificationFilter, joinedFrom, joinedTo]);

  const hasFilters =
    searchText !== "" ||
    statusFilter !== "All Status" ||
    userTypeFilter !== "All User Type" ||
    verificationFilter !== "All Verified" ||
    joinedFrom !== "" ||
    joinedTo !== "";

  const resetFilters = () => {
    setSearchText("");
    setStatusFilter("All Status");
    setUserTypeFilter("All User Type");
    setVerificationFilter("All Verified");
    setJoinedFrom("");
    setJoinedTo("");
  };

  const handleDeleteUser = async () => {
    if (!deleteModalId) return;
    try {
      await deleteUser(deleteModalId);
      setUsers((prev) => prev.filter((u) => u.userId !== deleteModalId));
      setDeleteModalId(null);
      // Pagination handled automatically by recalculated totalPages,
      // but let's ensure we don't end up on an empty page if possible
      const newFilteredLength = filteredUsers.length - 1;
      const newTotalPages = Math.ceil(newFilteredLength / itemsPerPage) || 1;
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    }
  };

  const toTitleCase = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };



  return (
    <section className="min-h-full bg-background p-4 sm:p-6 flex flex-col gap-6">
      <Card noPadding className="flex flex-col">
        {/* Filter Section */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:justify-between">
            {/* Search Input */}
            <div className="flex-1 w-full min-w-0 xl:max-w-sm">
              <SearchInput
                id="user-search"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search users by name, email or mobile..."
              />
            </div>

            {/* Selects and Button */}
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:flex xl:flex-row gap-4 w-full xl:w-auto items-center">
              <StatusSelect
                id="user-status"
                value={statusFilter}
                options={statusOptions}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full xl:w-[150px]"
              />

              <StatusSelect
                id="user-type"
                value={userTypeFilter}
                options={userTypeOptions}
                onChange={(event) => setUserTypeFilter(event.target.value)}
                className="w-full xl:w-[160px]"
              />

              <StatusSelect
                id="user-verification"
                value={verificationFilter}
                options={verificationOptions}
                onChange={(event) => setVerificationFilter(event.target.value)}
                className="w-full xl:w-[150px]"
              />

              <Button
                size="sm"
                onClick={() => navigate("/users/add")}
                className="col-span-1 sm:col-span-3 xl:col-span-1 h-10 w-full flex items-center justify-center gap-2"
              >
                <Plus size={18} strokeWidth={2.5} />
                Add User
              </Button>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <DateRangeInput
              id="joined-date"
              label="Joined Date"
              fromValue={joinedFrom}
              toValue={joinedTo}
              onFromChange={(event) => setJoinedFrom(event.target.value)}
              onToChange={(event) => setJoinedTo(event.target.value)}
            />

            {hasFilters && (
              <Button
                variant="secondary"
                size="sm"
                onClick={resetFilters}
                className="h-10 w-full sm:w-auto"
              >
                <RotateCcw size={16} strokeWidth={2} className="mr-1" />
                Reset
              </Button>
            )}
          </div>
        </div>
      </Card>

      <Card noPadding className="flex flex-col">
        {/* Table Section */}
        {error ? (
          <div className="m-6 rounded-xl border border-danger/30 bg-danger/5 p-8 text-center text-sm font-medium text-danger">
            {error}
          </div>
        ) : (
          <Table
            headers={userTableHeaders}
            currentCount={paginatedUsers.length}
            totalCount={filteredUsers.length}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            minWidth="1000px"
            className="border-0 shadow-none rounded-none border-t border-border"
          >
            {loading ? (
              <tr>
                <td
                  colSpan={userTableHeaders.length}
                  className="p-10 text-center text-sm text-muted"
                >
                  Loading users...
                </td>
              </tr>
            ) : paginatedUsers.length > 0 ? (
              paginatedUsers.map((user, index) => (
                <tr
                  key={user.userId}
                  className="border-b border-border last:border-0 transition-colors hover:bg-background"
                >
                  <td className="whitespace-nowrap px-3 py-3 font-medium text-foreground">
                    {String((currentPage - 1) * itemsPerPage + index + 1).padStart(2, "0")}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 font-medium text-foreground">
                    {user.userId}
                  </td>

                  <td className="px-3 py-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <Avatar 
                        src={user.image} 
                        alt={user.name} 
                        identifier={user.userId} 
                        className="h-8 w-8 rounded-full shadow-sm"
                      />

                      <span className="truncate font-medium text-foreground">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-muted">
                    {user.mobileNumber}
                  </td>

                  <td className="truncate px-3 py-3 text-muted">
                    {user.email}
                  </td>

                  <td className="px-3 py-3">
                    <Badge
                      variant={
                        user.userType === "Customer" ? "info" :
                        user.userType === "Delivery Partner" ? "default" :
                        user.userType === "Merchant" ? "warning" :
                        user.userType === "Business" ? "success" : "default"
                      }
                      className="whitespace-nowrap px-3"
                    >
                      {user.userType}
                    </Badge>
                  </td>

                  <td className="px-3 py-3">
                    <Badge
                      variant={statusBadgeMap[toTitleCase(user.status)] || "default"}
                      className="whitespace-nowrap px-3"
                    >
                      {toTitleCase(user.status)}
                    </Badge>
                  </td>

                  <td className="px-3 py-3">
                    <span
                      className={[
                        "flex h-6 w-6 items-center justify-center rounded-full",
                        user.isVerified
                          ? "bg-success/15 text-success"
                          : "bg-danger/15 text-danger",
                      ].join(" ")}
                    >
                      {user.isVerified ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-muted">
                    {user.joinedOn}
                  </td>

                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <ActionMenu
                        actions={[
                          {
                            label: "View",
                            icon: Eye,
                            onClick: () => navigate(`/users/${user.userId}`),
                          },
                          {
                            label: "Edit",
                            icon: Edit,
                            onClick: () => navigate(`/users/edit/${user.userId}`),
                          },
                          {
                            label: "Delete",
                            icon: Trash2,
                            danger: true,
                            onClick: () => setDeleteModalId(user.userId),
                          },
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={userTableHeaders.length}
                  className="p-10 text-center text-sm text-muted"
                >
                  No users found for the selected search and filters.
                </td>
              </tr>
            )}
          </Table>
        )}
      </Card>
      
      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={!!deleteModalId} 
        onClose={() => setDeleteModalId(null)} 
        title="Delete User"
      >
        <p className="text-sm text-muted">Are you sure you want to delete this user? This action cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteModalId(null)}>Cancel</Button>
          <Button className="bg-danger hover:bg-danger/90 text-white" onClick={handleDeleteUser}>Delete</Button>
        </div>
      </Modal>
    </section>
  );
}

export default Users;
