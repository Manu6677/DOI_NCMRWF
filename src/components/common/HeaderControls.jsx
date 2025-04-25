import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { DAILY_TIMES, WEEKLY_REGIONS } from '../../data/ncmrwfConfig'; // Assuming config path

const HeaderControls = ({
  viewType,
  selectedDate,
  dateOptions,
  onDateChange,
  selectedTime,
  onTimeChange,
  selectedRegion,
  onRegionChange,
  onBack,
  isLoading,
}) => {
  const pageTitle =
    viewType === 'daily'
      ? `Daily Charts ${selectedDate}`
      : `Weekly Charts ${selectedDate}`;

  return (
    <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
      <h2 className="text-xl font-semibold text-slate-800 md:text-2xl">
        {pageTitle}
      </h2>
      {/* Controls: Date, Time/Region, Back Button */}
      <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center">
        {/* Date Selector */}
        <div className="flex items-center space-x-2">
          <label
            htmlFor="dateSelect"
            className="flex-shrink-0 text-sm font-medium text-slate-700"
          >
            Chart Date:
          </label>
          <select
            id="dateSelect"
            value={selectedDate}
            onChange={onDateChange}
            className="w-full rounded border-slate-300 p-1.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:w-auto"
            aria-label="Select chart date"
            disabled={isLoading}
          >
            {dateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Time Selector (Daily Only) */}
        {viewType === 'daily' && (
          <div className="flex items-center space-x-2">
            <label htmlFor="timeSelect" className="sr-only">
              Time:
            </label>
            <select
              id="timeSelect"
              value={selectedTime}
              onChange={onTimeChange}
              className="w-full rounded border-slate-300 p-1.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:w-auto"
              aria-label="Select chart time (UTC)"
              disabled={isLoading}
            >
              {DAILY_TIMES.map((time) => (
                <option key={time} value={time}>
                  {time}Z
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Region Selector (Weekly Only) */}
        {viewType === 'weekly' && (
          <div className="flex items-center space-x-2">
            <label htmlFor="regionSelect" className="sr-only">
              Region:
            </label>
            <select
              id="regionSelect"
              value={selectedRegion}
              onChange={onRegionChange}
              className="w-full rounded border-slate-300 p-1.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:w-auto"
              aria-label="Select region"
              disabled={isLoading}
            >
              {WEEKLY_REGIONS.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-1 rounded bg-slate-600 px-3 py-1.5 text-sm text-white shadow-sm transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 sm:w-auto"
          disabled={isLoading} // Optionally disable back button during load
        >
          <FiArrowLeft className="-ml-1 size-4" />
          Back
        </button>
      </div>
    </div>
  );
};

export default HeaderControls;
