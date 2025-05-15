// src/components/DataMonitoring.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMonitoringData } from '../../../../services/operations/fetchMonitoringData';

const baseUrl = process.env.REACT_APP_ASSETS_BASE_URL_NEW || '';

const DataMonitoring = () => {
  // State to hold the highlighted cycle ('00', '06', '12', or '18') for each section
  const [earlyHighlight, setEarlyHighlight] = useState(null);
  const [updateHighlight, setUpdateHighlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URLs are now constructed using the baseUrl from environment variables
  // const earlyUrl = `${baseUrl}/data-monitoring/image/early/early.txt`;
  // const updateUrl = `${baseUrl}/data-monitoring/image/update/update.txt`;
  const earlyUrl = `${baseUrl}/early_temp.txt`;
  const updateUrl = `${baseUrl}/update_temp.txt`;

  const getCycleLink = (type, cycle, highlightedCycle) => {
    const basePath = `/ncmnet/data-monitoring/${type}/${cycle}`;
    return `${basePath}?highlight=${highlightedCycle}`;
  };

  useEffect(() => {
    if (!baseUrl) {
      setError('Base URL (REACT_APP_ASSETS_BASE_URL_NEW) is not configured.');
      setLoading(false);
      return;
    }

    const loadData = async () => {
      setLoading(true);
      const result = await fetchMonitoringData(earlyUrl, updateUrl);

      if (result.error) {
        setError(result.error);
      } else {
        setEarlyHighlight(result.earlyHighlight);
        setUpdateHighlight(result.updateHighlight);
      }

      setLoading(false);
    };

    loadData();
  }, [baseUrl, earlyUrl, updateUrl]);

  // *** CORRECTED Helper function for button classes ***
  const getButtonClass = (cycle, highlightedCycle) => {
    const baseClasses =
      'border border-slate-400 p-2 text-center cursor-pointer'; // Base style
    const cycleValue = cycle.substring(0, 2); // Extract '00', '06', '12', '18' from '00z', '06z' etc.

    // Check if the button's cycle value matches the highlighted state value
    if (cycleValue === highlightedCycle) {
      return `${baseClasses} bg-slate-300 font-semibold`; // Highlighted style
    }
    return `${baseClasses} bg-white`; // Default style
  };

  // Display loading or error messages
  if (loading) return <div className="p-4 text-center">Loading data...</div>;
  // Display error (including the specific baseUrl configuration error)
  if (error)
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;

  // Base URL check is now handled within useEffect, error state will be set

  return (
    <div className="flex min-h-screen flex-col items-center bg-orange-50 p-6">
      <h1 className="text-indigo-900 mb-6 text-xl font-bold">
        REAL TIME DATA MONITORING SYSTEM
      </h1>
      <h2 className="text-indigo-800 mb-8 text-lg font-semibold">
        Model Data Dump Tables
      </h2>

      {/* Early GFS Section */}
      <div className="mb-8 w-full max-w-xl border border-slate-500 bg-white p-4 shadow">
        <p className="mb-4 text-center font-semibold text-blue-700">
          CLICK ON UNDERLINED HOUR / SHADED BOX FOR THE LATEST CYCLE
        </p>
        <p className="mb-4 text-center text-lg font-bold">Early GFS</p>
        <div className="grid grid-cols-4 gap-4">
          {/* Add the 'to' prop to each Link */}
          <Link
            to={getCycleLink('early', '00z', earlyHighlight)}
            className={getButtonClass('00z', earlyHighlight)}
          >
            00z
          </Link>
          <Link
            to={getCycleLink('early', '06z', earlyHighlight)}
            className={getButtonClass('06z', earlyHighlight)}
          >
            06z
          </Link>
          <Link
            to={getCycleLink('early', '12z', earlyHighlight)}
            className={getButtonClass('12z', earlyHighlight)}
          >
            12z
          </Link>
          <Link
            to={getCycleLink('early', '18z', earlyHighlight)}
            className={getButtonClass('18z', earlyHighlight)}
          >
            18z
          </Link>
        </div>
      </div>

      {/* Update GFS Section */}
      <div className="w-full max-w-xl border border-slate-500 bg-white p-4 shadow">
        <p className="mb-4 text-center font-semibold text-blue-700">
          CLICK ON UNDERLINED HOUR / SHADED BOX FOR THE LATEST CYCLE
        </p>
        <p className="mb-4 text-center text-lg font-bold">Update GFS</p>
        <div className="grid grid-cols-4 gap-4">
          {/* Add the 'to' prop to each Link */}
          <Link
            to={getCycleLink('update', '00z', updateHighlight)}
            className={getButtonClass('00z', updateHighlight)}
          >
            00z
          </Link>
          <Link
            to={getCycleLink('update', '06z', updateHighlight)}
            className={getButtonClass('06z', updateHighlight)}
          >
            06z
          </Link>
          <Link
            to={getCycleLink('update', '12z', updateHighlight)}
            className={getButtonClass('12z', updateHighlight)}
          >
            12z
          </Link>
          <Link
            to={getCycleLink('update', '18z', updateHighlight)}
            className={getButtonClass('18z', updateHighlight)}
          >
            18z
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-8 max-w-xl text-center text-xs text-slate-600">
        Disclaimer : NCMRWF is a Research and Development Organization. The
        products and the conclusion drawn thereof are based on Numerical Weather
        Prediction(NWP) models being run at NCMRWF.
      </p>
    </div>
  );
};

export default DataMonitoring;
