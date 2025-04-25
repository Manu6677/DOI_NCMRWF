import { handleImageError } from '../../../../utils/imageUtils';
import { FORECAST_DAYS } from '../../../../data/gfsTempConfig';

const ChartGrid = ({ chartData, onChartClick, mode, selectedDate }) => {
  if (!chartData || chartData.length === 0) {
    return null; // Or render a specific message if needed
  }

  return (
    <div className="overflow-x-auto rounded border border-slate-300 bg-white">
      <table className="min-w-full border-collapse divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th
              scope="col"
              className="px-4 py-2 text-left font-semibold text-slate-700"
            >
              Parameter
            </th>
            {FORECAST_DAYS.map((day) => (
              <th
                key={`header-day-${day}`}
                scope="col"
                className="px-4 py-2 text-center font-semibold text-slate-700"
              >
                Day {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {chartData.map((row) => (
            <tr key={row.type}>
              {/* Parameter Label */}
              <td className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
                {row.label}
              </td>
              {/* Chart Images for each day */}
              {FORECAST_DAYS.map((day) => {
                const chartUrl = row.charts[day];
                const altText = `${row.label} - Day ${day} ${mode} for ${selectedDate}`;
                return (
                  <td
                    key={`${row.type}-day-${day}`}
                    className="px-2 py-2 text-center align-middle"
                  >
                    {chartUrl ? ( // Only render if URL exists
                      <img
                        src={chartUrl}
                        alt={altText}
                        className="mx-auto h-auto max-h-24 w-auto cursor-pointer rounded border border-slate-200 object-contain transition-transform hover:scale-105"
                        onClick={() =>
                          onChartClick(
                            {
                              type: row.type,
                              label: row.label,
                              day: day,
                              date: selectedDate,
                              mode: mode,
                            },
                            chartUrl // Pass URL
                          )
                        }
                        onError={(e) =>
                          handleImageError(e, 100, 75, 'No Chart')
                        }
                        loading="lazy"
                      />
                    ) : (
                      // Optionally render a placeholder or empty state if no URL for this day/type
                      <div className="flex h-24 w-full items-center justify-center text-xs text-slate-400">
                        N/A
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChartGrid;
