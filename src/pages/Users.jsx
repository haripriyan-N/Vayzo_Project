import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, MoreVertical, Pencil, Plus, RotateCcw } from "lucide-react";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import StatusSelect from "../components/ui/StatusSelect";
import DateRangeInput from "../components/ui/DateRangeInput";
import Table from "../components/ui/Table";

import { getUsers } from "../api/usersApi";

const statusBadgeMap = {
  ACTIVE: "success",
  VERIFIED: "info",
  PENDING: "warning",
  BLOCKED: "danger",
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

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [userTypeFilter, setUserTypeFilter] = useState("All User Type");
  const [verificationFilter, setVerificationFilter] = useState("All Verified");
  const [joinedFrom, setJoinedFrom] = useState("");
  const [joinedTo, setJoinedTo] = useState("");

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
    users,
    searchText,
    statusFilter,
    userTypeFilter,
    verificationFilter,
    joinedFrom,
    joinedTo,
  ]);

  const resetFilters = () => {
    setSearchText("");
    setStatusFilter("All Status");
    setUserTypeFilter("All User Type");
    setVerificationFilter("All Verified");
    setJoinedFrom("");
    setJoinedTo("");
  };

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(240px,1.5fr)_minmax(160px,1fr)_minmax(160px,1fr)_minmax(160px,1fr)_auto]">
            <SearchInput
              id="user-search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search users by name, email or mobile..."
            />

            <StatusSelect
              id="user-status"
              value={statusFilter}
              options={statusOptions}
              onChange={(event) => setStatusFilter(event.target.value)}
            />

            <StatusSelect
              id="user-type"
              value={userTypeFilter}
              options={userTypeOptions}
              onChange={(event) => setUserTypeFilter(event.target.value)}
            />

            <StatusSelect
              id="user-verification"
              value={verificationFilter}
              options={verificationOptions}
              onChange={(event) => setVerificationFilter(event.target.value)}
            />

            <Button
              size="sm"
              onClick={() => navigate("/users/add")}
              className="h-10"
            >
              <Plus size={17} strokeWidth={2} />
              Add User
            </Button>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <DateRangeInput
              id="joined-date"
              label="Joined Date"
              fromValue={joinedFrom}
              toValue={joinedTo}
              onFromChange={(event) => setJoinedFrom(event.target.value)}
              onToChange={(event) => setJoinedTo(event.target.value)}
            />

            <Button
              variant="secondary"
              size="sm"
              onClick={resetFilters}
              className="h-10"
            >
              <RotateCcw size={15} strokeWidth={1.8} />
              Reset
            </Button>
          </div>
        </div>

        {error ? (
          <div className="rounded-xl border border-danger/30 bg-surface p-8 text-center text-sm text-danger">
            {error}
          </div>
        ) : (
          <Table
            headers={userTableHeaders}
            currentCount={filteredUsers.length}
            totalCount={users.length}
            minWidth="1000px"
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
            ) : filteredUsers.length ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.userId}
                  className="border-t border-border transition-colors hover:bg-background"
                >
                  <td className="whitespace-nowrap px-3 py-3 font-medium text-foreground">
                    {user.userId}
                  </td>

                  <td className="px-3 py-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
                        {user.name
                          ?.split(" ")
                          .map((part) => part[0])
                          .join("")
                          .toUpperCase()}
                      </div>

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
                      variant="info"
                      className="whitespace-nowrap rounded-md px-2 py-1 text-xs"
                    >
                      {user.userType}
                    </Badge>
                  </td>

                  <td className="px-3 py-3">
                    <Badge
                      variant={statusBadgeMap[user.status] || "default"}
                      className="whitespace-nowrap rounded-md px-2 py-1 text-xs"
                    >
                      {user.status}
                    </Badge>
                  </td>

                  <td className="px-3 py-3">
                    <span
                      className={[
                        "flex h-6 w-6 items-center justify-center rounded-full",
                        "text-xs font-semibold",
                        user.isVerified
                          ? "bg-success/15 text-success"
                          : "bg-danger/15 text-danger",
                      ].join(" ")}
                    >
                      {user.isVerified ? "✓" : "×"}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-muted">
                    {user.joinedOn}
                  </td>

                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={`View ${user.name}`}
                        onClick={() => navigate(`/users/${user.userId}`)}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted transition hover:bg-primary-light hover:text-primary"
                      >
                        <Eye size={17} strokeWidth={1.8} />
                      </button>

                      <button
                        type="button"
                        aria-label={`Edit ${user.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted transition hover:bg-primary-light hover:text-primary"
                      >
                        <Pencil size={17} strokeWidth={1.8} />
                      </button>

                      <button
                        type="button"
                        aria-label={`More actions for ${user.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted transition hover:bg-primary-light hover:text-primary"
                      >
                        <MoreVertical size={17} strokeWidth={1.8} />
                      </button>
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
      </div>
    </section>
  );
}

export default Users;
