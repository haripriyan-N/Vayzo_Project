export const appConfig = {
  success: true,
  message: "App configuration fetched successfully",
  data: {
    appName: "VAYZO",
    latestVersion: "1.0.0",
    minimumVersion: "1.0.0",
    maintenanceMode: false,
    forceUpdate: false,
  },
};

export const authResponses = {
  sendOtp: {
    success: true,
    message: "OTP sent successfully",
    data: {
      verificationId: "VER123456",
      maskedMobile: "******3210",
      expiresIn: 120,
      resendAfter: 30,
    },
  },
  verifyOtp: {
    success: true,
    message: "OTP verified successfully",
    data: {
      isNewUser: false,
      accessToken: "ACCESS_TOKEN",
      refreshToken: "REFRESH_TOKEN",
      expiresIn: 3600,
      user: {
        userId: "USR1001",
        name: "Prathap M",
        mobileNumber: "+919876543210",
        profileImage: null,
      },
    },
  },
};

export const homeData = {
  success: true,
  message: "Home data fetched successfully",
  data: {
    user: {
      userId: "USR1001",
      name: "Prathap M",
    },
    currentLocation: {
      locationId: "LOC001",
      address: "Anna Nagar, Madurai",
    },
    services: [
      { serviceId: "FOOD", name: "Food Delivery", icon: "food_icon" },
      { serviceId: "BUY_GET", name: "Buy & Get It", icon: "shopping_icon" },
      { serviceId: "RIDE", name: "Rides", icon: "ride_icon" },
      { serviceId: "BIKE", name: "Bike Booking", icon: "bike_icon" },
      { serviceId: "CAR", name: "Car Booking", icon: "car_icon" },
    ],
    activeRequests: [
      {
        requestId: "REQ1001",
        serviceType: "BUY_GET",
        status: "PARTNER_ASSIGNED",
        estimatedTime: 18,
      },
    ],
  },
};

export const users = [
  {
    userId: "USR1001",
    name: "Prathap M",
    email: "prathap@gmail.com",
    mobileNumber: "+919876543210",
    status: "ACTIVE",
    userType: "Customer",
    city: "Madurai",
    lastActive: "2 mins ago",
    totalOrders: 87,
    walletBalance: 250,
  },
  {
    userId: "USR1002",
    name: "Priya Nair",
    email: "priya.nair@gmail.com",
    mobileNumber: "+919876543211",
    status: "VERIFIED",
    userType: "Business",
    city: "Chennai",
    lastActive: "14 mins ago",
    totalOrders: 64,
    walletBalance: 180,
  },
  {
    userId: "USR1003",
    name: "Arun Kumar",
    email: "arun.kumar@gmail.com",
    mobileNumber: "+919876543212",
    status: "PENDING",
    userType: "Delivery Partner",
    city: "Coimbatore",
    lastActive: "1 hour ago",
    totalOrders: 21,
    walletBalance: 95,
  },
  {
    userId: "USR1004",
    name: "Deepa Rani",
    email: "deepa@gmail.com",
    mobileNumber: "+919876543213",
    status: "BLOCKED",
    userType: "Customer",
    city: "Trichy",
    lastActive: "3 days ago",
    totalOrders: 10,
    walletBalance: 45,
  },
  {
    userId: "USR1005",
    name: "Sathish V",
    email: "sathish.v@gmail.com",
    mobileNumber: "+919876543214",
    status: "ACTIVE",
    userType: "Merchant",
    city: "Madurai",
    lastActive: "Just now",
    totalOrders: 132,
    walletBalance: 330,
  },
  {
    userId: "USR1006",
    name: "Meera Suresh",
    email: "meera.suresh@gmail.com",
    mobileNumber: "+919876543215",
    status: "VERIFIED",
    userType: "Customer",
    city: "Salem",
    lastActive: "8 mins ago",
    totalOrders: 58,
    walletBalance: 210,
  },
  {
    userId: "USR1007",
    name: "Karthik Raja",
    email: "karthik.raja@gmail.com",
    mobileNumber: "+919876543216",
    status: "PENDING",
    userType: "Business",
    city: "Bengaluru",
    lastActive: "Yesterday",
    totalOrders: 12,
    walletBalance: 70,
  },
  {
    userId: "USR1008",
    name: "Nandhini P",
    email: "nandhini.p@gmail.com",
    mobileNumber: "+919876543217",
    status: "ACTIVE",
    userType: "Delivery Partner",
    city: "Namakkal",
    lastActive: "5 mins ago",
    totalOrders: 143,
    walletBalance: 410,
  },
];

