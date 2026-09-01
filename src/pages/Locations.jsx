import { useState } from "react";
import { MapPin } from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { locations, locationStats } from "../mock/vayzoApiMock";

function Locations() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(locations);

  const handleSearch = (value) => {
    setQuery(value);
    const results = locations.filter(
      (loc) =>
        loc.name.toLowerCase().includes(value.toLowerCase()) ||
        loc.city.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(results);
  };

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <p className="text-xs text-muted">Dashboard &gt; Locations</p>
            <h1 className="mt-1 text-2xl font-semibold text-foreground">
              Locations
            </h1>
          </div>
          <Button size="sm">+ Add Location</Button>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {locationStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-surface p-3 shadow-sm"
            >
              <span className="text-xs text-muted">{stat.label}</span>
              <div className="mt-2 flex items-end justify-between">
                <b className="text-xl text-foreground">{stat.value}</b>
                <span className="text-[10px] text-emerald-600">↑ {stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1.5fr_0.7fr_auto]">
            <Input
              id="location-search"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by location name or city..."
              className="h-10 text-xs"
            />
            <Select id="location-status" className="h-10 text-xs">
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
                <col className="w-[15%]" />
                <col className="w-[15%]" />
                <col className="w-[15%]" />
                <col className="w-[12%]" />
                <col className="w-[12%]" />
                <col className="w-[18%]" />
                <col className="w-[13%]" />
              </colgroup>
              <thead className="bg-primary-light">
                <tr>
                  {[
                    "Location Name",
                    "City",
                    "State",
                    "Status",
                    "Restaurants",
                    "Total Orders",
                    "Partners",
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
                {filtered.map((loc) => (
                  <tr
                    key={loc.locationId}
                    className="border-t border-border hover:bg-primary-light/40"
                  >
                    <td className="px-2 py-3 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-primary" />
                        {loc.name}
                      </div>
                    </td>
                    <td className="px-2 py-3 text-muted">{loc.city}</td>
                    <td className="px-2 py-3 text-muted">{loc.state}</td>
                    <td className="px-2 py-3">
                      <Badge variant="success" className="h-5 text-[9px]">
                        {loc.status}
                      </Badge>
                    </td>
                    <td className="px-2 py-3 text-foreground">
                      {loc.restaurants}
                    </td>
                    <td className="px-2 py-3 text-foreground">
                      {loc.orders.toLocaleString()}
                    </td>
                    <td className="px-2 py-3 text-foreground">
                      {loc.deliveryPartners}
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

export default Locations;
