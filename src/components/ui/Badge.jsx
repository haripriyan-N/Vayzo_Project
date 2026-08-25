function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-primary-light text-primary",
    success: "bg-green-100 text-success",
    warning: "bg-orange-100 text-warning",
    danger: "bg-red-100 text-danger",
    info: "bg-blue-100 text-info",
  };

  return (
    <span
      className={[
        "inline-flex h-10 items-center rounded-lg px-2.5 py-1",
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
