import { useMemo, useState } from "react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Select from "../components/ui/Select";
import { deliveryPartnerStats, deliveryPartners } from "../mock/vayzoApiMock";

const statusBadgeMap = {
  ACTIVE: "success",
  VERIFIED: "info",
  PENDING: "warning",
  BLOCKED: "danger",
};

const statusOptions = ["All Status", "Active", "Verified", "Pending", "Blocked"];
const vehicleTypeOptions = [
  "All Vehicle Type",
  "Bike",
  "Car",
  "Auto",
  "Scooter",
];

function DeliveryPartner() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("All Vehicle Type");

  const filteredPartners = useMemo(() => {
    const normalizedQuery = searchText.trim().toLowerCase();

    return deliveryPartners.filter((partner) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        [
          partner.name,
          partner.email,
          partner.mobileNumber,
          partner.partnerId,
          partner.vehicleType,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesStatus =
        statusFilter === "All Status" ||
        partner.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesVehicleType =
        vehicleTypeFilter === "All Vehicle Type" ||
        partner.vehicleType === vehicleTypeFilter;

      return matchesSearch && matchesStatus && matchesVehicleType;
    });
  }, [searchText, statusFilter, vehicleTypeFilter]);

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="space-y-6 rounded-xl border border-border bg-surface p-4 sm:p-6">
        <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Dashboard {'>'} Delivery Partners
            </div>
            <h1 className="mt-2 text-2xl font-semibold text-foreground">
              Delivery Partners List
            </h1>
            <p className="mt-1 text-sm text-muted">
              Manage delivery agents, check availability, and track performance.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary">Refresh</Button>
            <Button>Add Partner</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {deliveryPartnerStats.map(({ label, value, trend }) => (
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

        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full max-w-xl">
            <Input
              id="partner-search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search by name, email, mobile, vehicle or partner ID"
            />
          </div>

          <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <div className="w-full max-w-xs">
              <Select
                id="partner-status"
                label="Status"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>

            <div className="w-full max-w-xs">
              <Select
                id="partner-vehicle-type"
                label="Vehicle Type"
                value={vehicleTypeFilter}
                onChange={(event) => setVehicleTypeFilter(event.target.value)}
              >
                {vehicleTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-primary-light text-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Partner</th>
                <th className="px-4 py-3 font-semibold">Vehicle Type</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Mobile</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">City</th>
                <th className="px-4 py-3 font-semibold">Last Active</th>
                <th className="px-4 py-3 font-semibold">Orders</th>
                <th className="px-4 py-3 font-semibold">Rating</th>
                <th className="px-4 py-3 font-semibold">Earnings</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPartners.map((partner) => (
                <tr key={partner.partnerId} className="border-t border-border bg-surface">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                        {partner.name
                          .split(" ")
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{partner.name}</p>
                        <p className="text-xs text-muted">{partner.partnerId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">{partner.vehicleType}</td>
                  <td className="px-4 py-3 text-muted">{partner.email}</td>
                  <td className="px-4 py-3 text-muted">{partner.mobileNumber}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusBadgeMap[partner.status] || "default"}>
                      {partner.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted">{partner.city}</td>
                  <td className="px-4 py-3 text-muted">{partner.lastActive}</td>
                  <td className="px-4 py-3 text-foreground">{partner.ordersCompleted}</td>
                  <td className="px-4 py-3 text-foreground">{partner.rating.toFixed(1)}</td>
                  <td className="px-4 py-3 text-foreground">₹{partner.earnings}</td>
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

        {filteredPartners.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-background p-8 text-center text-sm text-muted">
            No delivery partners found for the selected search and filter.
          </div>
        )}
      </div>
    </section>
  );
}

export default DeliveryPartner;
