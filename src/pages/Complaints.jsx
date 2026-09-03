import { useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle, Clock, Search, X, MessageSquare, AlertTriangle, FileText, User, RotateCcw, Trash2, Eye } from "lucide-react";
import Avatar from "../components/ui/Avatar";

import Badge from "../components/ui/Badge";
import BadgeCell from "../components/ui/BadgeCell";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import StatusSelect from "../components/ui/StatusSelect";
import Table from "../components/ui/Table";
import Card from "../components/ui/Card";
import StatCard from "../components/ui/StatCard";
import Modal from "../components/ui/Modal";
import ActionMenu from "../components/ui/ActionMenu";

import { getComplaints, updateComplaint, deleteComplaint } from "../api/complaintsApi";

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
  "No.",
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Selection
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [deleteModalId, setDeleteModalId] = useState(null);

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

  const handleUpdateStatus = async (complaint, newStatus) => {
    try {
      const updated = { ...complaint, status: newStatus };
      await updateComplaint(complaint.id, updated);
      
      setComplaints(prev => prev.map(c => c.id === complaint.id ? updated : c));
      setSelectedComplaint(updated);
    } catch (err) {
      alert("Failed to update status");
    }
  };

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
  }, [complaints, search, status, priority, userType]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
  const paginatedComplaints = filteredComplaints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const maxStatus = useMemo(() => {
    return paginatedComplaints.reduce((max, c) => {
      const val = c.status || "--";
      return val.length > max.length ? val : max;
    }, "");
  }, [paginatedComplaints]);

  const maxPriority = useMemo(() => {
    return paginatedComplaints.reduce((max, c) => {
      const val = c.priority || "--";
      return val.length > max.length ? val : max;
    }, "");
  }, [paginatedComplaints]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, priority, userType]);

  const hasFilters =
    search ||
    status !== "All Status" ||
    priority !== "All Priority" ||
    userType !== "All Types";

  const resetFilters = () => {
    setSearch("");
    setStatus("All Status");
    setPriority("All Priority");
    setUserType("All Types");
  };

  const handleDeleteComplaint = async () => {
    if (!deleteModalId) return;
    try {
      await deleteComplaint(deleteModalId);
      setComplaints((prev) => prev.filter((c) => c.id !== deleteModalId));
      if (selectedComplaint?.id === deleteModalId) {
        setSelectedComplaint(null);
      }
      setDeleteModalId(null);
      const newFilteredLength = filteredComplaints.length - 1;
      const newTotalPages = Math.ceil(newFilteredLength / itemsPerPage) || 1;
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete complaint.");
    }
  };

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
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            colorClass={stat.color}
            bgClass={stat.bg}
            variant="horizontal"
          />
        ))}
      </div>

      <div className={`grid gap-6 ${selectedComplaint ? 'lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_350px]' : 'grid-cols-1'} items-start`}>
        <div className="flex flex-col gap-6 min-w-0">
          <Card className="p-4 sm:p-6">
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
                {hasFilters && (
                  <Button variant="secondary" onClick={resetFilters} className="px-3 xl:ml-2">
                    <RotateCcw size={16} strokeWidth={2} className="mr-1" />
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </Card>

          <Card noPadding className="flex flex-col overflow-x-auto min-w-0">
            {error ? (
              <div className="m-6 rounded-xl border border-danger/30 bg-danger/5 p-8 text-center text-sm font-medium text-danger">
                {error}
              </div>
            ) : (
              <Table
                headers={tableHeaders}
                currentCount={paginatedComplaints.length}
                totalCount={filteredComplaints.length}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                minWidth="900px"
                className="border-0 shadow-none rounded-none"
              >
                {loading ? (
                  <tr>
                    <td colSpan={tableHeaders.length} className="p-10 text-center text-sm text-muted">
                      Loading complaints...
                    </td>
                  </tr>
                ) : paginatedComplaints.length ? (
                  paginatedComplaints.map((c, index) => (
                    <tr key={c.id} >
                      <td className="whitespace-nowrap px-3 py-3 font-medium text-foreground">
                        {String((currentPage - 1) * itemsPerPage + index + 1).padStart(2, "0")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 font-medium text-foreground">{c.complaintId}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-muted">{c.date}</td>
                      <td className="px-3 py-3">
                        <div className="flex min-w-0 items-center gap-2">
                          <div className="h-8 w-8 rounded-full overflow-hidden shrink-0 border border-border">
                            <Avatar src={c.avatar} alt={c.userName} identifier={c.userId} className="h-full w-full object-cover" />
                          </div>
                          <span className="truncate font-medium text-foreground">
                            {c.userName}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-muted">{c.userType}</td>
                      <td className="px-3 py-3 text-muted">{c.issueType}</td>
                      <td className="px-3 py-3">
                        <BadgeCell
                          maxContent={maxPriority}
                          content={c.priority}
                          variant={
                            c.priority === "High"
                              ? "danger"
                              : c.priority === "Medium"
                                ? "warning"
                                : "default"
                          }
                          className="px-3"
                        />
                      </td>
                      <td className="px-3 py-3">
                        <BadgeCell
                          maxContent={maxStatus}
                          content={c.status}
                          variant={
                            c.status === "Open"
                              ? "warning"
                              : c.status === "In Progress"
                                ? "info"
                                : "success"
                          }
                          className="px-3"
                        />
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex justify-end pr-2">
                          <ActionMenu
                            actions={[
                              {
                                label: "View Details",
                                icon: Eye,
                                onClick: () => setSelectedComplaint(c),
                              },
                              {
                                label: "Delete",
                                icon: Trash2,
                                danger: true,
                                onClick: () => setDeleteModalId(c.id),
                              },
                            ]}
                          />
                        </div>
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
        </div>

        {/* Detail Panel */}
        {selectedComplaint && (
          <div className="flex flex-col bg-surface border border-border rounded-xl shadow-sm h-auto lg:h-[calc(100vh-250px)] lg:sticky lg:top-6">
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
                  <div className="h-10 w-10 rounded-full overflow-hidden shrink-0 border border-border">
                    <Avatar src={selectedComplaint.avatar} alt={selectedComplaint.userName} identifier={selectedComplaint.userId} className="h-full w-full object-cover" />
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
            <div className="p-5 border-t border-border bg-background flex items-center gap-3 rounded-b-xl">
              <StatusSelect 
                options={["Open", "In Progress", "Resolved", "Closed"]}
                value={selectedComplaint.status}
                onChange={(e) => handleUpdateStatus(selectedComplaint, e.target.value)}
                className="flex-1"
              />
              <Button variant="secondary" className="px-4" onClick={() => setSelectedComplaint(null)}>Close</Button>
            </div>
          </div>
        )}
      </div>

      <Modal 
        isOpen={!!deleteModalId} 
        onClose={() => setDeleteModalId(null)} 
        title="Delete Complaint"
      >
        <p className="text-sm text-muted">Are you sure you want to delete this complaint? This action cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteModalId(null)}>Cancel</Button>
          <Button className="bg-danger hover:bg-danger/90 text-white" onClick={handleDeleteComplaint}>Delete</Button>
        </div>
      </Modal>
    </section>
  );
}

export default Complaints;
