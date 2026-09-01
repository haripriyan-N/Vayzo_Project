import {
  Ban,
  Bike,
  CalendarDays,
  Check,
  Eye,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  Pencil,
  Phone,
  Star,
  Wallet,
  ArrowLeft,
  Search
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Tabs from "../components/ui/Tabs";

import { getDeliveryPartnerById } from "../api/deliveryPartnersApi";

const getValue = (value) => value || "--";

const InfoRows = ({ items }) => (
  <div className="space-y-3 text-xs">
    {items.map(([label, value]) => (
      <div key={label} className="flex gap-3">
        <span className="w-[120px] shrink-0 text-muted">{label}</span>
        <span className="min-w-0 truncate font-medium text-foreground">
          {getValue(value)}
        </span>
      </div>
    ))}
  </div>
);

const DetailCard = ({ title, icon: Icon, children, headerRight }) => (
  <div className="rounded-xl border border-border bg-surface p-4 sm:p-5 shadow-sm h-full">
    <h3 className="mb-4 flex items-center justify-between gap-2 text-sm font-semibold text-foreground pb-3 border-b border-border">
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-primary" />
        {title}
      </div>
      {headerRight && <div>{headerRight}</div>}
    </h3>
    {children}
  </div>
);

const ActionButton = ({ icon: Icon, children, variant = "secondary", onClick }) => (
  <Button variant={variant} size="sm" onClick={onClick}>
    <Icon size={15} className="mr-1.5" />
    {children}
  </Button>
);

function DeliveryPartner() {
  const { partnerId } = useParams();
  const navigate = useNavigate();

  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    loadPartner();
  }, [partnerId]);

  const loadPartner = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDeliveryPartnerById(partnerId);
      setPartner(data);
    } catch (err) {
      setError(err.message || "Failed to load delivery partner");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="flex min-h-full items-center justify-center bg-background p-6">
        <p className="text-muted">Loading partner details...</p>
      </section>
    );
  }

  if (error || !partner) {
    return (
      <section className="flex min-h-full items-center justify-center bg-background p-6">
        <div className="rounded-xl border border-border bg-surface p-6 text-center shadow-sm">
          <h1 className="text-lg font-semibold text-foreground">
            Delivery Partner Not Found
          </h1>
          <p className="mt-2 text-sm text-muted">
            {error || "The requested delivery partner could not be found."}
          </p>
          <Button className="mt-4" onClick={() => navigate("/delivery")}>Back to List</Button>
        </div>
      </section>
    );
  }

  const stats = [
    ["Partner ID", partner.partnerId, <Search size={14} key="search" />],
    ["Vehicle", partner.vehicleType, <Bike size={14} key="bike" />],
    ["Total Orders", partner.ordersCompleted, <FileText size={14} key="file" />],
    ["Completion Rate", partner.completionRate, <Check size={14} key="check" />],
    ["Cancellation Rate", partner.cancellationRate, <Ban size={14} key="ban" />],
    ["Total Earnings", partner.earnings ? `₹${partner.earnings.toLocaleString()}` : null, <Wallet size={14} key="wallet1" />],
    ["Today's Earnings", partner.todayEarnings, <Wallet size={14} key="wallet2" />],
    ["Last Order", partner.lastOrder, <CalendarDays size={14} key="cal" />],
  ];

  const personalInformation = [
    ["Full Name", partner.name],
    ["Date of Birth", partner.dateOfBirth],
    ["Gender", partner.gender],
    ["Alternate Mobile", partner.alternateMobile],
    ["Emergency Contact", partner.emergencyContact],
    ["Emergency Mobile", partner.emergencyMobile],
    ["Address", partner.address],
    ["Aadhaar Number", partner.aadhaarNumber],
    ["PAN Number", partner.panNumber],
  ];

  const vehicleInformation = [
    ["Vehicle Type", partner.vehicleType],
    ["Vehicle Name", partner.vehicleName],
    ["Vehicle Number", partner.vehicleNumber],
    ["RC Number", partner.rcNumber],
    ["Insurance Provider", partner.insuranceProvider],
    ["Insurance Number", partner.insuranceNumber],
    ["Insurance Valid Till", partner.insuranceValidTill],
  ];

  const earningsSummary = [
    { label: "Total Earnings", value: partner.earnings ? `₹${partner.earnings.toLocaleString()}` : "--", color: "text-success", icon: "₹", bg: "bg-success/10", change: "▲ 12.5% from last month" },
    { label: "This Week", value: partner.thisWeekEarnings, color: "text-primary", icon: "📅", bg: "bg-primary/10", change: "▲ 8.3% from last week" },
    { label: "Today's Earnings", value: partner.todayEarnings, color: "text-indigo-500", icon: "$", bg: "bg-indigo-500/10" },
    { label: "Total Payouts", value: partner.totalPayouts, color: "text-amber-500", icon: "→", bg: "bg-amber-500/10" },
  ];

  const bankInformation = [
    ["Bank Name", partner.bankName],
    ["Account Number", partner.accountNumber],
    ["IFSC Code", partner.ifscCode],
    ["Account Holder Name", partner.accountHolderName],
  ];

  const documents = [
    "Aadhaar Card",
    "Driving License",
    "PAN Card",
    "Profile Photo",
    "Vehicle RC Book",
    "Insurance",
  ];

  const activities = [
    { text: `Order #ORD${partner.partnerId?.replace(/\D/g, '') || '12563'} delivered`, time: partner.lastActive },
    { text: "Earnings of ₹120 added", time: "12 May 2024, 10:16 AM" },
    { text: "Payout of ₹2,350 completed", time: "10 May 2024, 09:30 AM" },
    { text: "Profile information updated", time: "08 May 2024, 04:45 PM" },
    { text: "Document Insurance uploaded", time: "05 May 2024, 11:20 AM" },
  ];

  const tabs = [
    "Overview",
    "Documents",
    "Earnings",
    "Orders",
    "Payouts",
    "Performance",
    "Activity Logs",
  ];

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="space-y-5">
        {/* Header */}
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate("/delivery")}
          >
            <ArrowLeft size={16} />
            <span className="ml-2 font-medium">Back to List</span>
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              className="text-foreground hover:bg-surface-hover hover:text-foreground"
            >
              <MessageSquare size={16} />
              <span className="ml-2 font-medium">Send Message</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="text-danger hover:bg-danger/10 hover:text-danger border-transparent"
            >
              <Ban size={16} />
              <span className="ml-2 font-medium">Block Partner</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(`/delivery/edit/${partnerId}`)}
            >
              <Pencil size={16} />
              <span className="ml-2 font-medium">Edit Partner</span>
            </Button>
          </div>
        </div>

        {/* Partner Overview */}
        <div className="grid gap-6 rounded-xl border border-border bg-surface p-5 sm:p-6 shadow-sm lg:grid-cols-[minmax(320px,1.2fr)_2fr]">
          {/* Partner Profile */}
          <div className="flex items-start gap-5">
            <div className="flex flex-col items-center gap-3">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary overflow-hidden border-2 border-primary/20">
                 <img src={`https://ui-avatars.com/api/?name=${partner.name}&background=random&color=fff&size=200`} alt={partner.name} className="h-full w-full object-cover" />
              </div>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold border ${
                            partner.onlineStatus === 'Online' 
                            ? 'bg-success/5 text-success border-success/20' 
                            : 'bg-danger/5 text-danger border-danger/20'
                         }`}>
                 <span className={`h-1.5 w-1.5 rounded-full ${
                             partner.onlineStatus === 'Online' ? 'bg-success' : 'bg-danger'
                 }`} />
                 {partner.onlineStatus}
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold text-foreground">
                  {getValue(partner.name)}
                </h2>
                <Badge variant={partner.status === "Active" ? "success" : "danger"} className="h-6 px-2">
                  {getValue(partner.status)}
                </Badge>
              </div>

              <p className="mt-1.5 flex items-center gap-1 text-sm text-foreground font-medium">
                <Star size={15} className="text-amber-500" fill="currentColor" />
                {Number(partner.rating || 0).toFixed(1)}
                <span className="text-muted font-normal text-xs ml-1">({partner.ordersCompleted || 0} Reviews)</span>
              </p>

              <div className="mt-4 space-y-2.5 text-xs text-muted">
                <p className="flex items-center gap-2.5">
                  <Phone size={14} className="text-foreground/70"/>
                  {getValue(partner.mobileNumber)}
                </p>
                <p className="flex items-center gap-2.5 truncate">
                  <Mail size={14} className="text-foreground/70"/>
                  {getValue(partner.email)}
                </p>
                <p className="flex items-center gap-2.5">
                  <CalendarDays size={14} className="text-foreground/70"/>
                  Joined on {getValue(partner.joinedOn)}
                </p>
                <p className="flex items-center gap-2.5">
                  <MapPin size={14} className="text-foreground/70 shrink-0"/>
                  <span className="truncate">{getValue(partner.city)}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-5 text-xs sm:grid-cols-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            {stats.map(([label, value, icon]) => (
              <div key={label} className="min-w-0 flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  {icon}
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-muted text-[11px] mb-1 truncate">{label}</p>
                  <p className="truncate font-semibold text-foreground text-sm">
                    {getValue(value)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {/* Details Content */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {activeTab === "Overview" && (
            <>
              {/* Personal Information */}
              <DetailCard title="Personal Information" icon={FileText}>
                <InfoRows items={personalInformation} />
              </DetailCard>

              {/* Vehicle Information */}
              <DetailCard title="Vehicle Information" icon={Bike}>
                <InfoRows items={vehicleInformation} />
              </DetailCard>

              {/* Earnings Summary */}
              <DetailCard 
                title="Earnings Summary" 
                icon={Wallet}
                headerRight={
                  <select className="bg-background border border-border text-xs rounded-md px-2 py-1 outline-none text-foreground">
                    <option>This Month</option>
                    <option>Last Month</option>
                  </select>
                }
              >
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {earningsSummary.map((item, idx) => (
                    <div key={idx} className={`rounded-xl ${item.bg} p-4 border border-border/50`}>
                      <div className="flex justify-between items-start mb-2">
                         <div className={`h-8 w-8 rounded-full bg-background flex items-center justify-center ${item.color} shadow-sm font-semibold`}>
                            {item.icon}
                         </div>
                      </div>
                      <p className="text-[11px] text-muted font-medium mb-1">{item.label}</p>
                      <p className="text-lg font-bold text-foreground">
                        {getValue(item.value)}
                      </p>
                      {item.change && (
                        <p className="text-[10px] text-success mt-1.5 font-medium">{item.change}</p>
                      )}
                    </div>
                  ))}
                </div>
              </DetailCard>

              {/* Documents */}
              <DetailCard title="Documents" icon={FileText}>
                <div className="space-y-3 text-xs mt-1">
                  {documents.map((document) => (
                    <div key={document} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-hover transition-colors">
                      <FileText size={16} className="text-primary/70 shrink-0" />
                      <span className="flex-1 font-medium text-foreground">
                        {document}
                      </span>
                      <Badge variant="success" className="h-5 px-1.5 text-[10px] font-semibold bg-success/10 text-success border-success/20">
                        Verified
                      </Badge>
                      <button className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-background text-muted hover:text-foreground transition-colors ml-1">
                        <Eye size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border/50 text-center">
                   <button onClick={() => setActiveTab("Documents")} className="text-xs font-semibold text-primary hover:underline">View All Documents</button>
                </div>
              </DetailCard>

              {/* Bank Information */}
              <DetailCard title="Bank Information" icon={Wallet}>
                <InfoRows items={bankInformation} />
              </DetailCard>

              {/* Recent Activity */}
              <DetailCard title="Recent Activity" icon={CalendarDays}>
                <div className="space-y-4 text-xs mt-1">
                  {activities.map((activity, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="mt-0.5 shrink-0 h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <FileText size={10} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{activity.text}</p>
                        <p className="text-[10px] text-muted mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border/50 text-center">
                   <button onClick={() => setActiveTab("Activity Logs")} className="text-xs font-semibold text-primary hover:underline">View All Activity</button>
                </div>
              </DetailCard>
            </>
          )}

          {activeTab === "Documents" && (
            <div className="col-span-1 md:col-span-2 xl:col-span-3">
              <DetailCard title="All Documents" icon={FileText}>
                 <p className="text-muted text-sm p-4 text-center">Documents section content</p>
              </DetailCard>
            </div>
          )}

          {activeTab === "Earnings" && (
            <div className="col-span-1 md:col-span-2 xl:col-span-3">
              <DetailCard title="Detailed Earnings" icon={Wallet}>
                 <p className="text-muted text-sm p-4 text-center">Earnings section content</p>
              </DetailCard>
            </div>
          )}

          {activeTab === "Orders" && (
            <div className="col-span-1 md:col-span-2 xl:col-span-3">
              <DetailCard title="Order History" icon={FileText}>
                 <p className="text-muted text-sm p-4 text-center">Orders section content</p>
              </DetailCard>
            </div>
          )}

          {activeTab === "Payouts" && (
            <div className="col-span-1 md:col-span-2 xl:col-span-3">
              <DetailCard title="Payout History" icon={Wallet}>
                 <p className="text-muted text-sm p-4 text-center">Payouts section content</p>
              </DetailCard>
            </div>
          )}

          {activeTab === "Performance" && (
            <div className="col-span-1 md:col-span-2 xl:col-span-3">
              <DetailCard title="Performance Metrics" icon={Star}>
                 <p className="text-muted text-sm p-4 text-center">Performance section content</p>
              </DetailCard>
            </div>
          )}

          {activeTab === "Activity Logs" && (
            <div className="col-span-1 md:col-span-2 xl:col-span-3">
              <DetailCard title="Activity Logs" icon={CalendarDays}>
                 <p className="text-muted text-sm p-4 text-center">Activity Logs section content</p>
              </DetailCard>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DeliveryPartner;
