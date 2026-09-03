import { useEffect, useMemo, useState } from "react";
import {
  Tag,
  CheckCircle,
  Clock,
  XCircle,
  Filter,
  Plus,
  Edit2,
  MoreVertical,
  RotateCcw,
  Trash2,
  Eye,
} from "lucide-react";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import StatusSelect from "../components/ui/StatusSelect";
import StatCard from "../components/ui/StatCard";
import Table from "../components/ui/Table";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Modal from "../components/ui/Modal";
import ActionMenu from "../components/ui/ActionMenu";

import { getOffers, deleteOffer } from "../api/offersApi";

const STATUS_MAP = {
  ACTIVE: "success",
  SCHEDULED: "warning",
  EXPIRED: "danger",
};

const COLOR_MAP = {
  success: "text-success bg-success/10",
  info: "text-info bg-info/10",
  warning: "text-warning bg-warning/10",
  danger: "text-danger bg-danger/10",
  primary: "text-primary bg-primary/10",
  muted: "text-muted bg-muted/10"
};

const ICON_MAP = {
  Percentage: Tag,
  Flat: Tag,
  "Free Delivery": Tag
};

const toTitleCase = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All Status");
  const [type, setType] = useState("All Types");
  const [platform, setPlatform] = useState("All Platforms");
  
  // Side panel state
  const [isFormOpen, setIsFormOpen] = useState(true); // Default open as per reference image (to show the split layout)
  const [deleteModalId, setDeleteModalId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const loadOffers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getOffers();
      setOffers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Unable to load offers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  const filteredOffers = useMemo(() => {
    const searchValue = query.trim().toLowerCase();

    return offers.filter((offer) => {
      const searchableText = [offer.name, offer.title, offer.offerId]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchValue === "" || searchableText.includes(searchValue);
      const matchesStatus = status === "All Status" || offer.status.toUpperCase() === status.toUpperCase();
      const matchesType = type === "All Types" || offer.type.toUpperCase() === type.toUpperCase();
      const matchesPlatform = platform === "All Platforms" || offer.platform.toUpperCase() === platform.toUpperCase();

      return matchesSearch && matchesStatus && matchesType && matchesPlatform;
    });
  }, [offers, query, status, type, platform]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);
  const paginatedOffers = filteredOffers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [query, status, type, platform]);

  const hasFilters =
    query !== "" ||
    status !== "All Status" ||
    type !== "All Types" ||
    platform !== "All Platforms";

  const resetFilters = () => {
    setQuery("");
    setStatus("All Status");
    setType("All Types");
    setPlatform("All Platforms");
  };

  const handleDeleteOffer = async () => {
    if (!deleteModalId) return;
    try {
      await deleteOffer(deleteModalId);
      setOffers((prev) => prev.filter((o) => o.offerId !== deleteModalId));
      setDeleteModalId(null);
      const newFilteredLength = filteredOffers.length - 1;
      const newTotalPages = Math.ceil(newFilteredLength / itemsPerPage) || 1;
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete offer.");
    }
  };

  return (
    <section className="min-h-full bg-background p-4 sm:p-6 pb-20">
      
      {/* Stat Cards Row */}
      <div className="mb-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          variant="horizontal"
          title="Total Offers"
          value={offers.length > 0 ? offers.length : 28}
          trend="12.5%"
          icon={Tag}
          colorClass="text-primary"
          bgClass="bg-primary/10"
        />
        <StatCard
          variant="horizontal"
          title="Active Offers"
          value={offers.filter((o) => o.status === "ACTIVE").length || 16}
          trend="8.7%"
          icon={CheckCircle}
          colorClass="text-success"
          bgClass="bg-success/10"
        />
        <StatCard
          variant="horizontal"
          title="Scheduled Offers"
          value={offers.filter((o) => o.status === "SCHEDULED").length || 7}
          trend="16.2%"
          icon={Clock}
          colorClass="text-warning"
          bgClass="bg-warning/10"
        />
        <StatCard
          variant="horizontal"
          title="Expired Offers"
          value={offers.filter((o) => o.status === "EXPIRED").length || 5}
          trend="10.3%"
          isNegative
          icon={XCircle}
          colorClass="text-danger"
          bgClass="bg-danger/10"
        />
      </div>

      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* LEFT COLUMN: List & Filters */}
        <div className={`flex flex-col gap-6 w-full transition-all duration-300 ${isFormOpen ? 'xl:w-2/3' : 'xl:w-full'}`}>
          <Card noPadding className="flex flex-col">
            {/* Filters Top Bar */}
            <div className="p-4 sm:p-5">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:justify-between">
                {/* Search */}
                <div className="flex-1 w-full min-w-0 lg:max-w-xs">
                  <SearchInput
                    id="offers-search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by offer name or code..."
                  />
                </div>

                {/* Selects and Button */}
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
                  <StatusSelect
                    id="offers-status"
                    value={status}
                    options={["All Status", "Active", "Scheduled", "Expired"]}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full sm:w-[130px]"
                  />
                  <StatusSelect
                    id="offers-type"
                    value={type}
                    options={["All Types", "Percentage", "Flat", "Free Delivery"]}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full sm:w-[130px]"
                  />
                  <StatusSelect
                    id="offers-platform"
                    value={platform}
                    options={["All Platforms", "App", "Web"]}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full sm:w-[140px]"
                  />
                  <div className="flex gap-2 w-full sm:w-auto">
                    {hasFilters && (
                      <Button variant="secondary" onClick={resetFilters} className="px-3 gap-2 border border-border shadow-sm">
                        <RotateCcw size={16} /> Reset
                      </Button>
                    )}
                    {!isFormOpen && (
                      <Button onClick={() => setIsFormOpen(true)} className="gap-2 shrink-0 shadow-md">
                        <Plus size={16} /> Create Offer
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card noPadding className="flex flex-col">
            {/* Table */}
            {error ? (
              <div className="p-8 text-center text-sm font-medium text-danger">
                {error}
              </div>
            ) : (
              <Table
                headers={[
                  "No.",
                  "Offer Details",
                  "Type",
                  "Discount",
                  "Usage",
                  "Validity",
                  "Status",
                  "Actions"
                ]}
                currentCount={paginatedOffers.length}
                totalCount={filteredOffers.length}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                minWidth="800px"
                className="border-0 shadow-none rounded-none"
              >
                {loading ? (
                  <tr>
                    <td colSpan={8} className="p-10 text-center text-sm text-muted">
                      Loading offers...
                    </td>
                  </tr>
                ) : paginatedOffers.length ? (
                  paginatedOffers.map((offer, index) => {
                    const Icon = ICON_MAP[offer.type] || Tag;
                    const bgAndColor = COLOR_MAP[offer.color] || COLOR_MAP.muted;
                    
                    const formatDt = (dt) => {
                       if (!dt) return "";
                       const d = new Date(dt);
                       return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                    };

                    return (
                      <tr
                        key={offer.offerId}
                        className="border-b border-border transition-colors hover:bg-background last:border-0"
                      >
                        <td className="whitespace-nowrap px-3 py-3 font-medium text-foreground">
                          {String((currentPage - 1) * itemsPerPage + index + 1).padStart(2, "0")}
                        </td>
                        <td className="px-4 py-4 min-w-[220px]">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bgAndColor}`}>
                              <Tag size={18} strokeWidth={2.5}/>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-foreground text-sm uppercase tracking-wide">{offer.name}</span>
                              <span className="text-xs text-muted font-medium">{offer.title}</span>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 font-medium text-foreground text-sm">
                          {offer.type}
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-foreground text-sm">{offer.discountText}</span>
                            <span className="text-xs text-muted">{offer.discountDetail}</span>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-foreground text-sm">{offer.usageLimit.toLocaleString()}</span>
                            <span className="text-xs text-muted">/ {offer.usageMax.toLocaleString()}</span>
                          </div>
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-foreground">{formatDt(offer.validFrom)}</span>
                            <span className="text-xs text-muted">to {formatDt(offer.validTo)}</span>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <Badge variant={STATUS_MAP[offer.status] || "default"} className="px-2.5 py-1 text-xs">
                            {toTitleCase(offer.status)}
                          </Badge>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <ActionMenu
                              actions={[
                                {
                                  label: "Edit",
                                  icon: Edit2,
                                  onClick: () => {},
                                },
                                {
                                  label: "Delete",
                                  icon: Trash2,
                                  danger: true,
                                  onClick: () => setDeleteModalId(offer.offerId),
                                },
                              ]}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="p-10 text-center text-sm text-muted">
                      No offers found.
                    </td>
                  </tr>
                )}
              </Table>
            )}
          </Card>
        </div>

        {/* RIGHT COLUMN: Create Form Sidebar */}
        {isFormOpen && (
          <div className="w-full xl:w-1/3 xl:min-w-[350px]">
            <Card className="sticky top-6">
              <div className="p-5 border-b border-border flex justify-between items-center bg-surface rounded-t-xl">
                <h3 className="font-bold text-foreground">Create New Offer</h3>
                <button onClick={() => setIsFormOpen(false)} className="text-muted hover:text-foreground">
                  <XCircle size={18} />
                </button>
              </div>
              
              <div className="p-5 flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-muted">Offer Name <span className="text-danger">*</span></label>
                  <Input placeholder="Enter offer name" className="bg-background" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-muted">Offer Code <span className="text-danger">*</span></label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter code (e.g. SAVE20)" className="bg-background flex-1" />
                    <Button variant="secondary" className="px-4 shrink-0 font-semibold border-primary/20 text-primary bg-primary/5">Check</Button>
                  </div>
                  <span className="text-[10px] text-muted ml-1">Customers will use this code at checkout</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-muted">Offer Type <span className="text-danger">*</span></label>
                  <Select options={["Select offer type", "Percentage", "Flat Discount", "Free Delivery"]} value="Select offer type" onChange={()=>{}} className="bg-background" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-muted">Discount Value <span className="text-danger">*</span></label>
                    <Input placeholder="0" type="number" className="bg-background" />
                  </div>
                  <div className="flex flex-col gap-1.5 justify-end">
                    <Select options={["% Percentage", "₹ Flat"]} value="% Percentage" onChange={()=>{}} className="bg-background" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-muted text-xs truncate">Minimum Order Value (₹)</label>
                    <Input placeholder="0" type="number" className="bg-background" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-muted text-xs truncate">Maximum Discount (₹)</label>
                    <Input placeholder="0" type="number" className="bg-background" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-muted">Validity <span className="text-danger">*</span></label>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Start Date" type="date" className="bg-background flex-1 text-sm text-muted" />
                    <span className="text-muted">→</span>
                    <Input placeholder="End Date" type="date" className="bg-background flex-1 text-sm text-muted" />
                  </div>
                  <label className="flex items-center gap-2 mt-1">
                    <input type="checkbox" className="rounded border-muted text-primary focus:ring-primary h-4 w-4" />
                    <span className="text-sm text-muted">No Expiry</span>
                  </label>
                </div>

                <div className="flex flex-col gap-2 border-t border-border pt-4">
                  <label className="text-sm font-semibold text-muted">Applicable On <span className="text-danger">*</span></label>
                  <div className="grid grid-cols-2 gap-3 mt-1">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="applies_to" defaultChecked className="text-primary focus:ring-primary h-4 w-4" />
                      <span className="text-sm font-medium">All Restaurants</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="applies_to" className="text-primary focus:ring-primary h-4 w-4" />
                      <span className="text-sm text-muted">Selected Restaurants</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="users" defaultChecked className="text-primary focus:ring-primary h-4 w-4" />
                      <span className="text-sm font-medium">All Users</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="users" className="text-primary focus:ring-primary h-4 w-4" />
                      <span className="text-sm text-muted">New Users Only</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 border-t border-border pt-4">
                  <label className="text-sm font-semibold text-muted">Usage Limit</label>
                  <div className="flex items-center gap-4">
                    <Input placeholder="0" type="number" className="bg-background w-32" />
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-muted text-primary focus:ring-primary h-4 w-4" />
                      <span className="text-sm text-muted">Unlimited</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1.5 border-t border-border pt-4">
                  <label className="text-sm font-semibold text-muted">Description (Optional)</label>
                  <textarea 
                    placeholder="Enter description" 
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[80px]" 
                  />
                </div>

                <div className="flex flex-col gap-2 border-t border-border pt-4">
                  <label className="text-sm font-semibold text-muted">Status</label>
                  <div className="flex gap-6 mt-1 mb-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="status" defaultChecked className="text-primary focus:ring-primary h-4 w-4" />
                      <span className="text-sm font-bold text-foreground">Active Now</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="status" className="text-primary focus:ring-primary h-4 w-4" />
                      <span className="text-sm text-muted">Schedule</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-border">
                  <Button variant="secondary" onClick={() => setIsFormOpen(false)} className="px-6 font-semibold">
                    Cancel
                  </Button>
                  <Button className="px-6 font-semibold shadow-md">
                    Create Offer
                  </Button>
                </div>

              </div>
            </Card>
          </div>
        )}
      </div>

      <Modal 
        isOpen={!!deleteModalId} 
        onClose={() => setDeleteModalId(null)} 
        title="Delete Offer"
      >
        <p className="text-sm text-muted">Are you sure you want to delete this offer? This action cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteModalId(null)}>Cancel</Button>
          <Button className="bg-danger hover:bg-danger/90 text-white" onClick={handleDeleteOffer}>Delete</Button>
        </div>
      </Modal>
    </section>
  );
}
