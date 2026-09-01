function Table({
  headers,
  children,
  currentCount,
  totalCount,
  minWidth = "900px",
  className = "",
}) {
  return (
    <div
      className={[
        "w-full overflow-hidden rounded-xl border border-border bg-surface shadow-sm",
        className,
      ].join(" ")}
    >
      {/* Scrollable table area */}
      <div className="main-scroll max-h-[calc(100vh-320px)] overflow-auto">
        <table
          className="w-full border-collapse text-left text-xs"
          style={{ minWidth }}
        >
          <thead className="sticky top-0 z-10 bg-primary-light">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="whitespace-nowrap border-b border-border px-3 py-3 font-semibold text-foreground"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>{children}</tbody>
        </table>
      </div>

      {/* Existing results footer */}
      <div className="border-t border-border bg-surface px-4 py-3">
        <p className="text-xs text-muted">
          Showing{" "}
          <span className="font-medium text-foreground">{currentCount}</span> of{" "}
          <span className="font-medium text-foreground">{totalCount}</span>{" "}
          results
        </p>
      </div>
    </div>
  );
}

export default Table;
