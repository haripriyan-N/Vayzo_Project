import { useState } from "react";
import { ShieldUser } from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { teamUsers, teamUserStats } from "../mock/vayzoApiMock";

function TeamUsers() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All Role");
  const [filtered, setFiltered] = useState(teamUsers);

  const handleSearch = (value) => {
    setQuery(value);
    const results = teamUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(value.toLowerCase()) ||
        u.email.toLowerCase().includes(value.toLowerCase())
    );
    const roleFiltered =
      role === "All Role" ? results : results.filter((u) => u.role === role);
    setFiltered(roleFiltered);
  };

  const handleRole = (value) => {
    setRole(value);
    const results =
      value === "All Role"
        ? teamUsers
        : teamUsers.filter((u) => u.role === value);
    const searchFiltered = results.filter(
      (u) =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(searchFiltered);
  };

  const roleColors = {
    Admin: "danger",
    Operator: "info",
    Support: "warning",
  };

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <p className="text-xs text-muted">Dashboard &gt; Team Users</p>
            <h1 className="mt-1 text-2xl font-semibold text-foreground">
              Team Users
            </h1>
          </div>
          <Button size="sm">+ Add Team User</Button>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {teamUserStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-surface p-3 shadow-sm"
            >
              <span className="text-xs text-muted">{stat.label}</span>
              <div className="mt-2 flex items-end justify-between">
                <b className="text-xl text-foreground">{stat.value}</b>
                <span className="text-[10px] text-emerald-600">
                  {stat.trend.includes("+") ? "↑" : ""} {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1.5fr_0.7fr_auto]">
            <Input
              id="team-search"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="h-10 text-xs"
            />
            <Select
              id="team-role"
              value={role}
              onChange={(e) => handleRole(e.target.value)}
              className="h-10 text-xs"
            >
              <option>All Role</option>
              <option>Admin</option>
              <option>Operator</option>
              <option>Support</option>
            </Select>
            <Button variant="secondary" size="sm">
              Export
            </Button>
          </div>

          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <colgroup>
                <col className="w-[16%]" />
                <col className="w-[18%]" />
                <col className="w-[14%]" />
                <col className="w-[14%]" />
                <col className="w-[12%]" />
                <col className="w-[13%]" />
                <col className="w-[13%]" />
              </colgroup>
              <thead className="bg-primary-light">
                <tr>
                  {[
                    "Name",
                    "Email",
                    "Role",
                    "Department",
                    "Status",
                    "Last Login",
                    "Joined Date",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-2 py-3 font-semibold text-foreground"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr
                    key={user.userId}
                    className="border-t border-border hover:bg-primary-light/40"
                  >
                    <td className="truncate px-2 py-3 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <ShieldUser size={14} className="text-primary" />
                        {user.name}
                      </div>
                    </td>
                    <td className="truncate px-2 py-3 text-muted">
                      {user.email}
                    </td>
                    <td className="px-2 py-3">
                      <Badge
                        variant={roleColors[user.role] || "default"}
                        className="h-5 text-[9px]"
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="truncate px-2 py-3 text-muted">
                      {user.department}
                    </td>
                    <td className="px-2 py-3">
                      <Badge variant="success" className="h-5 text-[9px]">
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-2 py-3 text-[10px] text-muted">
                      {user.lastLogin}
                    </td>
                    <td className="px-2 py-3 text-[10px] text-muted">
                      {user.joinedDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeamUsers;
