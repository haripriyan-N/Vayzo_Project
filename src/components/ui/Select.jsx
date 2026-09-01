import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function Select({
  label,
  error,
  id,
  className = "",
  children,
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Build a normalized options list from either the `options` prop
  // or from <option> children (backward compatibility).
  const optionsList = (() => {
    if (options.length > 0) {
      return options.map((opt) =>
        typeof opt === "string" ? { label: opt, value: opt } : opt,
      );
    }

    if (children) {
      return children
        .map((child) => ({
          label: child.props.children,
          value: child.props.value,
        }))
        .filter((opt) => opt.value !== undefined);
    }

    return [];
  })();

  // Close dropdown when clicking outside the component.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (selectedValue) => {
    if (onChange) {
      onChange({ target: { value: selectedValue } });
    }
    setIsOpen(false);
  };

  const activeOption = optionsList.find((opt) => opt.value === value);
  const displayLabel = activeOption ? activeOption.label : placeholder;

  return (
    <div className="w-full" ref={containerRef}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          id={id}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          className={[
            "flex h-10 w-full items-center justify-between rounded-lg border px-3.5 py-2.5",
            "text-sm text-left transition-colors",
            disabled
              ? "cursor-not-allowed opacity-50"
              : "bg-background text-foreground",
            error
              ? "border-danger focus:border-danger focus:ring-1 focus:ring-danger"
              : isOpen
                ? "border-primary ring-1 ring-primary"
                : "border-border focus:border-primary focus:ring-1 focus:ring-primary",
            className,
          ].join(" ")}
          {...props}
        >
          <span className={activeOption ? "text-foreground" : "text-muted"}>
            {displayLabel}
          </span>

          <ChevronDown
            size={18}
            strokeWidth={1.8}
            className={[
              "shrink-0 text-muted transition-transform duration-200",
              isOpen ? "rotate-180" : "",
            ].join(" ")}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-lg border border-border bg-surface shadow-lg">
            {optionsList.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={[
                    "flex w-full items-center px-3.5 py-2.5 text-sm text-left transition-colors",
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-surface text-foreground hover:bg-primary-light hover:text-primary",
                  ].join(" ")}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}

export default Select;
