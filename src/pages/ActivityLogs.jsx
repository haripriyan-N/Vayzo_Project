import { useState } from "react";
import { Activity, Download } from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { activityLogs } from "../mock/vayzoApiMock";

function ActivityLogs() {
  const [query, setQuery] = useState("");
  const [module, setModule] = useState("All Module");
  const [filtered, setFiltered] = useState(activityLogs);

  const handleSearch = (value) => {
    setQuery(value);
    const results = activityLogs.filter(
      (log) =>
        log.user.toLowerCase().includes(value.toLowerCase()) ||
        log.action.toLowerCase().includes(value.toLowerCase()) ||
        log.details.toLowerCase().includes(value.toLowerCase())
    );
    const moduleFiltered =
      module === "All Module"
        ? results
        : results.filter((log) => log.module === module);
    setFiltered(moduleFiltered);
  };

  const handleModule = (value) => {
    setModule(value);
    const results =
      value === "All Module"
        ? activityLogs
        : activityLogs.filter((log) => log.module === value);
    const searchFiltered = results.filter(
      (log) =>
        log.user.toLowerCase().includes(query.toLowerCase()) ||
        log.action.toLowerCase().includes(query.toLowerCase()) ||
        log.details.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(searchFiltered);
  };

  const modules = [
    "All Module",
    "Categories",
    "Offers",
    "Complaints",
    "Restaurants",
    "Users",
  ];
  const moduleColors = {
    Categories: "info",
    Offers: "success",
    Complaints: "warning",
    Restaurants: "primary",
    Users: "danger",
  };

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <p className="text-xs text-muted">Dashboard &gt; Activity Logs</p>
            <h1 className="mt-1 text-2xl font-semibold text-foreground">
              Activity Logs
            </h1>
            <p className="mt-1 text-xs text-muted">
              Track all system activities and changes.
            </p>
          </div>
          <Button variant="secondary" size="sm">
            <Download size={14} className="mr-1.5" />
            Export
          </Button>
        </header>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1.5fr_0.7fr]">
            <Input
              id="activity-search"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by user, action or details..."
              className="h-10 text-xs"
            />
            <Select
              id="activity-module"
              value={module}
              onChange={(e) => handleModule(e.target.value)}
              className="h-10 text-xs"
            >
              {modules.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Select>
          </div>

          <div className="mt-4 space-y-2">
            {filtered.map((log) => (
              <div
                key={log.logId}
                className="rounded-lg border border-border bg-background p-3 hover:shadow-sm transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <Activity size={16} className="text-primary mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-foreground">
                          {log.action}
                        </p>
                        <Badge
                          variant={
                            moduleColors[log.module] || "default"
                          }
                          className="h-5 text-[8px]"
                        >
                          {log.module}
                        </Badge>
                        <Badge variant="success" className="h-5 text-[8px]">
                          {log.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted mt-1">
                        By <span className="font-medium">{log.user}</span> •{" "}
                        {log.timestamp}
                      </p>
                      <p className="text-[10px] text-muted mt-2">
                        {log.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ActivityLogs;
