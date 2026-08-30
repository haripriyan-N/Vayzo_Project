import { CalendarDays } from "lucide-react";
import { useRef, useState } from "react";

function DateRangeInput({
  label = "Joined Date",
  fromValue = "",
  toValue = "",
  onFromChange,
  onToChange,
  id = "date-range",
}) {
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);

  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [error, setError] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDate = (value) => {
    if (!value) return "";

    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
  };

  const isValidDate = (day, month, year) => {
    if (
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12 ||
      year < 1000 ||
      year > 9999
    ) {
      return false;
    }

    const date = new Date(year, month - 1, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return false;
    }

    return date <= today;
  };

  const toIso = (text) => {
    const digits = text.replace(/\D/g, "");

    if (digits.length !== 8) return null;

    const day = Number(digits.slice(0, 2));
    const month = Number(digits.slice(2, 4));
    const year = Number(digits.slice(4, 8));

    if (!isValidDate(day, month, year)) return null;

    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0",
    )}`;
  };

  const maskDate = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);

    if (digits.length <= 2) return digits;
    if (digits.length <= 4) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }

    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  };

  const handleTextChange = (event, type) => {
    const masked = maskDate(event.target.value);

    if (type === "from") {
      setFromText(masked);
    } else {
      setToText(masked);
    }

    const digits = masked.replace(/\D/g, "");

    if (digits.length < 8) {
      setError("");
      return;
    }

    const isoDate = toIso(masked);

    if (!isoDate) {
      setError("Invalid date");
      return;
    }

    if (type === "from") {
      if (toValue && isoDate > toValue) {
        setError("From date cannot be after To date");
        return;
      }

      setError("");
      onFromChange?.({ target: { value: isoDate } });
    } else {
      if (fromValue && isoDate < fromValue) {
        setError("To date cannot be before From date");
        return;
      }

      setError("");
      onToChange?.({ target: { value: isoDate } });
    }
  };

  const handleFromChange = (event) => {
    const value = event.target.value;

    setFromText(formatDate(value));

    if (toValue && value > toValue) {
      setError("From date cannot be after To date");
      return;
    }

    setError("");
    onFromChange?.(event);

    setTimeout(() => {
      toDateRef.current?.showPicker?.();
    }, 100);
  };

  const handleToChange = (event) => {
    const value = event.target.value;

    setToText(formatDate(value));

    if (fromValue && value < fromValue) {
      setError("To date cannot be before From date");
      return;
    }

    setError("");
    onToChange?.(event);
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={`${id}-from-text`}
          className="mb-1.5 block text-xs font-medium text-muted"
        >
          {label}
        </label>
      )}

      <div className="relative w-full sm:w-64">
        <div
          className={[
            "flex h-10 items-center rounded-lg border bg-background px-3",
            "text-xs transition focus-within:ring-1",
            error
              ? "border-danger focus-within:border-danger focus-within:ring-danger"
              : "border-border focus-within:border-primary focus-within:ring-primary",
          ].join(" ")}
        >
          <CalendarDays
            size={17}
            strokeWidth={1.8}
            className="mr-2 shrink-0 text-muted"
          />

          <input
            id={`${id}-from-text`}
            type="text"
            inputMode="numeric"
            placeholder="dd/mm/yyyy"
            value={fromText}
            onChange={(event) => handleTextChange(event, "from")}
            className="w-[78px] bg-transparent p-0 text-xs text-foreground outline-none placeholder:text-muted"
          />

          <span className="mx-1.5 shrink-0 text-xs text-muted">-</span>

          <input
            id={`${id}-to-text`}
            type="text"
            inputMode="numeric"
            placeholder="dd/mm/yyyy"
            value={toText}
            onChange={(event) => handleTextChange(event, "to")}
            className="w-[78px] bg-transparent p-0 text-xs text-foreground outline-none placeholder:text-muted"
          />
        </div>

        <input
          ref={fromDateRef}
          type="date"
          value={fromValue}
          max={new Date().toISOString().split("T")[0]}
          onChange={handleFromChange}
          className="absolute h-0 w-0 opacity-0"
          tabIndex="-1"
        />

        <input
          ref={toDateRef}
          type="date"
          value={toValue}
          max={new Date().toISOString().split("T")[0]}
          onChange={handleToChange}
          className="absolute h-0 w-0 opacity-0"
          tabIndex="-1"
        />

        <button
          type="button"
          onClick={() => fromDateRef.current?.showPicker?.()}
          className="absolute left-0 top-0 h-10 w-10"
          aria-label="Select start date"
        />

        {error && <p className="mt-1 text-[11px] text-danger">{error}</p>}
      </div>
    </div>
  );
}

export default DateRangeInput;
  