import { useNavigate } from 'react-router-dom';

const ObservationMenu = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: 'Daily observation monitoring',
      route: '/observation-monitoring/daily',
    },
    {
      label: 'Monthly observation monitoring',
      route: '/observation-monitoring/monthly',
    },
    {
      label: 'Validation of INSAT-3D AMV',
      url: 'https://nwp.ncmrwf.gov.in/t574-model/obs_monitor/Insat3d_AMV_Monitoring.pdf',
    },
    {
      label: 'Validation of INSAT-3DR AMV',
      url: 'https://nwp.ncmrwf.gov.in/t574-model/obs_monitor/Insat3dr_AMV_Monitoring.pdf',
    },
    {
      label: 'Validation of METEOSAT-9 AMV',
      url: 'https://nwp.ncmrwf.gov.in/t574-model/obs_monitor/Meteosat-8WindMonitoring.pdf',
    },
    {
      label: 'Validation of HIMAWARI-9 AMV',
      url: 'https://nwp.ncmrwf.gov.in/t574-model/obs_monitor/Himawari9_AMV_Monitoring.pdf',
    },
  ];
  const handleClick = (item) => {
    if (item.route) {
      navigate(item.route);
    } else if (item.url) {
      window.open(item.url, '_blank');
    }
  };

  return (
    <div className="to-cyan-50 flex min-h-screen w-full flex-col items-center justify-start bg-gradient-to-br from-blue-50 via-white px-6 pb-8 pt-10">
      <h3 className="mb-16 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-center text-5xl font-extrabold text-transparent drop-shadow-lg">
        Observation Monitoring Report
      </h3>
      <div className="grid w-full max-w-5xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item)}
            className="group transform cursor-pointer rounded-xl bg-white from-orange-300 to-orange-300 p-5 text-center shadow-lg transition-all hover:scale-105 hover:border-orange-500 hover:bg-gradient-to-r hover:shadow-xl"
          >
            <span className="text-xl font-medium text-slate-800 transition-colors group-hover:text-white">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObservationMenu;