export const userStats = [
  { label: "Total Users", value: "12.8K", trend: "+12.4%" },
  { label: "Active Today", value: "4.1K", trend: "+8.1%" },
  { label: "Verified", value: "91.2%", trend: "+1.9%" },
  { label: "Blocked", value: "184", trend: "-2.8%" },
];

export const deliveryPartners = [
  {
    partnerId: "DP1001",
    name: "Sankar P",
    email: "sankar.p@gmail.com",
    mobileNumber: "+919876543310",
    status: "ACTIVE",
    vehicleType: "Bike",
    city: "Madurai",
    lastActive: "2 mins ago",
    ordersCompleted: 184,
    rating: 4.8,
    earnings: 12850,
  },
  {
    partnerId: "DP1002",
    name: "Raja M",
    email: "raja.m@gmail.com",
    mobileNumber: "+919876543311",
    status: "VERIFIED",
    vehicleType: "Car",
    city: "Chennai",
    lastActive: "10 mins ago",
    ordersCompleted: 142,
    rating: 4.7,
    earnings: 11600,
  },
  {
    partnerId: "DP1003",
    name: "Kabilan S",
    email: "kabilan.s@gmail.com",
    mobileNumber: "+919876543312",
    status: "PENDING",
    vehicleType: "Bike",
    city: "Coimbatore",
    lastActive: "1 hour ago",
    ordersCompleted: 64,
    rating: 4.4,
    earnings: 4300,
  },
  {
    partnerId: "DP1004",
    name: "Naveen R",
    email: "naveen.r@gmail.com",
    mobileNumber: "+919876543313",
    status: "BLOCKED",
    vehicleType: "Auto",
    city: "Trichy",
    lastActive: "4 days ago",
    ordersCompleted: 18,
    rating: 3.8,
    earnings: 1200,
  },
  {
    partnerId: "DP1005",
    name: "Vignesh K",
    email: "vignesh.k@gmail.com",
    mobileNumber: "+919876543314",
    status: "ACTIVE",
    vehicleType: "Bike",
    city: "Madurai",
    lastActive: "Just now",
    ordersCompleted: 214,
    rating: 4.9,
    earnings: 17420,
  },
  {
    partnerId: "DP1006",
    name: "Anandh B",
    email: "anandh.b@gmail.com",
    mobileNumber: "+919876543315",
    status: "VERIFIED",
    vehicleType: "Car",
    city: "Salem",
    lastActive: "20 mins ago",
    ordersCompleted: 170,
    rating: 4.6,
    earnings: 10980,
  },
];

export const deliveryPartnerStats = [
  { label: "Total Partners", value: "3.2K", trend: "+9.4%" },
  { label: "Online Now", value: "1.4K", trend: "+6.7%" },
  { label: "Verified", value: "84.6%", trend: "+2.3%" },
  { label: "Blocked", value: "96", trend: "-1.5%" },
];

export const orders = [
  {
    orderId: "ORD1001",
    customerName: "Prathap M",
    restaurantName: "Murugan Kadai",
    status: "DELIVERED",
    paymentStatus: "PAID",
    amount: 420,
    orderDate: "2026-08-27 11:20",
    deliveryPartner: "Sankar P",
    city: "Madurai",
  },
  {
    orderId: "ORD1002",
    customerName: "Priya Nair",
    restaurantName: "Pizza Hub",
    status: "IN_TRANSIT",
    paymentStatus: "PAID",
    amount: 680,
    orderDate: "2026-08-27 10:45",
    deliveryPartner: "Raja M",
    city: "Chennai",
  },
  {
    orderId: "ORD1003",
    customerName: "Arun Kumar",
    restaurantName: "Sangeetha Veg",
    status: "PENDING",
    paymentStatus: "PENDING",
    amount: 290,
    orderDate: "2026-08-27 09:15",
    deliveryPartner: "Kabilan S",
    city: "Coimbatore",
  },
  {
    orderId: "ORD1004",
    customerName: "Deepa Rani",
    restaurantName: "A2B",
    status: "CANCELLED",
    paymentStatus: "REFUNDED",
    amount: 360,
    orderDate: "2026-08-26 18:40",
    deliveryPartner: "Naveen R",
    city: "Trichy",
  },
  {
    orderId: "ORD1005",
    customerName: "Sathish V",
    restaurantName: "KFC",
    status: "PREPARING",
    paymentStatus: "PAID",
    amount: 540,
    orderDate: "2026-08-27 12:05",
    deliveryPartner: "Vignesh K",
    city: "Madurai",
  },
  {
    orderId: "ORD1006",
    customerName: "Meera Suresh",
    restaurantName: "Biryani Plaza",
    status: "DELIVERED",
    paymentStatus: "PAID",
    amount: 780,
    orderDate: "2026-08-27 08:30",
    deliveryPartner: "Anandh B",
    city: "Salem",
  },
];

