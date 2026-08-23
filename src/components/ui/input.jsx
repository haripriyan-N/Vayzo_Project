function Input({ label, error, id, className = "", ...props }) {
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

      <input
        id={id}
        className={[
          "w-full rounded-lg border bg-surface px-3.5 py-2.5",
          "text-sm text-foreground outline-none",
          "placeholder:text-subtle",
          "transition-colors",
          error
            ? "border-danger focus:border-danger"
            : "border-border focus:border-primary",
          className,
        ].join(" ")}
        {...props}
      />

      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}

export default Input;
