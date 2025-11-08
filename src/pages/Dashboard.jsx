import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import {
  FaBox,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaFileInvoiceDollar,
  FaGavel,
  FaMoneyBillWave,
  FaShoppingCart,
  FaUsers,
} from 'react-icons/fa';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  cashoutRequests,
  dashboardStats,
  disputes,
  listings,
  transactions,
} from '../data/dummyData';

const StatCard = ({ title, value, icon: Icon, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className='bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-xl transition-shadow border border-gray-200'
  >
    <div className='flex items-center justify-between'>
      <div className='min-w-0 flex-1'>
        <p className='text-gray-600 text-xs sm:text-sm font-medium whitespace-nowrap truncate'>
          {title}
        </p>
        <p
          className={`text-xl sm:text-2xl lg:text-3xl font-bold mt-2 whitespace-nowrap ${color}`}
        >
          {typeof value === 'string' ? value : value.toLocaleString()}
        </p>
      </div>
      <div
        className={`text-2xl sm:text-3xl lg:text-4xl ${color} flex-shrink-0 ml-2`}
      >
        <Icon />
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  }, []);

  // Generate time series data for revenue and users
  const revenueData = [
    { month: 'Jan', revenue: 850000, users: 8500 },
    { month: 'Feb', revenue: 920000, users: 9200 },
    { month: 'Mar', revenue: 980000, users: 9800 },
    { month: 'Apr', revenue: 1050000, users: 10500 },
    { month: 'May', revenue: 1120000, users: 11200 },
    { month: 'Jun', revenue: 1180000, users: 11800 },
    { month: 'Jul', revenue: 1200000, users: 12000 },
    { month: 'Aug', revenue: 1220000, users: 12200 },
    { month: 'Sep', revenue: 1235000, users: 12350 },
    { month: 'Oct', revenue: 1245000, users: 12420 },
    { month: 'Nov', revenue: 1250000, users: 12450 },
  ];

  // Listings status breakdown
  const listingsStatusData = [
    {
      name: 'Active',
      value: listings.filter(l => l.status === 'active').length,
      color: '#10b981',
    },
    {
      name: 'Sold',
      value: listings.filter(l => l.status === 'sold').length,
      color: '#3b82f6',
    },
    {
      name: 'Removed',
      value: listings.filter(l => l.status === 'removed').length,
      color: '#ef4444',
    },
  ];

  // Transaction types breakdown
  const transactionTypesData = [
    {
      name: 'Purchase',
      value: transactions.filter(t => t.type === 'purchase').length,
      color: '#10b981',
    },
    {
      name: 'Offer',
      value: transactions.filter(t => t.type === 'offer').length,
      color: '#f59e0b',
    },
    {
      name: 'Accepted Offer',
      value: transactions.filter(t => t.type === 'accepted_offer').length,
      color: '#3b82f6',
    },
  ];

  // Disputes status
  const disputesData = [
    {
      name: 'Open',
      value: disputes.filter(d => d.status === 'open').length,
      color: '#ef4444',
    },
    {
      name: 'Resolved',
      value: disputes.filter(d => d.status === 'resolved').length,
      color: '#10b981',
    },
  ];

  // Sales over time
  const salesData = [
    { month: 'Jan', sales: 180 },
    { month: 'Feb', sales: 195 },
    { month: 'Mar', sales: 210 },
    { month: 'Apr', sales: 220 },
    { month: 'May', sales: 230 },
    { month: 'Jun', sales: 235 },
    { month: 'Jul', sales: 238 },
    { month: 'Aug', sales: 240 },
    { month: 'Sep', sales: 242 },
    { month: 'Oct', sales: 243 },
    { month: 'Nov', sales: 234 },
  ];

  // Cashout requests by status
  const cashoutData = [
    {
      name: 'Pending',
      value: cashoutRequests.filter(c => c.status === 'pending').length,
      color: '#f59e0b',
    },
    {
      name: 'Approved',
      value: cashoutRequests.filter(c => c.status === 'approved').length,
      color: '#10b981',
    },
  ];

  const stats = [
    {
      title: 'Active Users',
      value: dashboardStats.activeUsers,
      icon: FaUsers,
      color: 'text-green-600',
    },
    {
      title: 'Total Listings',
      value: dashboardStats.totalListings,
      icon: FaBox,
      color: 'text-blue-600',
    },
    {
      title: 'Active Listings',
      value: dashboardStats.activeListings,
      icon: FaCheckCircle,
      color: 'text-green-600',
    },
    {
      title: 'Total Sales',
      value: dashboardStats.totalSales,
      icon: FaShoppingCart,
      color: 'text-yellow-600',
    },
    {
      title: 'Pending Cashouts',
      value: dashboardStats.pendingCashouts,
      icon: FaClock,
      color: 'text-red-600',
    },
    {
      title: 'Total Revenue',
      value: `$${dashboardStats.totalRevenue.toLocaleString()}`,
      icon: FaMoneyBillWave,
      color: 'text-green-600',
    },
    {
      title: 'Open Disputes',
      value: dashboardStats.disputesOpen,
      icon: FaGavel,
      color: 'text-red-600',
    },
    {
      title: 'Resolved Disputes',
      value: dashboardStats.disputesResolved,
      icon: FaCheckCircle,
      color: 'text-green-600',
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-white border border-gray-300 rounded-lg p-3 shadow-lg'>
          <p className='text-gray-700 text-sm whitespace-nowrap mb-1'>
            {label}
          </p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className='text-sm whitespace-nowrap'
              style={{ color: entry.color }}
            >
              {`${entry.name}: ${
                typeof entry.value === 'number'
                  ? entry.value.toLocaleString()
                  : entry.value
              }`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className='space-y-4 sm:space-y-6'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2 whitespace-nowrap'>
          Dashboard Overview
        </h1>
        <p className='text-gray-600 text-sm sm:text-base whitespace-nowrap'>
          Welcome to the Dolabb Admin Dashboard
        </p>
      </motion.div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'>
        {/* Revenue and Users Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className='bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200'
        >
          <h2 className='text-lg sm:text-xl font-semibold text-gray-900 mb-4 whitespace-nowrap flex items-center gap-2'>
            <FaChartLine className='text-green-600' />
            Revenue & Users Trend
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
              <XAxis dataKey='month' stroke='#6b7280' />
              <YAxis stroke='#6b7280' />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#6b7280' }} />
              <Line
                type='monotone'
                dataKey='revenue'
                stroke='#10b981'
                strokeWidth={2}
                name='Revenue ($)'
              />
              <Line
                type='monotone'
                dataKey='users'
                stroke='#3b82f6'
                strokeWidth={2}
                name='Users'
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Sales Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className='bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200'
        >
          <h2 className='text-lg sm:text-xl font-semibold text-gray-900 mb-4 whitespace-nowrap flex items-center gap-2'>
            <FaShoppingCart className='text-yellow-600' />
            Sales Over Time
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
              <XAxis dataKey='month' stroke='#6b7280' />
              <YAxis stroke='#6b7280' />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey='sales' fill='#f59e0b' name='Sales' />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Listings Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className='bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200'
        >
          <h2 className='text-lg sm:text-xl font-semibold text-gray-900 mb-4 whitespace-nowrap flex items-center gap-2'>
            <FaBox className='text-blue-600' />
            Listings Status
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={listingsStatusData}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
              >
                {listingsStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Transaction Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className='bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200'
        >
          <h2 className='text-lg sm:text-xl font-semibold text-gray-900 mb-4 whitespace-nowrap flex items-center gap-2'>
            <FaFileInvoiceDollar className='text-purple-600' />
            Transaction Types
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={transactionTypesData}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
              >
                {transactionTypesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Disputes Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className='bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200'
        >
          <h2 className='text-lg sm:text-xl font-semibold text-gray-900 mb-4 whitespace-nowrap flex items-center gap-2'>
            <FaGavel className='text-red-600' />
            Disputes Status
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={disputesData}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
              >
                {disputesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Cashout Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className='bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200'
        >
          <h2 className='text-lg sm:text-xl font-semibold text-gray-900 mb-4 whitespace-nowrap flex items-center gap-2'>
            <FaClock className='text-orange-600' />
            Cashout Requests
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={cashoutData}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
              >
                {cashoutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      
    </div>
  );
};

export default Dashboard;