export const orderStats = [
  { label: "Total Orders", value: "18.4K", trend: "+11.8%" },
  { label: "Pending", value: "1.2K", trend: "+4.1%" },
  { label: "Delivered", value: "94.5%", trend: "+2.1%" },
  { label: "Cancelled", value: "236", trend: "-3.2%" },
];

export const transactions = [
  {
    transactionId: "TXN2001",
    userName: "Prathap M",
    type: "CREDIT",
    status: "SUCCESS",
    amount: 250,
    method: "Wallet",
    date: "2026-08-27 11:20",
    description: "Wallet top-up",
    city: "Madurai",
  },
  {
    transactionId: "TXN2002",
    userName: "Priya Nair",
    type: "DEBIT",
    status: "SUCCESS",
    amount: 680,
    method: "UPI",
    date: "2026-08-27 10:45",
    description: "Order payment",
    city: "Chennai",
  },
  {
    transactionId: "TXN2003",
    userName: "Arun Kumar",
    type: "DEBIT",
    status: "PENDING",
    amount: 290,
    method: "Card",
    date: "2026-08-27 09:15",
    description: "Food order",
    city: "Coimbatore",
  },
  {
    transactionId: "TXN2004",
    userName: "Deepa Rani",
    type: "REFUND",
    status: "SUCCESS",
    amount: 360,
    method: "Wallet",
    date: "2026-08-26 18:40",
    description: "Cancelled order refund",
    city: "Trichy",
  },
  {
    transactionId: "TXN2005",
    userName: "Sathish V",
    type: "CREDIT",
    status: "FAILED",
    amount: 540,
    method: "Bank Transfer",
    date: "2026-08-27 12:05",
    description: "Earning payout",
    city: "Madurai",
  },
  {
    transactionId: "TXN2006",
    userName: "Meera Suresh",
    type: "DEBIT",
    status: "SUCCESS",
    amount: 780,
    method: "UPI",
    date: "2026-08-27 08:30",
    description: "Biryani order",
    city: "Salem",
  },
];

export const transactionStats = [
  { label: "Total Volume", value: "₹12.4L", trend: "+8.9%" },
  { label: "Success Rate", value: "96.4%", trend: "+1.8%" },
  { label: "Pending", value: "124", trend: "+3.1%" },
  { label: "Failed", value: "26", trend: "-2.4%" },
];

export const recentRequests = [
  {
    requestId: "REQ1001",
    title: "4 Idly from Murugan Kadai",
    status: "PARTNER_ASSIGNED",
    amount: 160,
    serviceType: "BUY_GET",
  },
  {
    requestId: "REQ1002",
    title: "Pizza combo from Pizza Hub",
    status: "ON_THE_WAY",
    amount: 420,
    serviceType: "FOOD",
  },
  {
    requestId: "REQ1003",
    title: "Ride to Airport",
    status: "COMPLETED",
    amount: 280,
    serviceType: "RIDE",
  },
];

export const walletSummary = {
  success: true,
  data: {
    walletId: "WAL1001",
    balance: 250.0,
    currency: "INR",
    recentTransactions: [
      {
        transactionId: "TXN1001",
        type: "CREDIT",
        amount: 100,
        description: "Added to wallet",
        date: "2026-08-18T10:30:00",
      },
      {
        transactionId: "TXN1002",
        type: "DEBIT",
        amount: 160,
        description: "Buy & Get request",
        date: "2026-08-17T10:30:00",
      },
    ],
  },
};

export const supportTopics = [
  { topicId: "TOPIC001", title: "How VAYZO Works", icon: "info" },
  { topicId: "TOPIC002", title: "Cancelling a Request", icon: "cancel" },
  { topicId: "TOPIC003", title: "Payment & Refunds", icon: "payment" },
  { topicId: "TOPIC004", title: "Wallet Issues", icon: "wallet" },
];

