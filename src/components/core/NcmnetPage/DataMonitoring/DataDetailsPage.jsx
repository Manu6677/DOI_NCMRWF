import { useParams, Link, useLocation } from 'react-router-dom';

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
    return 'text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-50'; // Default/Invalid
  if (dep < -30)
    return 'text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300'; // Abnormal Shortage
  if (dep < -5)
    return 'text-orange-700 hover:text-orange-900 bg-orange-50 hover:bg-orange-100 border-orange-200 hover:border-orange-300'; // Shortage
  if (dep <= 5)
    return 'text-gray-800 hover:text-black bg-white hover:bg-gray-50 border-slate-300 hover:border-slate-400'; // Normal
  if (dep <= 30)
    return 'text-green-700 hover:text-green-900 bg-green-50 hover:bg-green-100 border-green-200 hover:border-green-300'; // Overage
  return 'text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border-blue-200 hover:border-blue-300'; // Abnormal Overage (> 30)
};

const formatDateYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
};

const DataDetailsPage = () => {
  const { dataType, cycleTime } = useParams(); // cycleTime e.g., "00z", "12z"
  const location = useLocation();

  // --- Date Objects ---
  const yesterdayDateObj = new Date();
  yesterdayDateObj.setDate(yesterdayDateObj.getDate() - 1);

  const todayDateObj = new Date();

  // --- Parse Hours from Parameters ---
  // Hour string from the current page's cycleTime (e.g., "00", "12")
  const hourStringFromCycleTime = cycleTime ? cycleTime.substring(0, 2) : '00';
  // Numerical hour of the current page's cycle (e.g., 0, 12)
  const currentCycleHour = cycleTime
    ? parseInt(cycleTime.substring(0, 2), 10)
    : NaN;

  // Get highlight parameter from URL (e.g., "00z", "18z")
  const queryParams = new URLSearchParams(location.search);
  const highlightParam = queryParams.get('highlight');
  let highlightHour = NaN; // Default to NaN if not present or invalid
  if (highlightParam) {
    const parsedHighlightHour = parseInt(highlightParam.substring(0, 2), 10);
    if (!isNaN(parsedHighlightHour)) {
      highlightHour = parsedHighlightHour;
    }
  }

  // --- Determine the Chosen Date based on the new rule ---
  // Default to yesterday's date object
  let chosenDateObj = yesterdayDateObj;

  // If highlightParam and cycleTime were validly parsed to numerical hours, compare them
  if (!isNaN(highlightHour) && !isNaN(currentCycleHour)) {
    if (highlightHour >= currentCycleHour) {
      chosenDateObj = todayDateObj; // Use today if highlightedCycle is >= currentCycle
    }
  }
  // If highlightParam is missing/invalid, or currentCycleHour is invalid, chosenDateObj remains yesterdayDateObj.

  // Format the chosen date to YYYYMMDD string
  const chosenDateYYYYMMDD = formatDateYYYYMMDD(chosenDateObj);

  // --- Date strings for various parts of the page, derived from chosenDateYYYYMMDD ---
  // Date for page title subtitle
  const dateStringForTitle = chosenDateYYYYMMDD;

  // DateTime string for the grid of `currentData` image links (YYYYMMDDHH)
  const dateTimeStringForCurrentDataImages = `${chosenDateYYYYMMDD}${hourStringFromCycleTime}`;

  // DateTime string for PDF links (YYYYMMDDHH) - also follows the new rule
  const pdfDateTimeString = `${chosenDateYYYYMMDD}${hourStringFromCycleTime}`;

  // --- Display Strings ---
  const displayDataType = dataType
    ? dataType.charAt(0).toUpperCase() + dataType.slice(1)
    : 'Unknown';
  const displayCycleTime = cycleTime ? cycleTime.toUpperCase() : 'Unknown';

  // --- Data ---
  const currentData = sampleBufrData; // Using the placeholder
  const loading = false;
  const error = null;

  // --- URLs ---
  // URL for the main plot image on the right. Its structure doesn't include YYYYMMDD.
  const plotImageUrl = `${baseUrl}/data-monitoring/image/PLOT/percentage_${hourStringFromCycleTime}_${dataType}.png`;

  // URLs for PDF links, now using the `pdfDateTimeString` derived from `chosenDateObj`
  const receptionStatusPdfUrl = `${baseUrl}/data-monitoring/image/update-assimlation/${pdfDateTimeString}/Reception_Status_Update.pdf`;
  const assimilationStatusPdfUrl = `${baseUrl}/data-monitoring/image/update-assimlation/${pdfDateTimeString}/Assimilation_Status_Update.pdf`;

  // --- Loading / Error / Validation ---
  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-xl font-semibold text-slate-700">
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
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            NGFS Dump Data Counts Time Series Plots
          </h1>
          {/* Subtitle now uses dateStringForTitle which reflects the chosenDateYYYYMMDD */}
          <h2 className="text-indigo-700 mt-2 text-xl font-medium sm:text-2xl">
            Valid {displayCycleTime} {displayDataType} Cycle (Date:{' '}
            {dateStringForTitle})
          </h2>
        </header>

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
            to="#" // Placeholder
            className="font-medium text-blue-700 hover:text-blue-900 hover:underline"
          >
            GFS Summary
          </Link>
          <span className="text-gray-400" aria-hidden="true">
            |
          </span>
          {/* PDF links now use URLs derived from chosenDateObj */}
          <a
            href={receptionStatusPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-700 hover:text-blue-900 hover:underline"
          >
            Reception Status
          </a>
          <span className="text-gray-400" aria-hidden="true">
            |
          </span>
          <a
            href={assimilationStatusPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-700 hover:text-blue-900 hover:underline"
          >
            Assimilation Departure Difference
          </a>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
              <h3 className="text-gray-800 mb-5 text-center text-base font-semibold">
                View Time Series Plot (opens image in new tab)
              </h3>
              <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9">
                {currentData.map((item) => {
                  // Image URLs use dateTimeStringForCurrentDataImages derived from chosenDateObj
                  const imageUrl = `${baseUrl}/data-monitoring/image/${dataType}/${dateTimeStringForCurrentDataImages}/${item.type}.png`;
                  return (
                    <a
                      key={item.type}
                      href={imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`View plot for ${item.type}`}
                      className={`focus:ring-indigo-500 flex h-10 items-center justify-center rounded-md border px-1 text-center text-xs font-semibold shadow-sm transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 sm:h-11 sm:text-sm ${getColorForDeparture(
                        item.departure
                      )}`}
                    >
                      {item.type}
                    </a>
                  );
                })}
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
              <h3 className="text-gray-800 mb-5 text-center text-base font-semibold">
                Explanation of Colors (based on Departure %)
              </h3>
              <div className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <span className="border-gray-300 mt-0.5 h-4 w-4 flex-shrink-0 rounded border bg-red-600"></span>
                  <div>
                    <strong className="font-semibold text-red-700">
                      &lt; -30%:
                    </strong>{' '}
                    Abnormal Shortage (Investigate)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="border-gray-300 mt-0.5 h-4 w-4 flex-shrink-0 rounded border bg-orange-500"></span>
                  <div>
                    <strong className="font-semibold text-orange-700">
                      -30% to -5%:
                    </strong>{' '}
                    Shortage (Monitor)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="border-gray-400 mt-0.5 h-4 w-4 flex-shrink-0 rounded border bg-white"></span>
                  <div>
                    <strong className="text-gray-800 font-semibold">
                      -5% to +5%:
                    </strong>{' '}
                    Normal Counts
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="border-gray-300 mt-0.5 h-4 w-4 flex-shrink-0 rounded border bg-green-600"></span>
                  <div>
                    <strong className="font-semibold text-green-700">
                      +5% to +30%:
                    </strong>{' '}
                    Overage (Monitor)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="border-gray-300 mt-0.5 h-4 w-4 flex-shrink-0 rounded border bg-blue-600"></span>
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
                  to={`${baseUrl}/data-monitoring/information_pdf/ColorCoding_Criteria.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  More Information
                </Link>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-lg">
              <h3 className="text-gray-800 mb-4 text-base font-semibold">
                Bufr Dump: {displayCycleTime} ({displayDataType}) Plot
              </h3>
              <div className="flex min-h-[200px] items-center justify-center overflow-hidden rounded-md border border-slate-300 bg-slate-50">
                <img
                  src={plotImageUrl} // This URL structure is not affected by chosenDateObj
                  alt={`BUFR Dump Plot for ${displayCycleTime} ${displayDataType}`}
                  className="h-auto w-full max-w-full object-contain"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.style.display = 'none';
                    const errorDiv = document.createElement('div');
                    errorDiv.textContent = 'Plot image not available.';
                    errorDiv.className = 'p-4 text-sm text-red-600';
                    currentTarget.parentNode.appendChild(errorDiv);
                  }}
                />
              </div>
            </div>
          </aside>
        </div>

        <footer className="mt-12 border-t border-slate-300 pt-8 text-center">
          <p className="mx-auto max-w-2xl text-xs text-slate-500">
            Disclaimer : NCMRWF is a Research and Development Organization. The
            products and the conclusion drawn thereof are based on Numerical
            Weather Prediction(NWP) models being run at NCMRWF.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DataDetailsPage;
