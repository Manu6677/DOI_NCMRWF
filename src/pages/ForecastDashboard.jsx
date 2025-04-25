import MyProSidebar from '../components/common/Sidebar/MyProSidebar';
import { Outlet } from 'react-router-dom';

const ForecastDashboard = () => {
  return (
    <div className="flex">
      <MyProSidebar />
      <div className="min-h-screen flex-1 bg-white p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default ForecastDashboard;
