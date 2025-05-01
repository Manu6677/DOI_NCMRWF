// src/pages/ModelMetPage.jsx
import React, { useState, useMemo } from 'react';
// Ensure ChartCardRow import path is correct
import ChartCardRow from '../../../common/ChartCardRow';
import { FiFileText } from 'react-icons/fi'; // Removed unused Loader, AlertCircle

// --- Base Data Definition & Constants ---
const baseChartDefinition = [
  {
    id: 'row1',
    parameterLabel: 'T2>=20 mm, R1=2gs',
    modelSetLabel: 'NCUM, UKMO, IMDGFS, NCEPGFS',
    modelSetSlug: 'ncum-ukmo_imdgfs-ncepgfs',
    availability: [
      { isNA: false },
      { isNA: false },
      { isNA: false },
      { isNA: false },
      { isNA: false },
    ],
  },
  {
    id: 'row2',
    parameterLabel: null,
    modelSetLabel: 'NCUM, UMREG',
    modelSetSlug: 'ncum-umreg',
    availability: [
      { isNA: false },
      { isNA: false },
      { isNA: false },
      { isNA: false },
      { isNA: false },
    ],
  },
];
const days = ['Day1', 'Day2', 'Day3', 'Day4', 'Day5'];
const IMAGE_API_BASE_URL =
  process.env.REACT_APP_ASSETS_BASE_URL_NEW_DIR ||
  'https://nwp.ncmrwf.gov.in/Data/mihir';
// --- End Base Data Definition ---

// --- Helper Functions ---
const indexToHour = (index) => (index + 1) * 24;
// Helper function to format Date object to 'YYYY-MM-DD' string
const formatDate = (date) => date.toISOString().split('T')[0];
// --- End Helper Functions ---

// --- Main Component ---
const ModelMet = () => {
  // --- Calculate Date Strings ---
  // Calculate these strings once on component render
  const todayDate = new Date();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(todayDate.getDate() - 1);

  const todayString = formatDate(todayDate); // Today's date in 'YYYY-MM-DD'
  const yesterdayString = formatDate(yesterdayDate); // Yesterday's date in 'YYYY-MM-DD'
  // --- End Date Calculations ---

  // Default selected date to today's string
  const [selectedDate, setSelectedDate] = useState(todayString);

  // Calculate processed chart data using useMemo based on selectedDate
  const chartData = useMemo(() => {
    try {
      return baseChartDefinition.map((row) => {
        const generatedCharts = row.availability.map((dayInfo, index) => {
          if (dayInfo.isNA) {
            return { url: null, isNA: true };
          } else {
            const hour = indexToHour(index);
            const modelSlug = row.modelSetSlug;
            const url = `${IMAGE_API_BASE_URL}/${selectedDate}/NCUM-Mode/Mode/mode_${modelSlug}_${hour}hr.png`;
            return { url: url, isNA: false };
          }
        });
        return { ...row, charts: generatedCharts };
      });
    } catch (err) {
      console.error('Error processing chart data:', err);
      return [];
    }
  }, [selectedDate]); // Recalculate only when selectedDate changes

  // Handler for date input change
  const handleDateChange = (event) => {
    const newDate = event.target.value;
    // Optional: Add extra validation in case min/max is bypassed (e.g., manual typing)
    if (newDate === todayString || newDate === yesterdayString) {
      setSelectedDate(newDate);
    } else {
      // Reset to today if an invalid date somehow gets selected
      console.warn(
        `Invalid date selection attempted: ${newDate}. Resetting to today.`
      );
      setSelectedDate(todayString);
    }
  };

  // Optional: Handler for chart clicks (if needed later)
  const handleChartClick = (chartInfo) => {
    console.log('Chart clicked (modal removed):', chartInfo);
    // Implement modal logic here if you bring it back
  };

  return (
    <div className="space-y-6 rounded-lg bg-slate-50 p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <h2 className="text-xl font-semibold text-slate-800 md:text-2xl">
          Mode MET Charts
        </h2>
        {/* Date Input with min/max attributes */}
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
            min={yesterdayString} // <<< Set minimum selectable date
            max={todayString} // <<< Set maximum selectable date
            className="appearance-none rounded border-slate-300 p-1.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500" // added appearance-none
            aria-label="Select chart date (Today or Yesterday only)"
          />
        </div>
      </div>

      {/* Content Area: Render Chart Cards or No Data Message */}
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center space-x-2 py-10 text-slate-500">
          <FiFileText className="size-6" />
          <span>No chart data available for {selectedDate}.</span>
        </div>
      ) : (
        <div className="space-y-4">
          {chartData.map((row) => (
            <ChartCardRow
              key={row.id}
              rowData={row}
              days={days}
              // Pass handler if ChartCardRow button should do something
              // onChartClick={handleChartClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelMet;
