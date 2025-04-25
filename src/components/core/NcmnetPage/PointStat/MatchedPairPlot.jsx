import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChartCardRow from '../../../common/ChartCardRow';
import { FiFileText, FiAlertCircle } from 'react-icons/fi';

const parameters = [
  { id: 'tmp', label: 'TMP' },
  { id: 'rh', label: 'RH' },
  { id: 'ugrd', label: 'UGRD' },
  { id: 'vgrd', label: 'VGRD' },
  { id: 'hgt', label: 'HGT' },
];
const regions = [
  { id: 'IN', label: 'IN' },
  { id: 'NH', label: 'NH' },
  { id: 'SH', label: 'SH' },
  { id: 'TR', label: 'TR' },
  { id: 'GL', label: 'GL' },
];
const validHpaLevels = ['850', '700', '500']; // Validate against this
const IMAGE_API_BASE_URL =
  process.env.REACT_APP_ASSETS_BASE_URL_NEW_DIR || 'https://www.ncmrwf.gov.in';

// --- Helper Functions ---
// Formats Date object to 'YYYY-MM'
const formatYearMonth = (date) => date.toISOString().slice(0, 7);

// Gets the last day of a given year and month (1-12) -> returns YYYY-MM-DD string
const getLastDayOfMonthString = (year, month) => {
  if (month < 1 || month > 12) {
    throw new Error('Invalid month specified. Must be between 1 and 12.');
  }
  if (!Number.isInteger(year) || year < 1900 || year > 2200) {
    throw new Error('Invalid year specified.');
  }
  const date = new Date(year, month, 0);

  const lastDayYear = date.getFullYear();
  const lastDayMonth = date.getMonth() + 1;
  const lastDayDate = date.getDate(); // Day of the month (1-31)

  const formattedMonth = String(lastDayMonth).padStart(2, '0');
  const formattedDay = String(lastDayDate).padStart(2, '0');

  return `${lastDayYear}-${formattedMonth}-${formattedDay}`;
};

// Generates month options for the dropdown (current + past 3)
const generateMonthOptions = () => {
  const options = [];
  const date = new Date();
  for (let i = 0; i < 4; i++) {
    // Current month + 3 previous months
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed
    const value = formatYearMonth(date); // YYYY-MM
    const label = date.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    }); // e.g., "April 2025"
    options.push({ value, label });
    // Move to the previous month
    date.setMonth(month - 1);
  }

  return options;
};
// --- End Helper Functions ---

// --- Reusable Image Modal (Adjusted Title for Matched Pair Plots) ---
const ImageModal = ({ isOpen, onClose, chartInfo }) => {
  if (!isOpen || !chartInfo) return null;
  const getPlaceholderUrl = (width = 600, height = 400, text = 'Error') => {
    return `https://placehold.co/${width}x${height}/e2e8f0/94a3b8?text=${encodeURIComponent(text)}`;
  };

  // Construct title for Matched Pair Plot charts
  // chartInfo = { modelSetLabel (Param), dayLabel (Region), url, hpaLevel }
  const modalTitle = `${chartInfo.modelSetLabel || ''} - ${chartInfo.dayLabel || ''} (${chartInfo.hpaLevel || '?'}hPa)`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl rounded-lg bg-white p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -right-2 -top-2 rounded-full bg-slate-600 p-1 text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
          aria-label="Close image viewer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* Modal Title - Adjusted */}
        <h3 className="mb-2 text-lg font-semibold text-slate-800">
          {modalTitle}
        </h3>
        {/* Image */}
        <img
          src={chartInfo.url}
          alt={`Chart for ${modalTitle}`}
          className="h-auto max-h-[80vh] w-full rounded object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getPlaceholderUrl(600, 400, 'Image Error');
            e.target.alt = `Error loading chart for ${modalTitle}`;
          }}
        />
      </div>
    </div>
  );
};
// --- End Image Modal ---

