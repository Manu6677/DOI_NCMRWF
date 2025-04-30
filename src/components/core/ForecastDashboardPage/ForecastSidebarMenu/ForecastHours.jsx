import { useState } from 'react';
import Spinner from '../../../common/Spinner';

const ForecastHours = ({ selectedHour, onSelect, forecastHours }) => {
  const [loading, setLoading] = useState(false);

  console.log(
    'selectedHour :',
    selectedHour,
    'onSelect :',
    onSelect,
    'forecastHours :',
    forecastHours
  );
  return (
    <div className="p-2">
      <h2 className="mb-2 text-lg font-semibold text-slate-700">
        Select Forecast Hour
      </h2>

      {loading ? (
        <div className="flex justify-center">
          <Spinner size={32} />
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {forecastHours.map((hour) => (
            <button
              key={hour}
              onClick={() => onSelect(hour)}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition duration-300 ${selectedHour === hour ? 'bg-blue-500 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'} `}
              aria-label={`Select ${hour} hour forecast`}
            >
              {hour === 0 ? 'Analysis' : `${hour} hr`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForecastHours;
