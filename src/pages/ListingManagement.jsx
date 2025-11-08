import { motion } from 'framer-motion';
import { useState } from 'react';
import { listings } from '../data/dummyData';

const ListingManagement = () => {
  const [filter, setFilter] = useState('all');

  const filteredListings =
    filter === 'all'
      ? listings
      : listings.filter(listing => listing.status === filter);

  const handleAction = (listingId, action) => {
    console.log(`Action: ${action} on listing ${listingId}`);
    alert(
      `Action: ${action} on listing ${listingId} - Ready for API integration`
    );
  };

  const getStatusBadge = status => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      sold: 'bg-blue-100 text-blue-800',
      removed: 'bg-red-100 text-red-800',
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
          colors[status] || colors.active
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className='space-y-4 sm:space-y-6'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2 whitespace-nowrap'>
          Listing Management
        </h1>
        <p className='text-gray-600 text-sm sm:text-base whitespace-nowrap'>
          View and manage all listed items and features
        </p>
      </motion.div>

      {/* Filters */}
      <div className='bg-white rounded-lg shadow-md p-4 border border-gray-200'>
        <div className='flex gap-2 sm:gap-4 flex-wrap'>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap ${
              filter === 'all'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Listings
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap ${
              filter === 'active'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('sold')}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap ${
              filter === 'sold'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Sold
          </button>
          <button
            onClick={() => setFilter('removed')}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap ${
              filter === 'removed'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Removed
          </button>
        </div>
      </div>

      {/* Listings Table */}
      <div className='bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto' style={{ maxWidth: '100%' }}>
          <table className='w-full min-w-[900px]'>
            <thead className='bg-gray-50 text-gray-900'>
              <tr>
                <th className='px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap'>
                  Listing
                </th>
                <th className='px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap'>
                  Seller
                </th>
                <th className='px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap'>
                  Category
                </th>
                <th className='px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap'>
                  Price
                </th>
                <th className='px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap'>
                  Status
                </th>
                <th className='px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap'>
                  Review
                </th>
                <th className='px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase whitespace-nowrap'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredListings.map((listing, index) => (
                <motion.tr
                  key={listing.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className='hover:bg-gray-50'
                >
                  <td className='px-4 sm:px-6 py-4'>
                    <div>
                      <p className='font-semibold text-gray-900 whitespace-nowrap'>
                        {listing.title}
                      </p>
                      <p className='text-sm text-gray-600 whitespace-nowrap'>
                        Views: {listing.views} | Created: {listing.createdAt}
                      </p>
                    </div>
                  </td>
                  <td className='px-4 sm:px-6 py-4 text-sm text-gray-700 whitespace-nowrap'>
                    {listing.seller}
                  </td>
                  <td className='px-4 sm:px-6 py-4'>
                    <span className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs whitespace-nowrap'>
                      {listing.category}
                    </span>
                  </td>
                  <td className='px-4 sm:px-6 py-4 font-semibold text-green-600 whitespace-nowrap'>
                    ${listing.price.toLocaleString()}
                  </td>
                  <td className='px-4 sm:px-6 py-4'>
                    {getStatusBadge(listing.status)}
                  </td>
                  <td className='px-4 sm:px-6 py-4'>
                    <div className='flex gap-2 flex-wrap'>
                      {listing.reviewed ? (
                        <span className='px-2 py-1 bg-green-100 text-green-800 rounded text-xs whitespace-nowrap'>
                          Reviewed
                        </span>
                      ) : (
                        <span className='px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs whitespace-nowrap'>
                          Pending
                        </span>
                      )}
                      {listing.approved && (
                        <span className='px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs whitespace-nowrap'>
                          Approved
                        </span>
                      )}
                    </div>
                  </td>
                  <td className='px-4 sm:px-6 py-4'>
                    <div className='flex gap-2 flex-wrap'>
                      {!listing.reviewed && (
                        <button
                          onClick={() =>
                            handleAction(listing.id, 'mark_reviewed')
                          }
                          className='px-2 sm:px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 whitespace-nowrap'
                        >
                          Mark Reviewed
                        </button>
                      )}
                      {listing.reviewed && !listing.approved && (
                        <button
                          onClick={() => handleAction(listing.id, 'approve')}
                          className='px-2 sm:px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 whitespace-nowrap'
                        >
                          Approve
                        </button>
                      )}
                      {listing.status === 'active' && (
                        <button
                          onClick={() => handleAction(listing.id, 'hide')}
                          className='px-2 sm:px-3 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600 whitespace-nowrap'
                        >
                          Hide
                        </button>
                      )}
                      <button
                        onClick={() => handleAction(listing.id, 'remove')}
                        className='px-2 sm:px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 whitespace-nowrap'
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListingManagement;
