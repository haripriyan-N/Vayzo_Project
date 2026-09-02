import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Printer,
  ChevronDown,
  User,
  MapPin,
  Bike,
} from "lucide-react";

import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import Select from "../components/ui/Select";

const API_URL = "http://localhost:3001/orders";

const STATUS_MAP = {
  DELIVERED: "success",
  IN_TRANSIT: "info",
  PREPARING: "warning",
  CONFIRMED: "success",
  PENDING: "warning",
  CANCELLED: "danger",
};

const formatStatus = (status = "") => status.replaceAll("_", " ");

const toTitleCase = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const formatAmount = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(Number(amount || 0));

export default function OrderDetails() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrder = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `${API_URL}?orderId=${encodeURIComponent(orderId)}`,
      );
      if (!response.ok) throw new Error("Unable to load order");
      const data = await response.json();
      if (!data.length) {
        setOrder(null);
        return;
      }
      setOrder(data[0]);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  if (loading) {
    return (
      <div className="p-6 text-sm text-muted">Loading order details...</div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-6">
        <p className="text-sm text-danger mb-4">{error || "Order not found."}</p>
        <Button variant="secondary" onClick={() => navigate("/orders")}>
          Back to Orders
        </Button>
      </div>
    );
  }

  const orderStatus = order.status || "PENDING";
  const dateFormatted = order.orderDate ? new Date(order.orderDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "12 May 2024";
  const timeFormatted = order.orderDate ? new Date(order.orderDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "10:30 AM";

  return (
    <section className="min-h-full bg-background p-4 sm:p-6 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-foreground">
              Order #{order.orderId}
            </h1>
            <Badge variant={STATUS_MAP[orderStatus] || "default"} className="px-3 py-1 text-xs">
              {toTitleCase(formatStatus(orderStatus))}
            </Badge>
          </div>
          <div className="flex items-center gap-3 text-sm font-medium text-muted">
            <span>{dateFormatted}, {timeFormatted}</span>
            <Badge variant="secondary" className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-surface border border-border">
              {order.paymentStatus === 'PAID' ? 'Online Payment' : 'Cash on Delivery'}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" className="gap-2 bg-surface text-foreground font-semibold">
            <Printer size={16} /> Print Invoice
          </Button>
          <Button variant="secondary" className="bg-surface text-danger border-danger/20 font-semibold hover:bg-danger/5 hover:border-danger/30">
            Cancel Order
          </Button>
          <Button variant="secondary" className="bg-surface font-semibold gap-1 px-3">
            More <ChevronDown size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMN 1: Left */}
        <div className="flex flex-col gap-6">
          
          {/* Customer Details */}
          <Card className="p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 font-semibold text-foreground border-b border-border pb-3">
              <User size={18} className="text-muted" /> Customer Details
            </div>
            <div className="flex flex-col gap-1 text-sm text-muted">
              <span className="font-semibold text-foreground text-base mb-1">{order.customerName}</span>
              <span>+91 98765 43210</span>
              <span>customer.email@example.com</span>
            </div>
          </Card>

          {/* Delivery Address */}
          <Card className="p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 font-semibold text-foreground border-b border-border pb-3">
              <MapPin size={18} className="text-muted" /> Delivery Address
            </div>
            <div className="flex flex-col gap-3 text-sm text-muted">
              <p className="leading-relaxed">
                123, Anna Salai, Teynampet<br/>
                {order.city}, Tamil Nadu - 600018
              </p>
              <Button variant="secondary" className="w-fit text-primary border-primary/30 font-semibold bg-primary/5 hover:bg-primary/10">
                View on Map
              </Button>
            </div>
          </Card>

          {/* Order Items */}
          <Card className="p-0 flex flex-col overflow-hidden">
            <div className="p-5 border-b border-border font-semibold text-foreground">
              Order Items
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-surface text-muted font-medium border-b border-border">
                  <tr>
                    <th className="px-5 py-3 font-medium">Item</th>
                    <th className="px-5 py-3 font-medium text-right">Price</th>
                    <th className="px-5 py-3 font-medium text-center">Qty</th>
                    <th className="px-5 py-3 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {/* Mock items based on reference */}
                  <tr className="hover:bg-background/50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-border/50 shrink-0 overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&q=80" alt="Pizza" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col min-w-[120px]">
                          <span className="font-semibold text-foreground">Margherita Pizza</span>
                          <span className="text-[10px] text-muted">Regular | Classic Crust</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right text-muted font-medium">₹199.00</td>
                    <td className="px-5 py-4 text-center font-semibold text-foreground">1</td>
                    <td className="px-5 py-4 text-right font-semibold text-foreground">₹199.00</td>
                  </tr>
                  <tr className="hover:bg-background/50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-border/50 shrink-0 overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&q=80" alt="Burger" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col min-w-[120px]">
                          <span className="font-semibold text-foreground">Veg Burger</span>
                          <span className="text-[10px] text-muted">No Onion, No Tomato</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right text-muted font-medium">₹129.00</td>
                    <td className="px-5 py-4 text-center font-semibold text-foreground">1</td>
                    <td className="px-5 py-4 text-right font-semibold text-foreground">₹129.00</td>
                  </tr>
                  <tr className="hover:bg-background/50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-border/50 shrink-0 overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=100&q=80" alt="Coffee" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col min-w-[120px]">
                          <span className="font-semibold text-foreground">Cold Coffee</span>
                          <span className="text-[10px] text-muted">Regular</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right text-muted font-medium">₹99.00</td>
                    <td className="px-5 py-4 text-center font-semibold text-foreground">1</td>
                    <td className="px-5 py-4 text-right font-semibold text-foreground">₹99.00</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="px-5 py-4 text-right font-bold text-foreground">Total</td>
                    <td className="px-5 py-4 text-right font-bold text-foreground text-base">₹427.00</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>

        </div>

        {/* COLUMN 2: Middle */}
        <div className="flex flex-col gap-6">
          
          {/* Order Summary */}
          <Card className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between font-semibold text-foreground border-b border-border pb-3">
              <div className="flex items-center gap-2"><Printer size={18} className="text-muted" /> Order Summary</div>
            </div>
            
            <div className="flex flex-col gap-4 text-sm font-medium pt-2">
              <div className="flex justify-between items-center">
                <span className="text-muted">Restaurant</span>
                <span className="text-foreground font-semibold text-right">{order.restaurantName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Items</span>
                <span className="text-foreground text-right">3 items <ChevronDown size={14} className="inline ml-1"/></span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-muted">Item Total</span>
                <span className="text-foreground text-right">₹427.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Packaging Charges</span>
                <span className="text-foreground text-right">₹20.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Delivery Charges</span>
                <span className="text-foreground text-right">₹25.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Discount</span>
                <span className="text-success text-right">-₹50.00</span>
              </div>
              
              <div className="border-t border-dashed border-border my-2"></div>
              
              <div className="flex justify-between items-center">
                <span className="text-foreground font-bold text-base">Total Amount</span>
                <span className="text-foreground font-bold text-base text-right">₹422.00</span>
              </div>
              
              <div className="flex justify-between items-center mt-2 p-3 bg-success/5 rounded-lg border border-success/20">
                <span className="text-success font-bold">Paid Amount</span>
                <span className="text-success font-bold text-right">₹422.00</span>
              </div>
            </div>
          </Card>

          {/* Order Status */}
          <Card className="p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 font-semibold text-foreground border-b border-border pb-3">
              <CheckCircle size={18} className="text-muted" /> Order Status
            </div>
            
            <div className="relative pl-6 pt-4 pb-2 border-l-2 border-border ml-3 flex flex-col gap-8">
              {/* Placed */}
              <div className="relative">
                <div className="absolute -left-[35px] top-0.5 h-4 w-4 rounded-full bg-success ring-4 ring-background z-10 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                </div>
                <div className="absolute -left-[27px] -top-8 h-12 w-0.5 bg-success -z-0"></div>
                <h4 className="text-sm font-bold text-foreground">Placed</h4>
                <p className="text-xs text-muted mt-1">{dateFormatted}, 10:30 AM</p>
              </div>

              {/* Confirmed */}
              <div className="relative">
                <div className="absolute -left-[35px] top-0.5 h-4 w-4 rounded-full bg-success ring-4 ring-background z-10 flex items-center justify-center">
                   <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                </div>
                <div className="absolute -left-[27px] -top-[44px] h-[52px] w-0.5 bg-success -z-0"></div>
                <h4 className="text-sm font-bold text-foreground">Confirmed</h4>
                <p className="text-xs text-muted mt-1">{dateFormatted}, 10:31 AM</p>
              </div>

              {/* Preparing */}
              <div className="relative">
                <div className="absolute -left-[35px] top-0.5 h-4 w-4 rounded-full bg-primary ring-4 ring-background z-10 flex items-center justify-center">
                   <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                </div>
                <div className="absolute -left-[27px] -top-[44px] h-[52px] w-0.5 bg-primary -z-0"></div>
                <h4 className="text-sm font-bold text-primary">Preparing</h4>
                <p className="text-xs text-primary/70 mt-1">{dateFormatted}, 10:35 AM</p>
              </div>

              {/* Out for Delivery */}
              <div className="relative">
                <div className="absolute -left-[35px] top-0.5 h-4 w-4 rounded-full border-2 border-border bg-background ring-4 ring-background z-10"></div>
                <h4 className="text-sm font-medium text-muted">Out for Delivery</h4>
              </div>
              
              {/* Delivered */}
              <div className="relative">
                <div className="absolute -left-[35px] top-0.5 h-4 w-4 rounded-full border-2 border-border bg-background ring-4 ring-background z-10"></div>
                <h4 className="text-sm font-medium text-muted">Delivered</h4>
              </div>
            </div>
          </Card>

        </div>

        {/* COLUMN 3: Right */}
        <div className="flex flex-col gap-6">
          
          {/* Assign Delivery Partner */}
          <Card className="p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 font-semibold text-foreground border-b border-border pb-3">
              <Bike size={18} className="text-muted" /> Assign Delivery Partner
            </div>
            
            <div className="flex flex-col gap-3 pt-2">
              <label className="text-xs font-semibold text-muted">Select Delivery Partner <span className="text-danger">*</span></label>
              <Select options={["Choose delivery partner", "Karthik Raj", "Vignesh Kumar", "Muthuraman"]} value="Choose delivery partner" onChange={()=>{}} />
              
              <div className="flex flex-col gap-2 mt-2">
                {[
                  { name: "Karthik Raj", id: "DP000123", rating: "4.8", status: "Online" },
                  { name: "Vignesh Kumar", id: "DP000124", rating: "4.7", status: "Online" },
                  { name: "Muthuraman", id: "DP000125", rating: "4.6", status: "Online" },
                  { name: "Suresh Babu", id: "DP000126", rating: "4.5", status: "Busy" },
                  { name: "Manoj Kumar", id: "DP000127", rating: "4.4", status: "Offline" },
                ].map((dp, i) => (
                  <label key={i} className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${i === 0 ? 'border-primary/50 bg-primary/5' : 'border-border hover:bg-surface'}`}>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary overflow-hidden">
                        {/* Mock Avatar */}
                        <img src={`https://i.pravatar.cc/100?img=${10+i}`} alt={dp.name} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground flex items-center gap-1">{dp.name} <span className="text-warning text-[10px]">★ {dp.rating}</span></span>
                        <span className="text-xs text-muted">{dp.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${dp.status === 'Online' ? 'text-success' : dp.status === 'Busy' ? 'text-warning' : 'text-muted'}`}>
                        {dp.status}
                      </span>
                      <div className="relative flex items-center justify-center">
                        <input type="radio" name="delivery_partner" className="peer sr-only" defaultChecked={i === 0} />
                        <div className="h-4 w-4 rounded-full border border-muted peer-checked:border-primary peer-checked:border-[4px] transition-all"></div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <Button className="w-full mt-2 font-bold py-2.5 shadow-md">
                Assign Partner
              </Button>
            </div>
          </Card>

          {/* Order Timeline (Right Sidebar) */}
          <Card className="p-5 flex flex-col gap-4">
            <div className="font-semibold text-foreground border-b border-border pb-3">
              Order Timeline
            </div>
            
            <div className="relative pl-6 pt-4 pb-2 border-l-2 border-border ml-3 flex flex-col gap-8">
              {/* Placed */}
              <div className="relative">
                <div className="absolute -left-[35px] top-0.5 h-4 w-4 rounded-full bg-background border-2 border-success ring-4 ring-background z-10 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-success"></div>
                </div>
                <div className="absolute -left-[27px] -top-8 h-12 w-0.5 bg-success -z-0"></div>
                <h4 className="text-sm font-bold text-foreground">Order Placed</h4>
                <p className="text-xs text-muted mt-1">{dateFormatted}, 10:30 AM</p>
              </div>

              {/* Confirmed */}
              <div className="relative">
                <div className="absolute -left-[35px] top-0.5 h-4 w-4 rounded-full bg-background border-2 border-success ring-4 ring-background z-10 flex items-center justify-center">
                   <div className="h-1.5 w-1.5 rounded-full bg-success"></div>
                </div>
                <div className="absolute -left-[27px] -top-[44px] h-[52px] w-0.5 bg-success -z-0"></div>
                <h4 className="text-sm font-bold text-foreground">Order Confirmed</h4>
                <p className="text-xs text-muted mt-1">{dateFormatted}, 10:31 AM</p>
              </div>

              {/* Preparing */}
              <div className="relative">
                <div className="absolute -left-[35px] top-0.5 h-4 w-4 rounded-full bg-background border-2 border-primary ring-4 ring-background z-10 flex items-center justify-center">
                   <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                </div>
                <div className="absolute -left-[27px] -top-[44px] h-[52px] w-0.5 bg-primary -z-0"></div>
                <h4 className="text-sm font-bold text-foreground">Preparing</h4>
                <p className="text-xs text-muted mt-1">{dateFormatted}, 10:35 AM</p>
              </div>

              {/* Out for Delivery */}
              <div className="relative">
                <div className="absolute -left-[35px] top-0.5 h-4 w-4 rounded-full border-2 border-border bg-background ring-4 ring-background z-10"></div>
                <h4 className="text-sm font-medium text-muted">Out for Delivery</h4>
                <p className="text-xs text-muted mt-1">--</p>
              </div>
              
              {/* Delivered */}
              <div className="relative">
                <div className="absolute -left-[35px] top-0.5 h-4 w-4 rounded-full border-2 border-border bg-background ring-4 ring-background z-10"></div>
                <h4 className="text-sm font-medium text-muted">Delivered</h4>
                <p className="text-xs text-muted mt-1">--</p>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
}
