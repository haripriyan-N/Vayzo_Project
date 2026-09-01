import { CalendarDays } from "lucide-react";

function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function DateRangeInput({
  label = "Date Range",
  fromValue = "",
  toValue = "",
  onFromChange,
  onToChange,
  id = "date-range",
}) {
  const today = getToday();

  const handleFromChange = (event) => {
    const newFrom = event.target.value;

    // Reject future dates typed manually
    if (newFrom > today) {
      return;
    }

    // Clear To Date if it becomes earlier than the new From Date
    if (toValue && newFrom > toValue) {
      onToChange?.({ target: { value: "" } });
    }

    onFromChange?.(event);
  };

  const handleToChange = (event) => {
    const newTo = event.target.value;

    // Reject future dates typed manually
    if (newTo > today) {
      return;
    }

    // Reject dates earlier than From Date
    if (fromValue && newTo < fromValue) {
      return;
    }

    onToChange?.(event);
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={`${id}-from`}
          className="mb-1.5 block text-xs font-medium text-muted"
        >
          {label}
        </label>
      )}

      <div
        className={[
          "flex h-10 items-center rounded-lg border bg-background px-3",
          "text-xs transition focus-within:ring-1",
          "border-border focus-within:border-primary focus-within:ring-primary",
        ].join(" ")}
      >
        <CalendarDays
          size={17}
          strokeWidth={1.8}
          className="mr-2 shrink-0 text-muted"
        />

        <input
          id={`${id}-from`}
          type="date"
          value={fromValue}
          max={today}
          onChange={handleFromChange}
          className="flex-1 bg-transparent p-0 text-xs text-foreground outline-none"
        />

        <span className="mx-1.5 shrink-0 text-xs text-muted">–</span>

        <input
          id={`${id}-to`}
          type="date"
          value={toValue}
          min={fromValue || undefined}
          max={today}
          onChange={handleToChange}
          className="flex-1 bg-transparent p-0 text-xs text-foreground outline-none"
        />
      </div>
    </div>
  );
}

export default DateRangeInput;
