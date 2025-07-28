// src/pages/Publications.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { fetchInternalReports } from '../services/operations/publicationsAPI';

// --- Static Data ---
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
    link: 'https://www.sciencedirect.com/science/article/pii/S0169809525002832?via%3Dihub',
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

// export const hardcodedPublications = [
//   {
//     id: 1,
//     authors: [
//       'A.G. Rangaraj',
//       'Y. Srinath',
//       'K. Boopathi',
//       'Reddy Prasad D. M.',
//       'Sushant Kumar',
//     ],
//     year: 2025,
//     title:
//       'Statistical post-processing of numerical weather prediction data using distribution-based scaling for wind energy',
//     journal: 'Wind Energy',
//     doi: '10.64349/tr/0309524X241238353',
//     link: 'publication1.pdf',
//   },
//   {
//     id: 2,
//     authors: [
//       'Arijit Chakraborty',
//       'Manabendra Saharia',
//       'Sumedha Chakma',
//       'Dharmendra Kumar Pandey',
//       'Kondapalli Niranjan Kumar',
//       'Praveen K. Thakur',
//       'Sujay Kumar',
//       'Augusto Getirana',
//     ],
//     year: 2025,
//     title:
//       'Improved soil moisture estimation and detection of irrigation signal by incorporating SMAP soil moisture into the Indian Land Data Assimilation System (ILDAS)',
//     journal: 'Journal of Hydrology',
//     doi: '10.64349/j.jhydrol.2024.131581',
//     link: 'publication2.pdf',
//   },
//   {
//     id: 3,
//     authors: [
//       'Arun Kumar',
//       'Kanak Lata Xalxo',
//       'Sushil Kumar',
//       'Biranchi Kumar Mahala',
//       'Ashish Routray',
//       'Nagendra Kumar',
//     ],
//     year: 2025,
//     title:
//       "Performance Assessment of 4D-VAR Microphysics Schemes in Simulating the Track and Intensity of Super Cyclonic Storm 'Amphan'",
//     journal: 'Pure and Applied Geophysics',
//     doi: '10.64349/s00024-024-03573-2',
//     link: 'publication3.pdf',
//   },
//   {
//     id: 4,
//     authors: [
//       'Ashu Mamgain',
//       'Abhijit Sarkar',
//       'Anumeha Dube',
//       'V. Abhijith',
//       'John P. George',
//       'V.S. Prasad',
//     ],
//     year: 2025,
//     title:
//       'Grand ensemble forecasts verification based on two high resolution (~12 km) global ensemble prediction systems',
//     journal: 'Atmospheric Research',
//     doi: '10.64349/j.atmosres.2024.107585',
//     link: 'publication4.pdf',
//   },
//   {
//     id: 5,
//     authors: [
//       'Ashu Mamgain',
//       'S.K. Prasad',
//       'Abhijit Sarkar',
//       'Gauri Shanker',
//       'Anumeha Dube',
//       'A.K. Mitra',
//     ],
//     year: 2025,
//     title:
//       'Evaluating Short-Range Forecasts of a 12 km Global Ensemble Prediction System and a 4 km Convection-Permitting Regional Ensemble Prediction System',
//     journal: 'Pure and Applied Geophysics',
//     doi: '10.64349/j.atmosres.2024.107585',
//     link: 'publication5.pdf',
//   },
//   {
//     id: 6,
//     authors: [
//       'Ch. Sridevi',
//       'Ashish Routray',
//       'M.V.S. Ramarao',
//       'Suryakanti Dutta',
//       'K.B.R.R. Hari Prasad',
//       'Edward Colón',
//       'Annette Gibbs',
//       'Manuel Pondeca',
//       'V.S. Prasad',
//     ],
//     year: 2025,
//     title:
//       'Study of Heat Wave Using High-Resolution Real Time Meso-Scale Analysis Over India',
//     journal: 'Geophysical Research Letters',
//     doi: '10.64349/j.atmosres.2024.107585',
//     link: 'publication6.pdf',
//   },
//   {
//     id: 7,
//     authors: [
//       'Devjyoti Dutta',
//       'Ashish Routray',
//       'M.V.S. Ramarao',
//       'Vivek Singh',
//       'Srinivasarao Karri',
//     ],
//     year: 2025,
//     title:
//       "Uncovering mechanisms behind Chennai's deluges during north-east monsoon season 2015: An observational and modeling analysis",
//     journal: 'Dynamics of Atmospheres and Oceans',
//     doi: '10.64349/j.dynatmoce.2024.101494',
//     link: 'publication7.pdf',
//   },
//   {
//     id: 8,
//     authors: [
//       'Dharmendra Kumar Kamat',
//       'Som Kumar Sharma',
//       'Kondapalli Niranjan Kumar',
//       'Sourita Saha',
//     ],
//     year: 2025,
//     title:
//       'Cloud characteristics in the Aravalli ranges of Western India: Insights from ground-based Lidar measurements',
//     journal: 'Bulletin of Atmospheric Science and Technology',
//     doi: '10.64349/j.dynatmoce.2024.101494',
//     link: 'publication8.pdf',
//   },
//   {
//     id: 9,
//     authors: [
//       'Dineshkumar K. Sankhala',
//       'S. Indira Rani',
//       'D. Srinivas',
//       'V.S. Prasad',
//       'John P. George',
//     ],
//     year: 2025,
//     title:
//       'Validation of OceanSat-3 Sea Surface Winds for their utilization in the NCMRWF NWP assimilation systems',
//     journal: 'Advances in Space Research',
//     doi: '10.64349/j.asr.2024.10.041',
//     link: 'publication9.pdf',
//   },
// ];

