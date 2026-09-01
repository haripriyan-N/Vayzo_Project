import { useState } from "react";
import { Download, FileBarChart } from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import { reports } from "../mock/vayzoApiMock";

function Reports() {
  const [reportType, setReportType] = useState("All");
  const [filtered, setFiltered] = useState(reports);

  const handleTypeFilter = (value) => {
    setReportType(value);
    if (value === "All") {
      setFiltered(reports);
    } else {
      setFiltered(reports.filter((r) => r.type === value));
    }
  };

  const badgeVariant = {
    Completed: "success",
    Processing: "warning",
    Failed: "danger",
  };

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <p className="text-xs text-muted">Dashboard &gt; Reports</p>
            <h1 className="mt-1 text-2xl font-semibold text-foreground">
              Reports
            </h1>
            <p className="mt-1 text-xs text-muted">
              Generate and download business reports.
            </p>
          </div>
          <Button size="sm">+ Generate Report</Button>
        </header>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <Select
              id="report-type"
              value={reportType}
              onChange={(e) => handleTypeFilter(e.target.value)}
              className="h-10 text-xs min-w-fit"
            >
              <option>All</option>
              <option>Sales</option>
              <option>Performance</option>
              <option>Analytics</option>
            </Select>
            <Button variant="secondary" size="sm">
              Download All
            </Button>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((report) => (
              <div
                key={report.reportId}
                className="rounded-lg border border-border bg-background p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <FileBarChart size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">
                        {report.title}
                      </p>
                      <p className="text-xs text-muted mt-1">
                        {report.type} • {report.period}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={badgeVariant[report.status] || "default"}
                    className="text-[9px]"
                  >
                    {report.status}
                  </Badge>
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-[10px] text-muted">
                    {report.fileSize === "0 MB"
                      ? "Generating..."
                      : report.fileSize}
                  </span>
                  <div className="text-[10px] text-muted">
                    {report.generatedOn}
                  </div>
                </div>

                {report.status === "Completed" && (
                  <Button variant="secondary" size="sm" className="w-full mt-3">
                    <Download size={14} className="mr-1.5" />
                    Download
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reports;
