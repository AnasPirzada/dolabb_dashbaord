import { motion } from 'framer-motion';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md h-14 sm:h-16 flex items-center justify-between px-3 sm:px-4 md:px-6 fixed top-0 left-0 right-0 z-40 border-b border-gray-200"
    >
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {/* Hamburger Menu Button - Always visible to open sidebar */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <HiMenu className="text-xl sm:text-2xl" />
        </button>
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 whitespace-nowrap">
          Admin Panel
        </h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {/* Notifications */}
        <button 
          className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
          aria-label="Notifications"
        >
          <FaBell className="text-base sm:text-lg md:text-xl" />
          <span className="absolute top-1 right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
            <FaUserCircle className="text-base sm:text-lg md:text-xl" />
          </div>
          <div className="text-xs sm:text-sm hidden sm:block">
            <p className="font-semibold text-gray-900 whitespace-nowrap">Admin User</p>
            <p className="text-gray-600 text-xs whitespace-nowrap hidden md:block">admin@dolabb.com</p>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
