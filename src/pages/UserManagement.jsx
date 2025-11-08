import { motion } from 'framer-motion';
import { useState } from 'react';
import { users } from '../data/dummyData';

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredUsers = filter === 'all' 
    ? users 
    : users.filter(user => user.status === filter);

  const handleAction = (userId, action) => {
    console.log(`Action: ${action} on user ${userId}`);
    alert(`Action: ${action} on user ${userId} - Ready for API integration`);
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      suspended: 'bg-yellow-100 text-yellow-800',
      deactivated: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${colors[status] || colors.active}`}>
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 whitespace-nowrap">User Management</h1>
        <p className="text-gray-600 text-sm sm:text-base whitespace-nowrap">Manage all users (buyers & sellers) and account history</p>
      </motion.div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex gap-2 sm:gap-4 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap ${
              filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Users
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap ${
              filter === 'active' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('suspended')}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap ${
              filter === 'suspended' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Suspended
          </button>
          <button
            onClick={() => setFilter('deactivated')}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap ${
              filter === 'deactivated' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Deactivated
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto" style={{ maxWidth: '100%' }}>
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 text-gray-900">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">User</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Type</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Join Date</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Activity</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="px-4 sm:px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900 whitespace-nowrap">{user.name}</p>
                      <p className="text-sm text-gray-600 whitespace-nowrap">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      user.type === 'buyer' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {user.type}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">{getStatusBadge(user.status)}</td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{user.joinDate}</td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">
                    {user.type === 'buyer' ? (
                      <span className="whitespace-nowrap">Purchases: {user.totalPurchases} | Spent: ${user.totalSpent?.toLocaleString()}</span>
                    ) : (
                      <span className="whitespace-nowrap">Listings: {user.totalListings} | Sales: ${user.totalSales?.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex gap-2 flex-wrap">
                      {user.status === 'active' && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleAction(user.id, 'suspend'); }}
                            className="px-2 sm:px-3 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600 whitespace-nowrap"
                          >
                            Suspend
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleAction(user.id, 'deactivate'); }}
                            className="px-2 sm:px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 whitespace-nowrap"
                          >
                            Deactivate
                          </button>
                        </>
                      )}
                      {user.status === 'suspended' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleAction(user.id, 'restore'); }}
                          className="px-2 sm:px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 whitespace-nowrap"
                        >
                          Restore
                        </button>
                      )}
                      {user.status === 'deactivated' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleAction(user.id, 'restore'); }}
                          className="px-2 sm:px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 whitespace-nowrap"
                        >
                          Restore
                        </button>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAction(user.id, 'delete'); }}
                        className="px-2 sm:px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 whitespace-nowrap"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedUser(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg p-4 sm:p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-200 shadow-xl"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 whitespace-nowrap">{selectedUser.name}</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 whitespace-nowrap">Email</p>
                <p className="font-semibold text-gray-900 whitespace-nowrap">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 whitespace-nowrap">Type</p>
                <p className="font-semibold text-gray-900 capitalize whitespace-nowrap">{selectedUser.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 whitespace-nowrap">Status</p>
                {getStatusBadge(selectedUser.status)}
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2 whitespace-nowrap">Account History</p>
                <div className="space-y-2">
                  {selectedUser.accountHistory?.length > 0 ? (
                    selectedUser.accountHistory.map((history, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded border border-gray-200">
                        <p className="text-sm text-gray-700 whitespace-nowrap"><strong className="text-gray-900">{history.date}</strong> - {history.action}: {history.item} (${history.amount?.toLocaleString()})</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 whitespace-nowrap">No history available</p>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedUser(null)}
              className="mt-6 px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default UserManagement;
