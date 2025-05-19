// src/components/GfsSummaryPage.js (or your preferred path)
import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink, useLocation } from 'react-router-dom'; // Renamed Link to RouterLink to avoid conflict if any

const baseUrl = process.env.REACT_APP_ASSETS_BASE_URL_NEW || '';

// Re-using the parser function. Ideally, this would be in a shared utils file.
const parseBufrDataText = (textData) => {
  if (!textData || typeof textData !== 'string') return [];
  return textData
    .trim()
    .split('\n')
    .map((line) => {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 4) {
        const hourly = parseInt(parts[1], 10);
        const monthly = parseInt(parts[2], 10);
        const departure = parseFloat(parts[3]);
        if (isNaN(hourly) || isNaN(monthly) || isNaN(departure)) {
          console.warn('Skipping malformed line (invalid numbers):', line);
          return null;
        }
        return {
          type: parts[0],
          hourly: hourly,
          monthly: monthly,
          departure: departure,
        };
      }
      console.warn(
        'Skipping malformed line (incorrect number of parts):',
        line
      );
      return null;
    })
    .filter((item) => item !== null);
};

const GfsSummaryPage = () => {
  const { dataType, cycleTime } = useParams();
  const location = useLocation(); // To potentially pass through query params like 'highlight'

  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hourStringFromCycleTime = cycleTime ? cycleTime.substring(0, 2) : '00';
  const displayDataType = dataType
    ? dataType.charAt(0).toUpperCase() + dataType.slice(1)
    : 'Unknown';
  const lowerCaseDataType = dataType ? dataType.toLowerCase() : 'unknown';

  useEffect(() => {
    if (!baseUrl || !dataType || !cycleTime) {
      setError('Base URL, Data Type, or Cycle Time is missing.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setSummaryData([]);

    // Construct the URL for percentage.txt, similar to DataDetailsPage
    // This uses the dataType from the URL params.
    const dataUrl = `${baseUrl}/data-monitoring/image/${lowerCaseDataType}/DATA_TABLE/${hourStringFromCycleTime}/percentage.txt`;
    // console.log(`GfsSummaryPage: Fetching data from ${dataUrl}`);

    fetch(dataUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status} while fetching ${dataUrl}`
          );
        }
        return response.text();
      })
      .then((text) => {
        const parsed = parseBufrDataText(text);
        setSummaryData(parsed);
      })
      .catch((err) => {
        console.error('Failed to fetch or parse GFS summary data:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    baseUrl,
    dataType,
    cycleTime,
    hourStringFromCycleTime,
    lowerCaseDataType,
  ]); // Added lowerCaseDataType

  if (!dataType || !cycleTime) {
    return (
      <div className="m-4 rounded-lg border border-orange-300 bg-orange-100 p-6 text-center text-orange-800 shadow-md">
        Error: Missing data type or cycle time in URL for GFS Summary.
      </div>
    );
  }

  return (
    <div className="to-sky-100 min-h-screen bg-gradient-to-br from-slate-100 via-white p-4 pt-6 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            GFS Data Summary
          </h1>
          <h2 className="text-indigo-700 mt-2 text-xl font-medium sm:text-2xl">
            Data Type: {displayDataType} | Cycle:{' '}
            {cycleTime ? cycleTime.toUpperCase() : 'N/A'}
          </h2>
        </header>

        {loading && (
          <div className="text-md flex h-40 items-center justify-center font-semibold text-slate-600">
            Loading summary data...
          </div>
        )}
        {error && (
          <div className="my-4 rounded-md border border-red-300 bg-red-100 p-6 text-center text-red-800 shadow-md">
            Error loading summary: {error}
          </div>
        )}

        {!loading && !error && summaryData.length === 0 && (
          <p className="text-center text-lg text-slate-500">
            No summary data found for the specified parameters. The file might
            be empty or not available.
          </p>
        )}

        {!loading && !error && summaryData.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                  >
                    Hourly Count
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                  >
                    Monthly Count
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                  >
                    Departure (%)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {summaryData.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? 'bg-white'
                        : 'bg-slate-50 hover:bg-slate-100'
                    }
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                      {item.type}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                      {item.hourly.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                      {item.monthly.toLocaleString()}
                    </td>
                    <td
                      className={`whitespace-nowrap px-6 py-4 text-sm font-semibold ${
                        item.departure > 5
                          ? 'text-green-600'
                          : item.departure < -5
                            ? 'text-red-600'
                            : 'text-slate-700'
                      }`}
                    >
                      {item.departure.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <footer className="mt-12 border-t border-slate-300 pt-8 text-center">
          <RouterLink
            to={`/ncmnet/data-monitoring/${dataType}/${cycleTime}${location.search}`} // Link back, preserving query params
            className="font-medium text-blue-700 hover:text-blue-900 hover:underline"
          >
            &larr; Back to Data Details
          </RouterLink>
        </footer>
      </div>
    </div>
  );
};

export default GfsSummaryPage;
