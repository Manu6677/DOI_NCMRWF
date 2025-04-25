import { useEffect, useState } from 'react';
import { fetchReportsByType } from '../../../../services/operations/reportsAPIS';
const base_url = process.env.REACT_APP_ASSETS_BASE_URL_NEW;
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const ReportGrid = ({ reportType }) => {
  const [reports, setReports] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);
        const data = await fetchReportsByType(reportType);
        setReports(data); // data is in { 2023: { 1: { url }, 2: { url }... }, 2024: { ... } }
      } catch (err) {
        console.error('Failed to load reports:', err);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, [reportType]);

  const sortedYears = Object.keys(reports)
    .map(Number)
    .sort((a, b) => b - a); // Latest year first

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-4 text-center text-slate-600">
            Loading reports...
          </div>
        ) : sortedYears.length === 0 ? (
          <div className="p-4 text-center text-slate-500">
            No reports available.
          </div>
        ) : (
          <table className="min-w-full border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 p-2 text-left text-sm font-semibold text-slate-700">
                  Year
                </th>
                {monthNames.map((month) => (
                  <th
                    key={month}
                    className="border border-slate-300 p-2 text-center text-sm font-semibold text-slate-700"
                  >
                    {month}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedYears.map((year) => (
                <tr key={year} className="hover:bg-slate-50">
                  <td className="border border-slate-300 p-2 text-center font-medium text-slate-800">
                    {year}
                  </td>
                  {monthNames.map((_, monthIndex) => {
                    const monthNumber = monthIndex + 1;
                    const report = reports[year]?.[monthNumber];

                    return (
                      <td
                        key={`${year}-${monthNumber}`}
                        className="border border-slate-300 p-2 text-center"
                      >
                        {report ? (
                          <a
                            href={`${base_url}/NCUM-GMV-Reports${report.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            View
                          </a>
                        ) : (
                          <span className="text-sm text-slate-400">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReportGrid;
