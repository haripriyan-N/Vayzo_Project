import { useState } from "react";
import { Tag } from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { offers, offerStats } from "../mock/vayzoApiMock";

function Offers() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All Status");
  const [filtered, setFiltered] = useState(offers);

  const handleSearch = (value) => {
    setQuery(value);
    const results = offers.filter(
      (o) =>
        o.title.toLowerCase().includes(value.toLowerCase()) ||
        o.code.toLowerCase().includes(value.toLowerCase())
    );
    const statusFiltered =
      status === "All Status" ? results : results.filter((o) => o.status === status);
    setFiltered(statusFiltered);
  };

  const handleStatus = (value) => {
    setStatus(value);
    const results =
      value === "All Status"
        ? offers
        : offers.filter((o) => o.status === value);
    const searchFiltered = results.filter(
      (o) =>
        o.title.toLowerCase().includes(query.toLowerCase()) ||
        o.code.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(searchFiltered);
  };

  const badgeVariant = { Active: "success", Expired: "danger" };

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <p className="text-xs text-muted">Dashboard &gt; Offers & Coupons</p>
            <h1 className="mt-1 text-2xl font-semibold text-foreground">
              Offers & Coupons
            </h1>
          </div>
          <Button size="sm">+ Add Offer</Button>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {offerStats.map((stat) => (
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
              id="offer-search"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by offer title or code..."
              className="h-10 text-xs"
            />
            <Select
              id="offer-status"
              value={status}
              onChange={(e) => handleStatus(e.target.value)}
              className="h-10 text-xs"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Expired</option>
            </Select>
            <Button variant="secondary" size="sm">
              Export
            </Button>
          </div>

          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <colgroup>
                <col className="w-[16%]" />
                <col className="w-[10%]" />
                <col className="w-[12%]" />
                <col className="w-[12%]" />
                <col className="w-[12%]" />
                <col className="w-[12%]" />
                <col className="w-[10%]" />
                <col className="w-[16%]" />
              </colgroup>
              <thead className="bg-primary-light">
                <tr>
                  {[
                    "Offer Title",
                    "Code",
                    "Type",
                    "Value",
                    "Valid From",
                    "Valid Upto",
                    "Status",
                    "Uses",
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
                {filtered.map((offer) => (
                  <tr
                    key={offer.offerId}
                    className="border-t border-border hover:bg-primary-light/40"
                  >
                    <td className="truncate px-2 py-3 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <Tag size={14} className="text-primary" />
                        {offer.title}
                      </div>
                    </td>
                    <td className="px-2 py-3 font-mono text-foreground">
                      {offer.code}
                    </td>
                    <td className="px-2 py-3 text-muted">{offer.type}</td>
                    <td className="px-2 py-3 font-medium text-foreground">
                      {offer.value > 0 ? `${offer.value}%` : "Free"}
                    </td>
                    <td className="px-2 py-3 text-[10px] text-muted">
                      {offer.validFrom}
                    </td>
                    <td className="px-2 py-3 text-[10px] text-muted">
                      {offer.validUpto}
                    </td>
                    <td className="px-2 py-3">
                      <Badge
                        variant={badgeVariant[offer.status] || "default"}
                        className="h-5 text-[9px]"
                      >
                        {offer.status}
                      </Badge>
                    </td>
                    <td className="px-2 py-3 text-foreground">
                      {offer.uses.toLocaleString()}
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

export default Offers;
