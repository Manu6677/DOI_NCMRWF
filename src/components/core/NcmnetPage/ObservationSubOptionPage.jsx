// src/pages/ObservationSubOptionPage.jsx
import { useState, useEffect, useMemo } from 'react'; // Added useMemo
import { useParams } from 'react-router-dom';
import { FiFileText, FiLoader, FiAlertCircle } from 'react-icons/fi';
// Removed Link import as we'll use <a> for external PDFs
import { fetchObservationReportsByType } from '../../../services/operations/observationsAPI'; // Verify this path is correct

// Ensure a fallback if the env variable is not set
const base_url = process.env.REACT_APP_ASSETS_BASE_URL_NEW || '';

const slugToTitle = (slug) => {
  if (!slug) return '';
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const ObservationSubOptionPage = () => {
  const { subOptionSlug } = useParams();
  const [reportCycles, setReportCycles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    if (!subOptionSlug) {
      setError('Sub-option type missing from URL.');
      setIsLoading(false);
      return;
    }

    const getReportCycles = async () => {
      setPageTitle(slugToTitle(subOptionSlug));
      setIsLoading(true);
      setError(null);
      setReportCycles([]);

      try {
        // Fetch data - expecting array: [{ title?: string, label: string, url: string }, ...]
        const data = await fetchObservationReportsByType(subOptionSlug);
        setReportCycles(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching report cycles:', err);
        setError(err.message || 'Failed to load report data.');
        setReportCycles([]);
      } finally {
        setIsLoading(false);
      }
    };

    getReportCycles();
  }, [subOptionSlug]);

  // --- Grouping Logic using useMemo for efficiency ---
  const { titledGroups, untitledReports } = useMemo(() => {
    const groups = reportCycles.reduce((acc, report) => {
      // Use title for grouping key, or a default key for untitled items
      const key = report.title || '___UNTITLED___'; // Use a distinct key
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(report);
      return acc;
    }, {});

    // Separate untitled items
    const untitled = groups.___UNTITLED___ || [];
    // Create an array of titled group objects for easier mapping
    const titled = Object.entries(groups)
      .filter(([key]) => key !== '___UNTITLED___')
      .map(([title, items]) => ({ title, items })); // Sort titled groups alphabetically if needed: .sort((a, b) => a.title.localeCompare(b.title))

    return { titledGroups: titled, untitledReports: untitled };
  }, [reportCycles]); // Recalculate only when reportCycles changes

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold text-slate-800">
        Observation Monitoring Report: {pageTitle}
      </h2>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center space-x-2 py-10 text-slate-600">
          <FiLoader className="size-6 animate-spin" />
          <span>Loading available reports...</span>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="flex items-center space-x-2 rounded border border-red-300 bg-red-50 p-4 text-red-700">
          <FiAlertCircle className="size-6 flex-shrink-0" />
          <span>Error: {error}</span>
        </div>
      )}

      {/* No Data State */}
      {!isLoading && !error && reportCycles.length === 0 && (
        <div className="flex items-center justify-center space-x-2 py-10 text-slate-500">
          <FiFileText className="size-6" />
          <span>No reports available for this criteria.</span>
        </div>
      )}

      {/* Success State - Display Report Cycles (Grouped) */}
      {!isLoading && !error && reportCycles.length > 0 && (
        <div className="space-y-6">
          {' '}
          {/* Main container for groups */}
          {/* Render Untitled Items First (if any) */}
          {untitledReports.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {untitledReports.map((cycle) => (
                // Use <a> tag for external links/PDFs opening in new tab
                <a
                  key={cycle.label} // Ensure label is unique or use a better ID if available
                  href={`${base_url}${cycle.url}`} // Prepend base URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-3 rounded-md border border-slate-300 bg-slate-50 p-4 text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <FiFileText className="size-5 flex-shrink-0 text-blue-600 transition-colors group-hover:text-blue-700" />
                  <span className="font-medium capitalize">{cycle.label}</span>
                </a>
              ))}
            </div>
          )}
          {/* Render Titled Groups */}
          {titledGroups.map((group) => (
            <div key={group.title} className="space-y-3 pt-4">
              {' '}
              {/* Add padding top */}
              {/* Group Title Heading */}
              <h3 className="border-b border-slate-300 pb-2 text-lg font-semibold text-slate-700">
                {group.title}
              </h3>
              {/* Grid for items within this group */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {group.items.map((cycle) => (
                  // Use <a> tag for external links/PDFs opening in new tab
                  <a
                    key={cycle.label} // Ensure label is unique or use a better ID if available
                    href={`${base_url}${cycle.url}`} // Prepend base URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-3 rounded-md border border-slate-300 bg-slate-50 p-4 text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <FiFileText className="size-5 flex-shrink-0 text-blue-600 transition-colors group-hover:text-blue-700" />
                    <span className="font-medium capitalize">
                      {cycle.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ObservationSubOptionPage;
