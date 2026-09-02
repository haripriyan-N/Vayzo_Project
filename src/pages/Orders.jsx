import {
  CheckCircle,
  Clock,
  Download,
  Eye,
  MoreVertical,
  Package,
  Truck,
  XCircle,
  CalendarDays,
  CornerDownLeft,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import StatusSelect from "../components/ui/StatusSelect";
import DateRangeInput from "../components/ui/DateRangeInput";
import StatCard from "../components/ui/StatCard";
import Table from "../components/ui/Table";
import Card from "../components/ui/Card";

import { getOrders } from "../api/ordersApi";

const STATUS_MAP = {
  DELIVERED: "success",
  IN_TRANSIT: "info",
  "ON THE WAY": "info",
  PREPARING: "warning",
  PENDING: "warning",
  CANCELLED: "danger",
  RETURNED: "default",
  REFUNDED: "default",
};

const PAYMENT_MAP = {
  PAID: "success",
  COD: "primary",
  PENDING: "warning",
};

const TABS = [
  "All Orders",
  "Pending",
  "On The Way",
  "Delivered",
  "Cancelled",
  "Returned",
];

const STATUS_OPTIONS = [
  "All Status",
  "Delivered",
  "On The Way",
  "Preparing",
  "Pending",
  "Cancelled",
  "Returned",
];

const PAYMENT_OPTIONS = ["All Payment Status", "Paid", "COD", "Pending"];

const formatStatus = (status = "") => status.replaceAll("_", " ");

const toTitleCase = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const formatDateAndTime = (dateString = "") => {
  if (!dateString) return { date: "", time: "" };
  
  // Format: "12 May 2024, 10:15 AM" or ISO
  try {
    let d;
    // Attempt to parse our mock data format "2026-08-27 11:20" or actual ISO
    if (dateString.includes(",")) {
       const parts = dateString.split(",");
       return { date: parts[0].trim(), time: parts[1].trim() };
    }
    
    // Fallback standard parse
    d = new Date(dateString);
    if (isNaN(d.getTime())) {
      // Just split string by space if invalid date
      const parts = dateString.split(" ");
      if (parts.length > 1) {
         return { 
           date: parts[0], 
           time: parts.slice(1).join(" ") 
         };
      }
      return { date: dateString, time: "" };
    }
    
    const date = d.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' });
    const time = d.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
    return { date, time };
  } catch (e) {
    return { date: dateString, time: "" };
  }
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
      setError("Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

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

      const matchesSearch = searchValue === "" || searchableText.includes(searchValue);
      
      const normalizedOrderStatus = formatStatus(order.status).toUpperCase();
      const normalizedFilterStatus = status.toUpperCase().replaceAll(" ", "_");
      const normalizedTabStatus = activeTab.toUpperCase().replaceAll(" ", "_");

      const matchesDropdown =
        status === "All Status" || normalizedOrderStatus === normalizedFilterStatus || (status === 'On The Way' && normalizedOrderStatus === 'IN_TRANSIT');
        
      const matchesTab =
        activeTab === "All Orders" || normalizedOrderStatus === normalizedTabStatus || (activeTab === 'On The Way' && normalizedOrderStatus === 'IN_TRANSIT');

      const matchesPayment =
        payment === "All Payment Status" || order.paymentStatus?.toUpperCase() === payment.toUpperCase();

      // Date filtering (simplified for mock data)
      let matchesDate = true;
      if (fromDate && order.orderDate) {
        matchesDate = new Date(order.orderDate) >= new Date(fromDate);
      }
      if (matchesDate && toDate && order.orderDate) {
        matchesDate = new Date(order.orderDate) <= new Date(toDate);
      }

      return matchesSearch && matchesDropdown && matchesTab && matchesPayment && matchesDate;
    });
  }, [orders, query, status, activeTab, payment, fromDate, toDate]);

  /* --------------------------------
     Render
  -------------------------------- */

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      
      {/* Stat Cards Row */}
      <div className="mb-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          variant="horizontal"
          title="Total Orders"
          value={orders.length > 0 ? orders.length : 12458}
          trend="12.5%"
          icon={CalendarDays}
          colorClass="text-primary"
          bgClass="bg-primary/10"
        />
        <StatCard
          variant="horizontal"
          title="Pending"
          value={orders.filter((o) => o.status === "PENDING").length || 1245}
          trend="5.2%"
          isNegative
          icon={Clock}
          colorClass="text-warning"
          bgClass="bg-warning/10"
        />
        <StatCard
          variant="horizontal"
          title="On The Way"
          value={orders.filter((o) => o.status === "IN_TRANSIT" || o.status === "ON THE WAY").length || 2548}
          trend="8.4%"
          icon={Truck}
          colorClass="text-info"
          bgClass="bg-info/10"
        />
        <StatCard
          variant="horizontal"
          title="Delivered"
          value={orders.filter((o) => o.status === "DELIVERED").length || 8246}
          trend="15.3%"
          icon={CheckCircle}
          colorClass="text-success"
          bgClass="bg-success/10"
        />
        <StatCard
          variant="horizontal"
          title="Cancelled"
          value={orders.filter((o) => o.status === "CANCELLED").length || 419}
          trend="2.1%"
          isNegative
          icon={XCircle}
          colorClass="text-danger"
          bgClass="bg-danger/10"
        />
      </div>

      <Card noPadding className="flex flex-col">
        {/* Filters Top Bar */}
        <div className="p-4 sm:p-5 border-b border-border">
          <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:justify-between">
            {/* Search */}
            <div className="flex-1 w-full min-w-0 xl:max-w-md">
              <SearchInput
                id="orders-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by Order ID, Customer, Partner or Phone..."
              />
            </div>

            {/* Selects and Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:flex xl:flex-row gap-4 w-full xl:w-auto items-center">
              <StatusSelect
                id="orders-status"
                value={status}
                options={STATUS_OPTIONS}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full xl:w-[150px]"
              />

              <StatusSelect
                id="orders-payment"
                value={payment}
                options={PAYMENT_OPTIONS}
                onChange={(e) => setPayment(e.target.value)}
                className="w-full xl:w-[160px]"
              />

              <DateRangeInput
                fromValue={fromDate}
                toValue={toDate}
                onFromChange={(e) => setFromDate(e.target.value)}
                onToChange={(e) => setToDate(e.target.value)}
                className="col-span-1 sm:col-span-2 lg:col-span-1"
              />

              <Button
                variant="secondary"
                size="sm"
                className="h-10 px-4 w-full xl:w-auto flex items-center justify-center gap-2 lg:col-span-1"
              >
                <Download size={16} />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border px-2 flex overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-3.5 text-sm font-semibold transition-colors border-b-2 relative -mb-[1px] ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        {error ? (
          <div className="m-6 rounded-xl border border-danger/30 bg-danger/5 p-8 text-center text-sm font-medium text-danger">
            {error}
          </div>
        ) : (
          <Table
            headers={["Order ID", "Customer", "Items", "Delivery Partner", "Amount", "Payment", "Status", "Order Time", "Actions"]}
            currentCount={filteredOrders.length}
            totalCount={orders.length}
            minWidth="1100px"
            className="border-0 shadow-none rounded-none"
          >
            {loading ? (
              <tr>
                <td colSpan={9} className="p-10 text-center text-sm text-muted">
                  Loading orders...
                </td>
              </tr>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                const { date, time } = formatDateAndTime(order.orderDate);
                const orderStatus = order.status === "IN_TRANSIT" ? "On The Way" : formatStatus(order.status);
                const paymentStatus = order.paymentStatus || "PAID";
                
                return (
                  <tr
                    key={order.id}
                    className="border-b border-border transition-colors hover:bg-background last:border-0"
                  >
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-foreground">
                      #{order.orderId}
                    </td>

                    <td className="px-4 py-4 min-w-[200px]">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {getInitials(order.customerName || "User")}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground text-sm">{order.customerName}</span>
                          <span className="text-xs text-muted">+91 98765 43210</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground text-sm">4 items</span>
                        <span className="text-xs text-muted truncate max-w-[120px]">Food, Milk</span>
                      </div>
                    </td>

                    <td className="px-4 py-4 min-w-[200px]">
                      {order.deliveryPartner ? (
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/10 text-sm font-bold text-success">
                            {getInitials(order.deliveryPartner)}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-foreground text-sm">{order.deliveryPartner}</span>
                            <span className="text-xs text-muted">TN 59 AB 1234</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-muted">-</span>
                      )}
                    </td>

                    <td className="px-4 py-4 font-semibold text-foreground text-sm">
                      ₹{order.amount ? order.amount.toFixed(2) : "0.00"}
                    </td>

                    <td className="px-4 py-4">
                      <Badge variant={PAYMENT_MAP[paymentStatus] || "default"} className="px-2.5 py-1">
                        {toTitleCase(paymentStatus)}
                      </Badge>
                    </td>

                    <td className="px-4 py-4">
                      <Badge variant={STATUS_MAP[order.status] || "default"} className="px-2.5 py-1">
                        {toTitleCase(orderStatus)}
                      </Badge>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">{date}</span>
                        <span className="text-xs text-muted">{time || "10:15 AM"}</span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => navigate(`/orders/${order.orderId}`)}
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted transition hover:bg-primary-light hover:text-primary"
                        >
                          <Eye size={15} strokeWidth={2} />
                        </button>

                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted transition hover:bg-primary-light hover:text-primary"
                        >
                          <MoreVertical size={15} strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9} className="p-10 text-center text-sm text-muted">
                  No orders found.
                </td>
              </tr>
            )}
          </Table>
        )}
      </Card>
    </section>
  );
}

export default Orders;
