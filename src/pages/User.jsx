import { useMemo, useState } from "react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Select from "../components/ui/Select";
import { userStats, users } from "../mock/vayzoApiMock";

const statusBadgeMap = {
  ACTIVE: "success",
  VERIFIED: "info",
  PENDING: "warning",
  BLOCKED: "danger",
};

const statusOptions = ["All Status", "Active", "Verified", "Pending", "Blocked"];
const userTypeOptions = [
  "All User Type",
  "Customer",
  "Business",
  "Delivery Partner",
  "Merchant",
];

function User() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [userTypeFilter, setUserTypeFilter] = useState("All User Type");

  const filteredUsers = useMemo(() => {
    const normalizedQuery = searchText.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        [user.name, user.email, user.mobileNumber, user.userId, user.userType]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesStatus =
        statusFilter === "All Status" ||
        user.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesUserType =
        userTypeFilter === "All User Type" || user.userType === userTypeFilter;

      return matchesSearch && matchesStatus && matchesUserType;
    });
  }, [searchText, statusFilter, userTypeFilter]);

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Users List
            </h1>
          </div>

        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {userStats.map(({ label, value, trend }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-surface p-3 shadow-sm"
            >
              <p className="text-xs text-muted">{label}</p>
              <div className="mt-2 flex items-end justify-between gap-2">
                <span className="text-[1.9rem] font-semibold leading-none tracking-[-0.04em] text-foreground">
                  {value}
                </span>
                <span className="text-[10px] font-medium text-emerald-600">{trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-surface p-3 shadow-sm">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="w-full xl:max-w-[22rem]">
              <Input
                id="user-search"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search users by name, email or mobile"
                className="h-10 rounded-lg border-border bg-background text-sm"
              />
            </div>

            <div className="flex w-full flex-col gap-3 md:flex-row xl:max-w-[36rem] xl:justify-end">
              <div className="w-full md:max-w-[12rem]">
                <Select
                  id="user-status"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="h-10 rounded-lg border-border bg-background text-sm"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="w-full md:max-w-[12rem]">
                <Select
                  id="user-type"
                  value={userTypeFilter}
                  onChange={(event) => setUserTypeFilter(event.target.value)}
                  className="h-10 rounded-lg border-border bg-background text-sm"
                >
                  {userTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="flex md:ml-2">
                <Button size="sm">Add User</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-primary-light text-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">User</th>
                <th className="px-4 py-3 font-semibold">User Type</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Mobile</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">City</th>
                <th className="px-4 py-3 font-semibold">Last Active</th>
                <th className="px-4 py-3 font-semibold">Total Orders</th>
                <th className="px-4 py-3 font-semibold">Wallet Balance</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.userId} className="border-t border-border bg-surface">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                        {user.name
                          .split(" ")
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted">{user.userId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">{user.userType}</td>
                  <td className="px-4 py-3 text-muted">{user.email}</td>
                  <td className="px-4 py-3 text-muted">{user.mobileNumber}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusBadgeMap[user.status] || "default"}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted">{user.city}</td>
                  <td className="px-4 py-3 text-muted">{user.lastActive}</td>
                  <td className="px-4 py-3 text-foreground">{user.totalOrders}</td>
                  <td className="px-4 py-3 text-foreground">₹{user.walletBalance}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary-light"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-background p-8 text-center text-sm text-muted">
            No users found for the selected search and filter.
          </div>
        )}
      </div>
    </section>
  );
}

export default User;