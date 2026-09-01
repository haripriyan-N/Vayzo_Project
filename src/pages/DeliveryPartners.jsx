import { Eye, MapPin, Search, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";

import {
  deliveryPartners,
  deliveryPartnerStats,
} from "../mock/deliveryPartners";

const statusBadgeMap = {
  ACTIVE: "success",
  VERIFIED: "info",
  PENDING: "warning",
  BLOCKED: "danger",
};

function DeliveryPartners() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [vehicleType, setVehicleType] = useState("ALL");

  const filteredPartners = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return deliveryPartners.filter((partner) => {
      const matchesSearch =
        !searchValue ||
        partner.name.toLowerCase().includes(searchValue) ||
        partner.partnerId.toLowerCase().includes(searchValue) ||
        partner.email.toLowerCase().includes(searchValue) ||
        partner.mobileNumber.toLowerCase().includes(searchValue);

      const matchesStatus = status === "ALL" || partner.status === status;

      const matchesVehicle =
        vehicleType === "ALL" || partner.vehicleType === vehicleType;

      return matchesSearch && matchesStatus && matchesVehicle;
    });
  }, [search, status, vehicleType]);

  const handleViewPartner = (partnerId) => {
    navigate(`/dashboard/Delivery/Partner/${partnerId}`);
  };

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="space-y-5">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted">
              Dashboard &gt; Delivery Partners
            </p>

            <h1 className="mt-1 text-2xl font-semibold text-foreground">
              Delivery Partners
            </h1>

            <p className="mt-1 text-sm text-muted">
              Manage and monitor all delivery partners.
            </p>
          </div>

          <Button size="sm">+ Add Partner</Button>
        </header>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {deliveryPartnerStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-surface p-4 shadow-sm"
            >
              <p className="text-xs text-muted">{stat.label}</p>

              <div className="mt-2 flex items-end justify-between gap-2">
                <p className="text-2xl font-semibold text-foreground">
                  {stat.value}
                </p>

                <span className="text-xs font-medium text-success">
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">
            <div className="relative">
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />

              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search partner..."
                className="pl-9"
              />
            </div>

            <Select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              options={[
                { label: "All Status", value: "ALL" },
                { label: "Active", value: "ACTIVE" },
                { label: "Verified", value: "VERIFIED" },
                { label: "Pending", value: "PENDING" },
                { label: "Blocked", value: "BLOCKED" },
              ]}
            />

            <Select
              value={vehicleType}
              onChange={(event) => setVehicleType(event.target.value)}
              options={[
                { label: "All Vehicles", value: "ALL" },
                { label: "Bike", value: "Bike" },
                { label: "Car", value: "Car" },
                { label: "Auto", value: "Auto" },
              ]}
            />
          </div>
        </div>

        {/* Partners Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-border bg-background">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold text-muted">
                    Partner
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold text-muted">
                    Contact
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold text-muted">
                    Vehicle
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold text-muted">
                    Location
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold text-muted">
                    Orders
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold text-muted">
                    Rating
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold text-muted">
                    Status
                  </th>

                  <th className="px-4 py-3 text-right text-xs font-semibold text-muted">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filteredPartners.map((partner) => (
                  <tr
                    key={partner.partnerId}
                    className="transition hover:bg-primary-light/40"
                  >
                    {/* Partner */}
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => handleViewPartner(partner.partnerId)}
                        className="flex items-center gap-3 text-left"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                          {partner.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-foreground">
                            {partner.name}
                          </p>

                          <p className="text-xs text-muted">
                            {partner.partnerId}
                          </p>
                        </div>
                      </button>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-4">
                      <p className="text-xs font-medium text-foreground">
                        {partner.mobileNumber}
                      </p>

                      <p className="mt-1 max-w-[180px] truncate text-xs text-muted">
                        {partner.email}
                      </p>
                    </td>

                    {/* Vehicle */}
                    <td className="px-4 py-4">
                      <p className="font-medium text-foreground">
                        {partner.vehicleType}
                      </p>
                    </td>

                    {/* Location */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-muted">
                        <MapPin size={14} />
                        {partner.city}
                      </div>
                    </td>

                    {/* Orders */}
                    <td className="px-4 py-4">
                      <span className="font-semibold text-foreground">
                        {partner.ordersCompleted}
                      </span>
                    </td>

                    {/* Rating */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-xs font-medium text-foreground">
                        <Star
                          size={14}
                          className="text-amber-500"
                          fill="currentColor"
                        />
                        {partner.rating.toFixed(1)}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <Badge variant={statusBadgeMap[partner.status] || "info"}>
                        {partner.status}
                      </Badge>

                      <p className="mt-1 text-[11px] text-muted">
                        {partner.lastActive}
                      </p>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleViewPartner(partner.partnerId)}
                        className="inline-flex items-center gap-1.5 rounded-lg p-2 text-muted transition hover:bg-primary-light hover:text-primary"
                        aria-label={`View ${partner.name}`}
                      >
                        <Eye size={17} />
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Empty State */}
                {filteredPartners.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center">
                      <p className="font-medium text-foreground">
                        No delivery partners found
                      </p>

                      <p className="mt-1 text-xs text-muted">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeliveryPartners;