// --- Main Page Component ---
const MatchedPairPlot = () => {
  // --- State ---
  const { hpaLevel } = useParams(); // Get hpaLevel from route: /.../:hpaLevel
  const navigate = useNavigate(); // For redirecting if hpaLevel is invalid

  const monthOptions = useMemo(() => generateMonthOptions(), []); // Generate options once
  const [selectedMonth, setSelectedMonth] = useState(
    monthOptions[0]?.value || ''
  ); // Default to current month 'YYYY-MM'
  const [chartData, setChartData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChartInfo, setSelectedChartInfo] = useState(null);
  const [isValidLevel, setIsValidLevel] = useState(false);
  const [error, setError] = useState(null); // For processing errors

  // --- Validate hpaLevel from Route ---
  useEffect(() => {
    if (validHpaLevels.includes(hpaLevel)) {
      setIsValidLevel(true);
    } else {
      setIsValidLevel(false);
      setError(
        `Invalid pressure level specified: ${hpaLevel}. Valid levels are ${validHpaLevels.join(', ')}.`
      );
      // Optionally redirect: navigate('/some-error-page');
    }
  }, [hpaLevel, navigate]);

  // --- Generate Chart Data with URLs ---
  useMemo(() => {
    if (!isValidLevel || !selectedMonth) {
      setChartData([]); // Clear data if level or month is invalid/not set
      return;
    }

    try {
      const [year, month] = selectedMonth.split('-').map(Number); // YYYY, MM (1-12)
      // Get the last day of the selected month in YYYY-MM-DD format

      const urlDate = getLastDayOfMonthString(year, month);

      const processedData = parameters.map((param) => {
        // Map regions to the chart objects
        const generatedCharts = regions.map((region) => {
          // Construct the dynamic URL
          const url = `${IMAGE_API_BASE_URL}/${urlDate}/Matched-Pair-Plot/${hpaLevel}hpa/${param.id.toUpperCase()}_${region.id.toUpperCase()}_${hpaLevel}.png`;
          return { url: url, isNA: false }; // Assume all available
        });

        return {
          id: param.id,
          modelSetLabel: param.label, // Use parameter label for the row
          parameterLabel: null,
          charts: generatedCharts,
        };
      });
      setChartData(processedData);
      setError(null); // Clear previous errors if processing succeeds
    } catch (err) {
      console.error('Error processing chart data:', err);
      setChartData([]);
      setError('Failed to prepare chart data.');
    }
    // Recalculate when selectedMonth or the validated hpaLevel changes
  }, [selectedMonth, hpaLevel, isValidLevel]);

  // --- Handlers ---
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleChartClick = (chartInfo) => {
    setSelectedChartInfo({ ...chartInfo, hpaLevel });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChartInfo(null);
  };

  // Render error early if level is invalid
  if (!isValidLevel && error) {
    return (
      <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
        <div className="flex items-center space-x-2 rounded border border-red-300 bg-red-50 p-4 text-red-700">
          <FiAlertCircle className="size-6 shrink-0" />
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-lg bg-slate-50 p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <h2 className="text-xl font-semibold text-slate-800 md:text-2xl">
          Matched Pair Plot Charts - {hpaLevel}hPa
        </h2>
        {/* Month Selector */}
        <div className="flex items-center space-x-2">
          <label
            htmlFor="monthSelect"
            className="text-sm font-medium text-slate-700"
          >
            Chart Month:
          </label>
          <select
            id="monthSelect"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="rounded border-slate-300 p-1.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            aria-label="Select chart month"
          >
            {monthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Area */}
      {/* Display error from processing if any */}
      {error && (
        <div className="flex items-center space-x-2 rounded border border-red-300 bg-red-50 p-4 text-red-700">
          <FiAlertCircle className="size-6 shrink-0" />
          <span>Error: {error}</span>
        </div>
      )}

      {/* Render Chart Cards or No Data Message */}
      {!error && chartData.length === 0 ? (
        <div className="flex items-center justify-center space-x-2 py-10 text-slate-500">
          <FiFileText className="size-6" />
          <span>No chart data generated for {selectedMonth}.</span>
        </div>
      ) : (
        !error && (
          <div className="space-y-4">
            {chartData.map((row) => (
              <ChartCardRow
                key={row.id}
                rowData={row}
                // Pass region labels as the 'days' prop for column headers
                days={regions.map((r) => r.label)}
                onChartClick={handleChartClick}
              />
            ))}
          </div>
        )
      )}

      {/* Render the Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        chartInfo={selectedChartInfo}
      />
    </div>
  );
};

export default MatchedPairPlot;
