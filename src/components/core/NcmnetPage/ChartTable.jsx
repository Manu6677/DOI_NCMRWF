import {
  DAILY_STATS,
  DAILY_VARIABLES,
  WEEKLY_HPA_LEVELS,
  WEEKLY_VARIABLES,
} from '../../../data/ncmrwfConfig'; // Assuming config path
import { handleImageError } from '../../../utils/imageUtils'; // Assuming utils path

const ChartTable = ({
  viewType,
  chartData,
  onChartClick,
  selectedDate,
  selectedTime,
  selectedRegion,
}) => {
  return (
    <div className="overflow-x-auto rounded border border-slate-300 bg-white">
      <table className="min-w-full border-collapse divide-y divide-slate-200 text-sm">
        {/* Render Table Head based on viewType */}
        <thead className="bg-slate-100">
          {viewType === 'daily' && (
            <tr>
              <th
                scope="col"
                className="px-4 py-2 text-left font-semibold text-slate-700"
              >
                Name
              </th>
              {DAILY_VARIABLES.map((variable) => (
                <th
                  key={variable.id}
                  scope="col"
                  className="px-4 py-2 text-center font-semibold text-slate-700"
                >
                  {variable.label}
                </th>
              ))}
            </tr>
          )}
          {viewType === 'weekly' && (
            <tr>
              <th
                scope="col"
                className="px-4 py-2 text-left font-semibold text-slate-700"
              >
                Levels
              </th>
              {WEEKLY_VARIABLES.map((variable) => (
                <th
                  key={variable.id}
                  scope="col"
                  className="px-4 py-2 text-center font-semibold text-slate-700"
                >
                  {variable.label}
                </th>
              ))}
            </tr>
          )}
        </thead>
        {/* Render Table Body based on viewType */}
        <tbody className="divide-y divide-slate-200 bg-white">
          {/* Daily Table Body */}
          {viewType === 'daily' &&
            chartData.map((statRow) => (
              <tr key={statRow.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-slate-900">
                  <div className="font-semibold">{statRow.label}</div>
                  {/* Optional: Link to a hypothetical 'all variables' view */}
                  {/* <Link
                    to={`/ncmnet/verification/${viewType}/${statRow.id.toLowerCase()}/all?date=${selectedDate}&time=${selectedTime}`}
                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    All Variables
                  </Link> */}
                </td>
                {DAILY_VARIABLES.map((variable) => (
                  <td
                    key={`${statRow.id}-${variable.id}`}
                    className="px-2 py-2 text-center align-middle"
                  >
                    <img
                      src={statRow.charts[variable.id]}
                      alt={`Chart for ${statRow.label} - ${variable.label}`}
                      className="mx-auto h-auto max-h-24 w-auto cursor-pointer rounded border border-slate-200 object-contain transition-transform hover:scale-105"
                      onClick={() =>
                        onChartClick(
                          {
                            statLabel: statRow.label,
                            varLabel: variable.label,
                            date: selectedDate,
                            time: selectedTime,
                          },
                          statRow.charts[variable.id] // Pass URL
                        )
                      }
                      onError={(e) => handleImageError(e, 100, 75, 'No Chart')}
                      loading="lazy"
                    />
                  </td>
                ))}
              </tr>
            ))}
          {/* Weekly Table Body */}
          {viewType === 'weekly' &&
            chartData.map((levelRow) => (
              <tr key={levelRow.id}>
                {/* HPA Level */}
                <td className="whitespace-nowrap px-4 py-2 text-center font-semibold text-slate-900">
                  {levelRow.label}
                </td>
                {/* Chart Images */}
                {WEEKLY_VARIABLES.map((variable) => (
                  <td
                    key={`${levelRow.id}-${variable.id}`}
                    className="px-2 py-2 text-center align-middle"
                  >
                    <img
                      src={levelRow.charts[variable.id]}
                      alt={`Chart for ${variable.label} at ${levelRow.label}`}
                      className="mx-auto h-auto max-h-24 w-auto cursor-pointer rounded border border-slate-200 object-contain transition-transform hover:scale-105"
                      onClick={() =>
                        onChartClick(
                          {
                            hpaLevel: levelRow.id,
                            varLabel: variable.label,
                            date: selectedDate,
                            regionId: selectedRegion,
                          },
                          levelRow.charts[variable.id] // Pass URL
                        )
                      }
                      onError={(e) => handleImageError(e, 100, 75, 'No Chart')}
                      loading="lazy"
                    />
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChartTable;
