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
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-surface",
          "transform transition-transform duration-200",
          "lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <span className="text-xl font-bold text-primary">VAYZO</span>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted hover:bg-primary-light hover:text-primary lg:hidden"
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>

        <nav className="px-3 py-4">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                [
                  "mb-1 flex items-center rounded-lg px-3 py-2.5",
                  "text-sm font-medium transition",
                  isActive
                    ? "bg-primary text-white"
                    : "text-muted hover:bg-primary-light hover:text-primary",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
