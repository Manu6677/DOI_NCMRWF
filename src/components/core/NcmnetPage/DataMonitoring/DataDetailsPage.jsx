// src/pages/DataDetailsPage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Ensure this matches your environment variable name
const baseUrl = process.env.REACT_APP_ASSETS_BASE_URL_NEW || '';

// --- Static Sample Data (Keep as is) ---
const sampleBufrData = [
  // ... (data remains the same as previous versions)
  { type: '1bamua', hourly: 230469, monthly: 187647, departure: 23 },
  { type: '1bhrs4', hourly: 152446, monthly: 140366, departure: 9 },
  { type: '1bmhs', hourly: 1313347, monthly: 1062309, departure: 24 },
  { type: 'abi', hourly: 490353, monthly: 422767, departure: 16 },
  { type: 'adpsfc', hourly: 44844, monthly: 33600, departure: 33 },
  { type: 'adpupa', hourly: 518, monthly: 291, departure: 78 },
  { type: 'ahi', hourly: 53221, monthly: 44018, departure: 21 },
  { type: 'aircar', hourly: 117804, monthly: 79397, departure: 48 },
  { type: 'aircft', hourly: 17779, monthly: 21552, departure: -18 },
  { type: 'airsev', hourly: 0, monthly: 42896, departure: -100 },
  { type: 'ascatw', hourly: 755429, monthly: 529927, departure: 43 },
  { type: 'atms', hourly: 1517092, monthly: 1351908, departure: 12 },
  { type: 'avcspm', hourly: 0, monthly: 55674, departure: -100 },
  { type: 'crisdb', hourly: 17782, monthly: 16230, departure: 10 },
  { type: 'crisf4', hourly: 1426936, monthly: 1145309, departure: 25 },
  { type: 'esamua', hourly: 44055, monthly: 24475, departure: 80 },
  { type: 'esatms', hourly: 55587, monthly: 38348, departure: 45 },
  { type: 'eshrs3', hourly: 63057, monthly: 36083, departure: 75 },
  { type: 'esiasi', hourly: 17995, monthly: 6439, departure: 179 },
  { type: 'esmhs', hourly: 295171, monthly: 162008, departure: 82 },
  { type: 'gmi1cr', hourly: 424324, monthly: 376512, departure: 13 },
  { type: 'gome', hourly: 0, monthly: 459, departure: -100 },
  { type: 'gpsipw', hourly: 18118, monthly: 18044, departure: 0 },
  { type: 'gpsro', hourly: 1594, monthly: 1404, departure: 13 },
  { type: 'mtiasi', hourly: 33065, monthly: 41809, departure: -21 },
  { type: 'nexrad', hourly: 0, monthly: 148595, departure: -100 },
  { type: 'ompsn8', hourly: 2288, monthly: 1695, departure: 35 },
  { type: 'ompst8', hourly: 1245352, monthly: 1113852, departure: 12 },
  { type: 'osbuv8', hourly: 0, monthly: 0, departure: 0 },
  { type: 'oscatw', hourly: 148989, monthly: 107775, departure: 38 },
  { type: 'proflr', hourly: 3584, monthly: 2636, departure: 36 },
  { type: 'satwnd', hourly: 2334317, monthly: 2080656, departure: 12 },
  { type: 'sevasr', hourly: 302051, monthly: 269553, departure: 12 },
  { type: 'sfcshp', hourly: 16037, monthly: 13325, departure: 20 },
  { type: 'ssmisu', hourly: 854524, monthly: 714211, departure: 20 },
  { type: 'tesac', hourly: 0, monthly: 6, departure: -100 },
  { type: 'trkob', hourly: 520, monthly: 507, departure: 2 },
  { type: 'vadwnd', hourly: 155, monthly: 161, departure: -4 },
];
// --- End Sample Data ---

