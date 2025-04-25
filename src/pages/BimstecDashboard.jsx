import MyProSidebar from '../components/common/Sidebar/MyProSidebar';
import { Outlet } from 'react-router-dom';

const BimstecDashboard = () => {
  return (
    <div className="flex">
      <MyProSidebar />
      <div className="max-h-screen flex-1 overflow-y-scroll bg-white p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default BimstecDashboard;
