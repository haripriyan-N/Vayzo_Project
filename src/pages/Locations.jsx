import { useEffect, useMemo, useState } from "react";
import {
  MapPin,
  Building2,
  AlertCircle,
  Trash2,
  Filter,
  Plus,
  Edit2,
  MoreVertical,
  Eye,
  Maximize
} from "lucide-react";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import StatusSelect from "../components/ui/StatusSelect";
import StatCard from "../components/ui/StatCard";
import Table from "../components/ui/Table";
import Card from "../components/ui/Card";

import { getLocations } from "../api/locationsApi";

const STATUS_MAP = {
  ACTIVE: "success",
  INACTIVE: "warning",
  RESTRICTED: "danger",
};

const COLOR_MAP = {
  success: "text-success bg-success/10",
  info: "text-info bg-info/10",
  warning: "text-warning bg-warning/10",
  danger: "text-danger bg-danger/10",
  primary: "text-primary bg-primary/10",
};

const TABS = [
  "All Locations",
  "Active",
  "Inactive",
  "Restricted"
];

const toTitleCase = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All Status");
  const [city, setCity] = useState("All Cities");
  const [zone, setZone] = useState("All Zones");
  const [activeTab, setActiveTab] = useState("All Locations");

  const loadLocations = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getLocations();
      setLocations(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Unable to load locations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const filteredLocations = useMemo(() => {
    const searchValue = query.trim().toLowerCase();

    return locations.filter((loc) => {
      const searchableText = [loc.name, loc.fullName, loc.city, loc.zone]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchValue === "" || searchableText.includes(searchValue);
      const matchesStatus = status === "All Status" || loc.status.toUpperCase() === status.toUpperCase();
      const matchesTab = activeTab === "All Locations" || loc.status.toUpperCase() === activeTab.toUpperCase();
      const matchesCity = city === "All Cities" || loc.city === city;
      const matchesZone = zone === "All Zones" || loc.zone === zone;

      return matchesSearch && matchesStatus && matchesTab && matchesCity && matchesZone;
    });
  }, [locations, query, status, activeTab, city, zone]);

  return (
    <section className="min-h-full bg-background p-4 sm:p-6 pb-20">
      
      {/* Stat Cards Row */}
      <div className="mb-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          variant="horizontal"
          title="Total Locations"
          value={locations.length > 0 ? locations.length : 256}
          trend="8.5%"
          icon={MapPin}
          colorClass="text-primary"
          bgClass="bg-primary/10"
        />
        <StatCard
          variant="horizontal"
          title="Active Locations"
          value={locations.filter((l) => l.status === "ACTIVE").length || 198}
          trend="10.2%"
          icon={Building2}
          colorClass="text-success"
          bgClass="bg-success/10"
        />
        <StatCard
          variant="horizontal"
          title="Inactive Locations"
          value={locations.filter((l) => l.status === "INACTIVE").length || 45}
          trend="5.6%"
          isNegative
          icon={AlertCircle}
          colorClass="text-warning"
          bgClass="bg-warning/10"
        />
        <StatCard
          variant="horizontal"
          title="Restricted Locations"
          value={locations.filter((l) => l.status === "RESTRICTED").length || 13}
          trend="2.1%"
          isNegative
          icon={Trash2}
          colorClass="text-danger"
          bgClass="bg-danger/10"
        />
      </div>

      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* LEFT COLUMN: List & Filters */}
        <div className="flex-1 w-full xl:w-2/3">
          <Card noPadding className="flex flex-col">
            {/* Filters Top Bar */}
            <div className="p-4 sm:p-5 border-b border-border">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:justify-between">
                {/* Search */}
                <div className="flex-1 w-full min-w-0 lg:max-w-xs">
                  <SearchInput
                    id="locations-search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search location by name or address..."
                  />
                </div>

                {/* Selects and Button */}
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
                  <StatusSelect
                    id="locations-status"
                    value={status}
                    options={["All Status", "Active", "Inactive", "Restricted"]}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full sm:w-[130px]"
                  />
                  <StatusSelect
                    id="locations-cities"
                    value={city}
                    options={["All Cities", "Madurai", "Chennai", "Coimbatore"]}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full sm:w-[130px]"
                  />
                  <StatusSelect
                    id="locations-zones"
                    value={zone}
                    options={["All Zones", "North Zone", "South Zone", "East Zone", "West Zone"]}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full sm:w-[130px]"
                  />
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="secondary" className="px-3 gap-2 border border-border shadow-sm">
                      <Filter size={16} /> Filter
                    </Button>
                    <Button className="gap-2 shrink-0 shadow-md">
                      <Plus size={16} /> Add Location
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border px-2 flex overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap px-4 py-3.5 text-sm font-semibold transition-colors border-b-2 relative -mb-[1px] ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-muted hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Table */}
            {error ? (
              <div className="m-6 rounded-xl border border-danger/30 bg-danger/5 p-8 text-center text-sm font-medium text-danger">
                {error}
              </div>
            ) : (
              <Table
                headers={["Location Name", "Zone", "City", "Status", "Orders (30D)", "Actions"]}
                currentCount={filteredLocations.length}
                totalCount={locations.length}
                minWidth="900px"
                className="border-0 shadow-none rounded-none"
              >
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-sm text-muted">
                      Loading locations...
                    </td>
                  </tr>
                ) : filteredLocations.length > 0 ? (
                  filteredLocations.map((loc) => {
                    const bgAndColor = COLOR_MAP[loc.color] || COLOR_MAP.primary;

                    return (
                      <tr
                        key={loc.id}
                        className="border-b border-border transition-colors hover:bg-background last:border-0"
                      >
                        <td className="px-4 py-4 min-w-[220px]">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${bgAndColor}`}>
                              <Building2 size={18} strokeWidth={2.5}/>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-foreground text-sm">{loc.name}</span>
                              <span className="text-xs text-muted truncate max-w-[200px]">{loc.fullName}</span>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 font-medium text-muted text-sm">
                          {loc.zone}
                        </td>

                        <td className="px-4 py-4 font-medium text-muted text-sm">
                          {loc.city}
                        </td>

                        <td className="px-4 py-4">
                          <Badge variant={STATUS_MAP[loc.status] || "default"} className="px-2.5 py-1 text-xs">
                            {toTitleCase(loc.status)}
                          </Badge>
                        </td>

                        <td className="px-4 py-4 font-semibold text-foreground text-sm text-center">
                          {loc.orders30d}
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted transition hover:bg-primary/10 hover:text-primary">
                              <Eye size={14} strokeWidth={2} />
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted transition hover:bg-primary/10 hover:text-primary">
                              <Edit2 size={14} strokeWidth={2} />
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted transition hover:bg-primary/10 hover:text-primary">
                              <MoreVertical size={14} strokeWidth={2} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-sm text-muted">
                      No locations found.
                    </td>
                  </tr>
                )}
              </Table>
            )}
          </Card>
        </div>

        {/* RIGHT COLUMN: Map */}
        <div className="w-full xl:w-1/3 xl:min-w-[350px]">
          <Card className="sticky top-6 overflow-hidden flex flex-col h-[600px]">
            <div className="p-5 border-b border-border flex justify-between items-center bg-surface shrink-0">
              <h3 className="font-bold text-foreground">Location Map</h3>
              <div className="flex gap-2">
                <Button variant="secondary" className="px-3 py-1.5 h-auto text-xs font-semibold">
                  View Full Map
                </Button>
                <button className="text-muted hover:text-foreground">
                  <Maximize size={18} />
                </button>
              </div>
            </div>
            
            {/* Mock Map Area */}
            <div className="flex-1 bg-border/20 relative overflow-hidden flex items-center justify-center group cursor-grab active:cursor-grabbing">
               {/* Map Background Pattern */}
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
               
               {/* City Label */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 font-bold text-3xl text-foreground/40 text-center pointer-events-none">
                 Madurai<br/><span className="text-xl">மதுரை</span>
               </div>

               {/* North Zone */}
               <div className="absolute top-[10%] left-[30%] right-[20%] bottom-[50%] bg-info/20 border-2 border-info rounded-[30px] rounded-br-[100px] flex items-center justify-center transition-transform hover:scale-[1.02]">
                 <span className="bg-info text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">North Zone</span>
                 <MapPin size={24} className="text-info absolute top-[20%] right-[30%] drop-shadow-md" fill="white" />
               </div>

               {/* West Zone */}
               <div className="absolute top-[40%] left-[10%] right-[55%] bottom-[20%] bg-warning/20 border-2 border-warning rounded-[40px] rounded-tl-[80px] flex items-center justify-center transition-transform hover:scale-[1.02]">
                 <span className="bg-warning text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">West Zone</span>
                 <MapPin size={24} className="text-warning absolute top-[30%] left-[20%] drop-shadow-md" fill="white" />
               </div>

               {/* East Zone */}
               <div className="absolute top-[45%] left-[55%] right-[10%] bottom-[25%] bg-success/20 border-2 border-success rounded-[30px] rounded-tr-[90px] flex items-center justify-center transition-transform hover:scale-[1.02]">
                 <span className="bg-success text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">East Zone</span>
                 <MapPin size={24} className="text-success absolute bottom-[30%] right-[20%] drop-shadow-md" fill="white" />
               </div>

               {/* South Zone */}
               <div className="absolute top-[70%] left-[25%] right-[30%] bottom-[5%] bg-danger/20 border-2 border-danger rounded-[20px] rounded-bl-[60px] flex items-center justify-center transition-transform hover:scale-[1.02]">
                 <span className="bg-danger text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">South Zone</span>
                 <MapPin size={24} className="text-danger absolute top-[10%] left-[30%] drop-shadow-md" fill="white" />
               </div>

               {/* Map Controls */}
               <div className="absolute right-4 bottom-4 flex flex-col gap-1 z-10 bg-surface shadow-md rounded-lg overflow-hidden border border-border">
                 <button className="h-8 w-8 flex items-center justify-center hover:bg-muted/10 text-foreground text-lg font-bold">+</button>
                 <div className="h-px w-full bg-border"></div>
                 <button className="h-8 w-8 flex items-center justify-center hover:bg-muted/10 text-foreground text-lg font-bold">-</button>
               </div>
               
               <div className="absolute right-4 bottom-24 bg-surface shadow-md rounded-lg p-2 border border-border text-foreground hover:bg-muted/10 cursor-pointer">
                 <MapPin size={18} />
               </div>
            </div>

            {/* Map Legend */}
            <div className="p-4 bg-surface border-t border-border shrink-0">
               <div className="flex gap-4 items-center justify-center text-xs font-medium text-foreground">
                 <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-success"></span> Active (198)</span>
                 <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-warning"></span> Inactive (45)</span>
                 <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-danger"></span> Restricted (13)</span>
               </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
