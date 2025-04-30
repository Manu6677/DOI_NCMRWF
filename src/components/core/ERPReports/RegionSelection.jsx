import { useNavigate } from 'react-router-dom';

const RegionSelection = () => {
  const navigate = useNavigate();

  const handleNavigate = (region, type) => {
    navigate(
      `/region/${region.toLowerCase()}/${type.toLowerCase().replace('-', '')}`
    );
  };

  const regions = [
    {
      name: 'India Region',
      type: 'India-Region',
      bulletPoints: ['Weekly-Mean', 'Four-Week-Mean'],
    },
    {
      name: 'BIMSTEC Region',
      type: 'BIMSTEC-Region',
      bulletPoints: ['Weekly-Mean', 'Four-Week-Mean'],
    },
  ];

  return (
    <div className="to-cyan-100 flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 via-white p-8">
      <h2 className="mb-12 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-4xl font-bold text-transparent drop-shadow">
        Extended Range Forecast Reports
      </h2>
      <div className="grid w-full max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
        {regions.map((region) => (
          <div
            key={region.name}
            className="rounded-xl border bg-white p-6 shadow-lg transition hover:border-blue-300 hover:shadow-xl"
          >
            <h3 className="mb-4 text-2xl font-semibold text-blue-700">
              {region.name}
            </h3>
            <ul className="list-disc space-y-2 pl-5">
              {region.bulletPoints.map((point) => (
                <li
                  key={point}
                  className="cursor-pointer font-medium text-blue-600 hover:underline"
                  onClick={() => handleNavigate(region.type, point)}
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionSelection;
