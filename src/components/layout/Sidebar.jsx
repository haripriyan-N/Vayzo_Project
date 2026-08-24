import { NavLink } from "react-router-dom";
import { navigationItems } from "../../constants/navigation";
import vayzoLogo from "../../assets/logo/Vayzo_logo.png";

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close navigation"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 w-50 bg-foreground",
          "flex h-screen flex-col",
          "transform transition-transform duration-200",
          "lg:sticky lg:top-0 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center justify-between px-5">
          <img src={vayzoLogo} alt="Vayzo" className="h-auto w-40 lg:w-50" />

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>

        {/* Navigation - Separate Scroll Area */}
        <nav className="sidebar-scroll min-h-0 flex-1 overflow-y-auto py-3">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                [
                  "mb-1 flex h-9 w-full items-center rounded-md",
                  "text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "text-white/65 hover:bg-white/10 hover:text-white",
                ].join(" ")
              }
            >
              {/* Icon + Text */}
              <span
                style={{
                  marginLeft: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {item.icon && (
                  <item.icon size={18} strokeWidth={1.8} className="shrink-0" />
                )}

                <span>{item.label}</span>
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Collapsed View - Desktop Only */}
        <button
          type="button"
          className="hidden h-12 shrink-0 items-center border-t border-white/10 px-4 text-sm text-white/60 hover:text-white lg:flex"
        >
          ←<span className="ml-3">Collapsed View</span>
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
