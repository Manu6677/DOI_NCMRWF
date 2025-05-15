import React, { useState, useEffect, useCallback } from 'react';
import {
  FiDownload,
  FiCalendar,
  FiAlertCircle,
  FiFilter,
} from 'react-icons/fi'; // Example icons

import {
  fetchOfficeOrderYears,
  fetchAllOfficeOrders,
} from '../../../../services/operations/officeOrdersAPI';

const OfficeOrdersPage = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [availableYears, setAvailableYears] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch available years when the component mounts
  useEffect(() => {
    const loadYears = async () => {
      setIsLoading(true);
      setError(null); // Clear previous errors
      try {
        const data = await fetchOfficeOrderYears(); // Using the imported service function
        if (data && data.length > 0) {
          setAvailableYears(data);
          // If the current default selectedYear is not in the fetched available years,
          // or if no year is selected yet, select the most recent available year.
          if (!data.includes(selectedYear)) {
            setSelectedYear(data[0]); // Assuming years from API are sorted DESC
          }
        } else {
          // Handle case where API returns empty or no data for years
          setAvailableYears([]); // Set to empty
          // Optionally, keep a default set or show a specific message
          const currentYr = new Date().getFullYear();
          // Fallback if API fails or returns no years
          // setAvailableYears([currentYr, currentYr -1, currentYr -2, currentYr-3, currentYr-4]);
          // setSelectedYear(currentYr); // Fallback to current year
          if (data && data.length === 0) {
            // API returned empty array
            setError('No years with office orders found in the system.');
          }
        }
      } catch (e) {
        console.error('Failed to fetch years:', e);
        setError('Failed to load available years. Please try again later.');
        // Fallback years in case of error
        const currentYr = new Date().getFullYear();
        setAvailableYears([
          currentYr,
          currentYr - 1,
          currentYr - 2,
          currentYr - 3,
          currentYr - 4,
        ]);
        if (
          ![
            currentYr,
            currentYr - 1,
            currentYr - 2,
            currentYr - 3,
            currentYr - 4,
          ].includes(selectedYear)
        ) {
          setSelectedYear(currentYr);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadYears();
  }, []); // Runs once on mount. Add dependencies if needed for re-fetching.

  // Fetch orders for the selected year
  const loadOrdersForSelectedYear = useCallback(async (year) => {
    if (!year) {
      setOrders([]); // Clear orders if no year is selected
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // Using fetchAllOfficeOrders with a year filter, as it matches the API structure
      // GET /api/officeOrders/?year=<YYYY>
      const data = await fetchAllOfficeOrders(year);

      // If you intend to use the /api/officeOrders/by-year/:year endpoint, you would call:
      // const data = await fetchOrdersByYear(year);

      setOrders(data || []); // Ensure orders is an array
    } catch (e) {
      console.error(`Failed to fetch orders for year ${year}:`, e);
      setError(
        `Failed to load office orders for ${year}. Please try again later.`
      );
      setOrders([]); // Clear orders on error
    } finally {
      setIsLoading(false);
    }
  }, []); // No dependencies needed if service functions are stable

  // Effect to load orders when selectedYear changes
  useEffect(() => {
    if (selectedYear) {
      loadOrdersForSelectedYear(selectedYear);
    }
  }, [selectedYear, loadOrdersForSelectedYear]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  // Determine years to display in selector
  const yearSelectorOptions =
    availableYears.length > 0
      ? availableYears
      : isLoading // If loading, don't show default years yet
        ? []
        : [
            new Date().getFullYear(),
            new Date().getFullYear() - 1,
            new Date().getFullYear() - 2,
          ]; // Fallback if still no years after load attempt

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-center text-3xl font-bold tracking-tight text-blue-700 sm:text-4xl">
          Office Orders
        </h1>
      </header>

      {/* Year Selector */}
      <div className="mb-8 rounded-lg bg-white p-4 shadow-md">
        <div className="flex flex-col items-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="flex items-center text-lg font-semibold text-slate-700">
            <FiFilter className="mr-2 h-5 w-5 text-blue-600" />
            Select Year:
          </div>
          <div className="flex flex-wrap gap-2">
            {yearSelectorOptions.map((year) => (
              <button
                key={year}
                onClick={() => handleYearChange(year)}
                disabled={isLoading}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 ease-in-out ${
                  selectedYear === year
                    ? 'scale-105 transform bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-200 text-slate-700 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
        {availableYears.length === 0 && !isLoading && !error && (
          <p className="mt-3 text-center text-sm text-slate-500">
            No years with office orders currently available.
          </p>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex h-64 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
          <p className="ml-3 text-slate-600">Loading orders...</p>
        </div>
      )}

      {/* Error Message */}
      {error &&
        !isLoading && ( // Show error only if not loading
          <div className="my-6 flex items-center rounded-md border border-red-400 bg-red-100 p-4 text-red-700 shadow-sm">
            <FiAlertCircle className="mr-3 h-6 w-6 flex-shrink-0" />
            <div>
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}

      {/* No Orders Found Message */}
      {!isLoading && !error && orders.length === 0 && (
        <div className="bg-amber-50 border-amber-300 text-amber-700 my-6 rounded-lg border p-6 text-center shadow">
          <FiAlertCircle className="text-amber-500 mx-auto mb-3 h-10 w-10" />
          <p className="text-xl font-semibold">No Office Orders Found</p>
          <p className="mt-1">
            There are no office orders available for the selected year (
            {selectedYear}).
          </p>
        </div>
      )}

      {/* Orders Table */}
      {!isLoading && !error && orders.length > 0 && (
        <div className="overflow-hidden rounded-lg bg-white shadow-xl">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 sm:px-6 sm:py-3.5 sm:text-sm"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 sm:px-6 sm:py-3.5 sm:text-sm"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 sm:px-6 sm:py-3.5 sm:text-sm md:table-cell"
                >
                  Remarks
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700 sm:px-6 sm:py-3.5 sm:text-sm"
                >
                  Download
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="transition-colors duration-150 hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600 sm:px-6 sm:py-4">
                    <div className="flex items-center">
                      <FiCalendar className="mr-1.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                      {new Date(order.order_date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-800 sm:px-6 sm:py-4">
                    {order.title}
                  </td>
                  <td className="hidden px-4 py-3 text-sm text-slate-600 sm:px-6 sm:py-4 md:table-cell">
                    {order.remarks || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-center sm:px-6 sm:py-4">
                    <a
                      href={order.pdf_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-transform duration-150 hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-4 sm:py-2 sm:text-sm"
                      title={`Download ${order.title}`}
                    >
                      <FiDownload className="mr-0 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5" />
                      <span className="hidden sm:inline">PDF</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <footer className="mt-12 text-center">
        <p className="text-xs text-slate-500">
          For assistance, please contact the administration department.
        </p>
      </footer>
    </div>
  );
};

export default OfficeOrdersPage;
