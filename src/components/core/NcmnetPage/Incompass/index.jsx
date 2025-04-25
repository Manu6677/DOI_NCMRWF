import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Adjust the path based on your project structure
import ChartCardRow from '../../../common/ChartCardRow';
import {
  FiFileText,
  FiAlertCircle,
  FiImage,
  FiX,
  FiHelpCircle,
} from 'react-icons/fi';

// --- Configuration for Different Chart Types ---

const CHART_CONFIGS = {
  vimc: {
    HPA_LEVELS: ['700'], // HPA levels for VIMC
    URL_PATH_SEGMENT: 'Vertically-Integrated-Moisture-Convergence',
    FILENAME_PREFIX: 'vmconv',
    TITLE: 'Vertically Integrated Moisture Convergence',
    MODAL_PREFIX: 'VIMC',
  },
  vimt: {
    HPA_LEVELS: ['500', '700'], // HPA levels for VIMT
    URL_PATH_SEGMENT: 'Vertically-Integrated-Moisture-Transport',
    FILENAME_PREFIX: 'vimt',
    TITLE: 'Vertically Integrated Moisture Transport',
    MODAL_PREFIX: 'VIMT',
  },
  pwc: {
    HPA_LEVELS: ['300'], // HPA levels for VIMT
    URL_PATH_SEGMENT: 'Precipitable-Water',
    FILENAME_PREFIX: 'pwc',
    TITLE: 'VPrecipitable-Water Charts',
    MODAL_PREFIX: 'PWC',
  },
  mt: {
    HPA_LEVELS: ['700', '850', '925'], // HPA levels for VIMT
    URL_PATH_SEGMENT: 'Moisture-Transport',
    FILENAME_PREFIX: 'mt',
    TITLE: 'Moisture Transport',
    MODAL_PREFIX: 'MT',
  },
};

/**
 * Defines the forecast hours (relative to the selected date's 00Z run) common to these charts.
 */
const FORECAST_HOURS = [0, 24, 48, 72, 96, 120];

/**
 * Maps the forecast hour (key) to the corresponding index used in the image filename (value).
 */
const hourToIndexMap = {
  0: 0,
  24: 1,
  48: 2,
  72: 3,
  96: 4,
  120: 5,
};

/**
 * Base URL for fetching chart images. Reads from environment variables with a fallback.
 */
const IMAGE_API_BASE_URL =
  process.env.REACT_APP_ASSETS_BASE_URL_NEW || 'https://ncmrwf.gov.in'; // Example fallback

// --- Helper Functions --- (formatDateYYYYMMDD, generateDateOptions, getPlaceholderUrl remain the same)
const formatDateYYYYMMDD = (date) => {
  if (!(date instanceof Date)) {
    /* ... error handling ... */
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const generateDateOptions = (numberOfDays = 3) => {
  const options = [];
  const today = new Date();
  for (let i = 0; i < numberOfDays; i++) {
    /* ... date option generation ... */
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const value = formatDateYYYYMMDD(date);
    let label = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    if (i === 0) label = `Today (${label})`;
    else if (i === 1) label = `Yesterday (${label})`;
    options.push({ value, label });
  }
  return options;
};

const getPlaceholderUrl = (width = 100, height = 75, text = 'Error') => {
  return `https://placehold.co/${width}x${height}/e2e8f0/94a3b8?text=${encodeURIComponent(text)}`;
};

// --- Reusable Image Modal Component --- (Accepts titlePrefix)

const ImageModal = ({ isOpen, onClose, chartInfo, titlePrefix = 'Chart' }) => {
  // Added titlePrefix prop
  if (!isOpen || !chartInfo) return null;

  // Construct title using the provided prefix
  const modalTitle = `${titlePrefix} - ${chartInfo.modelSetLabel || '?hPa'} - ${chartInfo.dayLabel || '? Hrs'}`;

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
          <FiX className="size-5" />
        </button>
        <h3
          id="image-modal-title"
          className="mb-3 border-b border-slate-200 pb-2 text-lg font-semibold text-slate-800"
        >
          {modalTitle}
        </h3>
        <div className="overflow-hidden rounded">
          <img
            src={chartInfo.url}
            alt={`Chart for ${modalTitle}`}
            className="block h-auto max-h-[80vh] w-full rounded object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = getPlaceholderUrl(600, 400, 'Image Not Found');
              e.target.alt = `Error loading chart for ${modalTitle}`;
            }}
          />
        </div>
      </div>
    </div>
  );
};
// --- End Image Modal ---

// --- Main Unified Page Component: IncompassChartPage ---

/**
 * Displays INCOMPASS charts (VIMC or VIMT) based on a URL parameter.
 * Organizes charts by HPA level (rows) and Forecast Hour (columns).
 * Allows selection of the forecast date.
 */