// Enhanced color function with more distinct hover states
const getColorForDeparture = (departure) => {
  const dep = Number(departure);
  if (isNaN(dep))
    return 'text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-50';
  if (dep < -30)
    return 'text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300';
  if (dep < -5)
    return 'text-orange-700 hover:text-orange-900 bg-orange-50 hover:bg-orange-100 border-orange-200 hover:border-orange-300';
  if (dep <= 5)
    return 'text-gray-800 hover:text-black bg-white hover:bg-gray-50 border-slate-300 hover:border-slate-400'; // Normal
  if (dep <= 30)
    return 'text-green-700 hover:text-green-900 bg-green-50 hover:bg-green-100 border-green-200 hover:border-green-300';
  return 'text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border-blue-200 hover:border-blue-300'; // > 30
};

const formatDateYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
};

const DataDetailsPage = () => {
  const { dataType, cycleTime } = useParams();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dateString = formatDateYYYYMMDD(yesterday);
  const hourString = cycleTime ? cycleTime.substring(0, 2) : '00';
  const dateTimeString = `${dateString}${hourString}`;

  const displayDataType = dataType
    ? dataType.charAt(0).toUpperCase() + dataType.slice(1)
    : 'Unknown';
  const displayCycleTime = cycleTime ? cycleTime.toUpperCase() : 'Unknown';

  const currentData = sampleBufrData;
  const loading = false;
  const error = null; // Assume no error for static data

  // --- Plot Image URL ---
  const plotImageUrl = `${baseUrl}/data-monitoring/image/PLOT/percentage_${hourString}_${dataType}.png`;

  // --- Loading / Error / Validation ---
  if (loading)
    return (
      <div className="text-gray-700 flex h-screen items-center justify-center text-xl font-semibold">
        Loading details...
      </div>
    );
  if (error)
    return (
      <div className="m-4 rounded-lg border border-red-300 bg-red-100 p-6 text-center text-red-800 shadow-md">
        Error loading details: {error}
      </div>
    );
  if (!dataType || !cycleTime || !baseUrl)
    return (
      <div className="m-4 rounded-lg border border-orange-300 bg-orange-100 p-6 text-center text-orange-800 shadow-md">
        Error: Missing data type, cycle time in URL, or Base URL configuration.
      </div>
    );

  return (
    <div className="from-sky-100 min-h-screen bg-gradient-to-br via-white to-orange-100 p-4 pt-6 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">
        {' '}
        {/* Limit overall width */}
        {/* Header Section */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            NGFS Dump Data Counts Time Series Plots
          </h1>
          <h2 className="text-indigo-700 mt-2 text-xl font-medium sm:text-2xl">
            Valid {displayCycleTime} {displayDataType} Cycle (Date: {dateString}
            )
          </h2>
        </header>
        {/* Top Navigation Links - with separators */}
        <nav className="mb-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm sm:text-base">
          <Link
            to="/ncmnet/explanation-of-data-types"
            className="font-medium text-blue-700 hover:text-blue-900 hover:underline"
          >
            Explanation
          </Link>
          <span className="text-gray-400" aria-hidden="true">
            |
          </span>
          <Link
            to="#"
            className="font-medium text-blue-700 hover:text-blue-900 hover:underline"
          >
            GFS Summary
          </Link>
          <span className="text-gray-400" aria-hidden="true">
            |
          </span>
          <Link
            to="#"
            className="font-medium text-blue-700 hover:text-blue-900 hover:underline"
          >
            Reception Status
          </Link>
          <span className="text-gray-400" aria-hidden="true">
            |
          </span>
          <Link
            to="#"
            className="font-medium text-blue-700 hover:text-blue-900 hover:underline"
          >
            Departure Diff
          </Link>
        </nav>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column (Grid + Legend) */}
          <div className="space-y-8 lg:col-span-2">
            {/* Data Type Links Grid Card */}
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
              <h3 className="text-gray-800 mb-5 text-center text-base font-semibold">
                View Time Series Plot (opens image in new tab)
              </h3>
              <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9">
                {currentData.map((item) => {
                  const imageUrl = `${baseUrl}/data-monitoring/image/${dataType}/${dateTimeString}/${item.type}.png`;
                  return (
                    <a
                      key={item.type}
                      href={imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`View plot for ${item.type}`} // Add title attribute
                      // Apply dynamic color, padding, border, shadow, focus rings
                      className={`focus:ring-indigo-500 flex h-10 items-center justify-center rounded-md border px-1 text-center text-xs font-semibold shadow-sm transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 sm:h-11 sm:text-sm ${getColorForDeparture(item.departure)}`}
                    >
                      {item.type}
                    </a>
                  );
                })}
              </div>
            </section>

            {/* Explanation of Colors Legend Card */}
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
              <h3 className="text-gray-800 mb-5 text-center text-base font-semibold">
                Explanation of Colors (based on Departure %)
              </h3>
              <div className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm md:grid-cols-2">
                {/* Legend Items - slightly larger squares and text */}
                <div className="flex items-start gap-3">
                  {' '}
                  <span className="border-gray-300 mt-0.5 h-4 w-4 flex-shrink-0 rounded border bg-red-600"></span>{' '}
                  <div>
                    <strong className="font-semibold text-red-700">
                      &lt; -30%:
                    </strong>{' '}
                    Abnormal Shortage (Investigate)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  {' '}
                  <span className="border-gray-300 mt-0.5 h-4 w-4 flex-shrink-0 rounded border bg-orange-500"></span>{' '}
                  <div>
                    <strong className="font-semibold text-orange-700">
                      -30% to -5%:
                    </strong>{' '}
                    Shortage (Monitor)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  {' '}
                  <span className="border-gray-400 mt-0.5 h-4 w-4 flex-shrink-0 rounded border bg-white"></span>{' '}
                  <div>
                    <strong className="text-gray-800 font-semibold">
                      -5% to +5%:
                    </strong>{' '}
                    Normal Counts
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  {' '}
                  <span className="border-gray-300 mt-0.5 h-4 w-4 flex-shrink-0 rounded border bg-green-600"></span>{' '}
                  <div>
                    <strong className="font-semibold text-green-700">
                      +5% to +30%:
                    </strong>{' '}
                    Overage (Monitor)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  {' '}
                  <span className="border-gray-300 mt-0.5 h-4 w-4 flex-shrink-0 rounded border bg-blue-600"></span>{' '}
                  <div>
                    <strong className="font-semibold text-blue-700">
                      &gt; +30%:
                    </strong>{' '}
                    Abnormal Overage (Investigate)
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Link
                  to="#" // Replace with actual link destination
                  className="inline-flex items-center justify-center rounded-md bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  More Information
                </Link>
              </div>
            </section>
          </div>

          {/* Right Column (Plot Image) */}
          <aside className="lg:col-span-1">
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-lg">
              <h3 className="text-gray-800 mb-4 text-base font-semibold">
                Bufr Dump: {displayCycleTime} ({displayDataType}) Plot
              </h3>
              <div className="flex min-h-[200px] items-center justify-center overflow-hidden rounded-md border border-slate-300 bg-slate-50">
                <img
                  src={plotImageUrl}
                  alt={`BUFR Dump Plot for ${displayCycleTime} ${displayDataType}`}
                  className="h-auto w-full max-w-full object-contain" // Ensure image scales nicely
                  // Basic error handling: display placeholder text if image fails
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.style.display = 'none'; // Hide broken image icon
                    // Optionally add a placeholder element here
                    const errorDiv = document.createElement('div');
                    errorDiv.textContent = 'Plot image not available.';
                    errorDiv.className = 'p-4 text-sm text-red-600';
                    currentTarget.parentNode.appendChild(errorDiv);
                  }}
                />
                {/* Placeholder text in case onError doesn't work or for initial state */}
                {/* <p className="p-4 text-sm text-slate-400">Loading plot...</p> */}
              </div>
            </div>
          </aside>
        </div>{' '}
        {/* End Main Content Grid */}
        {/* Footer Disclaimer */}
        <footer className="mt-12 border-t border-slate-300 pt-8 text-center">
          <p className="mx-auto max-w-2xl text-xs text-slate-500">
            Disclaimer : NCMRWF is a Research and Development Organization. The
            products and the conclusion drawn thereof are based on Numerical
            Weather Prediction(NWP) models being run at NCMRWF.
          </p>
        </footer>
      </div>{' '}
      {/* End Max Width Container */}
    </div> // End Background Gradient Div
  );
};

export default DataDetailsPage;
