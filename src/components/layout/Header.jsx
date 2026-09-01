import {
  Menu,
  Bell,
  MessageSquareWarning,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { navigationItems } from "../../constants/navigation";
import UserImg from "../../assets/logo/Trans_full.png";
import { useNotifications } from "../../context/NotificationContext";

function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = navigationItems.find(
    (item) => item.path === location.pathname,
  );

  const pageConfig = {
    "/users/add": {
      title: "Add User",
      parent: "Users",
    },
  };

  const isOrderDetailsPage = location.pathname.startsWith("/orders/");

  const currentRoute = pageConfig[location.pathname];

  const pageTitle = isOrderDetailsPage
    ? "Order Details"
    : currentRoute?.title || currentPage?.label || "Dashboard";

  const parentPage = isOrderDetailsPage ? null : currentRoute?.parent || null;

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { unreadCount } = useNotifications();
  const messageCount = 5;

  const storedUser = localStorage.getItem("vayzo_admin_user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : {
        name: "HariPriyan",
        profileImage: UserImg,
        role: "Super Admin",
      };

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-surface lg:px-2">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg px-1 text-muted hover:text-primary lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={25} strokeWidth={2.8} />
      </button>

      <div>
        <p className="text-lg font-semibold text-foreground">{pageTitle}</p>

        {pageTitle !== "Dashboard" && (
          <div className="flex items-center gap-1 text-xs text-muted">
            <NavLink
              to="/dashboard"
              className="transition-colors hover:text-primary"
            >
              Dashboard
            </NavLink>

            <ChevronRight size={14} strokeWidth={1.8} />

            {parentPage && (
              <>
                <NavLink
                  to="/users"
                  className="transition-colors hover:text-primary"
                >
                  {parentPage}
                </NavLink>

                <ChevronRight size={14} strokeWidth={1.8} />
              </>
            )}

            <span>{pageTitle}</span>
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        <NavLink
          to="/notifications"
          className="relative rounded-lg p-2 text-muted transition hover:bg-primary-light hover:text-primary"
          title="Notifications"
          aria-label={`Notifications (${unreadCount})`}
        >
          <Bell size={20} strokeWidth={1.8} />

          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold leading-none text-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </NavLink>
        <NavLink
          to="/complaints"
          className="relative rounded-lg p-2 text-muted transition hover:bg-primary-light hover:text-primary"
          title="Complaints"
          aria-label={`Complaints (${messageCount})`}
        >
          <MessageSquareWarning size={20} strokeWidth={1.8} />

          {messageCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold leading-none text-white">
              {messageCount > 99 ? "99+" : messageCount}
            </span>
          )}
        </NavLink>

        <div className="relative" title="Profile">
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex items-center gap-3 rounded-lg p-1.5 transition hover:bg-primary-light"
            aria-label="Open profile menu"
          >
            <div className="h-9 w-9 overflow-hidden rounded-full">
              <img
                src={user.profileImage || UserImg}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-foreground">
                {user.name}
              </p>

              <p className="text-xs text-muted">{user.role}</p>
            </div>

            <ChevronDown
              size={17}
              strokeWidth={1.8}
              className={[
                "hidden text-muted transition-transform duration-200 sm:block",
                isProfileOpen ? "rotate-180" : "",
              ].join(" ")}
            />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-border bg-surface p-1 shadow-lg">
              <button
                type="button"
                className="flex w-full items-center rounded-md px-3 py-2 text-sm text-foreground hover:bg-primary-light hover:text-primary"
              >
                Profile
              </button>

              <button
                type="button"
                className="flex w-full items-center rounded-md px-3 py-2 text-sm text-foreground hover:bg-primary-light hover:text-primary"
              >
                Settings
              </button>

              <div className="my-1 border-t border-border" />

              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("vayzo_admin_logged_in");
                  localStorage.removeItem("vayzo_admin_user");
                  setIsProfileOpen(false);
                  navigate("/");
                }}
                className="flex w-full items-center rounded-md px-3 py-2 text-sm text-danger hover:bg-primary-light"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
