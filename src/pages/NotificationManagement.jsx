import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEdit, FaPaperPlane, FaTimes, FaCheck } from 'react-icons/fa';
import { notifications, termsAndConditions, notificationTemplates } from '../data/dummyData';

const NotificationManagement = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [newNotification, setNewNotification] = useState({
    type: 'system_alert',
    title: '',
    message: '',
    targetAudience: 'all',
    active: true,
    template: '',
  });
  const [editingNotification, setEditingNotification] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [templateVariables, setTemplateVariables] = useState({});
  const [termsContent, setTermsContent] = useState(termsAndConditions.content);
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendNotificationData, setSendNotificationData] = useState(null);

  // Group templates by category
  const templateCategories = {
    account: ['account_registration', 'password_change'],
    buyer_journey: [
      'buyer_offer_submitted',
      'buyer_offer_accepted',
      'buyer_offer_rejected',
      'buyer_purchase_confirmation',
      'buyer_item_shipped',
      'buyer_feedback_reminder',
    ],
    seller_journey: [
      'seller_offer_received',
      'seller_offer_accepted',
      'seller_offer_rejected',
      'seller_payment_received',
      'seller_shipment_reminder',
      'seller_feedback_received',
    ],
  };

  const getTemplateDisplayName = (key) => {
    return key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleTemplateSelect = (templateKey) => {
    if (!templateKey) {
      setSelectedTemplate('');
      setNewNotification({
        ...newNotification,
        type: 'system_alert',
        title: '',
        message: '',
        targetAudience: 'all',
      });
      setTemplateVariables({});
      return;
    }

    const template = notificationTemplates[templateKey];
    if (template) {
      setSelectedTemplate(templateKey);
      setNewNotification({
        ...newNotification,
        type: template.type,
        title: template.title,
        message: template.message,
        targetAudience: template.targetAudience,
        template: templateKey,
      });

      // Extract variables from message
      const variables = template.message.match(/\$\{(\w+)\}/g) || [];
      const varMap = {};
      variables.forEach((varStr) => {
        const varName = varStr.replace(/\$\{|\}/g, '');
        varMap[varName] = '';
      });
      setTemplateVariables(varMap);
    }
  };

  const replaceTemplateVariables = (message, variables) => {
    let result = message;
    Object.keys(variables).forEach((key) => {
      const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
      result = result.replace(regex, variables[key] || `[${key}]`);
    });
    return result;
  };

  const handleCreateNotification = () => {
    if (!newNotification.title || !newNotification.message) {
      alert('Please fill in all required fields');
      return;
    }

    const finalMessage = replaceTemplateVariables(
      newNotification.message,
      templateVariables
    );

    const notification = {
      id: notificationsList.length + 1,
      ...newNotification,
      message: finalMessage,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setNotificationsList([...notificationsList, notification]);
    alert('Notification created successfully!');
    setNewNotification({
      type: 'system_alert',
      title: '',
      message: '',
      targetAudience: 'all',
      active: true,
      template: '',
    });
    setSelectedTemplate('');
    setTemplateVariables({});
  };

  const handleEditNotification = (notification) => {
    setEditingNotification({ ...notification });
    // Find if it's from a template
    const templateKey = Object.keys(notificationTemplates).find(
      (key) =>
        notificationTemplates[key].title === notification.title ||
        notificationTemplates[key].message === notification.message
    );
    if (templateKey) {
      setSelectedTemplate(templateKey);
      handleTemplateSelect(templateKey);
    }
  };

  const handleUpdateNotification = () => {
    if (!editingNotification.title || !editingNotification.message) {
      alert('Please fill in all required fields');
      return;
    }

    setNotificationsList(
      notificationsList.map((n) =>
        n.id === editingNotification.id ? editingNotification : n
      )
    );
    alert('Notification updated successfully!');
    setEditingNotification(null);
    setSelectedTemplate('');
    setTemplateVariables({});
  };

  const handleSendNotification = (notification) => {
    setSendNotificationData(notification);
    setShowSendModal(true);
  };

  const confirmSendNotification = () => {
    if (!sendNotificationData) return;

    // In a real app, this would send the notification via API
    console.log('Sending notification:', sendNotificationData);
    alert(
      `Notification "${sendNotificationData.title}" sent to ${sendNotificationData.targetAudience}!`
    );
    setShowSendModal(false);
    setSendNotificationData(null);
  };

  const handleToggleNotification = (id) => {
    setNotificationsList(
      notificationsList.map((n) =>
        n.id === id ? { ...n, active: !n.active } : n
      )
    );
  };

  const handleDeleteNotification = (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      setNotificationsList(notificationsList.filter((n) => n.id !== id));
    }
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 whitespace-nowrap">
          Notifications & Communication
        </h1>
        <p className="text-gray-600 text-sm sm:text-base whitespace-nowrap">
          Manage system messages, alerts, and terms & conditions
        </p>
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
          {/* Create/Edit New Notification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 whitespace-nowrap">
              {editingNotification ? 'Edit Notification' : 'Create New Notification'}
            </h2>
            <div className="space-y-4">
              {/* Template Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 whitespace-nowrap">
                  Select Template (Optional)
                </label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => handleTemplateSelect(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                >
                  <option value="">Custom Notification</option>
                  <optgroup label="Account Management">
                    {templateCategories.account.map((key) => (
                      <option key={key} value={key}>
                        {getTemplateDisplayName(key)}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Buyer Journey">
                    {templateCategories.buyer_journey.map((key) => (
                      <option key={key} value={key}>
                        {getTemplateDisplayName(key)}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Seller Journey">
                    {templateCategories.seller_journey.map((key) => (
                      <option key={key} value={key}>
                        {getTemplateDisplayName(key)}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Template Variables */}
              {Object.keys(templateVariables).length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2 whitespace-nowrap">
                    Template Variables
                  </label>
                  <div className="space-y-2">
                    {Object.keys(templateVariables).map((key) => (
                      <div key={key}>
                        <label className="block text-xs text-gray-600 mb-1 whitespace-nowrap">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <input
                          type="text"
                          value={templateVariables[key]}
                          onChange={(e) =>
                            setTemplateVariables({
                              ...templateVariables,
                              [key]: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 text-sm"
                          placeholder={`Enter ${key}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 whitespace-nowrap">
                  Type
                </label>
                <select
                  value={editingNotification?.type || newNotification.type}
                  onChange={(e) =>
                    editingNotification
                      ? setEditingNotification({
                          ...editingNotification,
                          type: e.target.value,
                        })
                      : setNewNotification({
                          ...newNotification,
                          type: e.target.value,
                        })
                  }
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                >
                  <option value="system_alert">System Alert</option>
                  <option value="seller_message">Seller Message</option>
                  <option value="buyer_message">Buyer Message</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 whitespace-nowrap">
                  Title
                </label>
                <input
                  type="text"
                  value={editingNotification?.title || newNotification.title}
                  onChange={(e) =>
                    editingNotification
                      ? setEditingNotification({
                          ...editingNotification,
                          title: e.target.value,
                        })
                      : setNewNotification({
                          ...newNotification,
                          title: e.target.value,
                        })
                  }
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                  placeholder="Notification title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 whitespace-nowrap">
                  Message
                </label>
                <textarea
                  value={editingNotification?.message || newNotification.message}
                  onChange={(e) =>
                    editingNotification
                      ? setEditingNotification({
                          ...editingNotification,
                          message: e.target.value,
                        })
                      : setNewNotification({
                          ...newNotification,
                          message: e.target.value,
                        })
                  }
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                  rows="4"
                  placeholder="Notification message"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 whitespace-nowrap">
                  Target Audience
                </label>
                <select
                  value={
                    editingNotification?.targetAudience ||
                    newNotification.targetAudience
                  }
                  onChange={(e) =>
                    editingNotification
                      ? setEditingNotification({
                          ...editingNotification,
                          targetAudience: e.target.value,
                        })
                      : setNewNotification({
                          ...newNotification,
                          targetAudience: e.target.value,
                        })
                  }
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                >
                  <option value="all">All Users</option>
                  <option value="sellers">Sellers Only</option>
                  <option value="buyers">Buyers Only</option>
                </select>
              </div>
              <div className="flex gap-2">
                {editingNotification ? (
                  <>
                    <button
                      onClick={handleUpdateNotification}
                      className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap flex items-center gap-2"
                    >
                      <FaCheck /> Update Notification
                    </button>
                    <button
                      onClick={() => {
                        setEditingNotification(null);
                        setSelectedTemplate('');
                        setTemplateVariables({});
                      }}
                      className="px-4 sm:px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors whitespace-nowrap flex items-center gap-2"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleCreateNotification}
                    className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                  >
                    Create Notification
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Existing Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
          >
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 whitespace-nowrap">
                Existing Notifications
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {notificationsList.map((notification, index) => (
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
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                            notification.type === 'system_alert'
                              ? 'bg-blue-100 text-blue-800'
                              : notification.type === 'seller_message'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {notification.type.replace('_', ' ')}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                            notification.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
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
                      <p className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                        Created: {notification.createdAt}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => handleSendNotification(notification)}
                        className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded text-xs font-semibold hover:bg-blue-600 transition-colors whitespace-nowrap flex items-center gap-1"
                        title="Send Notification"
                      >
                        <FaPaperPlane /> Send
                      </button>
                      <button
                        onClick={() => handleEditNotification(notification)}
                        className="px-3 sm:px-4 py-2 bg-yellow-500 text-white rounded text-xs font-semibold hover:bg-yellow-600 transition-colors whitespace-nowrap flex items-center gap-1"
                        title="Edit Notification"
                      >
                        <FaEdit /> Edit
                      </button>
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
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 whitespace-nowrap">
                Terms & Conditions
              </h2>
              <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                Version {termsAndConditions.version} | Last Updated:{' '}
                {termsAndConditions.lastUpdated}
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

      {/* Send Notification Modal */}
      {showSendModal && sendNotificationData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowSendModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full mx-4 border border-gray-200 shadow-xl"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 whitespace-nowrap">
              Send Notification
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 whitespace-nowrap">Title</p>
                <p className="font-semibold text-gray-900">
                  {sendNotificationData.title}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 whitespace-nowrap">Message</p>
                <p className="text-gray-900">{sendNotificationData.message}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 whitespace-nowrap">
                  Target Audience
                </p>
                <p className="font-semibold text-gray-900 capitalize">
                  {sendNotificationData.targetAudience}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={confirmSendNotification}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap flex items-center justify-center gap-2"
              >
                <FaPaperPlane /> Send Now
              </button>
              <button
                onClick={() => setShowSendModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors whitespace-nowrap"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default NotificationManagement;
