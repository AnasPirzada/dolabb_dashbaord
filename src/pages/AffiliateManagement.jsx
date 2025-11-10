import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  FaEdit,
  FaCheck,
  FaTimes,
  FaEye,
  FaToggleOn,
  FaToggleOff,
  FaDollarSign,
  FaPercent,
} from 'react-icons/fa';
import { affiliates, affiliatePayouts } from '../data/dummyData';

const AffiliateManagement = () => {
  const [activeTab, setActiveTab] = useState('affiliates');
  const [affiliatesList, setAffiliatesList] = useState(affiliates);
  const [payoutsList, setPayoutsList] = useState(affiliatePayouts);
  const [editingCommission, setEditingCommission] = useState(null);
  const [newCommissionRate, setNewCommissionRate] = useState('');
  const [selectedAffiliate, setSelectedAffiliate] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [payoutAction, setPayoutAction] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  const handleToggleStatus = (id) => {
    setAffiliatesList((prev) =>
      prev.map((affiliate) =>
        affiliate.id === id
          ? {
              ...affiliate,
              status: affiliate.status === 'active' ? 'deactivated' : 'active',
            }
          : affiliate
      )
    );
    const affiliate = affiliatesList.find((a) => a.id === id);
    alert(
      `Affiliate ${affiliate.name} has been ${
        affiliate.status === 'active' ? 'deactivated' : 'reactivated'
      }`
    );
  };

  const handleEditCommission = (affiliate) => {
    setEditingCommission(affiliate.id);
    setNewCommissionRate(affiliate.commissionRate.toString());
  };

  const handleSaveCommission = (id) => {
    const rate = parseFloat(newCommissionRate);
    if (isNaN(rate) || rate < 0 || rate > 100) {
      alert('Please enter a valid commission rate between 0 and 100');
      return;
    }

    setAffiliatesList((prev) =>
      prev.map((affiliate) =>
        affiliate.id === id
          ? { ...affiliate, commissionRate: rate }
          : affiliate
      )
    );
    setEditingCommission(null);
    setNewCommissionRate('');
    alert('Commission rate updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditingCommission(null);
    setNewCommissionRate('');
  };

  const handleViewTransactions = (affiliate) => {
    setSelectedAffiliate(affiliate);
    setShowTransactionModal(true);
  };

  const handleApprovePayout = (payout) => {
    setSelectedPayout(payout);
    setPayoutAction('approve');
    setShowPayoutModal(true);
  };

  const handleRejectPayout = (payout) => {
    setSelectedPayout(payout);
    setPayoutAction('reject');
    setRejectionReason('');
    setShowPayoutModal(true);
  };

  const confirmPayoutAction = () => {
    if (!selectedPayout) return;

    if (payoutAction === 'approve') {
      setPayoutsList((prev) =>
        prev.map((payout) =>
          payout.id === selectedPayout.id
            ? {
                ...payout,
                status: 'approved',
                approvedDate: new Date().toISOString().split('T')[0],
              }
            : payout
        )
      );
      alert(`Payout of $${selectedPayout.amount} approved successfully!`);
    } else if (payoutAction === 'reject') {
      if (!rejectionReason.trim()) {
        alert('Please enter a rejection reason');
        return;
      }
      setPayoutsList((prev) =>
        prev.map((payout) =>
          payout.id === selectedPayout.id
            ? {
                ...payout,
                status: 'rejected',
                rejectionReason: rejectionReason.trim(),
              }
            : payout
        )
      );
      alert(`Payout of $${selectedPayout.amount} rejected.`);
    }

    setShowPayoutModal(false);
    setSelectedPayout(null);
    setPayoutAction('');
    setRejectionReason('');
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      deactivated: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
          styles[status] || styles.active
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 whitespace-nowrap">
          Affiliate Management
        </h1>
        <p className="text-gray-600 text-sm sm:text-base whitespace-nowrap">
          Manage affiliates, payouts, commissions, and track transactions
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex gap-2 sm:gap-4 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('affiliates')}
            className={`px-3 sm:px-4 py-2 font-semibold transition-colors whitespace-nowrap text-sm sm:text-base ${
              activeTab === 'affiliates'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            All Affiliates
          </button>
          <button
            onClick={() => setActiveTab('payouts')}
            className={`px-3 sm:px-4 py-2 font-semibold transition-colors whitespace-nowrap text-sm sm:text-base ${
              activeTab === 'payouts'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Payout Requests
          </button>
        </div>
      </div>

      {/* Affiliates Tab */}
      {activeTab === 'affiliates' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
        >
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 whitespace-nowrap">
              All Affiliates & Activity
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Affiliate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Commission
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Referrals
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Total Sales
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Earnings
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Last Activity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {affiliatesList.map((affiliate, index) => (
                  <motion.tr
                    key={affiliate.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {affiliate.name}
                        </div>
                        <div className="text-sm text-gray-500">{affiliate.email}</div>
                        <div className="text-xs text-gray-400">
                          Code: {affiliate.referralCode}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {getStatusBadge(affiliate.status)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {editingCommission === affiliate.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={newCommissionRate}
                            onChange={(e) => setNewCommissionRate(e.target.value)}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                            min="0"
                            max="100"
                            step="0.1"
                          />
                          <span className="text-sm text-gray-600">%</span>
                          <button
                            onClick={() => handleSaveCommission(affiliate.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-red-600 hover:text-red-700"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">
                            {affiliate.commissionRate}%
                          </span>
                          <button
                            onClick={() => handleEditCommission(affiliate)}
                            className="text-blue-600 hover:text-blue-700"
                            title="Edit Commission"
                          >
                            <FaEdit className="text-xs" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {affiliate.totalReferrals}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${affiliate.totalSales.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          Total: ${affiliate.totalEarnings.toLocaleString()}
                        </div>
                        <div className="text-yellow-600">
                          Pending: ${affiliate.pendingEarnings.toLocaleString()}
                        </div>
                        <div className="text-green-600">
                          Paid: ${affiliate.paidEarnings.toLocaleString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {affiliate.lastActivity}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleViewTransactions(affiliate)}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-xs font-semibold hover:bg-blue-600 transition-colors whitespace-nowrap flex items-center gap-1"
                        >
                          <FaEye /> View Transactions
                        </button>
                        <button
                          onClick={() => handleToggleStatus(affiliate.id)}
                          className={`px-3 py-1 rounded text-xs font-semibold transition-colors whitespace-nowrap flex items-center gap-1 ${
                            affiliate.status === 'active'
                              ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                        >
                          {affiliate.status === 'active' ? (
                            <>
                              <FaToggleOff /> Deactivate
                            </>
                          ) : (
                            <>
                              <FaToggleOn /> Reactivate
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Payouts Tab */}
      {activeTab === 'payouts' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
        >
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 whitespace-nowrap">
              Payout Requests
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Affiliate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Request Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Payment Method
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Account Details
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payoutsList.map((payout, index) => (
                  <motion.tr
                    key={payout.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {payout.affiliateName}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {payout.affiliateId}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        ${payout.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payout.requestedDate}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payout.paymentMethod}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                      {payout.accountDetails}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {getStatusBadge(payout.status)}
                      {payout.approvedDate && (
                        <div className="text-xs text-gray-500 mt-1">
                          Approved: {payout.approvedDate}
                        </div>
                      )}
                      {payout.rejectionReason && (
                        <div className="text-xs text-red-500 mt-1">
                          Reason: {payout.rejectionReason}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      {payout.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprovePayout(payout)}
                            className="px-3 py-1 bg-green-500 text-white rounded text-xs font-semibold hover:bg-green-600 transition-colors whitespace-nowrap flex items-center gap-1"
                          >
                            <FaCheck /> Approve
                          </button>
                          <button
                            onClick={() => handleRejectPayout(payout)}
                            className="px-3 py-1 bg-red-500 text-white rounded text-xs font-semibold hover:bg-red-600 transition-colors whitespace-nowrap flex items-center gap-1"
                          >
                            <FaTimes /> Reject
                          </button>
                        </div>
                      )}
                      {payout.status === 'approved' && (
                        <span className="text-sm text-green-600 font-semibold">
                          Approved
                        </span>
                      )}
                      {payout.status === 'rejected' && (
                        <span className="text-sm text-red-600 font-semibold">
                          Rejected
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Transaction Modal */}
      <AnimatePresence>
        {showTransactionModal && selectedAffiliate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowTransactionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-4 sm:p-6 max-w-4xl w-full mx-4 border border-gray-200 shadow-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 whitespace-nowrap">
                  Transactions for {selectedAffiliate.name}
                </h2>
                <button
                  onClick={() => setShowTransactionModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Total Referrals:</span>
                    <span className="font-semibold ml-2">
                      {selectedAffiliate.totalReferrals}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Sales:</span>
                    <span className="font-semibold ml-2">
                      ${selectedAffiliate.totalSales.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Commission Rate:</span>
                    <span className="font-semibold ml-2">
                      {selectedAffiliate.commissionRate}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Earnings:</span>
                    <span className="font-semibold ml-2">
                      ${selectedAffiliate.totalEarnings.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                        Transaction ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                        Referred User
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                        Sale Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                        Commission
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedAffiliate.transactions.length > 0 ? (
                      selectedAffiliate.transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {transaction.id}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.date}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {transaction.referredUser}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${transaction.amount.toLocaleString()}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                            ${transaction.commission.toLocaleString()}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {getStatusBadge(transaction.status)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-4 py-8 text-center text-gray-500"
                        >
                          No transactions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payout Action Modal */}
      <AnimatePresence>
        {showPayoutModal && selectedPayout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPayoutModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full mx-4 border border-gray-200 shadow-xl"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 whitespace-nowrap">
                {payoutAction === 'approve' ? 'Approve' : 'Reject'} Payout
              </h2>
              <div className="space-y-3 mb-6">
                <p className="text-gray-700">
                  <strong className="font-semibold">Affiliate:</strong>{' '}
                  {selectedPayout.affiliateName}
                </p>
                <p className="text-gray-700">
                  <strong className="font-semibold">Amount:</strong> $
                  {selectedPayout.amount.toLocaleString()}
                </p>
                <p className="text-gray-700">
                  <strong className="font-semibold">Payment Method:</strong>{' '}
                  {selectedPayout.paymentMethod}
                </p>
                <p className="text-gray-700">
                  <strong className="font-semibold">Account:</strong>{' '}
                  {selectedPayout.accountDetails}
                </p>
                <p className="text-gray-700">
                  <strong className="font-semibold">Transactions:</strong>{' '}
                  {selectedPayout.transactions.join(', ')}
                </p>
                {payoutAction === 'reject' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rejection Reason
                    </label>
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                      rows="3"
                      placeholder="Enter rejection reason..."
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowPayoutModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmPayoutAction}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    payoutAction === 'approve'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {payoutAction === 'approve' ? (
                    <>
                      <FaCheck /> Approve
                    </>
                  ) : (
                    <>
                      <FaTimes /> Reject
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AffiliateManagement;