export const hardcodedPublications = [
  {
    id: 1,
    authors: [
      'A.G. Rangaraj',
      'Y. Srinath',
      'K. Boopathi',
      'Reddy Prasad D. M.',
      'Sushant Kumar',
    ],
    year: 2025,
    title:
      'Statistical post-processing of numerical weather prediction data using distribution-based scaling for wind energy',
    journal: 'Wind Energy',
    doi: '10.1177/0309524X241238353',
    link: 'publication1.pdf',
    abstract:
      'Statistical post-processing of numerical weather prediction data enhances wind energy forecasts by applying distribution-based scaling, improving accuracy for renewable energy applications.',
    transformedDoi: '10.64349/tr/nmrf.tr.1.2025',
    number: 'tr/nmrf.tr.2.2025',
  },
  {
    id: 2,
    authors: [
      'Shivali Gangwar',
      'B. Athiyaman',
      'K.B.R.R Hari Prasad',
      'Ashish Routray',
    ],
    year: 2025,
    title: 'HAFSV2.0.2 INSTALLATION, OPTIMIZATION AND IMPLEMENTATION AT NCMRWF',
    journal: 'NCMRWF',
    doi: '10.1177/0309524X241238353',
    number: 'tr/nmrf.tr.1.2024',
    link: 'publication2.pdf',
    abstract:
      'Incorporating SMAP soil moisture data into ILDAS enhances soil moisture estimation and irrigation signal detection, improving hydrological modeling in India.',
    transformedDoi: '10.64349/tr/nmrf.tr.1.2024',
  },
  {
    id: 3,
    authors: ['Gopinadh Rongali', 'Raghavendra Ashrit', 'V. S. Prasad'],
    year: 2025,
    title:
      'Implementation of a Web-Based Data Visualization and Mapping System Using the QGIS2Web Plugin at NCMRWF',
    journal: 'Pure and Applied Geophysics',
    // doi: '10.1177/0309524X241238355',
    doi: '10.1177/0309524X241238353',
    transformedDoi: '10.64349/tr/nmrf.tr.2.2024',
    link: 'publication3.pdf',
    number: 'tr/nmrf.tr.2.2024',
  },
  {
    id: 4,
    authors: [
      'Ashu Mamgain',
      'Abhijit Sarkar',
      'Anumeha Dube',
      'V. Abhijith',
      'John P. George',
      'V.S. Prasad',
    ],
    year: 2025,
    title: 'NCMRWF MONTHLY DATA MONITORING REPORT February 2025',
    journal: 'Atmospheric Research',
    doi: '10.1177/0309524X241238353',
    transformedDoi: '10.64349/tr/nmrf.tr.2.2025',
    link: 'publication4.pdf',
    number: 'tr/nmrf.tr.2.2024',
  },
  {
    id: 5,
    authors: [
      'Ashu Mamgain',
      'S.K. Prasad',
      'Abhijit Sarkar',
      'Gauri Shanker',
      'Anumeha Dube',
      'A.K. Mitra',
    ],
    year: 2024,
    title:
      'Evaluating Short-Range Forecasts of a 12 km Global Ensemble Prediction System and a 4 km Convection-Permitting Regional Ensemble Prediction System',
    journal: 'Pure and Applied Geophysics',
    doi: '10.1007/s00024-024-03574-1',
    link: 'publication5.pdf',
  },
  {
    id: 6,
    authors: [
      'Ch. Sridevi',
      'Ashish Routray',
      'M.V.S. Ramarao',
      'Suryakanti Dutta',
      'K.B.R.R. Hari Prasad',
      'Edward Colón',
      'Annette Gibbs',
      'Manuel Pondeca',
      'V.S. Prasad',
    ],
    year: 2024,
    title:
      'Study of Heat Wave Using High-Resolution Real Time Meso-Scale Analysis Over India',
    journal: 'Geophysical Research Letters',
    doi: '10.1029/2024GL123456',
    link: 'publication6.pdf',
  },
  {
    id: 7,
    authors: [
      'Devjyoti Dutta',
      'Ashish Routray',
      'M.V.S. Ramarao',
      'Vivek Singh',
      'Srinivasarao Karri',
    ],
    year: 2024,
    title:
      "Uncovering mechanisms behind Chennai's deluges during north-east monsoon season 2015: An observational and modeling analysis",
    journal: 'Dynamics of Atmospheres and Oceans',
    doi: '10.1016/j.dynatmoce.2024.101494',
    link: 'publication7.pdf',
  },
  {
    id: 8,
    authors: [
      'Dharmendra Kumar Kamat',
      'Som Kumar Sharma',
      'Kondapalli Niranjan Kumar',
      'Sourita Saha',
    ],
    year: 2024,
    title:
      'Cloud characteristics in the Aravalli ranges of Western India: Insights from ground-based Lidar measurements',
    journal: 'Bulletin of Atmospheric Science and Technology',
    doi: '10.1007/s42865-024-00058-1',
    link: 'publication8.pdf',
  },
  {
    id: 9,
    authors: [
      'Dineshkumar K. Sankhala',
      'S. Indira Rani',
      'D. Srinivas',
      'V.S. Prasad',
      'John P. George',
    ],
    year: 2024,
    title:
      'Validation of OceanSat-3 Sea Surface Winds for their utilization in the NCMRWF NWP assimilation systems',
    journal: 'Advances in Space Research',
    doi: '10.1016/j.asr.2024.10.041',
    link: 'publication9.pdf',
  },
];

