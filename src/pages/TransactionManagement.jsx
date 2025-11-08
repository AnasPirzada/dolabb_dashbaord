import { motion } from 'framer-motion';
import { useState } from 'react';
import { transactions, cashoutRequests } from '../data/dummyData';

const TransactionManagement = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [dolabbFee, setDolabbFee] = useState(5); // Default 5%
  const [transactionFee, setTransactionFee] = useState(50); // Default $50

  const handleAction = (id, action) => {
    console.log(`Action: ${action} on ${id}`);
    alert(`Action: ${action} on ${id} - Ready for API integration`);
  };

  const updateFeeSettings = () => {
    console.log('Updating fee settings:', { dolabbFee, transactionFee });
    alert('Fee settings updated - Ready for API integration');
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      approved: 'bg-green-100 text-green-800',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${colors[status] || colors.pending}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 whitespace-nowrap">Transactions & Payments</h1>
        <p className="text-gray-600 text-sm sm:text-base whitespace-nowrap">Manage transactions, payments, and fee settings</p>
      </motion.div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex gap-2 sm:gap-4 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-3 sm:px-4 py-2 font-semibold transition-colors whitespace-nowrap text-sm sm:text-base ${
              activeTab === 'transactions'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('cashouts')}
            className={`px-3 sm:px-4 py-2 font-semibold transition-colors whitespace-nowrap text-sm sm:text-base ${
              activeTab === 'cashouts'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Cashout Requests
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className={`px-3 sm:px-4 py-2 font-semibold transition-colors whitespace-nowrap text-sm sm:text-base ${
              activeTab === 'fees'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Fee Settings
          </button>
        </div>
      </div>

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
        >
          <div className="overflow-x-auto" style={{ maxWidth: '100%' }}>
            <table className="w-full min-w-[1000px]">
              <thead className="bg-gray-50 text-gray-900">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Type</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Buyer</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Seller</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Item</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Amount</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Dolabb Fee</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Status</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 sm:px-6 py-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold capitalize whitespace-nowrap">
                        {transaction.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{transaction.buyer}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{transaction.seller}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{transaction.item}</td>
                    <td className="px-4 sm:px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                      ${transaction.offerAmount?.toLocaleString() || transaction.amount?.toLocaleString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-green-600 font-semibold whitespace-nowrap">
                      ${transaction.dolabbFee?.toLocaleString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4">{getStatusBadge(transaction.status)}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{transaction.date}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Cashout Requests Tab */}
      {activeTab === 'cashouts' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
        >
          <div className="overflow-x-auto" style={{ maxWidth: '100%' }}>
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 text-gray-900">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Seller</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Amount</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Account</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Requested Date</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Status</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cashoutRequests.map((request, index) => (
                  <motion.tr
                    key={request.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 sm:px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">{request.seller}</td>
                    <td className="px-4 sm:px-6 py-4 font-semibold text-green-600 whitespace-nowrap">
                      ${request.amount.toLocaleString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{request.accountDetails}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{request.requestedDate}</td>
                    <td className="px-4 sm:px-6 py-4">{getStatusBadge(request.status)}</td>
                    <td className="px-4 sm:px-6 py-4">
                      {request.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAction(request.id, 'approve_cashout')}
                            className="px-2 sm:px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 whitespace-nowrap"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(request.id, 'reject_cashout')}
                            className="px-2 sm:px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 whitespace-nowrap"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Fee Settings Tab */}
      {activeTab === 'fees' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-4 sm:p-6 space-y-6 border border-gray-200"
        >
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 whitespace-nowrap">Dolabb Fee Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 whitespace-nowrap">
                  Dolabb Fee Percentage (%)
                </label>
                <input
                  type="number"
                  value={dolabbFee}
                  onChange={(e) => setDolabbFee(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                  min="0"
                  max="100"
                  step="0.1"
                />
                <p className="text-sm text-gray-500 mt-1 whitespace-nowrap">Current: {dolabbFee}% of transaction amount</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 whitespace-nowrap">
                  Transaction Fee (Fixed Amount $)
                </label>
                <input
                  type="number"
                  value={transactionFee}
                  onChange={(e) => setTransactionFee(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                  min="0"
                  step="1"
                />
                <p className="text-sm text-gray-500 mt-1 whitespace-nowrap">Current: ${transactionFee} per transaction</p>
              </div>
              <button
                onClick={updateFeeSettings}
                className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
              >
                Update Fee Settings
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 whitespace-nowrap">Fee Collection Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 whitespace-nowrap">Total Fees Collected (This Month)</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600 mt-2 whitespace-nowrap">$45,230</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 whitespace-nowrap">Total Transactions</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-2 whitespace-nowrap">1,234</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 whitespace-nowrap">Average Fee per Transaction</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-600 mt-2 whitespace-nowrap">$36.65</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TransactionManagement;
