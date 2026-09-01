import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPin,
  Package,
  RefreshCw,
  Store,
  User,
  Truck,
  XCircle,
} from "lucide-react";

const API_URL = "http://localhost:3000/orders";

const statusConfig = {
  PENDING: {
    label: "Pending",
    className: "bg-warning/10 text-warning",
    icon: Clock3,
  },
  CONFIRMED: {
    label: "Confirmed",
    className: "bg-info/10 text-info",
    icon: CheckCircle2,
  },
  PREPARING: {
    label: "Preparing",
    className: "bg-info/10 text-info",
    icon: Package,
  },
  OUT_FOR_DELIVERY: {
    label: "Out for Delivery",
    className: "bg-primary/10 text-primary",
    icon: Truck,
  },
  DELIVERED: {
    label: "Delivered",
    className: "bg-success/10 text-success",
    icon: CheckCircle2,
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-danger/10 text-danger",
    icon: XCircle,
  },
};

const paymentConfig = {
  PAID: "bg-success/10 text-success",
  PENDING: "bg-warning/10 text-warning",
  FAILED: "bg-danger/10 text-danger",
  REFUNDED: "bg-info/10 text-info",
};

const formatStatus = (status = "") =>
  status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const formatAmount = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
        <Icon size={17} strokeWidth={1.8} />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-muted">{label}</p>
        <p className="mt-0.5 truncate text-sm font-semibold text-foreground">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const config = statusConfig[status] || {
    label: formatStatus(status),
    className: "bg-muted/10 text-muted",
    icon: Clock3,
  };

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${config.className}`}
    >
      <Icon size={14} strokeWidth={2} />
      {config.label}
    </span>
  );
}

function PaymentBadge({ status }) {
  const className = paymentConfig[status] || "bg-muted/10 text-muted";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${className}`}
    >
      {formatStatus(status)}
    </span>
  );
}

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrder = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}?orderId=${encodeURIComponent(orderId)}`,
      );

      if (!response.ok) {
        throw new Error("Unable to load order");
      }

      const data = await response.json();

      if (!data.length) {
        setOrder(null);
        return;
      }

      setOrder(data[0]);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  },[orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const timeline = useMemo(() => {
    if (!order) return [];

    const currentStatus = order.status;

    const steps = [
      {
        key: "PLACED",
        label: "Order Placed",
        description: "Order has been placed successfully",
      },
      {
        key: "CONFIRMED",
        label: "Order Confirmed",
        description: "Restaurant has confirmed the order",
      },
      {
        key: "PREPARING",
        label: "Preparing",
        description: "Restaurant is preparing the order",
      },
      {
        key: "OUT_FOR_DELIVERY",
        label: "Out for Delivery",
        description: "Delivery partner is on the way",
      },
      {
        key: "DELIVERED",
        label: "Delivered",
        description: "Order delivered successfully",
      },
    ];

    const statusOrder = [
      "PENDING",
      "CONFIRMED",
      "PREPARING",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
    ];

    const currentIndex =
      currentStatus === "PENDING" ? 0 : statusOrder.indexOf(currentStatus);

    return steps.map((step, index) => ({
      ...step,
      completed: currentStatus === "DELIVERED" ? true : index <= currentIndex,
    }));
  }, [order]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted">
          <RefreshCw size={26} className="animate-spin text-primary" />
          <p className="text-sm">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-background p-4 sm:p-6">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-primary"
          >
            <ArrowLeft size={17} />
            Back to Orders
          </button>

          <div className="rounded-xl border border-danger/20 bg-surface p-8 text-center shadow-sm">
            <XCircle
              size={38}
              className="mx-auto mb-3 text-danger"
              strokeWidth={1.6}
            />

            <h2 className="text-lg font-semibold text-foreground">
              Unable to load order
            </h2>

            <p className="mt-1 text-sm text-muted">{error}</p>

            <button
              type="button"
              onClick={fetchOrder}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-background p-4 sm:p-6">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-primary"
          >
            <ArrowLeft size={17} />
            Back to Orders
          </button>

          <div className="rounded-xl border border-border bg-surface p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
              <Package size={26} />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-foreground">
              Order not found
            </h2>

            <p className="mt-1 text-sm text-muted">
              We couldn't find an order with ID{" "}
              <span className="font-semibold">{orderId}</span>.
            </p>  

            <button
              type="button"
              onClick={() => navigate("/orders")}
              className="mt-5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-background p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => navigate("/orders")}
              className="mt-0.5 rounded-lg border border-border bg-surface p-2 text-muted transition hover:border-primary hover:text-primary"
              aria-label="Back to orders"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-foreground sm:text-2xl">
                  Order Details
                </h1>

                <StatusBadge status={order.status} />
              </div>

              <p className="mt-1 text-sm text-muted">
                Order ID:{" "}
                <span className="font-semibold text-foreground">
                  {order.orderId}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={fetchOrder}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* Overview */}
        <section className="mb-5 rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground">
                Order Overview
              </h2>

              <p className="mt-1 text-xs text-muted">
                Basic information about this order
              </p>
            </div>

            <div className="hidden sm:block">
              <StatusBadge status={order.status} />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <InfoRow icon={Package} label="Order ID" value={order.orderId} />

            <InfoRow
              icon={CalendarDays}
              label="Order Date"
              value={order.orderDate}
            />

            <InfoRow icon={MapPin} label="City" value={order.city} />

            <InfoRow
              icon={CreditCard}
              label="Amount"
              value={formatAmount(order.amount)}
            />
          </div>
        </section>

        {/* Customer / Restaurant / Delivery */}
        <div className="mb-5 grid gap-5 lg:grid-cols-3">
          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
                <User size={19} />
              </div>

              <div>
                <h2 className="text-sm font-bold text-foreground">Customer</h2>

                <p className="text-xs text-muted">Customer information</p>
              </div>
            </div>

            <InfoRow
              icon={User}
              label="Customer Name"
              value={order.customerName}
            />
          </section>

          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
                <Store size={19} />
              </div>

              <div>
                <h2 className="text-sm font-bold text-foreground">
                  Restaurant
                </h2>

                <p className="text-xs text-muted">Restaurant information</p>
              </div>
            </div>

            <InfoRow
              icon={Store}
              label="Restaurant Name"
              value={order.restaurantName}
            />
          </section>

          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
                <Truck size={19} />
              </div>

              <div>
                <h2 className="text-sm font-bold text-foreground">Delivery</h2>

                <p className="text-xs text-muted">
                  Delivery partner information
                </p>
              </div>
            </div>

            <InfoRow
              icon={Truck}
              label="Delivery Partner"
              value={order.deliveryPartner}
            />
          </section>
        </div>

        {/* Payment + Amount */}
        <div className="mb-5 grid gap-5 lg:grid-cols-2">
          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
                <CreditCard size={19} />
              </div>

              <div>
                <h2 className="text-base font-bold text-foreground">
                  Payment Details
                </h2>

                <p className="text-xs text-muted">
                  Payment information for this order
                </p>
              </div>
            </div>

            <div className="divide-y divide-border">
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-muted">Payment Status</span>

                <PaymentBadge status={order.paymentStatus} />
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-muted">Order Amount</span>

                <span className="text-sm font-bold text-foreground">
                  {formatAmount(order.amount)}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-sm font-semibold text-foreground">
                  Total
                </span>

                <span className="text-lg font-bold text-primary">
                  {formatAmount(order.amount)}
                </span>
              </div>
            </div>
          </section>

          {/* Status */}
          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <h2 className="text-base font-bold text-foreground">
                Order Timeline
              </h2>

              <p className="mt-1 text-xs text-muted">Current order progress</p>
            </div>

            <div className="space-y-0">
              {timeline.map((step, index) => (
                <div key={step.key} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={[
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                        step.completed
                          ? "border-primary bg-primary text-white"
                          : "border-border bg-background text-muted",
                      ].join(" ")}
                    >
                      {step.completed ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-current" />
                      )}
                    </div>

                    {index < timeline.length - 1 && (
                      <div
                        className={[
                          "my-1 h-8 w-px",
                          step.completed ? "bg-primary/40" : "bg-border",
                        ].join(" ")}
                      />
                    )}
                  </div>

                  <div className="pb-5">
                    <p
                      className={[
                        "text-sm font-semibold",
                        step.completed ? "text-foreground" : "text-muted",
                      ].join(" ")}
                    >
                      {step.label}
                    </p>

                    <p className="mt-0.5 text-xs text-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom Summary */}
        <section className="rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted">Order Status</p>
              <div className="mt-2">
                <StatusBadge status={order.status} />
              </div>
            </div>

            <div>
              <p className="text-xs text-muted">Payment Status</p>
              <div className="mt-2">
                <PaymentBadge status={order.paymentStatus} />
              </div>
            </div>

            <div>
              <p className="text-xs text-muted">Total Amount</p>
              <p className="mt-1 text-xl font-bold text-foreground">
                {formatAmount(order.amount)}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default OrderDetails;
