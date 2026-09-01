import Select from "./Select";

const defaultStatuses = [
  "All Status",
  "Active",
  "Verified",
  "Pending",
  "Blocked",
];

function StatusSelect({
  value,
  onChange,
  statuses = defaultStatuses,
  id = "status",
  className = "",
}) {
  return (
    <Select
      id={id}
      value={value}
      onChange={onChange}
      className={className}
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </Select>
  );
}

export default StatusSelect;