export const generalSettings = {
  platformName: "VAYZO",
  platformTagline: "You Ask. We Get It.",
  supportEmail: "support@vayzo.com",
  supportPhone: "+91 98765 43210",
  countryCode: "+91",
  timezone: "Asia/Kolkata",
  dateFormat: "DD/MM/YYYY",
  timeFormat: "12 Hour",
  defaultCurrency: "INR",
  currencyPosition: "Prefix",
  numberFormat: "1,234.56",
  language: "English",
  platformStatus: "Live",
  maintenanceMode: false,
  contactAddress: "32, West Gate Road, Madurai, Tamil Nadu - 625001",
  socialLinks: {
    facebook: "https://facebook.com/vayzo",
    instagram: "https://instagram.com/vayzo",
    twitter: "https://x.com/vayzo",
  },
  quickLinks: [
    { label: "Admin Dashboard", href: "/dashboard" },
    { label: "Orders", href: "/orders" },
    { label: "Payments", href: "/transactions" },
  ],
};

export const commissionSettings = {
  services: [
    {
      id: "food-delivery",
      name: "Food Delivery",
      description: "Restaurant food orders",
      type: "Percentage",
      commission: 18,
      gst: 5,
      status: true,
    },
    {
      id: "buy-get-it",
      name: "Buy & Get It",
      description: "Marketplace order commissions",
      type: "Percentage",
      commission: 12,
      gst: 5,
      status: true,
    },
    {
      id: "bike-ride",
      name: "Bike Ride",
      description: "Two-wheeler delivery trips",
      type: "Percentage",
      commission: 15,
      gst: 2,
      status: true,
    },
    {
      id: "car-booking",
      name: "Car Booking",
      description: "Cab and ride booking",
      type: "Percentage",
      commission: 20,
      gst: 5,
      status: false,
    },
    {
      id: "delivery-service",
      name: "Delivery Service",
      description: "Pickup and store delivery",
      type: "Flat",
      commission: 35,
      gst: 5,
      status: true,
    },
    {
      id: "dukaan",
      name: "Dukaan",
      description: "Local retail drop deliveries",
      type: "Percentage",
      commission: 10,
      gst: 3,
      status: true,
    },
    {
      id: "home-services",
      name: "Home Services",
      description: "Cleaning and home work",
      type: "Percentage",
      commission: 14,
      gst: 5,
      status: true,
    },
  ],
  additionalSettings: {
    codExtraCommission: true,
    peakTimeCommission: true,
    surgeCommission: false,
    roundedOff: true,
  },
  rules: {
    minCommissionPerOrder: 12,
    maxCommissionPerOrder: 350,
    applyCommissionOn: "Gross Order Value",
    applicability: "All Services",
  },
  calcExample: {
    orderValue: 1200,
    platformCommission: 18,
    gst: 5,
  },
};

export const paymentSettings = {
  gateways: [
    {
      id: "razorpay",
      name: "Razorpay",
      description: "Online card and UPI payments",
      enabled: true,
      badge: "Popular",
      credential: "rzp_live_**************",
      type: "Gateway",
    },
    {
      id: "stripe",
      name: "Stripe",
      description: "International and card payments",
      enabled: true,
      badge: "Global",
      credential: "sk_live_**************",
      type: "Gateway",
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Wallet and international transfers",
      enabled: false,
      badge: "Offline",
      credential: "paypal_live_**************",
      type: "Gateway",
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      description: "Cash payment at doorstep",
      enabled: true,
      badge: "Available",
      credential: "Cash collection enabled",
      type: "Method",
    },
    {
      id: "razorpay-upi",
      name: "Razorpay UPI (QR)",
      description: "QR-based UPI collection",
      enabled: true,
      badge: "Fast",
      credential: "upi_live_**************",
      type: "Method",
    },
  ],
  overview: {
    totalTransactions: 125460,
    successfulPayments: 118760,
    failedPayments: 1920,
    refunds: 5840,
  },
  paymentMethods: [
    { id: "upi", label: "UPI", enabled: true },
    { id: "card", label: "Credit/Debit Card", enabled: true },
    { id: "netbanking", label: "Net Banking", enabled: false },
    { id: "wallet", label: "Wallet", enabled: true },
    { id: "cod", label: "Cash on Delivery", enabled: true },
  ],
};

export const settings = {
  success: true,
  data: {
    pushNotifications: true,
    smsNotifications: true,
    emailNotifications: false,
    darkMode: false,
    language: "en",
    generalSettings,
    commissionSettings,
    paymentSettings,
  },
};