export const hardcodedReports = [
  {
    title:
      'HAFSV2.0.2 INSTALLATION, OPTIMIZATION AND IMPLEMENTATION AT NCMRWF: Jun-Sep 2024',
    link: '#',
    status: 'new',
    type: 'technical',
    transformedDoi: transformReportDOI(0, 2024),
  },
  {
    title:
      'Implementation of a Web-Based Data Visualization and Mapping System Using the QGIS2Web Plugin at NCMRWF',
    link: '#',
    status: '',
    type: 'project',
    transformedDoi: transformReportDOI(1, 2024),
  },
];
function transformReportDOI(index, year = 2025) {
  return `10.64349/tr/nmrf.tr.${index + 1}.${year}`;
}

export const ASSETS_BASE_URL = process.env.REACT_APP_ASSETS_BASE_URL || '';
export const ASSETS_BASE_URL_NEW =
  process.env.REACT_APP_ASSETS_BASE_URL_NEW || '';

export const doiMapping = {
  '10.64349/tr/nmrf.tr.1.2025': '10.1177/0309524X241238353',
  '10.64349/tr/nmrf.tr.2.2025': '10.1016/j.jhydrol.2024.131581',
  '10.64349/tr/nmrf.tr.1.2024': '10.1007/s00024-024-03573-2',
  '10.64349/tr/nmrf.tr.2.2024': '10.1016/j.atmosres.2024.107585',
  '10.64349/tr/nmrf.tr.3.2024': '10.1007/s00024-024-03574-1',
  '10.64349/tr/nmrf.tr.4.2024': '10.1029/2024GL123456',
  '10.64349/tr/nmrf.tr.5.2024': '10.1016/j.dynatmoce.2024.101494',
  '10.64349/tr/nmrf.tr.6.2024': '10.1007/s42865-024-00058-1',
  '10.64349/tr/nmrf.tr.7.2024': '10.1016/j.asr.2024.10.041',
};
const originalDOI = '10.1177/0309524X241238353';

// Example transformation function
function transformDOI(doi) {
  // Replace prefix with your custom one
  return `10.64349/tr/nmrf.tr.1.2025`; // or a generated value
}
// Generate it
const transformedDOI = transformDOI(originalDOI);

