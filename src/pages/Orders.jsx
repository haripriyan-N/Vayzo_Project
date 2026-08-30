import {
  CheckCircle,
  Clock3,
  Download,
  Eye,
  MoreVertical,
  Package,
  Truck,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { getOrders } from "../api/ordersApi";

const statusMap = {
  DELIVERED: "success",
  IN_TRANSIT: "info",
  PREPARING: "warning",
  PENDING: "warning",
  CANCELLED: "danger",
  REFUNDED: "default",
};

const statusLabel = (status = "") => status.replaceAll("_", " ");

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const statIcons = [Package, Clock3, Truck, CheckCircle, XCircle];

const statLabels = [
  "Total Orders",
  "Pending",
  "On The Way",
  "Delivered",
  "Cancelled",
];

const tabs = [
  "All Orders",
  "Pending",
  "On The Way",
  "Delivered",
  "Cancelled",
  "Refunded",
];

const statusOptions = [
  "All Status",
  "Delivered",
  "In Transit",
  "Preparing",
  "Pending",
  "Cancelled",
];

const paymentOptions = ["All Payment Status", "Paid", "Pending", "Refunded"];

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All Status");
  const [payment, setPayment] = useState("All Payment Status");
  const [tab, setTab] = useState("All Orders");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getOrders();

      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getOrders();

        if (isMounted) {
          setOrders(data);
        }
      } catch (err) {
        console.error(err);

        if (isMounted) {
          setError("Unable to load orders.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchText = [
        order.orderId,
        order.customerName,
        order.deliveryPartner,
        order.city,
        order.restaurantName,
        order.mobileNumber,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const searchValue = query.trim().toLowerCase();

      const matchesSearch = !searchValue || searchText.includes(searchValue);

      const matchesStatus =
        status === "All Status" ||
        statusLabel(order.status).toLowerCase() === status.toLowerCase();

      const matchesPayment =
        payment === "All Payment Status" ||
        order.paymentStatus?.toLowerCase() === payment.toLowerCase();

      let matchesTab = true;

      if (tab !== "All Orders") {
        const tabStatus =
          tab === "On The Way"
            ? "IN_TRANSIT"
            : tab.toUpperCase().replaceAll(" ", "_");

        matchesTab = order.status === tabStatus;
      }

      const orderDate = order.orderDate ? order.orderDate.slice(0, 10) : "";

      const matchesFromDate = !fromDate || orderDate >= fromDate;

      const matchesToDate = !toDate || orderDate <= toDate;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment &&
        matchesTab &&
        matchesFromDate &&
        matchesToDate
      );
    });
  }, [orders, query, status, payment, tab, fromDate, toDate]);

  const resetFilters = () => {
    setQuery("");
    setStatus("All Status");
    setPayment("All Payment Status");
    setTab("All Orders");
    setFromDate("");
    setToDate("");
  };

  const stats = [
    ["Total Orders", orders.length],
    ["Pending", orders.filter((order) => order.status === "PENDING").length],
    [
      "On The Way",
      orders.filter((order) => order.status === "IN_TRANSIT").length,
    ],
    [
      "Delivered",
      orders.filter((order) => order.status === "DELIVERED").length,
    ],
    [
      "Cancelled",
      orders.filter((order) => order.status === "CANCELLED").length,
    ],
  ];

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="space-y-4">
        {/* Page Header */}
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <p className="text-xs text-muted">Dashboard &gt; Orders</p>

            <h1 className="mt-1 text-2xl font-semibold text-foreground">
              Orders
            </h1>

            <p className="mt-1 text-sm text-muted">
              Track customer orders, delivery flow, and payment status.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={loadOrders}
            >
              Refresh
            </Button>

            <Button size="sm" type="button">
              + Add Order
            </Button>
          </div>
        </header>

        {/* Statistics */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map(([label, value], index) => {
            const Icon = statIcons[index];

            return (
              <div
                key={label}
                className="rounded-xl border border-border bg-surface p-3 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Icon size={17} strokeWidth={1.8} className="text-primary" />

                  <span className="text-xs text-muted">{label}</span>
                </div>

                <div className="mt-2">
                  <span className="text-xl font-semibold text-foreground">
                    {loading ? "--" : value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[1.5fr_0.7fr_0.8fr_1fr_auto]">
            <Input
              id="order-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by Order ID, Customer, Partner..."
              className="h-10 text-xs"
            />

            <Select
              id="order-status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="h-10 text-xs"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>

            <Select
              id="payment-status"
              value={payment}
              onChange={(event) => setPayment(event.target.value)}
              className="h-10 text-xs"
            >
              {paymentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>

            <div className="grid grid-cols-2 gap-2">
              <Input
                id="order-from"
                type="date"
                value={fromDate}
                onChange={(event) => setFromDate(event.target.value)}
                className="h-10 min-w-0 px-2 text-[10px]"
              />

              <Input
                id="order-to"
                type="date"
                value={toDate}
                onChange={(event) => setToDate(event.target.value)}
                className="h-10 min-w-0 px-2 text-[10px]"
              />
            </div>

            <Button variant="secondary" size="sm" type="button">
              <Download size={14} className="mr-1" />
              Export
            </Button>
          </div>

          {/* Status Tabs */}
          <nav className="mt-4 flex gap-5 overflow-x-auto border-b border-border scrollbar-none">
            {tabs.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={`whitespace-nowrap border-b-2 px-1 pb-2 text-xs font-semibold transition ${
                  tab === item
                    ? "border-primary text-primary"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Table Card */}
        <div className="w-full overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
          {loading && (
            <div className="p-10 text-center">
              <p className="text-sm text-muted">Loading orders...</p>
            </div>
          )}

          {!loading && error && (
            <div className="p-10 text-center">
              <p className="text-sm font-medium text-danger">{error}</p>

              <Button
                variant="secondary"
                size="sm"
                type="button"
                className="mt-3"
                onClick={loadOrders}
              >
                Try Again
              </Button>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[950px] border-collapse text-left text-xs">
                  <thead className="bg-primary-light text-foreground">
                    <tr>
                      {[
                        "Order ID",
                        "Customer",
                        "Items",
                        "Delivery Partner",
                        "Amount",
                        "Payment",
                        "Status",
                        "Order Time",
                        "Actions",
                      ].map((heading) => (
                        <th key={heading} className="px-3 py-3 font-semibold">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.orderId}
                        className="border-t border-border transition hover:bg-background/60"
                      >
                        {/* Order ID */}
                        <td className="whitespace-nowrap px-3 py-3 font-medium text-foreground">
                          #{order.orderId}
                        </td>

                        {/* Customer */}
                        <td className="px-3 py-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-white">
                              {initials(order.customerName)}
                            </span>

                            <span className="truncate font-medium text-foreground">
                              {order.customerName || "--"}
                            </span>
                          </div>
                        </td>

                        {/* Items / Restaurant */}
                        <td className="max-w-[160px] truncate px-3 py-3 text-muted">
                          {order.restaurantName || "--"}
                        </td>

                        {/* Delivery Partner */}
                        <td className="px-3 py-3 text-muted">
                          {order.deliveryPartner || "--"}
                        </td>

                        {/* Amount */}
                        <td className="whitespace-nowrap px-3 py-3 font-medium text-foreground">
                          ₹{order.amount ?? "--"}
                        </td>

                        {/* Payment */}
                        <td className="px-3 py-3">
                          <Badge
                            variant={
                              order.paymentStatus === "PAID"
                                ? "success"
                                : order.paymentStatus === "REFUNDED"
                                  ? "default"
                                  : "warning"
                            }
                            className="h-5 px-2 text-[9px]"
                          >
                            {order.paymentStatus || "--"}
                          </Badge>
                        </td>

                        {/* Status */}
                        <td className="px-3 py-3">
                          <Badge
                            variant={statusMap[order.status] || "default"}
                            className="h-5 px-2 text-[9px]"
                          >
                            {statusLabel(order.status) || "--"}
                          </Badge>
                        </td>

                        {/* Order Time */}
                        <td className="whitespace-nowrap px-3 py-3 text-muted">
                          {order.orderDate || "--"}
                        </td>

                        {/* Actions */}
                        <td className="px-3 py-3">
                          <div className="flex gap-1">
                            <button
                              type="button"
                              aria-label={`View ${order.orderId}`}
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-primary transition hover:bg-primary-light"
                            >
                              <Eye size={14} />
                            </button>

                            <button
                              type="button"
                              aria-label={`More actions for ${order.orderId}`}
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-primary transition hover:bg-primary-light"
                            >
                              <MoreVertical size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {!filteredOrders.length && (
                <div className="p-8 text-center">
                  <p className="text-sm font-medium text-foreground">
                    No orders found
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    Try changing your search or filters.
                  </p>
                </div>
              )}

              {/* Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 text-xs text-muted">
                <span>
                  Showing {filteredOrders.length ? 1 : 0} to{" "}
                  {filteredOrders.length} of {orders.length} orders
                </span>

                <div className="flex gap-1">
                  <Button variant="secondary" size="sm" type="button">
                    1
                  </Button>

                  <Button variant="secondary" size="sm" type="button">
                    2
                  </Button>

                  <Button variant="secondary" size="sm" type="button">
                    3
                  </Button>

                  <Button variant="secondary" size="sm" type="button">
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Orders;
