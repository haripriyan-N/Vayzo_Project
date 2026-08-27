import { useMemo, useState } from "react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Select from "../components/ui/Select";
import { orderStats, orders } from "../mock/vayzoApiMock";

const statusBadgeMap = {
  DELIVERED: "success",
  IN_TRANSIT: "info",
  PREPARING: "warning",
  PENDING: "warning",
  CANCELLED: "danger",
};

const statusOptions = [
  "All Status",
  "Delivered",
  "In Transit",
  "Preparing",
  "Pending",
  "Cancelled",
];

const paymentStatusOptions = [
  "All Payment Status",
  "Paid",
  "Pending",
  "Refunded",
];

function Orders() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("All Payment Status");

  const filteredOrders = useMemo(() => {
    const normalizedQuery = searchText.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        [
          order.orderId,
          order.customerName,
          order.restaurantName,
          order.deliveryPartner,
          order.city,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesStatus =
        statusFilter === "All Status" ||
        order.status.toLowerCase() === statusFilter.toLowerCase().replace(/\s+/g, "_");

      const matchesPaymentStatus =
        paymentStatusFilter === "All Payment Status" ||
        order.paymentStatus.toLowerCase() === paymentStatusFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesPaymentStatus;
    });
  }, [searchText, statusFilter, paymentStatusFilter]);

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="space-y-6 rounded-xl border border-border bg-surface p-4 sm:p-6">
        <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Dashboard {'>'} Orders
            </div>
            <h1 className="mt-2 text-2xl font-semibold text-foreground">Orders List</h1>
            <p className="mt-1 text-sm text-muted">
              Track customer orders, delivery flow, and payment status.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary">Refresh</Button>
            <Button>Add Order</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {orderStats.map(({ label, value, trend }) => (
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
              id="order-search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search by order id, customer, restaurant or partner"
            />
          </div>

          <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <div className="w-full max-w-xs">
              <Select
                id="order-status"
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
                id="order-payment-status"
                label="Payment Status"
                value={paymentStatusFilter}
                onChange={(event) => setPaymentStatusFilter(event.target.value)}
              >
                {paymentStatusOptions.map((option) => (
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
                <th className="px-4 py-3 font-semibold">Order ID</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Restaurant</th>
                <th className="px-4 py-3 font-semibold">Partner</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Payment</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">City</th>
                <th className="px-4 py-3 font-semibold">Order Date</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.orderId} className="border-t border-border bg-surface">
                  <td className="px-4 py-3 font-medium text-foreground">{order.orderId}</td>
                  <td className="px-4 py-3 text-muted">{order.customerName}</td>
                  <td className="px-4 py-3 text-muted">{order.restaurantName}</td>
                  <td className="px-4 py-3 text-muted">{order.deliveryPartner}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusBadgeMap[order.status] || "default"}>
                      {order.status.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted">{order.paymentStatus}</td>
                  <td className="px-4 py-3 text-foreground">₹{order.amount}</td>
                  <td className="px-4 py-3 text-muted">{order.city}</td>
                  <td className="px-4 py-3 text-muted">{order.orderDate}</td>
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

        {filteredOrders.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-background p-8 text-center text-sm text-muted">
            No orders found for the selected search and filter.
          </div>
        )}
      </div>
    </section>
  );
}

export default Orders;
