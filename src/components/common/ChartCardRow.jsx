// src/components/common/ChartCardRow.jsx
import React from 'react';
import PropTypes from 'prop-types';

const ChartCardRow = ({ rowData, days, onChartClick }) => {
  if (!rowData || !days || days.length === 0) {
    return null;
  }

  return (
    // Card: Added transition
    <div className="overflow-hidden rounded-lg bg-white shadow transition duration-200 ease-in-out hover:shadow-lg">
      {/* Card Header: Model/Parameter Info */}
      <div className="border-b border-slate-200 bg-slate-50/80 p-3 px-4">
        {' '}
        {/* Slightly transparent header */}
        <h3 className="font-semibold text-slate-800">
          {rowData.modelSetLabel}
        </h3>
        {rowData.parameterLabel && (
          <p className="text-xs text-slate-600">{rowData.parameterLabel}</p>
        )}
      </div>

      {/* Card Body: Horizontal scroll for charts */}
      <div className="scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 flex space-x-2 overflow-x-auto p-3">
        {rowData.charts.map((chart, index) => (
          // Container for each day's chart/label
          <div
            key={`${rowData.id}-day-${index + 1}`}
            // Removed bg/border, added text-center
            className="flex shrink-0 flex-col items-center space-y-1.5 rounded p-2 text-center"
            style={{ width: '110px' }}
          >
            {/* Day Label */}
            <span className="text-xs font-medium text-slate-700">
              {days[index]}
            </span>

            {/* Chart Area Container: Added subtle bg and rounded */}
            <div className="flex h-[85px] w-[100px] items-center justify-center rounded-sm bg-slate-100/80">
              {chart && !chart.isNA && chart.url ? (
                // Render image inside a button
                <button
                  onClick={() =>
                    onChartClick?.({
                      // Use optional chaining for safety
                      modelSetLabel: rowData.modelSetLabel,
                      parameterLabel: rowData.parameterLabel,
                      dayLabel: days[index],
                      url: chart.url,
                    })
                  }
                  disabled={!onChartClick} // Disable if no handler
                  className={`flex h-full w-full items-center justify-center rounded transition-transform duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-60 ${
                    onChartClick
                      ? 'cursor-pointer hover:scale-105'
                      : 'cursor-default' // Hover effect only if clickable
                  }`}
                  aria-label={`View chart for ${rowData.modelSetLabel}, ${days[index]}`}
                >
                  <img
                    src={chart.url}
                    alt={`Chart: ${rowData.modelSetLabel}, ${days[index]}`} // Slightly shorter alt
                    className="max-h-full max-w-full object-contain"
                    loading="lazy" // Add lazy loading for images
                  />
                </button>
              ) : (
                // Display "NA" text - styled more subtly
                <span className="text-xs font-medium text-slate-400">NA</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Prop types remain the same
ChartCardRow.propTypes = {
  rowData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    modelSetLabel: PropTypes.string.isRequired,
    parameterLabel: PropTypes.string,
    charts: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        isNA: PropTypes.bool,
      })
    ).isRequired,
  }).isRequired,
  days: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChartClick: PropTypes.func,
};

export default ChartCardRow;
