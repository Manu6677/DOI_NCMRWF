// src/pages/Publications.jsx (Adjust path as needed)
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { FiStar, FiFileText } from 'react-icons/fi';

// Import assets - ensure these paths are correct
import reportImg2223 from '../assets/images/reportsImg/reports2223.png';
import reportImg2324 from '../assets/images/reportsImg/reports2324.png';
import reportImg2425 from '../assets/images/reportsImg/reports2425.png';
import newsletterImg2022 from '../assets/images/reportsImg/newsletter2022.png';
import newsletterImg2021 from '../assets/images/reportsImg/newsletter2021.png';
import newsletterImg2020 from '../assets/images/reportsImg/newsletter2020.png';
import thirtyYearsImg from '../assets/images/reportsImg/30years.png';
import vision2047Img from '../assets/images/reportsImg/vision2047.png';

// Import API functions - ensure these paths are correct
import {
  fetchPublications,
  fetchInternalReports,
} from '../services/operations/publicationsAPI';

// --- Static Data (as provided) ---
const annualReports = [
  {
    year: '2024-2025',
    link: '/Documents/annual-reports-pdf/NCMRWF_Annual_Report_2024_25_FINAL.pdf',
    image: reportImg2425,
  },
  {
    year: '2023-2024',
    link: '/Documents/annual-reports-pdf/NCMRWF_AnnualReport_2023-2024.pdf',
    image: reportImg2324,
  },
  {
    year: '2022-2023',
    link: '/Documents/annual-reports-pdf/NCMRWF_Annual-Report_2022-2023.pdf',
    image: reportImg2223,
  },
];
const newsletters = [
  {
    year: '2022',
    link: '/Newsletter/NCMRWF_HindiNewLetter_March2022issue.pdf',
    image: newsletterImg2022,
  },
  {
    year: '2021',
    link: '/Newsletter/Newsletter_Sep-2021.pdf',
    image: newsletterImg2021,
  },
  {
    year: '2020',
    link: '/Newsletter/NCMRWF_Hindi__Newsletter2020_Final.pdf',
    image: newsletterImg2020,
  },
];
const thirtyYearPdfs = [
  {
    title: 'eBook',
    link: '/publication/NCMRWF_30years_Excellence.pdf',
    image: thirtyYearsImg,
  },
];
const vision2047Pdfs = [
  {
    title: 'eBook',
    link: '/publication/Vision_2047.pdf',
    image: vision2047Img,
  },
];
const staticLatestPublications = [
  {
    id: 1,
    title:
      'Fidelity of coupled hindcast simulations in representing intraseasonal biases over South Asia',
    link: 'https://link.springer.com/article/10.1007/s00382-025-07686-9',
    authors: [
      'D. Nagarjuna Rao',
      'T. S. Mohan',
      'Ankur Gupta',
      'Kondapalli Niranjan Kumar',
      'Akhilesh Mishra',
      'Imranali M. Momin',
      'Saji Mohandas',
      'Ashis K. Mitra',
      'V. S. Prasad',
    ],
    year: '2025',
    isExternal: true,
  },
  {
    id: 2,
    title:
      'Improvements in the prediction of extreme rainfall events with nested high-resolution rapid refresh modelling system over the Indian Himalayan region',
    link: 'https://www.sciencedirect.com/science/article/pii/S0169809525002832?via%3Dihub', // Example internal link
    authors: [
      'K.B.R.R. Hari Prasad',
      'Ashish Routray',
      'Greeshma M. Mohan',
      'V.S. Prasad',
    ],
    year: '2024',
    isExternal: true,
  },
];

// --- Environment Variables ---
// Ensure these are set in your .env file (e.g., .env.local)
const ASSETS_BASE_URL = process.env.REACT_APP_ASSETS_BASE_URL || ''; // Fallback to empty string
const ASSETS_BASE_URL_NEW = process.env.REACT_APP_ASSETS_BASE_URL_NEW || ''; // Fallback

