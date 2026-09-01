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
} from "lucide-react";
import { useParams } from "react-router-dom";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { deliveryPartners } from "../mock/deliveryPartners";

const getValue = (value) => value || "--";

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const InfoRows = ({ items }) => (
  <div className="space-y-2 text-xs">
    {items.map(([label, value]) => (
      <div key={label} className="flex gap-3">
        <span className="w-2/5 shrink-0 text-muted">{label}</span>
        <span className="min-w-0 truncate font-medium text-foreground">
          {getValue(value)}
        </span>
      </div>
    ))}
  </div>
);

const DetailCard = ({ title, icon: Icon, children }) => (
  <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
    <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
      <Icon size={16} className="text-primary" />
      {title}
    </h3>

    {children}
  </div>
);

const ActionButton = ({ icon: Icon, children, variant = "secondary" }) => (
  <Button variant={variant} size="sm">
    <Icon size={15} className="mr-1.5" />
    {children}
  </Button>
);

function DeliveryPartner() {
  const { partnerId } = useParams();

  const partner =
    deliveryPartners.find(
      (item) => String(item.partnerId) === String(partnerId),
    ) || deliveryPartners[0];

  if (!partner) {
    return (
      <section className="flex min-h-full items-center justify-center bg-background p-6">
        <div className="rounded-xl border border-border bg-surface p-6 text-center shadow-sm">
          <h1 className="text-lg font-semibold text-foreground">
            Delivery Partner Not Found
          </h1>

          <p className="mt-2 text-sm text-muted">
            The requested delivery partner could not be found.
          </p>
        </div>
      </section>
    );
  }

  const stats = [
    ["Partner ID", partner.partnerId],
    ["Vehicle", partner.vehicleType],
    ["Vehicle Number", partner.vehicleNumber],
    ["Total Orders", partner.ordersCompleted],
    ["Completion Rate", partner.completionRate],
    ["Cancellation Rate", partner.cancellationRate],
    ["Total Earnings", `₹${getValue(partner.earnings)}`],
    ["Today's Earnings", partner.todayEarnings],
    ["Last Order", partner.lastOrder],
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
    ["Total Earnings", `₹${getValue(partner.earnings)}`],
    ["This Week", partner.thisWeekEarnings],
    ["Today's Earnings", partner.todayEarnings],
    ["Total Payouts", partner.totalPayouts],
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
    "Order delivered",
    "Earnings added",
    "Payout completed",
    "Profile information updated",
    "Document insurance uploaded",
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
      <div className="space-y-4">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <p className="text-xs text-muted">
              Delivery Partners &gt; {partner.partnerId}
            </p>

            <h1 className="mt-1 text-2xl font-semibold text-foreground">
              Delivery Partner Details
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <ActionButton icon={MessageSquare}>Send Message</ActionButton>

            <ActionButton icon={Ban}>Block Partner</ActionButton>

            <ActionButton icon={Pencil} variant="primary">
              Edit Partner
            </ActionButton>
          </div>
        </header>

        {/* Partner Overview */}
        <div className="grid gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm lg:grid-cols-[minmax(260px,1fr)_2fr]">
          {/* Partner Profile */}
          <div className="flex items-center gap-4">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-white">
              {getInitials(partner.name)}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold text-foreground">
                  {getValue(partner.name)}
                </h2>

                <Badge variant="success" className="h-6">
                  {getValue(partner.status)}
                </Badge>
              </div>

              <p className="mt-2 flex items-center gap-1 text-sm text-amber-500">
                <Star size={15} fill="currentColor" />

                {Number(partner.rating || 0).toFixed(1)}

                <span className="text-muted">(Reviews)</span>
              </p>

              <p className="mt-2 flex items-center gap-2 text-xs text-muted">
                <Phone size={14} />
                {getValue(partner.mobileNumber)}
              </p>

              <p className="mt-1 flex items-center gap-2 truncate text-xs text-muted">
                <Mail size={14} />
                {getValue(partner.email)}
              </p>

              <p className="mt-1 flex items-center gap-2 text-xs text-muted">
                <MapPin size={14} />
                {getValue(partner.city)}
              </p>

              <Badge variant="success" className="mt-2 h-6">
                ● Online
              </Badge>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-4 text-xs sm:grid-cols-3 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
            {stats.map(([label, value]) => (
              <div key={label} className="min-w-0">
                <p className="text-muted">{label}</p>

                <p className="mt-1 truncate font-semibold text-foreground">
                  {getValue(value)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <nav className="flex gap-5 overflow-x-auto border-b border-border text-xs font-semibold text-muted">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={`whitespace-nowrap border-b-2 px-1 pb-3 ${
                index === 0
                  ? "border-primary text-primary"
                  : "border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Details */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* Personal Information */}
          <DetailCard title="Personal Information" icon={FileText}>
            <InfoRows items={personalInformation} />
          </DetailCard>

          {/* Vehicle Information */}
          <DetailCard title="Vehicle Information" icon={Bike}>
            <InfoRows items={vehicleInformation} />
          </DetailCard>

          {/* Earnings */}
          <DetailCard title="Earnings Summary" icon={Wallet}>
            <div className="grid grid-cols-2 gap-3">
              {earningsSummary.map(([label, value]) => (
                <div key={label} className="rounded-lg bg-primary-light p-3">
                  <p className="text-[11px] text-muted">{label}</p>

                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {getValue(value)}
                  </p>
                </div>
              ))}
            </div>
          </DetailCard>

          {/* Documents */}
          <DetailCard title="Documents" icon={FileText}>
            <div className="space-y-2 text-xs">
              {documents.map((document) => (
                <div key={document} className="flex items-center gap-2">
                  <FileText size={14} className="text-primary" />

                  <span className="flex-1 font-medium text-foreground">
                    {document}
                  </span>

                  <Badge variant="success" className="h-5 px-1.5 text-[10px]">
                    Verified
                  </Badge>

                  <Eye size={14} className="text-muted" />
                </div>
              ))}
            </div>
          </DetailCard>

          {/* Bank Information */}
          <DetailCard title="Bank Information" icon={Wallet}>
            <InfoRows items={bankInformation} />
          </DetailCard>

          {/* Recent Activity */}
          <DetailCard title="Recent Activity" icon={CalendarDays}>
            <div className="space-y-3 text-xs">
              {activities.map((activity) => (
                <div key={activity} className="flex items-center gap-2">
                  <Check size={14} className="text-success" />

                  <span className="flex-1 text-foreground">{activity}</span>

                  <span className="text-muted">
                    {getValue(partner.lastActive)}
                  </span>
                </div>
              ))}
            </div>
          </DetailCard>
        </div>
      </div>
    </section>
  );
}

export default DeliveryPartner;
