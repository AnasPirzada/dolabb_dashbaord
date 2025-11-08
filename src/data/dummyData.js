// Dummy data for the dashboard

export const dashboardStats = {
  activeUsers: 12450,
  totalListings: 8560,
  activeListings: 6230,
  totalSales: 2340,
  pendingCashouts: 45,
  totalRevenue: 12500,
  disputesOpen: 12,
  disputesResolved: 234,
};

export const users = [
  {
    id: 1,
    name: 'Ahmed Al-Saud',
    email: 'ahmed@example.com',
    type: 'buyer',
    status: 'active',
    joinDate: '2024-01-15',
    totalPurchases: 23,
    totalSpent: 45000,
    accountHistory: [
      { date: '2024-11-01', action: 'Purchase', item: 'Luxury Watch', amount: 5000 },
      { date: '2024-10-25', action: 'Purchase', item: 'Electronics', amount: 3000 },
    ],
  },
  {
    id: 2,
    name: 'Fatima Hassan',
    email: 'fatima@example.com',
    type: 'seller',
    status: 'active',
    joinDate: '2024-02-20',
    totalListings: 15,
    totalSales: 89000,
    accountHistory: [
      { date: '2024-11-05', action: 'Sale', item: 'Jewelry Set', amount: 12000 },
      { date: '2024-10-30', action: 'Listing', item: 'Artwork', amount: 0 },
    ],
  },
  {
    id: 3,
    name: 'Mohammed Ali',
    email: 'mohammed@example.com',
    type: 'buyer',
    status: 'suspended',
    joinDate: '2024-03-10',
    totalPurchases: 5,
    totalSpent: 8000,
    accountHistory: [],
  },
  {
    id: 4,
    name: 'Sara Ibrahim',
    email: 'sara@example.com',
    type: 'seller',
    status: 'deactivated',
    joinDate: '2023-12-05',
    totalListings: 8,
    totalSales: 25000,
    accountHistory: [],
  },
  {
    id: 5,
    name: 'Khalid Abdullah',
    email: 'khalid@example.com',
    type: 'buyer',
    status: 'active',
    joinDate: '2024-04-18',
    totalPurchases: 12,
    totalSpent: 18000,
    accountHistory: [],
  },
];

export const listings = [
  {
    id: 1,
    title: 'Vintage Rolex Watch',
    seller: 'Fatima Hassan',
    category: 'Watches',
    price: 15000,
    status: 'active',
    createdAt: '2024-11-01',
    views: 234,
    featured: true,
    reviewed: true,
    approved: true,
  },
  {
    id: 2,
    title: 'Designer Handbag Collection',
    seller: 'Sara Ibrahim',
    category: 'Fashion',
    price: 8500,
    status: 'active',
    createdAt: '2024-10-28',
    views: 156,
    featured: false,
    reviewed: false,
    approved: false,
  },
  {
    id: 3,
    title: 'Luxury Car - Mercedes S-Class',
    seller: 'Ahmed Al-Saud',
    category: 'Vehicles',
    price: 250000,
    status: 'sold',
    createdAt: '2024-09-15',
    views: 890,
    featured: true,
    reviewed: true,
    approved: true,
  },
  {
    id: 4,
    title: 'Counterfeit Product - REMOVED',
    seller: 'Unknown',
    category: 'Electronics',
    price: 500,
    status: 'removed',
    createdAt: '2024-10-20',
    views: 45,
    featured: false,
    reviewed: true,
    approved: false,
    violationReason: 'Counterfeit product',
  },
  {
    id: 5,
    title: 'Art Collection',
    seller: 'Fatima Hassan',
    category: 'Art',
    price: 35000,
    status: 'active',
    createdAt: '2024-11-05',
    views: 67,
    featured: true,
    reviewed: true,
    approved: true,
  },
];