const Publications = () => {
  const [activeTab, setActiveTab] = useState('Publications');
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(
    (new Date().getFullYear() - 1).toString()
  ); // Default to current year
  const [internalReports, setInternalReports] = useState([]); // Initialize as empty array
  const [selectedReportType, setSelectedReportType] = useState(''); // Default to 'All Reports'
  const navigate = useNavigate(); // For navigation if needed

  // Fetch journal publications based on selectedYear
  useEffect(() => {
    const getPublications = async () => {
      if (activeTab !== 'Publications' || !selectedYear) return; // Fetch only if tab is active and year is selected
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPublications(selectedYear);
        setPublications(data || []); // Ensure it's an array
      } catch (err) {
        console.error('Error fetching publications:', err);
        setError(err.message || 'Failed to fetch publications.');
        setPublications([]); // Reset on error
      } finally {
        setLoading(false);
      }
    };
    getPublications();
  }, [activeTab, selectedYear]);

  // Fetch internal reports based on activeTab and selectedReportType
  useEffect(() => {
    const getReports = async () => {
      if (activeTab !== 'Internal Reports') return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchInternalReports(selectedReportType); // API might handle 'all' if type is empty
        // Filtering can be done here or ensure API handles empty selectedReportType as 'all'
        const filteredData = selectedReportType
          ? (data || []).filter((item) => item.type === selectedReportType)
          : data || [];
        setInternalReports(filteredData);
      } catch (err) {
        console.error('Error fetching internal reports:', err);
        setError(err.message || 'Failed to fetch internal reports.');
        setInternalReports([]); // Reset on error
      } finally {
        setLoading(false);
      }
    };
    getReports();
  }, [activeTab, selectedReportType]);

  // --- Helper to get a few latest publications for the sidebar ---
  // This uses the currently fetched 'publications' for the selected year.
  // For a true "overall latest", you might need a separate API endpoint.
  const getLatestPublications = (count = 5) => {
    return publications.slice(0, count);
  };

  const latestPublicationsForSidebar = getLatestPublications(5);

  return (
    // Main container with max-width and padding
    <div className="mx-auto max-w-7xl rounded-lg bg-white p-4 shadow-lg sm:p-6 lg:p-8">
      {/* Tab Navigation */}
      <div className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-3">
        {[
          'Publications',
          'Internal Reports',
          'Annual Reports',
          '30 Years of Excellence',
          'Vision 2047',
        ].map((tab) => (
          <button
            key={tab}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold shadow-md transition-all duration-300 sm:px-4 sm:py-2 sm:text-sm ${
              activeTab === tab
                ? 'scale-105 bg-blue-600 text-white ring-2 ring-blue-300 ring-offset-1' // Enhanced active style
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left Column: Main Tab Content */}
        <div className="flex-grow rounded-lg border border-slate-300 bg-slate-50 p-4 sm:p-6 lg:w-3/4">
          {/* Publications Tab Content */}
          {activeTab === 'Publications' && ( // Year filter and content only shown for this tab
            <div>
              <h2 className="mb-4 border-b-2 border-blue-500 pb-2 text-xl font-bold text-slate-800 sm:text-2xl">
                Journal Publications
              </h2>
              {/* Year Selector - Moved to be always visible when 'Publications' tab is active */}
              <div className="mb-4">
                <label
                  htmlFor="year-select"
                  className="mr-2 text-sm font-semibold text-slate-700 sm:text-base"
                >
                  Select Year:
                </label>
                <select
                  id="year-select"
                  className="rounded border border-slate-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-base"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  disabled={loading} // Optionally disable while loading
                >
                  {/* Generate year options dynamically from current year down to a limit */}
                  {Array.from(
                    { length: new Date().getFullYear() - 1989 },
                    (_, i) => new Date().getFullYear() - i - 1
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Conditional rendering for loading, error, and data states */}
              {loading && (
                <p className="text-center text-slate-600">
                  Loading publications for {selectedYear}...
                </p>
              )}
              {error && (
                <p className="text-center text-red-600">Error: {error}</p>
              )}
              {!loading && !error && publications.length === 0 && (
                <p className="text-slate-600">
                  No publications found for {selectedYear}.
                </p>
              )}
              {!loading && !error && publications.length > 0 && (
                <ul className="space-y-3 text-sm sm:text-base">
                  {publications.map((pub, index) => (
                    <li
                      key={pub.id || index}
                      className="rounded-md border border-slate-200 bg-white p-3 shadow-sm"
                    >
                      <p className="font-medium text-slate-800">
                        {(pub.authors || []).join(', ')} (
                        {pub.year || selectedYear})
                      </p>
                      <p className="italic text-slate-700">{pub.title}</p>
                      <p className="text-xs text-slate-600">{pub.journal}</p>
                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          className="text-xs text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          DOI: {pub.doi}
                        </a>
                      )}
                      {pub.link && (
                        <a // Changed to <a> for direct link opening
                          href={`${ASSETS_BASE_URL_NEW || ASSETS_BASE_URL}${pub.link}`} // Prioritize NEW URL
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 inline-flex items-center space-x-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 transition-colors duration-150 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                          aria-label="View publication PDF"
                        >
                          View PDF
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Annual Reports Tab Content */}
          {activeTab === 'Annual Reports' && ( // Content only shown for this tab
            <div>
              <h2 className="mb-4 border-b-2 border-blue-500 pb-2 text-xl font-bold text-slate-800 sm:text-2xl">
                Annual Reports
              </h2>
              {loading && (
                <p className="text-center text-slate-600">Loading content...</p>
              )}
              {error && (
                <p className="text-center text-red-600">Error: {error}</p>
              )}
              {!loading && !error && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {annualReports.map((report, index) => (
                    <a
                      key={index}
                      href={`${ASSETS_BASE_URL_NEW || ASSETS_BASE_URL}${report.link}`}
                      className="group flex flex-col items-center rounded-lg border border-slate-200 bg-white p-3 text-center shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={report?.image}
                        alt={`Annual Report ${report.year}`}
                        className="mb-2 h-48 w-auto rounded object-cover shadow-md sm:h-56" // Fixed height, object-cover
                      />
                      <span className="text-sm font-semibold text-blue-700 group-hover:text-blue-800">
                        {report.year}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Internal Reports Tab Content */}
          {activeTab === 'Internal Reports' && ( // Content only shown for this tab
            <div>
              <h2 className="mb-4 border-b-2 border-blue-500 pb-2 text-xl font-bold text-slate-800 sm:text-2xl">
                Internal Reports
              </h2>
              {/* Report Type Selector - Always visible when 'Internal Reports' tab is active */}
              <div className="mb-4">
                <label
                  htmlFor="report-type-select"
                  className="mr-2 text-sm font-semibold text-slate-700 sm:text-base"
                >
                  Select Report Type:
                </label>
                <select
                  id="report-type-select"
                  className="rounded border border-slate-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-base"
                  value={selectedReportType}
                  onChange={(e) => setSelectedReportType(e.target.value)}
                  disabled={loading} // Optionally disable while loading
                >
                  <option value="">All Reports</option>
                  <option value="technical">Technical Reports</option>
                  <option value="verification">Verification Reports</option>
                  <option value="research">Research Reports</option>
                  <option value="observation">Observational Monitoring</option>
                  <option value="erp-reports">ERP Reports</option>
                  <option value="project">Project Reports</option>
                  <option value="mme">MME Reports</option>
                  <option value="conference">Conference Reports</option>
                </select>
              </div>
              {loading && (
                <p className="text-center text-slate-600">
                  Loading internal reports...
                </p>
              )}
              {error && (
                <p className="text-center text-red-600">Error: {error}</p>
              )}
              {!loading && !error && !internalReports.length && (
                <p className="text-slate-600">
                  No internal reports found for the selected type.
                </p>
              )}
              {!loading && !error && internalReports.length > 0 && (
                <ul className="space-y-2 text-sm sm:text-base">
                  {internalReports.map((report, index) => (
                    <li
                      key={report.id || index}
                      className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-2.5 shadow-sm"
                    >
                      <a
                        href={`${ASSETS_BASE_URL_NEW || ASSETS_BASE_URL}${report.link}`}
                        className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {report.title}
                      </a>
                      {report.status === 'new' && (
                        <span className="ml-2 whitespace-nowrap rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                          NEW
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* 30 Years of Excellence Tab Content */}
          {activeTab === '30 Years of Excellence' && ( // Content only shown for this tab
            <div>
              <h2 className="mb-4 border-b-2 border-green-500 pb-2 text-xl font-bold text-slate-800 sm:text-2xl">
                30 Years of Excellence in Operational Numerical Weather
                Prediction
              </h2>
              {loading && (
                <p className="text-center text-slate-600">Loading content...</p>
              )}
              {error && (
                <p className="text-center text-red-600">Error: {error}</p>
              )}
              {!loading && !error && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {thirtyYearPdfs.map((pdf, index) => (
                    <a // Changed to <a> for direct link
                      key={index}
                      href={`${ASSETS_BASE_URL_NEW || ASSETS_BASE_URL}${pdf.link}`}
                      className="group flex flex-col items-center rounded-lg border border-slate-200 bg-white p-3 text-center shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={pdf.image || 'default-annual-report-image.jpg'} // Fallback image
                        alt={pdf.title || '30 Years of Excellence'}
                        className="mb-2 h-48 w-auto rounded object-cover shadow-md sm:h-56"
                      />
                      <span className="text-sm font-semibold text-blue-700 group-hover:text-blue-800">
                        {pdf.title}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Vision 2047 Tab Content */}
          {activeTab === 'Vision 2047' && ( // Content only shown for this tab
            <div>
              <h2 className="border-purple-500 mb-4 border-b-2 pb-2 text-xl font-bold text-slate-800 sm:text-2xl">
                Vision 2047
              </h2>
              {loading && (
                <p className="text-center text-slate-600">Loading content...</p>
              )}
              {error && (
                <p className="text-center text-red-600">Error: {error}</p>
              )}
              {!loading && !error && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {vision2047Pdfs.map((pdf, index) => (
                    <a // Changed to <a> for direct link
                      key={index}
                      href={`${ASSETS_BASE_URL_NEW || ASSETS_BASE_URL}${pdf.link}`}
                      className="group flex flex-col items-center rounded-lg border border-slate-200 bg-white p-3 text-center shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={pdf.image || 'default-annual-report-image.jpg'} // Fallback image
                        alt={pdf.title || 'Vision 2047'}
                        className="mb-2 h-48 w-auto rounded object-cover shadow-md sm:h-56"
                      />
                      <span className="text-sm font-semibold text-blue-700 group-hover:text-blue-800">
                        {pdf.title}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Latest Publications Sidebar */}
        <aside className="via-sky-50 to-cyan-50 w-full self-start rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 p-4 shadow-lg lg:sticky lg:top-6 lg:w-1/4">
          <div className="mb-4 flex items-center gap-2 border-b-2 border-blue-500 pb-2">
            <FiStar className="text-xl text-blue-600" />{' '}
            {/* Icon for "Highlights" */}
            <h3 className="text-lg font-semibold text-blue-800">
              Recent Highlights
            </h3>
          </div>

          {staticLatestPublications.length > 0 ? (
            <ul className="space-y-3">
              {staticLatestPublications.map((pub) => (
                <li
                  key={pub.id}
                  className="rounded-md border border-slate-200/70 bg-white/60 p-2.5 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md"
                >
                  <a
                    href={
                      pub.isExternal
                        ? pub.link
                        : `${ASSETS_BASE_URL_NEW || ASSETS_BASE_URL}${pub.link}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block" // Make the whole list item area (conceptually) clickable via the link
                    title={pub.title}
                  >
                    <div className="flex items-start gap-2">
                      <FiFileText className="mt-1 size-3.5 flex-shrink-0 text-blue-500 group-hover:text-blue-700" />
                      <span className="text-sm font-medium text-blue-700 group-hover:text-blue-800 group-hover:underline">
                        {pub.title.length > 65
                          ? `${pub.title.substring(0, 62)}...`
                          : pub.title}
                      </span>
                    </div>
                  </a>
                  {(pub.authors || pub.year) && (
                    <p className="mt-1 pl-6 text-xs text-slate-500">
                      {' '}
                      {/* Indent author/year info */}
                      {pub.authors && pub.authors.slice(0, 2).join(', ')}
                      {pub.authors && pub.authors.length > 2 && ' et al.'}
                      {pub.authors && pub.year && ' '}
                      {pub.year && `(${pub.year})`}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">
              No recent highlights to display.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Publications;
