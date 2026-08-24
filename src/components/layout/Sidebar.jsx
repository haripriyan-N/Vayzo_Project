import { NavLink } from "react-router-dom"; //React Router gives an component insead of anchor tag . a=refresh the whole page but Navlink= Navigating the routing system doesn't reload the whole page.
import { navigationItems } from "../../constants/navigation";

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close navigation"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 w-50 border-r border-border bg-foreground",
          "transform transition-transform duration-200",
          "lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-16 items-center justify-center">
          <span className="text-xl font-bold text-white">VAYZO</span>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted hover:bg-primary-light hover:text-primary lg:hidden"
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>

        <nav className="py-4">
          <div className="mx-3">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    "mb-1 flex h-9 items-center gap-2.5 rounded-sm px-3",
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-white/60 hover:bg-primary-light/10 hover:text-white",
                  ].join(" ")
                }
              >
                {item.icon && (
                  <item.icon size={18} strokeWidth={1.8} className="shrink-0" />
                )}

                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>  
      </aside>
    </>
  );
}

export default Sidebar;