export const categories = [
  { categoryId: "CAT001", name: "Food", icon: "🍔", description: "Food and Beverages", status: "Active", items: 128, order: 1, createdAt: "12 May 2024, 10:15 AM" },
  { categoryId: "CAT002", name: "Grocery", icon: "🛒", description: "Daily essentials and groceries", status: "Active", items: 96, order: 2, createdAt: "12 May 2024, 10:16 AM" },
  { categoryId: "CAT003", name: "Pharmacy", icon: "💊", description: "Medicines and Healthcare", status: "Active", items: 64, order: 3, createdAt: "12 May 2024, 10:17 AM" },
  { categoryId: "CAT004", name: "Retail", icon: "🛍️", description: "General retail products", status: "Active", items: 78, order: 4, createdAt: "12 May 2024, 10:18 AM" },
  { categoryId: "CAT005", name: "Electronics", icon: "📱", description: "Electronics and gadgets", status: "Inactive", items: 45, order: 5, createdAt: "12 May 2024, 10:19 AM" },
];

export const categoryStats = [
  { label: "Total Categories", value: "48", trend: "+12.5%" },
  { label: "Active Categories", value: "42", trend: "+10.3%" },
  { label: "Inactive Categories", value: "5", trend: "-8.2%" },
  { label: "Deleted Categories", value: "1", trend: "-50%" },
];

export const locations = [
  { locationId: "LOC001", name: "Anna Nagar", city: "Madurai", state: "Tamil Nadu", status: "Active", restaurants: 12, orders: 2340, deliveryPartners: 45, createdAt: "10 May 2024, 08:30 AM" },
  { locationId: "LOC002", name: "Melur", city: "Madurai", state: "Tamil Nadu", status: "Active", restaurants: 8, orders: 1560, deliveryPartners: 28, createdAt: "11 May 2024, 09:15 AM" },
  { locationId: "LOC003", name: "T. Nagar", city: "Chennai", state: "Tamil Nadu", status: "Active", restaurants: 18, orders: 4320, deliveryPartners: 72, createdAt: "12 May 2024, 10:45 AM" },
  { locationId: "LOC004", name: "Coimbatore City", city: "Coimbatore", state: "Tamil Nadu", status: "Active", restaurants: 15, orders: 3890, deliveryPartners: 58, createdAt: "12 May 2024, 11:00 AM" },
];

export const locationStats = [
  { label: "Total Locations", value: "24", trend: "+15%" },
  { label: "Active Locations", value: "22", trend: "+12%" },
  { label: "Total Restaurants", value: "245", trend: "+18%" },
  { label: "Total Orders", value: "28.5K", trend: "+22%" },
];

export const restaurants = [
  { restaurantId: "REST001", name: "Murugan Kadai", location: "Anna Nagar, Madurai", owner: "Murugan", cuisine: "South Indian", status: "Active", rating: 4.8, orders: 342, revenue: 185400, createdAt: "05 May 2024" },
  { restaurantId: "REST002", name: "Fusion Bistro", location: "T. Nagar, Chennai", owner: "Priya Kumar", cuisine: "Continental", status: "Active", rating: 4.6, orders: 521, revenue: 287560, createdAt: "01 May 2024" },
  { restaurantId: "REST003", name: "Spice Garden", location: "Coimbatore City", owner: "Arun", cuisine: "Multi-cuisine", status: "Inactive", rating: 4.2, orders: 128, revenue: 64200, createdAt: "15 Apr 2024" },
  { restaurantId: "REST004", name: "Pizza Paradise", location: "Melur", owner: "Sathish", cuisine: "Italian", status: "Active", rating: 4.5, orders: 289, revenue: 156800, createdAt: "10 May 2024" },
];

export const restaurantStats = [
  { label: "Total Restaurants", value: "284", trend: "+8.4%" },
  { label: "Active Restaurants", value: "256", trend: "+6.2%" },
  { label: "Avg Rating", value: "4.6⭐", trend: "+0.3" },
  { label: "Total Revenue", value: "₹48.2L", trend: "+15.8%" },
];

export const offers = [
  { offerId: "OFF001", title: "50% Off on Orders", code: "SAVE50", type: "Percentage", value: 50, validFrom: "01 May 2024", validUpto: "31 May 2024", status: "Active", uses: 2340, restaurants: "All" },
  { offerId: "OFF002", title: "Flat ₹100 Off", code: "FLAT100", type: "Fixed", value: 100, validFrom: "05 May 2024", validUpto: "15 June 2024", status: "Active", uses: 1520, restaurants: "Selected" },
  { offerId: "OFF003", title: "Free Delivery", code: "FREEDEL", type: "Delivery", value: 0, validFrom: "10 May 2024", validUpto: "31 May 2024", status: "Active", uses: 3210, restaurants: "All" },
  { offerId: "OFF004", title: "Buy 1 Get 1", code: "BOGO", type: "Buyget", value: 50, validFrom: "01 Apr 2024", validUpto: "30 Apr 2024", status: "Expired", uses: 5680, restaurants: "Selected" },
];

