import {
  ShoppingBag,
  Wallet,
  Coins,
  CreditCard,
  Users,
  Truck,
  Bike,
  Car,
  Package,
  Store,
  CheckCircle,
  RotateCcw,
  TrendingUp,
} from "lucide-react";

function Dashboard() {
  const stats = [
    ["Total Orders", "8,645", "15.6%", ShoppingBag],
    ["Gross Revenue", "₹12,48,650", "18.3%", Wallet],
    ["Commission", "₹1,87,425", "16.7%", Coins],
    ["Net Revenue", "₹10,61,225", "17.2%", CreditCard],
    ["New Users", "2,318", "12.4%", Users],
  ];

  const orders = [
    ["ORD124587", "ABC Cafe", "₹589.00", "Delivered"],
    ["ORD124586", "Pizza Hub", "₹349.00", "Out for Delivery"],
    ["ORD124585", "Food Express", "₹678.00", "Preparing"],
    ["ORD124584", "Burger Point", "₹420.00", "Confirmed"],
    ["ORD124583", "Spice House", "₹315.00", "Pending"],
  ];

  const services = [
    ["Food Delivery", "5,642", "14.2%", Truck],
    ["Buy & Get It", "1,245", "12.8%", Package],
    ["Bike Ride", "985", "10.7%", Bike],
    ["Car Booking", "643", "9.3%", Car],
    ["Parcel Delivery", "130", "8.4%", Package],
  ];

  const restaurants = [
    ["1", "ABC Cafe", "1,245 Orders", "₹2,45,320"],
    ["2", "Food Express", "985 Orders", "₹1,87,650"],
    ["3", "Pizza Hub", "876 Orders", "₹1,45,230"],
    ["4", "Burger Point", "765 Orders", "₹1,25,450"],
    ["5", "Spice House", "654 Orders", "₹98,750"],
  ];

  const transactions = [
    ["TXN984512", "Order Payment", "Order #ORD124587", "₹589.00", "Success"],
    ["TXN984511", "Payout", "Payout to Karthik Raj", "₹1,245.00", "Success"],
    ["TXN984510", "Commission", "Order #ORD124586", "₹52.35", "Success"],
    ["TXN984509", "Refund", "Order #ORD124581", "₹320.00", "Refunded"],
    ["TXN984508", "Order Payment", "Order #ORD124582", "₹420.00", "Success"],
  ];

  return (
    <div className="space-y-5 p-6">

      {/* Welcome */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome back, Prathap M 👋
          </h1>
          <p className="mt-1 text-sm text-muted">
            Here's what's happening with your business today.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm">
            21 May 2024 - 27 May 2024
          </button>
          <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map(([title, value, change, Icon]) => (
          <div
            key={title}
            className="rounded-xl border border-border bg-surface p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
                <Icon size={20} />
              </div>

              <div>
                <p className="text-xs text-muted">{title}</p>
                <p className="text-lg font-semibold">{value}</p>
              </div>
            </div>

            <p className="mt-3 text-xs text-green-600">
              ↗ {change} <span className="text-muted">vs last week</span>
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 xl:grid-cols-3">

        {/* Orders Overview */}
        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="mb-3 flex justify-between">
            <div>
              <h2 className="text-sm font-semibold">Orders Overview</h2>
              <p className="mt-1 text-[10px] text-muted">
                ● This Week　● Last Week
              </p>
            </div>
            <button className="rounded border border-border px-2 py-1 text-[10px]">
              This Week⌄
            </button>
          </div>

          <svg viewBox="0 0 500 180" className="w-full text-primary">
            <polyline
              points="20,145 90,115 160,90 230,45 300,75 370,90 440,115"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <polyline
              points="20,155 90,140 160,125 230,110 300,120 370,130 440,140"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity=".35"
            />
          </svg>

          <div className="flex justify-between text-[9px] text-muted">
            {["21 May", "22 May", "23 May", "24 May", "25 May", "26 May", "27 May"].map(
              (d) => <span key={d}>{d}</span>
            )}
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="mb-3 flex justify-between">
            <div>
              <h2 className="text-sm font-semibold">Revenue Overview</h2>
              <p className="mt-1 text-[10px] text-muted">
                ● Gross Revenue　● Net Revenue
              </p>
            </div>
            <button className="rounded border border-border px-2 py-1 text-[10px]">
              This Week⌄
            </button>
          </div>

          <div className="flex h-44 items-end justify-between gap-2">
            {[45, 50, 48, 90, 60, 70, 42].map((h, i) => (
              <div key={i} className="flex h-full items-end gap-1">
                <div
                  className="w-3 rounded-t bg-primary"
                  style={{ height: `${h}%` }}
                />
                <div
                  className="w-3 rounded-t bg-primary/50"
                  style={{ height: `${h * 0.7}%` }}
                />
              </div>
            ))}
          </div>

          <div className="mt-2 flex justify-between text-[9px] text-muted">
            {["21", "22", "23", "24", "25", "26", "27"].map((d) => (
              <span key={d}>{d} May</span>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="mb-3 flex justify-between">
            <h2 className="text-sm font-semibold">Recent Orders</h2>
            <button className="text-[10px] text-primary">View All</button>
          </div>

          <div className="space-y-3">
            {orders.map(([id, name, amount, status]) => (
              <div key={id} className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium">{id}</p>
                  <p className="text-[10px] text-muted">{name}</p>
                </div>

                <div className="text-right">
                  <p className="text-[11px] font-medium">{amount}</p>
                  <span className="text-[9px] text-muted">{status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services / Users / Partners / Restaurants */}
      <div className="grid gap-4 xl:grid-cols-4">

        {/* Services */}
        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="mb-3 flex justify-between">
            <h2 className="text-sm font-semibold">Orders by Service</h2>
            <span className="text-[10px] text-primary">View All</span>
          </div>

          <div className="space-y-3">
            {services.map(([name, count, change, Icon]) => (
              <div key={name} className="flex items-center gap-2">
                <Icon size={16} className="text-primary" />
                <span className="flex-1 text-[11px]">{name}</span>
                <b className="text-[11px]">{count}</b>
                <span className="text-[9px] text-green-600">↗ {change}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Users */}
        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="mb-3 flex justify-between">
            <h2 className="text-sm font-semibold">Users Overview</h2>
            <span className="text-[10px] text-primary">View All</span>
          </div>

          <div className="flex items-center justify-center py-3">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border-[14px] border-primary">
              <div className="text-center">
                <p className="text-[9px] text-muted">Total Users</p>
                <b className="text-lg">45,231</b>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-[10px]">
            <p>🔵 Customers <span className="float-right">38,542</span></p>
            <p>🟢 Delivery Partners <span className="float-right">4,856</span></p>
            <p>🟡 Store Owners <span className="float-right">1,233</span></p>
            <p>⚪ Others <span className="float-right">600</span></p>
          </div>
        </div>

        {/* Partners */}
        <div className="rounded-xl border border-border bg-surface p-4">
          <h2 className="mb-4 text-sm font-semibold">
            Delivery Partner Overview
          </h2>

          {[
            ["Total Partners", "2,856"],
            ["Online Partners", "1,256"],
            ["Busy Partners", "342"],
            ["Offline Partners", "1,258"],
          ].map(([name, value], i) => (
            <div key={name} className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-primary-light p-2 text-primary">
                <Users size={14} />
              </div>
              <span className="flex-1 text-[11px]">{name}</span>
              <b className="text-[11px]">{value}</b>
            </div>
          ))}
        </div>

        {/* Restaurants */}
        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="mb-3 flex justify-between">
            <h2 className="text-sm font-semibold">Top Performing Restaurants</h2>
            <span className="text-[10px] text-primary">View All</span>
          </div>

          {restaurants.map(([rank, name, orders, amount]) => (
            <div key={rank} className="mb-3 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-light text-[9px]">
                {rank}
              </span>
              <Store size={14} />
              <div className="flex-1">
                <p className="text-[10px] font-medium">{name}</p>
                <p className="text-[9px] text-muted">{orders}</p>
              </div>
              <b className="text-[10px]">{amount}</b>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions + Quick Summary */}
      <div className="grid gap-4 xl:grid-cols-3">

        {/* Transactions */}
        <div className="overflow-hidden rounded-xl border border-border bg-surface xl:col-span-2">
          <div className="flex justify-between border-b border-border p-4">
            <h2 className="text-sm font-semibold">Recent Transactions</h2>
            <span className="text-[10px] text-primary">View All</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px]">
              <thead className="bg-primary-light text-muted">
                <tr>
                  <th className="p-3">Transaction ID</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Related To</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((row) => (
                  <tr key={row[0]} className="border-t border-border">
                    {row.map((cell, i) => (
                      <td key={i} className="p-3">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="rounded-xl border border-border bg-surface p-4">
          <h2 className="mb-4 text-sm font-semibold">Quick Summary</h2>

          <div className="grid grid-cols-2 gap-3">
            {[
              ["Cancelled Orders", "236", "5.4%", CheckCircle],
              ["Return/Refunds", "78", "3.2%", RotateCcw],
              ["Average Order Value", "₹288.40", "11.6%", TrendingUp],
              ["Repeat Customers", "68.3%", "8.9%", Users],
            ].map(([title, value, change, Icon]) => (
              <div
                key={title}
                className="rounded-lg border border-border p-3"
              >
                <Icon size={18} className="mb-2 text-primary" />
                <p className="text-[10px] text-muted">{title}</p>
                <b className="text-base">{value}</b>
                <p className="text-[9px] text-green-600">↗ {change}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;