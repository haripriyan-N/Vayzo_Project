import { Link } from "react-router-dom";

const items = ["Dashboard", "Users", "Delivery Partners", "Orders", "Transactions", "Earnings", "Locations", "Categories", "Restaurants", "Offers & Coupons", "Complaints", "Notifications", "Reports", "Settings", "Admin Users", "Activity Logs"];
const icons = ["⌂", "♙", "♧", "□", "▤", "◫", "⌖", "▧", "▥", "♢", "♧", "♢", "▥", "⚙", "♙", "◷"];

export default function Sidebar({ active = "Dashboard", help = false }) {
  return <aside className="reference-sidebar"><Link to="/dashboard" className="reference-logo">VAYZO</Link><nav>{items.map((item, index) => <Link className={item === active ? "selected" : ""} to={item === "Dashboard" ? "/dashboard" : `/${item.toLowerCase().replaceAll(" ", "-")}`} key={item}><span>{icons[index]}</span>{item}</Link>)}</nav>{help && <div className="user-sidebar-help"><strong>Need Help?</strong><p>Check our documentation or contact our support team for help.</p><button type="button">♧　Contact Support</button></div>}</aside>;
}