export const offerStats = [
  { label: "Total Offers", value: "156", trend: "+12%" },
  { label: "Active Offers", value: "142", trend: "+10%" },
  { label: "Total Uses", value: "45.2K", trend: "+25%" },
  { label: "Avg Redemption", value: "28.5%", trend: "+5.2%" },
];

export const reports = [
  { reportId: "RPT001", title: "Daily Sales Summary", generatedOn: "21 May 2024, 11:30 PM", type: "Sales", period: "Daily", status: "Completed", fileSize: "2.4 MB" },
  { reportId: "RPT002", title: "Weekly Performance Report", generatedOn: "20 May 2024, 10:15 PM", type: "Performance", period: "Weekly", status: "Completed", fileSize: "5.1 MB" },
  { reportId: "RPT003", title: "Monthly User Analytics", generatedOn: "01 May 2024, 09:00 PM", type: "Analytics", period: "Monthly", status: "Completed", fileSize: "12.3 MB" },
  { reportId: "RPT004", title: "Delivery Partner Performance", generatedOn: "19 May 2024, 03:45 PM", type: "Performance", period: "Weekly", status: "Processing", fileSize: "0 MB" },
];

export const teamUsers = [
  { userId: "ADM001", name: "Admin User", email: "admin@vayzo.com", role: "Admin", department: "Management", status: "Active", lastLogin: "Just now", joinedDate: "01 Jan 2024" },
  { userId: "OP001", name: "Operator One", email: "operator1@vayzo.com", role: "Operator", department: "Operations", status: "Active", lastLogin: "2 hours ago", joinedDate: "15 Feb 2024" },
  { userId: "OP002", name: "Operator Two", email: "operator2@vayzo.com", role: "Operator", department: "Operations", status: "Active", lastLogin: "30 mins ago", joinedDate: "20 Feb 2024" },
  { userId: "SUP001", name: "Support Manager", email: "support@vayzo.com", role: "Support", department: "Customer Service", status: "Active", lastLogin: "1 hour ago", joinedDate: "10 Jan 2024" },
];

export const teamUserStats = [
  { label: "Total Team Users", value: "12", trend: "+2" },
  { label: "Active Users", value: "11", trend: "+1" },
  { label: "Admins", value: "2", trend: "0" },
  { label: "Operators", value: "7", trend: "+1" },
];

export const activityLogs = [
  { logId: "LOG001", user: "Admin User", action: "Updated Category", module: "Categories", timestamp: "21 May 2024, 03:45 PM", status: "Success", details: "Updated Food category items count" },
  { logId: "LOG002", user: "Operator One", action: "Created Offer", module: "Offers", timestamp: "21 May 2024, 02:30 PM", status: "Success", details: "Created new offer 50% OFF - SAVE50" },
  { logId: "LOG003", user: "Support Manager", action: "Resolved Complaint", module: "Complaints", timestamp: "21 May 2024, 01:15 PM", status: "Success", details: "Complaint CMP1208 marked as resolved" },
  { logId: "LOG004", user: "Operator Two", action: "Added Restaurant", module: "Restaurants", timestamp: "21 May 2024, 12:00 PM", status: "Success", details: "Added new restaurant Fusion Bistro" },
  { logId: "LOG005", user: "Admin User", action: "Blocked User", module: "Users", timestamp: "21 May 2024, 11:30 AM", status: "Success", details: "User USR1004 blocked due to violation" },
];

export const appAbout = {
  success: true,
  data: {
    appName: "VAYZO",
    tagline: "You Ask. We Get It.",
    version: "1.0.0",
    description:
      "VAYZO is your all-in-one solution for Food Delivery, Buy & Get It, Bike Rides and Car Booking.",
    privacyPolicyUrl: "https://example.com/privacy",
    termsUrl: "https://example.com/terms",
    supportEmail: "support@vayzo.com",
  },
};

export const vayzoApiMock = {
  appConfig,
  authResponses,
  locations,
  homeData,
  users,
  userStats,
  recentRequests,
  walletSummary,
  supportTopics,
  settings,
  appAbout,
};

export default vayzoApiMock;
