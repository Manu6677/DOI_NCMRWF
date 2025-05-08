import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import { useState } from 'react';
import ForecastSidebarMenu from '../../core/ForecastDashboardPage/ForecastSidebarMenu';
import BimstecSidebarMenu from '../../core/BimstecDashboard/BimstecSidebarMenu';
import { useLocation } from 'react-router-dom';

const MyProSidebar = () => {
  const [isCollapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Toggle the sidebar collapse state
  const handleToggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  // Get current path
  const { pathname } = location;

  // Determine which sidebar menu to render
  const isForecast = pathname.startsWith('/forecast-dashboard');
  const isBimstec = pathname.startsWith('/bimstec-charts');

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        collapsed={isCollapsed}
        backgroundColor="#003244"
        className="text-white shadow-lg"
      >
        <Menu iconShape="square">
          {/* Sidebar toggle button */}
          <MenuItem
            onClick={handleToggleSidebar}
            className="relative right-0 flex cursor-pointer items-center justify-center"
            style={{ pointerEvents: 'auto', backgroundColor: 'transparent' }}
          >


            
            <IoIosArrowDropleftCircle
              className={`absolute right-7 rotate-180 text-2xl transition-all duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}
            />
          </MenuItem>

          {/* Conditionally render menu */}
          {isForecast && <ForecastSidebarMenu />}
          {isBimstec && <BimstecSidebarMenu />}
        </Menu>
      </Sidebar>
    </div>
  );
};

export default MyProSidebar;
