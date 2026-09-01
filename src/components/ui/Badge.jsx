function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-primary-light text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    danger: "bg-danger/15 text-danger",
    info: "bg-info/15 text-info",
  };

  return (
    <span
      className={[
        "inline-flex items-center justify-center rounded-md px-2.5 py-1",
        "text-xs font-medium",
        variants[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

export default Badge;
