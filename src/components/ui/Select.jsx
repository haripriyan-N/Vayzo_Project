function Select({ label, error, id, className = "", children, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <select
        id={id}
        className={[
          "w-full rounded-lg border bg-surface px-3.5 py-2.5",
          "text-sm text-text-primary outline-none",
          "transition-colors",
          error
            ? "border-danger focus:border-danger"
            : "border-border focus:border-primary",
          className,
        ].join(" ")}
        {...props}
      >
        {children}
      </select>

      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}

export default Select;
