import {
  LayoutDashboard,
  Users,
  Truck,
  ShoppingCart,
  ArrowLeftRight,
  Wallet,
  MapPin,
  Tags,
  Store,
  Ticket,
  MessageSquareWarning,
  Bell,
  FileBarChart,
  Settings,
  ShieldUser,
  Activity,
} from "lucide-react";

export const navigationItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Delivery Partners",
    path: "/admin/delivery-partners",
    icon: Truck,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Transactions",
    path: "/admin/transactions",
    icon: ArrowLeftRight,
  },
  {
    label: "Earnings",
    path: "/admin/earnings",
    icon: Wallet,
  },
  {
    label: "Locations",
    path: "/admin/locations",
    icon: MapPin,
  },
  {
    label: "Categories",
    path: "/admin/categories",
    icon: Tags,
  },
  {
    label: "Restaurants",
    path: "/admin/restaurants",
    icon: Store,
  },
  {
    label: "Offers & Coupons",
    path: "/admin/offers",
    icon: Ticket,
  },
  {
    label: "Complaints",
    path: "/admin/complaints",
    icon: MessageSquareWarning,
  },
  {
    label: "Notifications",
    path: "/admin/notifications",
    icon: Bell,
  },
  {
    label: "Reports",
    path: "/admin/reports",
    icon: FileBarChart,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
  {
    label: "Admin Users",
    path: "/admin/admin-users",
    icon: ShieldUser,
  },
  {
    label: "Activity Logs",
    path: "/admin/activity-logs",
    icon: Activity,
  },
];
