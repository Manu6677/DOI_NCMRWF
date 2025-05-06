import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import reportImg2223 from '../assets/images/reportsImg/reports2223.png';
import reportImg2324 from '../assets/images/reportsImg/reports2324.png';
import reportImg2425 from '../assets/images/reportsImg/reports2425.png';
import newsletterImg2022 from '../assets/images/reportsImg/newsletter2022.png';
import newsletterImg2021 from '../assets/images/reportsImg/newsletter2021.png';
import newsletterImg2020 from '../assets/images/reportsImg/newsletter2020.png';
import thirtyYearsImg from '../assets/images/reportsImg/30years.png';
import vision2047Img from '../assets/images/reportsImg/vision2047.png';
import { EyeIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

import {
  fetchPublications,
  fetchInternalReports,
} from '../services/operations/publicationsAPI';
import { button } from '@material-tailwind/react';

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

const ASSETS_BASE_URL = process.env.REACT_APP_ASSETS_BASE_URL_NEW;
const ASSETS_BASE_URL_NEW = process.env.REACT_APP_ASSETS_BASE_URL_NEW;

const Publications = () => {
  const [activeTab, setActiveTab] = useState('Publications');
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [internalReports, setInternalReports] = useState(null);
  const [selectedReportType, setSelectedReportType] = useState('verification');
  const navigate = useNavigate();

  useEffect(() => {
    const getPublications = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPublications(selectedYear);
        setPublications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedYear) {
      getPublications();
    }
  }, [selectedYear]);

  useEffect(() => {
    const getReports = async () => {
      if (activeTab !== 'Internal Reports') return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchInternalReports(selectedReportType);

        const filteredData = data.filter(
          (item) =>
            item.type === selectedReportType || selectedReportType === ''
        );

        setInternalReports(filteredData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getReports();
  }, [activeTab, selectedReportType]);

  return (
    <div className="mx-auto max-w-6xl rounded-lg bg-white p-4 shadow-lg sm:p-6 lg:p-8">
      {/* Tab Navigation */}
      <div className="mb-6 flex flex-wrap justify-center gap-3 sm:gap-4">
        {[
          'Publications',
          'Internal Reports',
          'Annual Reports',
          '30 Years of Excellence',
          'Vision 2047',
        ].map((tab) => (
          <button
            key={tab}
            className={`rounded-full px-4 py-2 text-sm font-semibold shadow-md transition-all duration-300 sm:text-base md:text-lg ${
              activeTab === tab
                ? 'scale-105 bg-blue-600 text-white'
                : 'bg-slate-200 hover:bg-slate-300'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="rounded-lg border border-slate-300 bg-slate-50 p-4 sm:p-6">
        {/* Publications */}
        {activeTab === 'Publications' && (
          <div>
            <h2 className="mb-4 border-b-2 border-blue-500 pb-2 text-xl font-bold text-slate-800 sm:text-2xl">
              Publications
            </h2>
            <div className="mb-4">
              <label className="mr-2 text-base font-semibold text-slate-800">
                Select Year:
              </label>
              <select
                className="rounded border border-slate-300 px-3 py-2 text-base"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && publications.length === 0 && (
              <p>No publications found.</p>
            )}
            {!loading && !error && (
              <ul className="space-y-4 text-sm sm:text-base">
                {publications.map((pub, index) => (
                  <li key={index} className="text-slate-700">
                    <strong className="text-slate-900">
                      {pub.authors.map((author, id) => (
                        <span key={id}>
                          {author}
                          {id !== pub.authors.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </strong>{' '}
                    {pub.title}. <em>{pub.journal}</em>
                    {pub.doi && (
                      <>
                        {' '}
                        (DOI:{' '}
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {pub.doi}
                        </a>
                        )
                      </>
                    )}{' '}
                    {pub.link && (
                      <button
                        lassName="inline-flex items-center space-x-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 transition-colors duration-150 ease-in-out hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2" // Added focus styles
                        aria-label="Download or view publication PDF"
                        // onClick={() => {
                        //   window.open(
                        //     `${ASSETS_BASE_URL_NEW}/${pub.link}`,
                        //     '_blank'
                        //   );
                        // }}
                        onClick={() => {
                          window.open(
                            `www.ncmrwf.gov.in/${pub.link}`,
                            '_blank'
                          );
                        }}
                      >
                        Link
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Annual Reports */}
        {activeTab === 'Annual Reports' && (
          <div>
            <h2 className="mb-4 border-b-2 border-blue-500 pb-2 text-xl font-bold text-slate-800 sm:text-2xl">
              Annual Reports
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {annualReports.map((report, index) => (
                <a
                  key={index}
                  href={`${ASSETS_BASE_URL_NEW}${report.link}`}
                  className="flex flex-col items-center rounded-lg p-4 transition hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={report?.image}
                    alt="Annual Report"
                    className="w-32 rounded-lg shadow-md sm:w-40"
                  />
                  <span className="mt-3 text-base font-semibold text-blue-600">
                    {report.year}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Internal Reports */}
        {activeTab === 'Internal Reports' && (
          <div>
            <h2 className="mb-4 border-b-2 border-blue-500 pb-2 text-xl font-bold text-slate-800 sm:text-2xl">
              Internal Reports
            </h2>
            <div className="mb-4">
              <label className="mr-2 text-base font-semibold text-slate-800">
                Select Report Type:
              </label>
              <select
                className="rounded border border-slate-300 px-3 py-2 text-base"
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
              >
                <option value="">All Reports</option>
                <option value="technical">Technical</option>
                <option value="verification">Verification</option>
                <option value="research">Research</option>
                <option value="observation">Observational Monitoring</option>
                <option value="erp-reports">ERP Reports</option>
                <option value="project">Project</option>
                <option value="mme">MME</option>
                <option value="mme">Conference</option>
              </select>
            </div>
            <ul className="space-y-3 text-sm sm:text-base">
              {internalReports?.length > 0 ? (
                internalReports.map((report, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <a
                      href={`${ASSETS_BASE_URL_NEW}${report.link}`}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {report.title}
                    </a>
                    {report.status === 'new' && (
                      <span className="ml-2 rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white">
                        New
                      </span>
                    )}
                  </li>
                ))
              ) : (
                <p>No internal reports available.</p>
              )}
            </ul>
          </div>
        )}

        {/* 30 Years of Excellence */}
        {activeTab === '30 Years of Excellence' && (
          <div>
            <h2 className="mb-4 border-b-2 border-green-500 pb-2 text-xl font-bold text-slate-800 sm:text-2xl">
              30 Years of Excellence in Operational Numerical Weather Prediction
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {thirtyYearPdfs.length === 0 ? (
                <p>No PDFs available.</p>
              ) : (
                thirtyYearPdfs.map((pdf, index) => (
                  <Link
                    key={index}
                    to={`${ASSETS_BASE_URL_NEW}${pdf.link}`}
                    className="flex flex-col items-center rounded-lg p-4 transition hover:scale-105"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={pdf.image || 'default-annual-report-image.jpg'}
                      alt="30 Years of Excellence"
                      className="w-40 rounded-lg shadow-md sm:w-48"
                    />
                    <span className="mt-3 text-center text-base font-semibold text-blue-600">
                      {pdf.title}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}

        {/* Vision 2047 */}
        {activeTab === 'Vision 2047' && (
          <div>
            <h2 className="border-purple-500 mb-4 border-b-2 pb-2 text-xl font-bold text-slate-800 sm:text-2xl">
              Vision 2047
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {vision2047Pdfs.length === 0 ? (
                <p>No PDFs available.</p>
              ) : (
                vision2047Pdfs.map((pdf, index) => (
                  <Link
                    key={index}
                    to={`${ASSETS_BASE_URL_NEW}${pdf.link}`}
                    className="flex flex-col items-center rounded-lg p-4 transition hover:scale-105"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={pdf.image || 'default-annual-report-image.jpg'}
                      alt="Vision-2047"
                      className="w-40 rounded-lg shadow-md sm:w-48"
                    />
                    <span className="mt-3 text-center text-base font-semibold text-blue-600">
                      {pdf.title}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Publications;
