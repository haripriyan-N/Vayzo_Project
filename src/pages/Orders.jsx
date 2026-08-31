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
import { useNavigate } from "react-router-dom";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { getOrders } from "../api/ordersApi";

const STATUS_MAP = {
  DELIVERED: "success",
  IN_TRANSIT: "info",
  PREPARING: "warning",
  PENDING: "warning",
  CANCELLED: "danger",
  REFUNDED: "default",
};

const TABS = [
  "All Orders",
  "Pending",
  "On The Way",
  "Delivered",
  "Cancelled",
  "Refunded",
];

const STATUS_OPTIONS = [
  "All Status",
  "Delivered",
  "In Transit",
  "Preparing",
  "Pending",
  "Cancelled",
];

const PAYMENT_OPTIONS = ["All Payment Status", "Paid", "Pending", "Refunded"];

const STAT_CONFIG = [
  {
    label: "Total Orders",
    key: "total",
    icon: Package,
  },
  {
    label: "Pending",
    key: "pending",
    icon: Clock3,
  },
  {
    label: "On The Way",
    key: "inTransit",
    icon: Truck,
  },
  {
    label: "Delivered",
    key: "delivered",
    icon: CheckCircle,
  },
  {
    label: "Cancelled",
    key: "cancelled",
    icon: XCircle,
  },
];