const IncompassChartPage = () => {
  // --- Hooks ---
  const { chartType } = useParams(); // Get 'vimc' or 'vimt' from URL parameter :chartType
  const navigate = useNavigate(); // Hook for navigation

  // --- Dynamic Configuration Selection ---
  // Memoize the selected config to avoid recalculating on every render
  const currentConfig = useMemo(() => {
    const config = CHART_CONFIGS[chartType?.toLowerCase()]; // Ensure lowercase matching
    if (!config) {
      console.error(`Invalid chartType parameter: ${chartType}`);
    }
    return config;
  }, [chartType]);

  // --- State ---
  const dateOptions = useMemo(() => generateDateOptions(3), []);
  const [selectedDate, setSelectedDate] = useState(dateOptions[0]?.value || '');
  const [chartData, setChartData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChartInfo, setSelectedChartInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // Initialize error based on invalid chartType
  const [error, setError] = useState(
    !currentConfig
      ? `Invalid chart type specified in URL: "${chartType}". Valid types are: ${Object.keys(CHART_CONFIGS).join(', ')}`
      : null
  );

  // --- Effect to Generate Chart Data ---
  useEffect(() => {
    // Skip if date is missing OR if the config is invalid (error already set)
    if (!selectedDate || !currentConfig) {
      setChartData([]); // Clear data if config is invalid
      return;
    }

    setIsLoading(true);
    setError(null); // Clear previous errors (if any)

    try {
      const urlDate = selectedDate;
      // Use HPA levels, path segment, and filename prefix from the selected config
      const { HPA_LEVELS, URL_PATH_SEGMENT, FILENAME_PREFIX } = currentConfig;

      const processedData = HPA_LEVELS.map((hpa) => {
        const generatedCharts = FORECAST_HOURS.map((hour) => {
          const indexN = hourToIndexMap[hour];

          if (indexN === undefined) {
            console.warn(`No index mapping found for forecast hour: ${hour}`);
            return {
              url: getPlaceholderUrl(100, 75, `Invalid ${hour}hr`),
              dayLabel: `${String(hour).padStart(2, '0')} Hrs`,
              isNA: true,
            };
          }

          // Construct the URL using dynamically selected config values
          const url = `${IMAGE_API_BASE_URL}/Data/${urlDate}/INCOMPASS/${URL_PATH_SEGMENT}/${FILENAME_PREFIX}${indexN}_${hpa}.png`;

          return {
            url: url,
            dayLabel: `${String(hour).padStart(2, '0')} Hrs`,
            isNA: false,
          };
        });

        return {
          id: hpa,
          modelSetLabel: `${hpa}hPa`,
          parameterLabel: null,
          charts: generatedCharts,
        };
      });

      setChartData(processedData);
    } catch (err) {
      console.error('Error processing chart data:', err);
      setChartData([]);
      setError('Failed to prepare chart data URLs.');
    } finally {
      setIsLoading(false);
    }
    // Dependencies: Recalculate if date or the selected chart configuration changes
  }, [selectedDate, currentConfig]);

  // --- Event Handlers --- (remain the same)
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleChartClick = (chartInfo) => {
    setSelectedChartInfo(chartInfo);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChartInfo(null);
  };

  // --- Column Headers --- (remain the same)
  const columnLabels = useMemo(
    () => FORECAST_HOURS.map((hr) => `${String(hr).padStart(2, '0')} Hrs`),
    []
  );

  // --- Early exit for Invalid Chart Type ---
  if (!currentConfig) {
    return (
      <div className="space-y-6 rounded-lg bg-slate-50 p-4 shadow-sm md:p-6">
        <div className="flex items-center space-x-3 rounded border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          <FiAlertCircle className="size-5 shrink-0" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  // --- Render Logic ---
  return (
    <div className="space-y-6 rounded-lg bg-slate-50 p-4 shadow-sm md:p-6">
      {/* Header Section: Title (Dynamic) and Date Selector */}
      <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
        {/* Use title from the selected configuration */}
        <h2 className="text-xl font-semibold text-slate-800 md:text-2xl">
          {currentConfig.TITLE}
        </h2>
        {/* Date Selector Input Group */}
        <div className="flex w-full items-center space-x-2 sm:w-auto">
          <label
            htmlFor="dateSelect"
            className="flex-shrink-0 text-sm font-medium text-slate-700"
          >
            Select Date:
          </label>
          <select
            id="dateSelect"
            value={selectedDate}
            onChange={handleDateChange}
            className="w-full rounded border-slate-300 p-1.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:w-auto"
            aria-label="Select chart date"
            disabled={isLoading}
          >
            {dateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {' '}
                {option.label}{' '}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Area: Displays Error, Loading, No Data, or Chart Rows */}
      <div className="min-h-[200px]">
        {error && !currentConfig && /* Error handled above */ null}
        {error && currentConfig /* Display processing errors */ && (
          <div className="flex items-center space-x-3 rounded border border-red-300 bg-red-50 p-4 text-sm text-red-700">
            <FiAlertCircle className="size-5 shrink-0" />
            <span>Error: {error}</span>
          </div>
        )}
        {isLoading && (
          <div className="flex items-center justify-center">
            <svg className="animate-spin"></svg>
            <span>Loading chart data...</span>
          </div>
        )}
        {!isLoading && !error && chartData.length === 0 && (
          <div className="flex items-center justify-center">
            <FiFileText />
            <span>No chart data available for {selectedDate}.</span>
          </div>
        )}
        {!isLoading && !error && chartData.length > 0 && (
          <div className="space-y-5">
            {/* Render rows using HPA levels from the selected config */}
            {chartData.map((row) => (
              <ChartCardRow
                key={row.id}
                rowData={row}
                days={columnLabels}
                onChartClick={handleChartClick}
                rowIcon={FiImage}
              />
            ))}
          </div>
        )}
      </div>

      {/* Render the Image Modal, passing the dynamic title prefix */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        chartInfo={selectedChartInfo}
        titlePrefix={currentConfig.MODAL_PREFIX} // Pass dynamic prefix
      />
    </div>
  );
};

// Export the unified component
export default IncompassChartPage;
