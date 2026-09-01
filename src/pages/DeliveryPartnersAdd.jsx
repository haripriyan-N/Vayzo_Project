import { useState, useEffect } from "react";
import {
  AlertCircle,
  CloudUpload,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import StatusSelect from "../components/ui/StatusSelect";
import { createDeliveryPartner, getDeliveryPartnerById, updateDeliveryPartner } from "../api/deliveryPartnersApi";

const vehicleOptions = [
  "Select vehicle type",
  "Bike",
  "Scooter",
  "Car",
  "Auto",
];

const statusOptions = ["Active", "Inactive", "Pending", "Blocked"];
const onlineStatusOptions = ["Online", "Offline"];

function RequiredLabel({ text }) {
  return (
    <span className="flex items-center gap-1.5">
      {text}
      <AlertCircle size={12} className="text-warning" strokeWidth={3} />
    </span>
  );
}

function DeliveryPartnersAdd() {
  const navigate = useNavigate();
  const { partnerId } = useParams();
  
  const isEditing = !!partnerId;

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    vehicleType: vehicleOptions[0],
    vehicleName: "",
    vehicleNumber: "",
    status: statusOptions[0],
    onlineStatus: onlineStatusOptions[1],
    city: "",
    dateOfBirth: "",
    gender: "Male",
    alternateMobile: "",
    emergencyContact: "",
    emergencyMobile: "",
    address: "",
    aadhaarNumber: "",
    panNumber: "",
    rcNumber: "",
    insuranceProvider: "",
    insuranceNumber: "",
    insuranceValidTill: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  });

  const [partnerDbId, setPartnerDbId] = useState(null); // The internal id for json-server PUT

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditing) {
      loadPartnerData();
    }
  }, [partnerId]);

  const loadPartnerData = async () => {
    try {
      setLoading(true);
      const data = await getDeliveryPartnerById(partnerId);
      setPartnerDbId(data.id);
      setForm({
        name: data.name || "",
        email: data.email || "",
        mobileNumber: data.mobileNumber || "",
        vehicleType: data.vehicleType || vehicleOptions[0],
        vehicleName: data.vehicleName || "",
        vehicleNumber: data.vehicleNumber || "",
        status: data.status || statusOptions[0],
        onlineStatus: data.onlineStatus || onlineStatusOptions[1],
        city: data.city || "",
        dateOfBirth: data.dateOfBirth || "",
        gender: data.gender || "Male",
        alternateMobile: data.alternateMobile || "",
        emergencyContact: data.emergencyContact || "",
        emergencyMobile: data.emergencyMobile || "",
        address: data.address || "",
        aadhaarNumber: data.aadhaarNumber || "",
        panNumber: data.panNumber || "",
        rcNumber: data.rcNumber || "",
        insuranceProvider: data.insuranceProvider || "",
        insuranceNumber: data.insuranceNumber || "",
        insuranceValidTill: data.insuranceValidTill || "",
        bankName: data.bankName || "",
        accountNumber: data.accountNumber || "",
        ifscCode: data.ifscCode || "",
        accountHolderName: data.accountHolderName || "",
      });
    } catch (err) {
      setError("Unable to load partner details.");
    } finally {
      setLoading(false);
    }
  };

  const update = (key) => (event) =>
    setForm({ ...form, [key]: event.target.value });

  const field = (id, labelText, key, type = "text", placeholder = "") => (
    <Input
      id={id}
      label={<RequiredLabel text={labelText} />}
      type={type}
      value={form[key]}
      onChange={update(key)}
      placeholder={placeholder}
      required
    />
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      
      const payload = {
        ...form,
        // Mock values for new partner if we're adding
        ...(isEditing ? {} : {
          partnerId: "DVP" + Math.floor(Math.random() * 90000 + 10000),
          joinedOn: new Date().toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' }),
          ordersCompleted: 0,
          rating: 0,
          earnings: 0,
          todayEarnings: "₹0",
          completionRate: "0%",
          cancellationRate: "0%",
          lastOrder: "--"
        })
      };

      if (isEditing) {
         // get existing data first to merge
         const existing = await getDeliveryPartnerById(partnerId);
         await updateDeliveryPartner(partnerDbId, { ...existing, ...form });
      } else {
         await createDeliveryPartner(payload);
      }

      navigate("/delivery");
    } catch (err) {
      setError("Unable to save delivery partner.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-full bg-background p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,2.2fr)_minmax(300px,0.8fr)] items-start">
        {error && (
          <div className="rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm font-medium text-danger">
            {error}
          </div>
        )}
        
        <form
          onSubmit={handleSubmit}
          className="flex flex-col rounded-xl border border-border bg-surface shadow-sm"
        >
          <div className="border-b border-border p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-foreground">
              Personal Information
            </h2>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  {field("full-name", "Full Name", "name", "text", "Enter full name")}
                  {field("email", "Email Address", "email", "email", "Enter email address")}
                  {field("mobile", "Mobile Number", "mobileNumber", "tel", "Enter mobile number")}
                  {field("city", "City", "city", "text", "Enter city")}
                </div>

              <div className="flex flex-col">
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  Profile Image
                </span>
                <label
                  htmlFor="profile-image"
                  className="cursor-pointer flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background hover:bg-surface-hover hover:border-primary/40 transition-all text-center p-6 group h-full"
                >
                  <input
                    type="file"
                    id="profile-image"
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp"
                  />
                  <CloudUpload
                    size={32}
                    className="text-primary mb-4 transition-transform group-hover:scale-110"
                  />
                  <p className="text-sm font-medium text-foreground">
                    Click to upload
                  </p>
                  <p className="mt-1 text-xs text-muted">or drag and drop</p>
                  <p className="mt-2 text-[10px] text-muted">
                    JPG, PNG or WEBP (Max 2MB)
                  </p>
                </label>
              </div>
            </div>
            
            <div className="mt-8 grid gap-8 md:grid-cols-2">
                {field("dateOfBirth", "Date of Birth", "dateOfBirth", "text", "e.g. 15 Aug 1995")}
                <StatusSelect
                  id="gender"
                  label={<RequiredLabel text="Gender" />}
                  value={form.gender}
                  options={["Male", "Female", "Other"]}
                  onChange={update("gender")}
                  required
                />
                {field("alternateMobile", "Alternate Mobile", "alternateMobile", "text", "")}
                {field("aadhaarNumber", "Aadhaar Number", "aadhaarNumber", "text", "")}
                {field("panNumber", "PAN Number", "panNumber", "text", "")}
                <div className="md:col-span-2">
                  {field("address", "Full Address", "address", "text", "Enter full address")}
                </div>
              </div>
            </div>

          <div className="border-b border-border p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-foreground">
              Emergency Contact
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {field("emergencyContact", "Contact Name (Relation)", "emergencyContact", "text", "e.g. Selvam R (Brother)")}
              {field("emergencyMobile", "Emergency Mobile", "emergencyMobile", "text", "")}
            </div>
          </div>

          <div className="border-b border-border p-6 sm:p-8">
             <h2 className="text-lg font-semibold text-foreground">
              Vehicle & Document Details
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <StatusSelect
                id="vehicle-type"
                label={<RequiredLabel text="Vehicle Type" />}
                value={form.vehicleType}
                options={vehicleOptions}
                onChange={update("vehicleType")}
                required
              />
              {field("vehicle-name", "Vehicle Name", "vehicleName", "text", "e.g. Honda Activa")}
              {field("vehicle-number", "Vehicle Number", "vehicleNumber", "text", "e.g. TN 01 AB 1234")}
              {field("rcNumber", "RC Number", "rcNumber", "text", "")}
              {field("insuranceProvider", "Insurance Provider", "insuranceProvider", "text", "")}
              {field("insuranceNumber", "Insurance Number", "insuranceNumber", "text", "")}
              {field("insuranceValidTill", "Insurance Valid Till", "insuranceValidTill", "text", "")}
            </div>
          </div>
          
          <div className="border-b border-border p-6 sm:p-8">
             <h2 className="text-lg font-semibold text-foreground">
              Bank Details
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {field("bankName", "Bank Name", "bankName", "text", "")}
              {field("accountNumber", "Account Number", "accountNumber", "text", "")}
              {field("ifscCode", "IFSC Code", "ifscCode", "text", "")}
              {field("accountHolderName", "Account Holder Name", "accountHolderName", "text", "")}
            </div>
          </div>
          
          <div className="border-b border-border p-6 sm:p-8">
             <h2 className="text-lg font-semibold text-foreground">
              Status Control
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <StatusSelect
                id="user-status"
                label={<RequiredLabel text="Status" />}
                value={form.status}
                options={statusOptions}
                onChange={update("status")}
                required
              />
              
              <StatusSelect
                id="online-status"
                label={<RequiredLabel text="Online Status" />}
                value={form.onlineStatus}
                options={onlineStatusOptions}
                onChange={update("onlineStatus")}
                required
              />
            </div>
          </div>

          <div className="mt-auto flex justify-end gap-4 border-t border-border p-6 bg-surface-hover/30 rounded-b-xl">
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto h-11 px-8 font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto h-11 px-8 font-medium"
            >
              {loading ? "Saving..." : isEditing ? "Update Partner" : "Create Partner"}
            </Button>
          </div>
        </form>

        <aside className="flex flex-col gap-6">
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-base font-semibold text-foreground border-b border-border pb-4 mb-4">
              Partner Guidelines
            </h2>
            <div className="space-y-4 text-sm text-muted">
              <p>
                <strong>Vehicle Requirements:</strong> Make sure the registered vehicle has valid insurance and RC up to date.
              </p>
              <p>
                <strong>Bank Details:</strong> Double-check the IFSC code and account number to ensure smooth payouts.
              </p>
              <p>
                <strong>Status Control:</strong> You can temporarily block a partner if they violate service terms.
              </p>
            </div>
          </div>
          
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-base font-semibold text-foreground border-b border-border pb-4 mb-4">
              Status Guide
            </h2>
            <div className="space-y-3">
              {[
                { title: "Active", text: "Partner can accept and deliver orders.", color: "text-success", bg: "bg-success", varName: "success" },
                { title: "Inactive", text: "Partner is inactive.", color: "text-warning", bg: "bg-warning", varName: "warning" },
                { title: "Pending", text: "Partner is awaiting verification.", color: "text-info", bg: "bg-info", varName: "info" },
                { title: "Blocked", text: "Partner is blocked.", color: "text-danger", bg: "bg-danger", varName: "danger" },
              ].map(({ title, text, color, bg, varName }) => (
                <div
                  key={title}
                  className="rounded-lg bg-background p-4 border-l-[3px] shadow-sm"
                  style={{
                    borderLeftColor: `var(--color-${varName})`,
                    borderTop: "1px solid var(--color-border)",
                    borderRight: "1px solid var(--color-border)",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <span className={`h-2.5 w-2.5 rounded-full ${bg}`}></span>
                    <span className={color}>{title}</span>
                  </p>
                  <p className="mt-1.5 text-xs text-muted leading-relaxed">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
      </div>
    </section>
  );
}

export default DeliveryPartnersAdd;
