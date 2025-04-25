import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi'; // Only needed for top-level error

// Import Config
import {
  DAILY_STATS,
  DAILY_VARIABLES,
  DAILY_TIMES,
  WEEKLY_HPA_LEVELS,
  WEEKLY_VARIABLES,
  WEEKLY_REGIONS,
  IMAGE_API_BASE_URL,
  NUM_DATE_OPTIONS,
} from '../../../../data/ncmrwfConfig'; // Adjust path as needed

// Import Utils
import { generateDateOptions } from '../../../../utils/dateUtils'; // Adjust path
import { getPlaceholderUrl } from '../../../../utils/imageUtils'; // Needed for modal fallback only now

// Import Components
import HeaderControls from '../../../common/HeaderControls'; // Adjust path
import ChartTable from '../ChartTable'; // Adjust path
import ImageModal from '../../../common/ImageModal'; // Adjust path
import LoadingIndicator from '../../../common/LoadingIndicator'; // Adjust path
import ErrorDisplay from '../../../common/ErrorDisplay'; // Adjust path
import NoDataMessage from '../../../common/NoDataMessage'; // Adjust path

// --- Main Page Component ---

const NcmrwfAnalysisVerification = () => {
  // --- Hooks ---
  const { viewType } = useParams(); // 'daily' or 'weekly'
  const navigate = useNavigate();
  const isValidViewType = viewType === 'daily' || viewType === 'weekly';

  // --- State ---
  const dateOptions = useMemo(() => generateDateOptions(NUM_DATE_OPTIONS), []);
  const [selectedDate, setSelectedDate] = useState(dateOptions[0]?.value || '');
  // State specific to view types
  const [selectedTime, setSelectedTime] = useState(DAILY_TIMES[0]); // Default for daily
  const [selectedRegion, setSelectedRegion] = useState(
    WEEKLY_REGIONS[0]?.id || ''
  ); // Default for weekly

  const [chartData, setChartData] = useState([]); // Structure depends on viewType
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChartInfo, setSelectedChartInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Initialize error state

  // --- Effect for Initial Validation and Clearing State ---
  useEffect(() => {
    if (!isValidViewType) {
      setError(
        `Invalid view type specified: "${viewType}". Use 'daily' or 'weekly'.`
      );
      setChartData([]); // Clear data if view type is invalid
    } else {
      setError(null); // Clear error if view type becomes valid
    }
  }, [viewType, isValidViewType]);

  // --- Effect to Generate Chart Data ---
  useEffect(() => {
    // Reset state if viewType is invalid (already handled above, but double-check)
    if (!isValidViewType) {
      // setError is handled in the previous effect
      setChartData([]); // Ensure data is empty
      return;
    }

    // Skip if required inputs are missing or still loading initial options
    if (
      !selectedDate ||
      (viewType === 'daily' && !selectedTime) ||
      (viewType === 'weekly' && !selectedRegion) ||
      dateOptions.length === 0 // Ensure date options are loaded
    ) {
      setChartData([]); // Clear data if inputs incomplete
      return;
    }

    setIsLoading(true);
    setError(null); // Clear previous errors before fetching/processing

    // Simulate async fetch/processing if needed, otherwise just process
    // Use a try...finally block for robust loading state management
    try {
      const urlDate = selectedDate; // Date part for URL (already YYYY-MM-DD)
      let processedData = [];

      if (viewType === 'daily') {
        // --- Daily Data Processing ---
        const urlTime = selectedTime;
        processedData = DAILY_STATS.map((stat) => {
          const charts = {};
          DAILY_VARIABLES.forEach((variable) => {
            const url = `${IMAGE_API_BASE_URL}/Data/mihir/${urlDate}/${urlTime}/NCMRWF-Analysis-Verification/Daily/${stat.id}_${variable.id}_GDAS_NCUM.jpeg`;
            charts[variable.id] = url;
          });
          return { id: stat.id, label: stat.label, charts: charts };
        });
      } else if (viewType === 'weekly') {
        // --- Weekly Data Processing ---
        processedData = WEEKLY_HPA_LEVELS.map((hpaLevel) => {
          const charts = {};
          WEEKLY_VARIABLES.forEach((variable) => {
            const url = `${IMAGE_API_BASE_URL}/Data/mihir/${urlDate}/NCMRWF-Analysis-Verification/Weekly/${selectedRegion}_${variable.id}${hpaLevel}.jpeg`;
            charts[variable.id] = url;
          });
          return {
            id: hpaLevel,
            label: `${hpaLevel}hPa`,
            charts: charts,
          };
        });
      }

      setChartData(processedData);
    } catch (err) {
      console.error('Error processing chart data:', err);
      setChartData([]); // Clear data on error
      setError('Failed to prepare chart data URLs.'); // Set specific error
    } finally {
      setIsLoading(false); // Ensure loading state is turned off
    }
    // Dependencies: Recalculate when viewType or relevant selections change
  }, [
    viewType,
    selectedDate,
    selectedTime,
    selectedRegion,
    isValidViewType,
    dateOptions,
  ]); // Added dateOptions dependency

  // --- Event Handlers ---
  const handleDateChange = (event) => setSelectedDate(event.target.value);
  const handleTimeChange = (event) => setSelectedTime(event.target.value);
  const handleRegionChange = (event) => setSelectedRegion(event.target.value);
  const handleBack = () => navigate(-1);

  const handleChartClick = (context, url) => {
    setSelectedChartInfo({
      viewType: viewType, // Pass viewType for modal title logic
      url: url,
      ...context, // Spread context (labels, date, time, level, region etc.)
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChartInfo(null);
  };

  // --- Render Logic ---

  // Early return for invalid view type (handled by error state now)
  // But keep a top-level check if you prefer immediate feedback
  if (!isValidViewType) {
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
      <HeaderControls
        viewType={viewType}
        selectedDate={selectedDate}
        dateOptions={dateOptions}
        onDateChange={handleDateChange}
        selectedTime={selectedTime} // Pass even if undefined for weekly
        onTimeChange={handleTimeChange}
        selectedRegion={selectedRegion} // Pass even if undefined for daily
        onRegionChange={handleRegionChange}
        onBack={handleBack}
        isLoading={isLoading}
      />

      {/* Content Area: Displays Error, Loading, No Data, or Chart Table */}
      <div className="min-h-[300px]">
        {isLoading ? (
          <LoadingIndicator />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : chartData.length === 0 ? (
          <NoDataMessage />
        ) : (
          <ChartTable
            viewType={viewType}
            chartData={chartData}
            onChartClick={handleChartClick}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedRegion={selectedRegion}
          />
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        chartInfo={selectedChartInfo}
      />
    </div>
  );
};

export default NcmrwfAnalysisVerification;
