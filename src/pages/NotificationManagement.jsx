import { motion } from 'framer-motion';
import { useState } from 'react';
import { notifications, termsAndConditions } from '../data/dummyData';

const NotificationManagement = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [newNotification, setNewNotification] = useState({
    type: 'system_alert',
    title: '',
    message: '',
    targetAudience: 'all',
    active: true,
  });
  const [termsContent, setTermsContent] = useState(termsAndConditions.content);

  const handleCreateNotification = () => {
    console.log('Creating notification:', newNotification);
    alert('Notification created - Ready for API integration');
    setNewNotification({
      type: 'system_alert',
      title: '',
      message: '',
      targetAudience: 'all',
      active: true,
    });
  };

  const handleToggleNotification = (id) => {
    console.log('Toggling notification:', id);
    alert(`Notification ${id} toggled - Ready for API integration`);
  };

  const handleDeleteNotification = (id) => {
    console.log('Deleting notification:', id);
    alert(`Notification ${id} deleted - Ready for API integration`);
  };

  const saveTermsAndConditions = () => {
    console.log('Saving terms and conditions:', termsContent);
    alert('Terms and conditions saved - Ready for API integration');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 whitespace-nowrap">Notifications & Communication</h1>
        <p className="text-gray-600 text-sm sm:text-base whitespace-nowrap">Manage system messages, alerts, and terms & conditions</p>
      </motion.div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex gap-2 sm:gap-4 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-3 sm:px-4 py-2 font-semibold transition-colors whitespace-nowrap text-sm sm:text-base ${
              activeTab === 'notifications'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-3 sm:px-4 py-2 font-semibold transition-colors whitespace-nowrap text-sm sm:text-base ${
              activeTab === 'terms'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Terms & Conditions
          </button>
        </div>
      </div>

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Create New Notification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 whitespace-nowrap">Create New Notification</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 whitespace-nowrap">Type</label>
                <select
                  value={newNotification.type}
                  onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                >
                  <option value="system_alert">System Alert</option>
                  <option value="seller_message">Seller Message</option>
                  <option value="buyer_message">Buyer Message</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 whitespace-nowrap">Title</label>
                <input
                  type="text"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                  placeholder="Notification title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 whitespace-nowrap">Message</label>
                <textarea
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                  rows="4"
                  placeholder="Notification message"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 whitespace-nowrap">Target Audience</label>
                <select
                  value={newNotification.targetAudience}
                  onChange={(e) => setNewNotification({ ...newNotification, targetAudience: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                >
                  <option value="all">All Users</option>
                  <option value="sellers">Sellers Only</option>
                  <option value="buyers">Buyers Only</option>
                </select>
              </div>
              <button
                onClick={handleCreateNotification}
                className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
              >
                Create Notification
              </button>
            </div>
          </motion.div>

          {/* Existing Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
          >
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 whitespace-nowrap">Existing Notifications</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 sm:p-6 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          notification.type === 'system_alert' ? 'bg-blue-100 text-blue-800' :
                          notification.type === 'seller_message' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {notification.type.replace('_', ' ')}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          notification.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {notification.active ? 'Active' : 'Inactive'}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                          Target: {notification.targetAudience}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 whitespace-nowrap">
                        {notification.title}
                      </h3>
                      <p className="text-gray-700 mb-2">{notification.message}</p>
                      <p className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">Created: {notification.createdAt}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleNotification(notification.id)}
                        className={`px-3 sm:px-4 py-2 rounded text-xs font-semibold transition-colors whitespace-nowrap ${
                          notification.active
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        {notification.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDeleteNotification(notification.id)}
                        className="px-3 sm:px-4 py-2 bg-red-500 text-white rounded text-xs font-semibold hover:bg-red-600 transition-colors whitespace-nowrap"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Terms & Conditions Tab */}
      {activeTab === 'terms' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200"
        >
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 whitespace-nowrap">Terms & Conditions</h2>
              <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                Version {termsAndConditions.version} | Last Updated: {termsAndConditions.lastUpdated}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 whitespace-nowrap">
              Terms & Conditions Content
            </label>
            <textarea
              value={termsContent}
              onChange={(e) => setTermsContent(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm text-gray-900"
              rows="20"
            />
          </div>
          <button
            onClick={saveTermsAndConditions}
            className="mt-4 px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
          >
            Save Terms & Conditions
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default NotificationManagement;
