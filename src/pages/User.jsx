import { useMemo, useState } from "react";
import {
  MapPin,
  Plus,
  RotateCcw,
  Search,
  Users,
} from "lucide-react";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import { userStats, users } from "../mock/vayzoApiMock";

const statusStyles = {
  ACTIVE: "bg-emerald-100 text-emerald-700",
  VERIFIED: "bg-sky-100 text-sky-700",
  PENDING: "bg-amber-100 text-amber-700",
  BLOCKED: "bg-rose-100 text-rose-700",
};

function User() {
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();

    if (!normalisedQuery) {
      return users;
    }

    return users.filter(({ name, email, mobileNumber, city }) =>
      [name, email, mobileNumber, city]
        .join(" ")
        .toLowerCase()
        .includes(normalisedQuery),
    );
  }, [query]);

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Users
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-foreground">
              Customer Accounts
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" className="gap-2">
              <RotateCcw size={16} />
              Refresh
            </Button>
            <Button className="gap-2">
              <Plus size={16} />
              Add User
            </Button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {userStats.map(({ label, value, trend }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-background p-4"
            >
              <p className="text-xs text-muted">{label}</p>
              <div className="mt-3 flex items-end justify-between gap-2">
                <span className="text-2xl font-semibold text-foreground">{value}</span>
                <span className="text-xs font-medium text-emerald-600">{trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-xl">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <Input
              aria-label="Search users"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search user by name, email or mobile"
              className="w-full pl-10"
            />
          </div>

          <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted">
            <Users size={16} className="text-primary" />
            {filteredUsers.length} results
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-border">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-primary-light text-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Mobile</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold">Last Active</th>
                  <th className="px-4 py-3 font-semibold">Orders</th>
                  <th className="px-4 py-3 font-semibold">Wallet</th>
                  <th className="px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const initials = user.name
                    .split(" ")
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join("")
                    .toUpperCase();

                  return (
                    <tr key={user.userId} className="border-t border-border bg-surface">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                            {initials}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-xs text-muted">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted">{user.mobileNumber}</td>
                      <td className="px-4 py-3">
                        <span
                          className={[
                            "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                            statusStyles[user.status] ?? "bg-slate-100 text-slate-600",
                          ].join(" ")}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="inline-flex items-center gap-1 text-muted">
                          <MapPin size={14} className="text-primary" />
                          {user.city}
                        </div>
                      </td>
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
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="p-8 text-center text-sm text-muted">
              No users match your search. Try another name, email, or mobile number.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default User;