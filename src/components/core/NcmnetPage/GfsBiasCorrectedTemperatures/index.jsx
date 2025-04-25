import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Import Config
import {
  IMAGE_API_BASE_URL,
  PRODUCT_FOLDER,
  CHART_TYPES,
  FORECAST_DAYS,
  NUM_DATE_OPTIONS,
} from '../../../../data/gfsTempConfig';

// Import Utils
import {
  generateDateOptions,
  formatDateYYYYMMDD,
} from '../../../../utils/dateUtils';

// Import UI Components
import LoadingIndicator from '../../../common/LoadingIndicator';
import ErrorDisplay from '../../../common/ErrorDisplay';
import NoDataMessage from '../../../common/NoDataMessage';

// Import Page Specific Components
import SimpleHeaderControls from './SimpleHeaderControls';
import ChartGrid from './ChartGrid';
import ImageModal from '../../../common/ImageModal';

// --- Main Page Component ---

const GfsBiasCorrectedTemperatures = () => {
  // --- Hooks ---
  const { mode } = useParams(); // 'forecast' or 'verification'
  const navigate = useNavigate();
  const isValidMode = mode === 'forecast' || mode === 'verification';

  // --- State ---
  const dateOptions = useMemo(() => generateDateOptions(NUM_DATE_OPTIONS), []);
  const [selectedDate, setSelectedDate] = useState(dateOptions[0]?.value || '');
  const [chartData, setChartData] = useState([]); // Format: [{ type, label, charts: {day: url} }, ...]
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChartInfo, setSelectedChartInfo] = useState(null); // For modal
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Effect for Initial Validation and Clearing State ---
  useEffect(() => {
    if (!isValidMode) {
      setError(
        `Invalid mode specified: "${mode}". Use 'forecast' or 'verification'.`
      );
      setChartData([]); // Clear data
    } else {
      setError(null); // Clear error if mode becomes valid
    }
  }, [mode, isValidMode]);

  // --- Effect to Generate Chart URLs ---
  useEffect(() => {
    // Exit if mode is invalid or date not selected
    if (!isValidMode || !selectedDate || dateOptions.length === 0) {
      setChartData([]); // Ensure data is clear if inputs invalid/missing
      return;
    }

    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      const urlDate = selectedDate; // Already YYYY-MM-DD
      const modePath = mode === 'forecast' ? 'Forecast' : 'Verification';
      const basePath = `${IMAGE_API_BASE_URL}/Data/mihir/${urlDate}/${PRODUCT_FOLDER}/${modePath}`; // Ensure no double slash

      const processedData = CHART_TYPES.map((typeInfo) => {
        const charts = {};
        FORECAST_DAYS.forEach((day) => {
          // Construct filename based on mode
          const fileName =
            mode === 'forecast'
              ? `gfs_${typeInfo.id}_bcda0.30_day${day}.png`
              : `vrfy_gfs_${typeInfo.id}_bcda0.30_day${day}.png`;
          charts[day] = `${basePath}/${fileName}`;
        });
        return {
          type: typeInfo.id,
          label: typeInfo.label,
          charts: charts, // { 1: url, 2: url, ... }
        };
      });

      setChartData(processedData);
    } catch (err) {
      console.error('Error processing chart URLs:', err);
      setChartData([]);
      setError('Failed to prepare chart data URLs.');
    } finally {
      setIsLoading(false);
    }
  }, [mode, selectedDate, isValidMode, dateOptions]); // Rerun when mode or date changes

  // --- Event Handlers ---
  const handleDateChange = (event) => setSelectedDate(event.target.value);
  const handleBack = () => navigate(-1);

  const handleChartClick = (context, url) => {
    // Enhance context for the modal title
    const modalContext = {
      ...context, // Includes type, label, day, date, mode
      viewType: mode, // Use 'mode' as 'viewType' for modal consistency if needed
      // Add more specific labels if desired
      titleDetail: `${context.label} - Day ${context.day}`,
    };
    setSelectedChartInfo({
      url: url,
      ...modalContext,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChartInfo(null);
  };

  // --- Dynamic Titles ---
  const pageTitle = `GFS Bias Corrected Temps (${mode === 'forecast' ? 'Forecast' : 'Verification'})`;
  const modalTitleGenerator = (info) => {
    if (!info) return 'Chart';
    // Example: "Forecast: Min Temperature - Day 3 (Date: 2025-04-21)"
    return `${info.mode === 'forecast' ? 'Forecast' : 'Verification'}: ${info.label || '?'} - Day ${info.day || '?'} (Date: ${info.date || '?'})`;
  };

  // --- Render Logic ---

  if (!isValidMode) {
    return (
      <div className="space-y-6 rounded-lg bg-slate-50 p-4 shadow-sm md:p-6">
        <ErrorDisplay message={error} />
        {/* Optional: Add a link back or to a valid view */}
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-lg bg-slate-50 p-4 shadow-sm md:p-6">
      {/* Header Section */}
      <SimpleHeaderControls
        title={pageTitle}
        selectedDate={selectedDate}
        dateOptions={dateOptions}
        onDateChange={handleDateChange}
        onBack={handleBack}
        isLoading={isLoading}
      />

      {/* Content Area: Loading, Error, No Data, or Chart Grid */}
      <div className="min-h-[200px]">
        {isLoading ? (
          <LoadingIndicator />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : chartData.length === 0 && !isLoading ? ( // Check !isLoading to avoid brief flash
          <NoDataMessage
            message={`No ${mode} data found for ${selectedDate}.`}
          />
        ) : (
          <ChartGrid
            chartData={chartData}
            onChartClick={handleChartClick}
            mode={mode}
            selectedDate={selectedDate}
          />
        )}
      </div>

      {/* Reusable Image Modal - Adapt title generation if needed */}
      {/* Option 1: Let Modal handle title internally (if logic is updated) */}
      {/* <ImageModal
             isOpen={isModalOpen}
             onClose={closeModal}
             chartInfo={selectedChartInfo} // Pass the enhanced context
           /> */}

      {/* Option 2: Generate title here and pass it (requires modal modification) */}
      <ImageModalWithDynamicTitle // Assuming you modify ImageModal or create a wrapper
        isOpen={isModalOpen}
        onClose={closeModal}
        chartInfo={selectedChartInfo}
        titleGenerator={modalTitleGenerator} // Pass the generator function
      />
    </div>
  );
};

// --- Modified ImageModal or Wrapper (Example) ---
// You would place this in its own file or modify the existing ImageModal
const ImageModalWithDynamicTitle = ({
  isOpen,
  onClose,
  chartInfo,
  titleGenerator,
}) => {
  if (!isOpen || !chartInfo) return null;

  // Generate title using the passed generator function
  const modalTitle = titleGenerator
    ? titleGenerator(chartInfo)
    : 'Verification Chart';

  const handleImageErrorModal = (e) => {
    e.target.onerror = null;
    // Use a generic placeholder function or import getPlaceholderUrl
    e.target.src = `https://placehold.co/600x400/e2e8f0/94a3b8?text=${encodeURIComponent('Not Found')}`;
    e.target.alt = `Error loading chart for ${modalTitle}`;
  };

  // Rest of the ImageModal JSX structure... (copied from original ImageModal)
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
    >
      <div
        className="relative w-full max-w-4xl rounded-lg bg-white p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -right-2 -top-2 z-10 rounded-full bg-slate-600 p-1 text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          aria-label="Close image viewer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h3
          id="image-modal-title"
          className="mb-3 border-b border-slate-200 pb-2 text-lg font-semibold text-slate-800"
        >
          {modalTitle} {/* Use the dynamically generated title */}
        </h3>
        <div className="overflow-hidden rounded">
          <img
            src={chartInfo.url}
            alt={`Chart for ${modalTitle}`}
            className="block h-auto max-h-[80vh] w-full rounded object-contain"
            onError={handleImageErrorModal}
          />
        </div>
      </div>
    </div>
  );
};

export default GfsBiasCorrectedTemperatures;
