import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, RotateCcw, Eye, Pencil as Edit, Trash2, MoreVertical } from "lucide-react";
import Avatar from "../components/ui/Avatar";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import StatusSelect from "../components/ui/StatusSelect";
import DateRangeInput from "../components/ui/DateRangeInput";
import Input from "../components/ui/Input";
import Table from "../components/ui/Table";
import Card from "../components/ui/Card";
import Modal from "../components/ui/Modal";
import ActionMenu from "../components/ui/ActionMenu";

import { getDeliveryPartners, deleteDeliveryPartner } from "../api/deliveryPartnersApi";

const statusBadgeMap = {
  Active: "success",
  Verified: "info",
  Pending: "warning",
  Blocked: "danger",
  Inactive: "danger",
};

const statusOptions = ["All Status", "Active", "Inactive"];
const vehicleOptions = ["All Vehicle Type", "Bike", "Scooter", "Car", "Auto"];
const onlineStatusOptions = ["All Online Status", "Online", "Offline"];

const deliveryPartnerTableHeaders = [
  "No.",
  "ID",
  "Partner",
  "Mobile",
  "Vehicle",
  "Vehicle No.",
  "Status",
  "Online Status",
  "Earnings (Today)",
  "Joined On",
  "Actions",
];

function DeliveryPartners() {
  const navigate = useNavigate();

  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteModalId, setDeleteModalId] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [vehicleType, setVehicleType] = useState("All Vehicle Type");
  const [onlineStatus, setOnlineStatus] = useState("All Online Status");
  const [joinedFrom, setJoinedFrom] = useState("");
  const [joinedTo, setJoinedTo] = useState("");
  const [minEarnings, setMinEarnings] = useState("");
  const [maxEarnings, setMaxEarnings] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    let isMounted = true;

    const loadPartners = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getDeliveryPartners();
        
        if (isMounted) {
          setPartners(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load delivery partners");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPartners();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPartners = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return partners.filter((partner) => {
      const matchesSearch =
        !searchValue ||
        partner.name?.toLowerCase().includes(searchValue) ||
        partner.email?.toLowerCase().includes(searchValue) ||
        partner.mobileNumber?.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "All Status" || partner.status === status;
      const matchesVehicle =
        vehicleType === "All Vehicle Type" ||
        partner.vehicleType === vehicleType;
      const matchesOnline =
        onlineStatus === "All Online Status" ||
        partner.onlineStatus === onlineStatus;

      // Date filtering
      const partnerDate = new Date(partner.joinedOn);
      const fromDate = joinedFrom ? new Date(joinedFrom) : null;
      const toDate = joinedTo ? new Date(joinedTo) : null;
      const matchesJoinedDate =
        (!fromDate || partnerDate >= fromDate) &&
        (!toDate || partnerDate <= toDate);

      // Earnings filtering
      const partnerEarnings = parseInt(partner.todayEarnings?.replace(/[^0-9]/g, '')) || 0;
      const minE = minEarnings ? parseInt(minEarnings) : 0;
      const maxE = maxEarnings ? parseInt(maxEarnings) : Infinity;
      const matchesEarnings = partnerEarnings >= minE && partnerEarnings <= maxE;

      return matchesSearch && matchesStatus && matchesVehicle && matchesOnline && matchesJoinedDate && matchesEarnings;
    });
  }, [search, status, vehicleType, onlineStatus, partners, joinedFrom, joinedTo, minEarnings, maxEarnings]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);
  const paginatedPartners = filteredPartners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, vehicleType, onlineStatus, joinedFrom, joinedTo, minEarnings, maxEarnings]);

  const hasFilters =
    search !== "" ||
    status !== "All Status" ||
    vehicleType !== "All Vehicle Type" ||
    onlineStatus !== "All Online Status" ||
    joinedFrom !== "" ||
    joinedTo !== "" ||
    minEarnings !== "" ||
    maxEarnings !== "";

  const handleReset = () => {
    setSearch("");
    setStatus("All Status");
    setVehicleType("All Vehicle Type");
    setOnlineStatus("All Online Status");
    setJoinedFrom("");
    setJoinedTo("");
    setMinEarnings("");
    setMaxEarnings("");
  };

  const toTitleCase = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleDeletePartner = async () => {
    if (!deleteModalId) return;
    try {
      await deleteDeliveryPartner(deleteModalId);
      setPartners((prev) => prev.filter((p) => p.partnerId !== deleteModalId));
      setDeleteModalId(null);
      const newFilteredLength = filteredPartners.length - 1;
      const newTotalPages = Math.ceil(newFilteredLength / itemsPerPage) || 1;
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete partner.");
    }
  };

  return (
    <section className="min-h-full bg-background p-4 sm:p-6 flex flex-col gap-6">
      <Card noPadding className="flex flex-col">
        {/* Filter Section */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:justify-between">
            {/* Search Input */}
            <div className="flex-1 w-full min-w-0 xl:max-w-sm">
              <SearchInput
                id="partner-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search delivery partners by name, mobile or email..."
              />
            </div>

            {/* Selects and Button */}
            <div className="grid grid-cols-1 sm:grid-cols-4 xl:flex xl:flex-row gap-4 w-full xl:w-auto items-center">
              <StatusSelect
                id="partner-status"
                value={status}
                options={statusOptions}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full xl:w-[150px]"
              />

              <StatusSelect
                id="partner-vehicle"
                value={vehicleType}
                options={vehicleOptions}
                onChange={(event) => setVehicleType(event.target.value)}
                className="w-full xl:w-[160px]"
              />

              <StatusSelect
                id="partner-online"
                value={onlineStatus}
                options={onlineStatusOptions}
                onChange={(event) => setOnlineStatus(event.target.value)}
                className="w-full xl:w-[160px]"
              />

              <Button
                size="sm"
                onClick={() => navigate("/delivery/add")}
                className="col-span-1 sm:col-span-4 xl:col-span-1 h-10 w-full flex items-center justify-center text-[0.8rem] gap-2"
              >
                <Plus size={18} strokeWidth={2.5} />
                Add Delivery Partner
              </Button>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <DateRangeInput
                id="joined-date"
                label="Joined Date"
                fromValue={joinedFrom}
                toValue={joinedTo}
                onFromChange={(event) => setJoinedFrom(event.target.value)}
                onToChange={(event) => setJoinedTo(event.target.value)}
              />

              <div className="w-full sm:w-[260px]">
                <label className="text-xs font-medium text-muted mb-1.5 block">
                  Earnings Range
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    placeholder="Min"
                    value={minEarnings}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || Number(val) >= 0) setMinEarnings(val);
                    }}
                    className="h-10"
                  />
                  <span className="text-muted">-</span>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Max"
                    value={maxEarnings}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || Number(val) >= 0) setMaxEarnings(val);
                    }}
                    className="h-10"
                  />
                </div>
              </div>
            </div>

            {hasFilters && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleReset}
                className="h-10 w-full sm:w-auto shrink-0"
              >
                <RotateCcw size={16} strokeWidth={2} className="mr-1" />
                Reset
              </Button>
            )}
          </div>
        </div>
      </Card>

      <Card noPadding className="flex flex-col">
        {error ? (
          <div className="m-6 rounded-xl border border-danger/30 bg-danger/5 p-8 text-center text-sm font-medium text-danger">
            {error}
          </div>
        ) : (
          <Table
            headers={deliveryPartnerTableHeaders}
            currentCount={paginatedPartners.length}
            totalCount={filteredPartners.length}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            minWidth="1000px"
            className="border-0 shadow-none rounded-none border-t border-border"
          >
            {loading ? (
              <tr>
                <td
                  colSpan={deliveryPartnerTableHeaders.length}
                  className="p-10 text-center text-sm text-muted"
                >
                  Loading delivery partners...
                </td>
              </tr>
            ) : paginatedPartners.length ? (
              paginatedPartners.map((partner, index) => (
                <tr
                  key={partner.partnerId}
                  className="border-b border-border last:border-0 transition-colors hover:bg-background"
                >
                  <td className="whitespace-nowrap px-3 py-3 font-medium text-foreground">
                    {String((currentPage - 1) * itemsPerPage + index + 1).padStart(2, "0")}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 font-medium text-foreground">
                    {partner.partnerId}
                  </td>

                  <td className="px-3 py-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-primary overflow-hidden">
                        <Avatar
                          src={partner.image}
                          alt={partner.name}
                          identifier={partner.partnerId}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="truncate font-medium text-foreground">
                          {partner.name}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-medium text-amber-500">
                          <span className="text-amber-500 text-sm">★</span>{" "}
                          {partner.rating}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-muted">
                    {partner.mobileNumber}
                  </td>

                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-primary bg-primary/10 p-1.5 rounded-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="5.5" cy="17.5" r="3.5" />
                          <circle cx="18.5" cy="17.5" r="3.5" />
                          <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
                        </svg>
                      </span>
                      <span className="truncate font-medium text-muted">
                        {partner.vehicleType}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-muted">
                    {partner.vehicleNumber}
                  </td>

                  <td className="px-3 py-3">
                    <Badge
                      variant={
                        statusBadgeMap[toTitleCase(partner.status)] || "default"
                      }
                      className="whitespace-nowrap px-3"
                    >
                      {toTitleCase(partner.status)}
                    </Badge>
                  </td>

                  <td className="px-3 py-3">
                    <span
                      className={[
                        "inline-flex items-center gap-1.5 rounded-md p-1.5",
                        "text-[11px] font-semibold",
                        partner.onlineStatus === "Online"
                          ? "bg-success/15 text-success"
                          : "bg-danger/15 text-danger",
                      ].join(" ")}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          partner.onlineStatus === "Online"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      />
                      {partner.onlineStatus}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 font-medium text-foreground">
                    {partner.todayEarnings}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-muted">
                    {partner.joinedOn}
                  </td>

                  <td className="px-3 py-3">
                    <div className="flex items-center justify-end gap-2">


                      <ActionMenu
                        actions={[
                          {
                            label: "View",
                            icon: Eye,
                            onClick: () => navigate(`/delivery/${partner.partnerId}`),
                          },
                          {
                            label: "Edit",
                            icon: Edit,
                            onClick: () => navigate(`/delivery/edit/${partner.partnerId}`),
                          },
                          {
                            label: "Delete",
                            icon: Trash2,
                            danger: true,
                            onClick: () => setDeleteModalId(partner.partnerId),
                          },
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={deliveryPartnerTableHeaders.length}
                  className="p-10 text-center text-sm text-muted"
                >
                  No delivery partners found for the selected search and
                  filters.
                </td>
              </tr>
            )}
          </Table>
        )}
      </Card>
      
      <Modal 
        isOpen={!!deleteModalId} 
        onClose={() => setDeleteModalId(null)} 
        title="Delete Delivery Partner"
      >
        <p className="text-sm text-muted">Are you sure you want to delete this partner? This action cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteModalId(null)}>Cancel</Button>
          <Button className="bg-danger hover:bg-danger/90 text-white" onClick={handleDeletePartner}>Delete</Button>
        </div>
      </Modal>
    </section>
  );
}

export default DeliveryPartners;