const Publications = () => {
  const [activeTab, setActiveTab] = useState('Publications');
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

  // const [internalReports, setInternalReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedReportType, setSelectedReportType] = useState('');
  const navigate = useNavigate();

  // ✅ Static filtered data instead of API
  const filteredReports = selectedReportType
    ? hardcodedReports.filter((r) => r.type === selectedReportType)
    : hardcodedReports;

  const internalReports = filteredReports; // So JSX below still works

  // Filter publications based on selected year
  const filteredPublications = hardcodedPublications.filter(
    (pub) => pub.year.toString() === selectedYear
  );

  // Fetch internal reports based on activeTab and selectedReportType
  // useEffect(() => {
  //   const getReports = async () => {
  //     if (activeTab !== 'Internal Reports') return;
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const data = await fetchInternalReports(selectedReportType);
  //       const filteredData = selectedReportType
  //         ? (data || []).filter((item) => item.type === selectedReportType)
  //         : data || [];
  //       setInternalReports(filteredData);
  //     } catch (err) {
  //       console.error('Error fetching internal reports:', err);
  //       setError(err.message || 'Failed to fetch internal reports.');
  //       setInternalReports([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getReports();
  // }, [activeTab, selectedReportType]);

  // Use staticLatestPublications for the sidebar
  const latestPublicationsForSidebar = staticLatestPublications.slice(0, 5);
  return (
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
                ? 'scale-105 bg-blue-600 text-white ring-2 ring-blue-300 ring-offset-1'
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

          {activeTab === 'Publications' && (
            <div>
              <h2 className="mb-4 border-b-2 border-blue-500 pb-2 text-xl font-bold text-slate-800 sm:text-2xl">
                Publications
              </h2>
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
                >
                  {Array.from(
                    { length: new Date().getFullYear() - 1989 + 1 },
                    (_, i) => new Date().getFullYear() - i
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              {filteredPublications.length === 0 && (
                <p className="text-slate-600">
                  No publications found for {selectedYear}.
                </p>
              )}
              {filteredPublications.length > 0 && (
                <ul className="space-y-3 text-sm sm:text-base">
                  {filteredPublications.map((pub, index) => (
                    <li
                      key={pub.id || index}
                      className="rounded-md border border-slate-200 bg-white p-3 shadow-sm"
                    >
                      <p className="font-medium text-slate-800">
                        {(pub.authors || []).join(', ')} ({pub.year})
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

                      {pub.doi === '10.1177/0309524X241238353' && (
                        <Link
                          // to={`/publications/${transformedDOI}`}
                          to={`/publications/${pub.transformedDoi}`}
                          className="before:animate-shine relative ml-2 inline-flex items-center space-x-1 overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-md transition-all duration-300 ease-in-out before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/30 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 hover:-translate-y-0.5 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:before:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                        >
                          <span className="relative z-10">View Page</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Annual Reports Tab Content */}
          {activeTab === 'Annual Reports' && (
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
                        className="mb-2 h-48 w-auto rounded object-cover shadow-md sm:h-56"
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
          {activeTab === 'Internal Reports' && (
            <div>
              <h2 className="mb-4 border-b-2 border-blue-500 pb-2 text-xl font-bold text-slate-800 sm:text-2xl">
                Internal Reports
              </h2>
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
                  disabled={loading}
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
              {/* {!loading && !error && internalReports.length > 0 && (
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
              )} */}

              {!loading && !error && internalReports.length > 0 && (
                <ul className="space-y-2 text-sm sm:text-base">
                  {internalReports.map((report, index) => (
                    <li
                      key={report.id || index}
                      className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-2.5 shadow-sm"
                    >
                      <Link
                        to={`/publications/internal_reports/${report.transformedDoi}`} // ✅ Make sure `report.transformedDoi` exists in the object
                        className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        {report.title}
                      </Link>
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
          {activeTab === '30 Years of Excellence' && (
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
                    <a
                      key={index}
                      href={`${ASSETS_BASE_URL_NEW || ASSETS_BASE_URL}${pdf.link}`}
                      className="group flex flex-col items-center rounded-lg border border-slate-200 bg-white p-3 text-center shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={pdf.image || 'default-annual-report-image.jpg'}
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
          {activeTab === 'Vision 2047' && (
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
                    <a
                      key={index}
                      href={`${ASSETS_BASE_URL_NEW || ASSETS_BASE_URL}${pdf.link}`}
                      className="group flex flex-col items-center rounded-lg border border-slate-200 bg-white p-3 text-center shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={pdf.image || 'default-annual-report-image.jpg'}
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
            <FiStar className="text-xl text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-800">
              Recent Highlights
            </h3>
          </div>

          {latestPublicationsForSidebar.length > 0 ? (
            <ul className="space-y-3">
              {latestPublicationsForSidebar.map((pub) => (
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
                    className="group block"
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
