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

export const locations = [
  {
    locationId: "LOC001",
    name: "Anna Nagar",
    city: "Madurai",
    state: "Tamil Nadu",
    latitude: 9.9252,
    longitude: 78.1198,
  },
  {
    locationId: "LOC002",
    name: "Melur",
    city: "Madurai",
    state: "Tamil Nadu",
    latitude: 10.032,
    longitude: 78.338,
  },
  {
    locationId: "LOC003",
    name: "T. Nagar",
    city: "Chennai",
    state: "Tamil Nadu",
    latitude: 13.0417,
    longitude: 80.2098,
  },
];

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
    city: "Madurai",
    lastActive: "Just now",
    totalOrders: 132,
    walletBalance: 330,
  },
];

export const userStats = [
  { label: "Total Users", value: "12.8K", trend: "+12.4%" },
  { label: "Active Today", value: "4.1K", trend: "+8.1%" },
  { label: "Verified", value: "91.2%", trend: "+1.9%" },
  { label: "Blocked", value: "184", trend: "-2.8%" },
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

export const settings = {
  success: true,
  data: {
    pushNotifications: true,
    smsNotifications: true,
    emailNotifications: false,
    darkMode: false,
    language: "en",
  },
};

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
