import { useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle, Clock, Search, X, MessageSquare, AlertTriangle, FileText, User } from "lucide-react";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import StatusSelect from "../components/ui/StatusSelect";
import Table from "../components/ui/Table";
import Card from "../components/ui/Card";
import ComplaintStatCard from "../components/ui/ComplaintStatCard";

import { getComplaints } from "../api/complaintsApi";

const statusBadgeMap = {
  Open: "danger",
  "In Progress": "warning",
  Resolved: "success",
  Closed: "default",
};

const priorityBadgeMap = {
  High: "danger",
  Medium: "warning",
  Low: "info",
};

const statusOptions = ["All Status", "Open", "In Progress", "Resolved", "Closed"];
const priorityOptions = ["All Priority", "High", "Medium", "Low"];
const typeOptions = ["All Types", "Customer", "Delivery Partner", "Merchant"];

const tableHeaders = [
  "Complaint ID",
  "Date",
  "Reported By",
  "User Type",
  "Issue Type",
  "Priority",
  "Status",
  "Actions",
];

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [priority, setPriority] = useState("All Priority");
  const [userType, setUserType] = useState("All Types");

  // Selection
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadComplaints = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getComplaints();
        if (isMounted) {
          setComplaints(data);
          if (data.length > 0) {
            setSelectedComplaint(data[0]);
          }
        }
      } catch (err) {
        if (isMounted) setError("Failed to load complaints");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadComplaints();
    return () => { isMounted = false; };
  }, []);

  const filteredComplaints = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return complaints.filter((c) => {
      const matchesSearch = !searchValue ||
        c.complaintId?.toLowerCase().includes(searchValue) ||
        c.userName?.toLowerCase().includes(searchValue);

      const matchesStatus = status === "All Status" || c.status === status;
      const matchesPriority = priority === "All Priority" || c.priority === priority;
      const matchesType = userType === "All Types" || c.userType === userType;

      return matchesSearch && matchesStatus && matchesPriority && matchesType;
    });
  }, [search, status, priority, userType, complaints]);

  const stats = [
    { title: "Total Complaints", value: complaints.length, icon: MessageSquare, color: "text-primary", bg: "bg-primary/10" },
    { title: "Open Issues", value: complaints.filter(c => c.status === "Open").length, icon: AlertCircle, color: "text-danger", bg: "bg-danger/10" },
    { title: "In Progress", value: complaints.filter(c => c.status === "In Progress").length, icon: Clock, color: "text-warning", bg: "bg-warning/10" },
    { title: "Resolved", value: complaints.filter(c => c.status === "Resolved" || c.status === "Closed").length, icon: CheckCircle, color: "text-success", bg: "bg-success/10" },
  ];

  return (
    <section className="min-h-full bg-background p-4 sm:p-6 relative">

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat, idx) => (
          <ComplaintStatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            colorClass={stat.color}
            bgClass={stat.bg}
          />
        ))}
      </div>

      <div className={`grid gap-6 ${selectedComplaint ? 'lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px]' : 'grid-cols-1'} items-start`}>
        <Card noPadding className="flex flex-col overflow-x-auto min-w-0">
        <div className="p-4 sm:p-6 pb-4">
          <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:justify-between">
            <div className="flex-1 w-full min-w-0 xl:max-w-sm">
              <SearchInput
                id="complaint-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by ID or name..."
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:flex xl:flex-row gap-4 w-full xl:w-auto items-center">
              <StatusSelect
                id="c-status"
                value={status}
                options={statusOptions}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full xl:w-[150px]"
              />
              <StatusSelect
                id="c-priority"
                value={priority}
                options={priorityOptions}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full xl:w-[150px]"
              />
              <StatusSelect
                id="c-type"
                value={userType}
                options={typeOptions}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full xl:w-[160px]"
              />
            </div>
          </div>
        </div>

        {error ? (
          <div className="m-6 rounded-xl border border-danger/30 bg-danger/5 p-8 text-center text-sm font-medium text-danger">
            {error}
          </div>
        ) : (
          <Table
            headers={tableHeaders}
            currentCount={filteredComplaints.length}
            totalCount={complaints.length}
            minWidth="900px"
            className="border-0 shadow-none rounded-none border-t border-border"
          >
            {loading ? (
              <tr>
                <td colSpan={tableHeaders.length} className="p-10 text-center text-sm text-muted">
                  Loading complaints...
                </td>
              </tr>
            ) : filteredComplaints.length ? (
              filteredComplaints.map((c) => (
                <tr key={c.id} className="border-t border-border transition-colors hover:bg-background">
                  <td className="whitespace-nowrap px-3 py-3 font-medium text-foreground">{c.complaintId}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-muted">{c.date}</td>
                  <td className="px-3 py-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-semibold border border-primary/20 overflow-hidden">
                        <img src={`https://ui-avatars.com/api/?name=${c.userName}&background=random&color=fff&size=100`} alt={c.userName} className="h-full w-full object-cover" />
                      </div>
                      <span className="truncate font-medium text-foreground">
                        {c.userName}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-muted">{c.userType}</td>
                  <td className="px-3 py-3 text-muted">{c.issueType}</td>
                  <td className="px-3 py-3">
                    <Badge variant={priorityBadgeMap[c.priority] || "default"} className="px-2">{c.priority}</Badge>
                  </td>
                  <td className="px-3 py-3">
                    <Badge variant={statusBadgeMap[c.status] || "default"} className="px-2">{c.status}</Badge>
                  </td>
                  <td className="px-3 py-3">
                    <Button variant="secondary" size="sm" onClick={() => setSelectedComplaint(c)}>
                      View Details
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableHeaders.length} className="p-10 text-center text-sm text-muted">
                  No complaints found.
                </td>
              </tr>
            )}
          </Table>
        )}
        </Card>

        {/* Detail Panel */}
        {selectedComplaint && (
          <div className="flex flex-col bg-surface border border-border rounded-xl shadow-sm h-[calc(100vh-250px)] sticky top-6">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-5 border-b border-border bg-background rounded-t-xl">
              <div>
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  Complaint Details
                </h2>
                <p className="text-xs text-muted mt-0.5">{selectedComplaint.complaintId}</p>
              </div>
              <button 
                onClick={() => setSelectedComplaint(null)}
                className="h-8 w-8 rounded-md flex items-center justify-center text-muted hover:bg-surface-hover hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Status & Priority */}
              <div className="flex gap-3">
                <Badge variant={statusBadgeMap[selectedComplaint.status] || "default"} className="px-3 py-1 text-xs">
                  Status: {selectedComplaint.status}
                </Badge>
                <Badge variant={priorityBadgeMap[selectedComplaint.priority] || "default"} className="px-3 py-1 text-xs">
                  Priority: {selectedComplaint.priority}
                </Badge>
              </div>

              {/* User Info */}
              <div className="bg-background rounded-xl p-4 border border-border space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2 border-b border-border pb-2">
                  <User size={15} className="text-primary"/> Reported By
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20 overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${selectedComplaint.userName}&background=random&color=fff&size=100`} alt={selectedComplaint.userName} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{selectedComplaint.userName}</p>
                    <p className="text-xs text-muted">{selectedComplaint.userType}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted block mb-1">Date Reported</span>
                    <span className="font-medium text-foreground">{selectedComplaint.date}</span>
                  </div>
                </div>
              </div>

              {/* Complaint Details */}
              <div className="bg-background rounded-xl p-4 border border-border space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2 border-b border-border pb-2">
                  <FileText size={15} className="text-primary"/> Issue Information
                </h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-muted block mb-1 font-medium">Issue Type</span>
                    <span className="text-foreground">{selectedComplaint.issueType}</span>
                  </div>
                  <div>
                    <span className="text-muted block mb-1 font-medium">Description</span>
                    <div className="p-3 bg-surface rounded-lg border border-border text-foreground leading-relaxed">
                      {selectedComplaint.description}
                    </div>
                  </div>
                  {selectedComplaint.resolution && (
                    <div>
                      <span className="text-muted block mb-1 font-medium">Resolution Notes</span>
                      <div className="p-3 bg-success/10 rounded-lg border border-success/20 text-foreground leading-relaxed">
                        {selectedComplaint.resolution}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Panel Footer Actions */}
            <div className="p-5 border-t border-border bg-background flex gap-3 rounded-b-xl">
              <Button variant="secondary" className="flex-1" onClick={() => setSelectedComplaint(null)}>Close</Button>
              <Button className="flex-1">Update Status</Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Complaints;