export const transactions = [
  {
    id: 1,
    type: 'offer',
    buyer: 'Ahmed Al-Saud',
    seller: 'Fatima Hassan',
    item: 'Vintage Rolex Watch',
    offerAmount: 14000,
    originalPrice: 15000,
    status: 'pending',
    date: '2024-11-07',
    dolabbFee: 700,
  },
  {
    id: 2,
    type: 'accepted_offer',
    buyer: 'Khalid Abdullah',
    seller: 'Sara Ibrahim',
    item: 'Designer Handbag',
    offerAmount: 8000,
    originalPrice: 8500,
    status: 'completed',
    date: '2024-11-05',
    dolabbFee: 400,
  },
  {
    id: 3,
    type: 'purchase',
    buyer: 'Ahmed Al-Saud',
    seller: 'Fatima Hassan',
    item: 'Jewelry Set',
    amount: 12000,
    status: 'completed',
    date: '2024-11-03',
    dolabbFee: 600,
  },
  {
    id: 4,
    type: 'offer',
    buyer: 'Mohammed Ali',
    seller: 'Fatima Hassan',
    item: 'Art Collection',
    offerAmount: 30000,
    originalPrice: 35000,
    status: 'rejected',
    date: '2024-11-06',
    dolabbFee: 0,
  },
];

export const cashoutRequests = [
  {
    id: 1,
    seller: 'Fatima Hassan',
    amount: 50000,
    requestedDate: '2024-11-08',
    status: 'pending',
    accountDetails: 'Bank Account ****1234',
  },
  {
    id: 2,
    seller: 'Sara Ibrahim',
    amount: 15000,
    requestedDate: '2024-11-07',
    status: 'approved',
    accountDetails: 'Bank Account ****5678',
  },
  {
    id: 3,
    seller: 'Ahmed Al-Saud',
    amount: 25000,
    requestedDate: '2024-11-06',
    status: 'pending',
    accountDetails: 'Bank Account ****9012',
  },
];

export const disputes = [
  {
    id: 1,
    caseNumber: 'DISP-2024-001',
    type: 'product_quality',
    buyer: 'Ahmed Al-Saud',
    seller: 'Fatima Hassan',
    item: 'Vintage Rolex Watch',
    description: 'Product received does not match description. Watch is not authentic.',
    status: 'open',
    createdAt: '2024-11-05',
    adminNotes: '',
    resolution: '',
  },
  {
    id: 2,
    caseNumber: 'DISP-2024-002',
    type: 'delivery_issue',
    buyer: 'Khalid Abdullah',
    seller: 'Sara Ibrahim',
    item: 'Designer Handbag',
    description: 'Item not delivered within promised timeframe.',
    status: 'resolved',
    createdAt: '2024-10-28',
    adminNotes: 'Resolved: Seller provided refund and buyer accepted.',
    resolution: 'Refund issued',
  },
  {
    id: 3,
    caseNumber: 'DISP-2024-003',
    type: 'payment_dispute',
    buyer: 'Mohammed Ali',
    seller: 'Fatima Hassan',
    item: 'Art Collection',
    description: 'Payment processed but item not received.',
    status: 'open',
    createdAt: '2024-11-06',
    adminNotes: 'Investigating payment records.',
    resolution: '',
  },
];

export const notifications = [
  {
    id: 1,
    type: 'system_alert',
    title: 'New User Registration',
    message: '124 new users registered this week',
    targetAudience: 'all',
    createdAt: '2024-11-08',
    active: true,
  },
  {
    id: 2,
    type: 'seller_message',
    title: 'Payment Reminder',
    message: 'Your payment for listing fees is due',
    targetAudience: 'sellers',
    createdAt: '2024-11-07',
    active: true,
  },
  {
    id: 3,
    type: 'buyer_message',
    title: 'New Listings Available',
    message: 'Check out the latest items in your favorite categories',
    targetAudience: 'buyers',
    createdAt: '2024-11-06',
    active: true,
  },
];

export const termsAndConditions = {
  version: '2.1',
  lastUpdated: '2024-11-01',
  content: `TERMS AND CONDITIONS

1. User Agreement
By using Dolabb, you agree to these terms and conditions.

2. User Responsibilities
Users are responsible for accurate listings and transactions.

3. Fees
Dolabb charges a transaction fee on all completed sales.

4. Prohibited Items
Counterfeit, illegal, or offensive items are strictly prohibited.

5. Dispute Resolution
All disputes will be reviewed by admin and resolved fairly.

6. Account Management
Accounts may be suspended or deactivated for violations.

7. Privacy
User data is protected according to our privacy policy.

8. Modifications
These terms may be updated at any time.`,
};

