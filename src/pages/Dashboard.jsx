import { Users, Truck, ShoppingCart, Wallet, TrendingUp, Eye } from "lucide-react";
import { userStats, deliveryPartnerStats, orderStats, orders } from "../mock/vayzoApiMock";

function Dashboard() {
  const stats = [
    {
      label: "Total Users",
      value: userStats[0].value,
      trend: userStats[0].trend,
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Total Orders",
      value: orderStats[0].value,
      trend: orderStats[0].trend,
      icon: ShoppingCart,
      color: "text-success",
    },
    {
      label: "Delivery Partners",
      value: deliveryPartnerStats[0].value,
      trend: deliveryPartnerStats[0].trend,
      icon: Truck,
      color: "text-info",
    },
    {
      label: "Revenue",
      value: "₹12.4L",
      trend: "+18.2%",
      icon: Wallet,
      color: "text-warning",
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="min-h-full bg-background p-4 sm:p-6">
      {/* Welcome Section */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
            Welcome back, Haripriyan 👋
          </h1>
          <p className="mt-1 text-sm text-muted">
            Here's what's happening with your business today.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <button
            type="button"
            className="rounded-lg border border-border bg-surface px-4 py-2.5 text-xs text-foreground sm:text-sm"
          >
            21 May 2024 - 27 May 2024
          </button>
          <button
            type="button"
            className="rounded-lg bg-primary px-4 py-2.5 text-xs font-medium text-white hover:bg-primary-hover sm:text-sm"
          >
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-surface p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon size={18} className={stat.color} />
                  <p className="text-xs text-muted sm:text-sm">{stat.label}</p>
                </div>
              </div>
              <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl font-semibold text-foreground sm:text-3xl">
                  {stat.value}
                </p>
                <div className="flex items-center gap-1 text-xs font-medium text-success sm:text-sm">
                  <TrendingUp size={14} />
                  <span>{stat.trend}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl border border-border bg-surface shadow-sm">
        <div className="border-b border-border p-4">
          <h2 className="text-base font-semibold text-foreground sm:text-lg">
            Recent Orders
          </h2>
          <p className="mt-1 text-xs text-muted sm:text-sm">
            Latest order activities from your customers
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-xs sm:text-sm">
            <thead className="bg-primary-light">
              <tr>
                <th className="px-4 py-3 font-semibold text-foreground">Order ID</th>
                <th className="px-4 py-3 font-semibold text-foreground">Customer</th>
                <th className="px-4 py-3 font-semibold text-foreground">Restaurant</th>
                <th className="px-4 py-3 font-semibold text-foreground">Amount</th>
                <th className="px-4 py-3 font-semibold text-foreground">Status</th>
                <th className="px-4 py-3 font-semibold text-foreground">Date</th>
                <th className="px-4 py-3 font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.orderId} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">
                    #{order.orderId}
                  </td>
                  <td className="px-4 py-3 text-muted">{order.customerName}</td>
                  <td className="px-4 py-3 text-muted">{order.restaurantName}</td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    ₹{order.amount}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-lg px-2 py-1 text-xs font-medium ${
                        order.status === "DELIVERED"
                          ? "bg-green-100 text-success"
                          : order.status === "IN_TRANSIT"
                            ? "bg-blue-100 text-info"
                            : order.status === "PENDING"
                              ? "bg-orange-100 text-warning"
                              : order.status === "CANCELLED"
                                ? "bg-red-100 text-danger"
                                : "bg-primary-light text-primary"
                      }`}
                    >
                      {order.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">{order.orderDate}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-primary transition hover:bg-primary-light"
                    >
                      <Eye size={14} />
                      <span className="hidden sm:inline">View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-border p-4 text-center">
          <button
            type="button"
            className="text-xs font-medium text-primary hover:underline sm:text-sm"
          >
            View All Orders →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
