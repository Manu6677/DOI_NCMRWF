// src/components/Ncmnet.jsx (or your file path)
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom'; // Added useLocation
import { FiArrowLeft, FiMenu, FiX } from 'react-icons/fi'; // Added FiMenu, FiX
import { ncmnetMenuItems } from '../../data/ncmnetMenu-data'; // Adjust path if needed
import MenuItem from '../../components/common/MenuItem'; // Adjust path if needed

const Ncmnet = () => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // State for mobile sidebar
  const navigate = useNavigate();
  const location = useLocation(); // Get location to close sidebar on route change

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location]);

  const handleSelectItem = (itemId) => {
    setSelectedItemId(itemId);

    // Recursive function to find the item by ID
    const findPath = (items, id) => {
      for (const item of items) {
        if (item.id === id && item.path) return item.path;
        if (item.children) {
          const childPath = findPath(item.children, id);
          if (childPath) return childPath;
        }
      }
      return null;
    };

    const path = findPath(ncmnetMenuItems, itemId);
    if (path) {
      navigate(path);
    } else {
      console.warn('No path found for item ID:', itemId);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    // Use relative positioning for potential absolute children like overlay
    <div className="relative flex min-h-screen bg-slate-100">
      {/* Overlay for Mobile - visible when isMobileSidebarOpen is true */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden" // Only on mobile, lower z-index than sidebar
          onClick={toggleMobileSidebar} // Close sidebar on overlay click
          aria-hidden="true" // Hide from screen readers
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-72 flex-col bg-blue-700 text-slate-100 shadow-lg transition-transform duration-300 ease-in-out md:relative md:inset-auto md:z-auto md:translate-x-0 md:shadow-none ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} `} // Conditional transform for mobile slide-in/out
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-blue-600 px-4">
          <h1 className="text-xl font-semibold">NCMRWF Menu</h1>
          {/* Back Button - maybe hide on mobile header? */}
          <button
            onClick={handleBack}
            className="hidden items-center space-x-1 rounded px-2 py-1 text-sm text-slate-300 hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 md:flex" // Hide on mobile, show on md+
            aria-label="Go Back"
          >
            <FiArrowLeft />
            <span>Back</span>
          </button>
          {/* Close button for Mobile Sidebar */}
          <button
            onClick={toggleMobileSidebar}
            className="p-1 text-slate-300 hover:bg-blue-600 md:hidden" // Only show on mobile
            aria-label="Close menu"
          >
            <FiX className="size-6" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-2">
          {ncmnetMenuItems.map((item) => (
            <MenuItem key={item.id} item={item} onSelect={handleSelectItem} />
          ))}
        </nav>

        {/* Footer Disclaimer */}
        <div className="border-t border-blue-700 p-4 text-center text-xs text-slate-400">
          <p>Disclaimer: NCMRWF is a Research and Development Organization.</p>
          <p className="mt-1">
            Outputs are based on Numerical Weather Prediction(NWP) models run at
            NCMRWF.
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Header Bar */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:hidden">
          {/* Hamburger Button */}
          <button
            onClick={toggleMobileSidebar}
            className="p-1 text-slate-600 hover:text-slate-900"
            aria-label="Open menu"
          >
            <FiMenu className="size-6" />
          </button>
          {/* Mobile Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center space-x-1 rounded px-2 py-1 text-sm text-slate-600 hover:bg-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-label="Go Back"
          >
            <FiArrowLeft />
            <span>Back</span>
          </button>
          {/* You could add a mobile logo or title here */}
        </header>

        {/* Actual Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Ncmnet;
