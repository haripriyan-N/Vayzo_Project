import { useState } from "react";
import { Star } from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { restaurants, restaurantStats } from "../mock/vayzoApiMock";

function Restaurants() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All Status");
  const [filtered, setFiltered] = useState(restaurants);

  const handleSearch = (value) => {
    setQuery(value);
    const results = restaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(value.toLowerCase()) ||
        r.owner.toLowerCase().includes(value.toLowerCase())
    );
    const statusFiltered =
      status === "All Status" ? results : results.filter((r) => r.status === status);
    setFiltered(statusFiltered);
  };

  const handleStatus = (value) => {
    setStatus(value);
    const results =
      value === "All Status"
        ? restaurants
        : restaurants.filter((r) => r.status === value);
    const searchFiltered = results.filter(
      (r) =>
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.owner.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(searchFiltered);
  };

  const badgeVariant = { Active: "success", Inactive: "warning" };

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <p className="text-xs text-muted">Dashboard &gt; Restaurants</p>
            <h1 className="mt-1 text-2xl font-semibold text-foreground">
              Restaurants
            </h1>
          </div>
          <Button size="sm">+ Add Restaurant</Button>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {restaurantStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-surface p-3 shadow-sm"
            >
              <span className="text-xs text-muted">{stat.label}</span>
              <div className="mt-2 flex items-end justify-between">
                <b className="text-lg text-foreground">{stat.value}</b>
                <span className="text-[10px] text-emerald-600">↑ {stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1.5fr_0.7fr_auto]">
            <Input
              id="restaurant-search"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by restaurant name or owner..."
              className="h-10 text-xs"
            />
            <Select
              id="restaurant-status"
              value={status}
              onChange={(e) => handleStatus(e.target.value)}
              className="h-10 text-xs"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </Select>
            <Button variant="secondary" size="sm">
              Export
            </Button>
          </div>

          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <colgroup>
                <col className="w-[14%]" />
                <col className="w-[14%]" />
                <col className="w-[14%]" />
                <col className="w-[10%]" />
                <col className="w-[10%]" />
                <col className="w-[12%]" />
                <col className="w-[13%]" />
                <col className="w-[13%]" />
              </colgroup>
              <thead className="bg-primary-light">
                <tr>
                  {[
                    "Restaurant",
                    "Owner",
                    "Location",
                    "Cuisine",
                    "Status",
                    "Rating",
                    "Orders",
                    "Revenue",
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
                {filtered.map((rest) => (
                  <tr
                    key={rest.restaurantId}
                    className="border-t border-border hover:bg-primary-light/40"
                  >
                    <td className="truncate px-2 py-3 font-medium text-foreground">
                      {rest.name}
                    </td>
                    <td className="truncate px-2 py-3 text-muted">{rest.owner}</td>
                    <td className="truncate px-2 py-3 text-[10px] text-muted">
                      {rest.location}
                    </td>
                    <td className="px-2 py-3 text-muted">{rest.cuisine}</td>
                    <td className="px-2 py-3">
                      <Badge
                        variant={badgeVariant[rest.status]}
                        className="h-5 text-[9px]"
                      >
                        {rest.status}
                      </Badge>
                    </td>
                    <td className="px-2 py-3 text-foreground">
                      <div className="flex items-center gap-1">
                        {rest.rating} <Star size={12} className="text-yellow-500" />
                      </div>
                    </td>
                    <td className="px-2 py-3 text-foreground">{rest.orders}</td>
                    <td className="px-2 py-3 font-medium text-foreground">
                      ₹{(rest.revenue / 100000).toFixed(1)}L
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

export default Restaurants;
