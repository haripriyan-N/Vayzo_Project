import { Menu, Bell, MessageSquare, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { navigationItems } from "../../constants/navigation";
function Header({ onMenuClick }) {
  const location = useLocation();

  const currentPage = navigationItems.find(
    (item) => item.path === location.pathname,
  );

  const pageTitle = currentPage?.label || "Dashboard";
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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
          <p className="text-xs text-muted">Dashboard &gt; {pageTitle}</p>
        )}
      </div>

      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          className="rounded-lg p-2 text-muted transition hover:bg-primary-light hover:text-primary"
          aria-label="Notifications"
        >
          <Bell size={20} strokeWidth={1.8} />
        </button>
        <button
          type="button"
          className="rounded-lg p-2 text-muted transition hover:bg-primary-light hover:text-primary"
          aria-label="Messages"
        >
          <MessageSquare size={20} strokeWidth={1.8} />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex items-center gap-3 rounded-lg p-1.5 transition hover:bg-primary-light"
            aria-label="Open profile menu"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
              H
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-foreground">Vayzo</p>
              <p className="text-xs text-muted">Workspace</p>
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
