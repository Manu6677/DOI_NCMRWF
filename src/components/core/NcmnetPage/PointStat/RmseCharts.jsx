// pages/RmseChartsPage.jsx
import { useState, useMemo } from 'react';
import ChartCardRow from '../../../common/ChartCardRow';
import { FiFileText } from 'react-icons/fi';

// --- Configuration Data ---
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

const IMAGE_API_BASE_URL =
  process.env.REACT_APP_ASSETS_BASE_URL_NEW_DIR || 'https://www.ncmrwf.gov.in';

// --- Helper Functions ---
const formatDate = (date) => date.toISOString().split('T')[0];

// --- Reusable Image Modal (Adjusted Title) ---
const ImageModal = ({ isOpen, onClose, chartInfo }) => {
  if (!isOpen || !chartInfo) return null;
  // Placeholder function if needed
  const getPlaceholderUrl = (width = 600, height = 400, text = 'Error') => {
    return `https://placehold.co/${width}x${height}/e2e8f0/94a3b8?text=${encodeURIComponent(text)}`;
  };

  // Construct title for RMSE charts
  const modalTitle = `${chartInfo.parameterLabel || chartInfo.modelSetLabel} - ${chartInfo.dayLabel}`; // Parameter is in modelSetLabel, Region is in dayLabel

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
const RmseCharts = () => {
  // --- State ---
  const todayDate = new Date();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(todayDate.getDate() - 1);
  const todayString = formatDate(todayDate);
  const yesterdayString = formatDate(yesterdayDate);

  // Default to yesterday? Or last available date? Let's use yesterday.
  const [selectedDate, setSelectedDate] = useState(yesterdayString);
  const [chartData, setChartData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChartInfo, setSelectedChartInfo] = useState(null);

  // --- Generate Chart Data with URLs ---
  useMemo(() => {
    try {
      const processedData = parameters.map((param) => {
        // Map regions to the chart objects needed by ChartCardRow
        const generatedCharts = regions.map((region) => {
          // Construct the dynamic URL based on pattern
          // Ensure PARAM and REGION are uppercase in the URL
          const url = `${IMAGE_API_BASE_URL}/${selectedDate}/RMSE/RMSE/${param.id.toUpperCase()}_${region.id.toUpperCase()}.png`;
          // Assume all charts are available unless an API provides availability info
          return { url: url, isNA: false };
        });

        // Structure data for ChartCardRow: use parameter label as the main row label
        return {
          id: param.id,
          modelSetLabel: param.label, // Pass parameter label here
          parameterLabel: null, // Not used in this context
          charts: generatedCharts,
        };
      });
      setChartData(processedData);
    } catch (err) {
      console.error('Error processing chart data:', err);
      setChartData([]); // Set empty on error
      // setError("Failed to prepare chart data."); // Set error state if using it
    }
  }, [selectedDate]); // Recalculate when selectedDate changes

  // --- Handlers ---
  const handleDateChange = (event) => {
    const newDate = event.target.value;
    if (newDate) {
      // Basic check if date is selected
      setSelectedDate(newDate);
    }
  };

  const handleChartClick = (chartInfo) => {
    // chartInfo contains: modelSetLabel (Param), parameterLabel (null), dayLabel (Region), url
    setSelectedChartInfo(chartInfo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChartInfo(null);
  };

  return (
    <div className="space-y-6 rounded-lg bg-slate-50 p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <h2 className="text-xl font-semibold text-slate-800 md:text-2xl">
          RMSE Charts
        </h2>
        {/* Date Input - Allow wider range or keep Today/Yesterday? Let's allow wider for now */}
        <div className="flex items-center space-x-2">
          <label
            htmlFor="chartDate"
            className="text-sm font-medium text-slate-700"
          >
            Chart Date:
          </label>
          <input
            type="date"
            id="chartDate"
            value={selectedDate}
            onChange={handleDateChange}
            className="appearance-none rounded border-slate-300 p-1.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            aria-label="Select chart date"
          />
        </div>
      </div>

      {/* Content Area */}
      {/* Add Loading/Error checks here if parameter/region definitions are fetched */}
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center space-x-2 py-10 text-slate-500">
          <FiFileText className="size-6" />
          <span>No chart data generated for {selectedDate}.</span>
        </div>
      ) : (
        <div className="space-y-4">
          {chartData.map((row) => (
            <ChartCardRow
              key={row.id}
              rowData={row}
              // Pass region labels as the 'days' prop for column headers within the card
              days={regions.map((r) => r.label)}
              onChartClick={handleChartClick}
            />
          ))}
        </div>
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

export default RmseCharts;
