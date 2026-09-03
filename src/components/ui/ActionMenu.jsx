import { MoreVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function ActionMenu({ actions = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (!actions || actions.length === 0) return null;

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-primary transition hover:bg-background shrink-0 focus:outline-none focus:ring-2 focus:ring-primary/30"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <MoreVertical size={14} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 z-50 w-36 rounded-md border border-border bg-surface shadow-md py-1">
          {actions.map((action, index) => {
            const Icon = action.icon;
            const isDanger = action.danger;
            return (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  if (action.onClick) action.onClick(e);
                }}
                className={`w-full text-left px-3 py-1.5 text-sm flex items-center gap-2 transition-colors focus:outline-none focus:bg-background ${
                  isDanger
                    ? "text-danger hover:bg-danger/10"
                    : "text-foreground hover:bg-background"
                }`}
              >
                {Icon && <Icon size={14} />}
                {action.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ActionMenu;