const formatStatus = (status = "") => status.replaceAll("_", " ");

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const getDateOnly = (date = "") => {
  if (!date) return "";

  // Supports:
  // 2026-08-27
  // 2026-08-27 11:20
  // 2026-08-27T11:20
  return date.slice(0, 10);
};

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All Status");
  const [payment, setPayment] = useState("All Payment Status");
  const [activeTab, setActiveTab] = useState("All Orders");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");


  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getOrders();

      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load orders:", err);
      setError("Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getOrders();

        if (mounted) {
          setOrders(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Failed to load orders:", err);

        if (mounted) {
          setError("Unable to load orders.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchOrders();

    return () => {
      mounted = false;
    };
  }, []);

  /* --------------------------------
     Statistics
  -------------------------------- */

  const stats = useMemo(() => {
    return {
      total: orders.length,

      pending: orders.filter((order) => order.status === "PENDING").length,

      inTransit: orders.filter((order) => order.status === "IN_TRANSIT").length,

      delivered: orders.filter((order) => order.status === "DELIVERED").length,

      cancelled: orders.filter((order) => order.status === "CANCELLED").length,
    };
  }, [orders]);

  /* --------------------------------
     Filtering
  -------------------------------- */

  const filteredOrders = useMemo(() => {
    const searchValue = query.trim().toLowerCase();

    return orders.filter((order) => {
      const searchableText = [
        order.orderId,
        order.customerName,
        order.restaurantName,
        order.deliveryPartner,
        order.city,
        order.paymentStatus,
        order.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !searchValue || searchableText.includes(searchValue);

      const matchesStatus =
        status === "All Status" ||
        formatStatus(order.status).toLowerCase() === status.toLowerCase();

      const matchesPayment =
        payment === "All Payment Status" ||
        order.paymentStatus?.toLowerCase() === payment.toLowerCase();

      let matchesTab = true;

      if (activeTab !== "All Orders") {
        const tabStatus =
          activeTab === "On The Way"
            ? "IN_TRANSIT"
            : activeTab.toUpperCase().replaceAll(" ", "_");

        matchesTab = order.status === tabStatus;
      }

      const orderDate = getDateOnly(order.orderDate);

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
  }, [orders, query, status, payment, activeTab, fromDate, toDate]);

  /* --------------------------------
     Reset
  -------------------------------- */

  const resetFilters = () => {
    setQuery("");
    setStatus("All Status");
    setPayment("All Payment Status");
    setActiveTab("All Orders");
    setFromDate("");
    setToDate("");
  };

  const hasFilters =
    query ||
    status !== "All Status" ||
    payment !== "All Payment Status" ||
    activeTab !== "All Orders" ||
    fromDate ||
    toDate;

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="space-y-4">
        {/* =========================
            Statistics
        ========================== */}

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {STAT_CONFIG.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.key}
                className="rounded-xl border border-border bg-surface p-3 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Icon size={17} strokeWidth={1.8} className="text-primary" />

                  <span className="text-xs text-muted">{stat.label}</span>
                </div>

                <div className="mt-2">
                  <span className="text-xl font-semibold text-foreground">
                    {loading ? "--" : stats[stat.key]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================
            Filters
        ========================== */}

        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[1.5fr_0.7fr_0.8fr_1fr_auto]">
            {/* Search */}

            <Input
              id="order-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by Order ID, Customer, Partner..."
              className="h-10 text-xs"
            />

            {/* Status */}

            <Select
              id="order-status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="h-10 text-xs"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>

            {/* Payment */}

            <Select
              id="payment-status"
              value={payment}
              onChange={(event) => setPayment(event.target.value)}
              className="h-10 text-xs"
            >
              {PAYMENT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>

            {/* Date */}

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

            {/* Export */}

            <Button variant="secondary" size="sm" type="button">
              <Download size={14} className="mr-1" />
              Export
            </Button>
          </div>

          {/* =========================
              Status Tabs
          ========================== */}

          <nav className="mt-4 flex gap-5 overflow-x-auto border-b border-border scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap border-b-2 px-1 pb-2 text-xs font-semibold transition ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Clear Filters */}

          {hasFilters && (
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-medium text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* =========================
            Orders Table
        ========================== */}

        <div className="w-full overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
          {/* Loading */}

          {loading && (
            <div className="p-10 text-center">
              <p className="text-sm text-muted">Loading orders...</p>
            </div>
          )}

          {/* Error */}

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

          {/* Data */}

          {!loading && !error && (
            <>
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[950px] border-collapse text-left text-xs">
                  <thead className="bg-primary-light text-foreground">
                    <tr>
                      <th className="px-3 py-3 font-semibold">Order ID</th>

                      <th className="px-3 py-3 font-semibold">Customer</th>

                      <th className="px-3 py-3 font-semibold">Restaurant</th>

                      <th className="px-3 py-3 font-semibold">
                        Delivery Partner
                      </th>

                      <th className="px-3 py-3 font-semibold">Amount</th>

                      <th className="px-3 py-3 font-semibold">Payment</th>

                      <th className="px-3 py-3 font-semibold">Status</th>

                      <th className="px-3 py-3 font-semibold">Order Time</th>

                      <th className="px-3 py-3 font-semibold">Actions</th>
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
                          #{order.orderId || "--"}
                        </td>

                        {/* Customer */}

                        <td className="px-3 py-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-white">
                              {getInitials(order.customerName) || "--"}
                            </span>

                            <span className="truncate font-medium text-foreground">
                              {order.customerName || "--"}
                            </span>
                          </div>
                        </td>

                        {/* Restaurant */}

                        <td className="max-w-[180px] truncate px-3 py-3 text-muted">
                          {order.restaurantName || "--"}
                        </td>

                        {/* Delivery Partner */}

                        <td className="px-3 py-3 text-muted">
                          {order.deliveryPartner || "--"}
                        </td>

                        {/* Amount */}

                        <td className="whitespace-nowrap px-3 py-3 font-medium text-foreground">
                          {order.amount !== undefined && order.amount !== null
                            ? `₹${Number(order.amount).toLocaleString("en-IN")}`
                            : "--"}
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
                            variant={STATUS_MAP[order.status] || "default"}
                            className="h-5 px-2 text-[9px]"
                          >
                            {formatStatus(order.status) || "--"}
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
                              onClick={() =>
                                navigate(`/orders/${order.orderId}`)
                              }
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

              {/* Empty */}

              {!filteredOrders.length && (
                <div className="p-10 text-center">
                  <Package size={30} className="mx-auto text-muted" />

                  <p className="mt-3 text-sm font-medium text-foreground">
                    No orders found
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    Try changing your search or filters.
                  </p>

                  {hasFilters && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-3 text-xs font-semibold text-primary hover:underline"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              )}

              {/* Footer */}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 text-xs text-muted">
                <span>
                  Showing {filteredOrders.length} of {orders.length} orders
                </span>
              </div>
            </>
          )}
        </div>

        {/* =========================
            Order Details Modal
        ========================== */}

        
      </div>
    </section>
  );
}

export default Orders;
