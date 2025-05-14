// src/App.js
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Layout Component
import MainLayout from './components/layout/MainLayout';

// Common Components (Keep Spinner eager for fallback)
import Spinner from './components/common/Spinner';
import ProtectedRoute from './components/common/ProtectedRoute';
import DataMonitoring from './components/core/NcmnetPage/DataMonitoring';
import DataDetailsPage from './components/core/NcmnetPage/DataMonitoring/DataDetailsPage';
import DataTypesExplanationPage from './components/core/NcmnetPage/DataMonitoring/DataTypesExplanationPage';
import RtmPortal from './components/core/NcmnetPage/RtmPortal';

// --- Lazy-Loaded Page/Feature Components ---
// Structure/Core Pages
const ObservationMenu = lazy(
  () => import('./components/core/ObservationReport/ObservationMenu')
);
const MonthlyObservation = lazy(
  () => import('./components/core/ObservationReport/MonthlyObservation')
);
const DailyObservation = lazy(
  () => import('./components/core/ObservationReport/DailyObservation')
);
const RegionSelection = lazy(
  () => import('./components/core/ERPReports/RegionSelection')
);
const WeeklyPdfFetcher = lazy(
  () => import('./components/core/ERPReports/WeeklyPdfFetcher')
);

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const DirectorDesk = lazy(
  () => import('./components/core/AboutPage/DirectorDesk')
);
const OrganizationalStructure = lazy(
  () => import('./components/core/AboutPage/OrganizationalStructure')
);
const FormerDirectors = lazy(
  () => import('./components/core/AboutPage/FormerDirectors')
);
const Careers = lazy(() => import('./pages/Careers'));
const AllJobs = lazy(() => import('./pages/AllJobs'));
const JobDetails = lazy(
  () => import('./components/core/AboutPage/CareersPage/AllJobsPage/JobDetails')
);
const Employees = lazy(() => import('./pages/Employees'));
const Research = lazy(() => import('./pages/Research'));
const Publications = lazy(() => import('./pages/Publications'));
const Milestones = lazy(() => import('./pages/Milestones'));
const Bimstec = lazy(() => import('./pages/Bimstec'));
const BimstecCharts = lazy(() => import('./pages/BimstecCharts'));
const BimstecDashboard = lazy(() => import('./pages/BimstecDashboard'));
const BimstecProducts = lazy(
  () => import('./components/core/BimstecDashboard/BimstecProducts')
);
const Reanalysis = lazy(() => import('./pages/Reanalysis'));
const AllProjects = lazy(() => import('./pages/AllProjects'));
const PartnerStakeholderPage = lazy(
  () => import('./components/core/AboutPage/Projects/PartnerStakeholderPage')
);
const Collaborators = lazy(
  () => import('./components/core/AboutPage/Projects/Collaborators')
);
const WeatherModelsPage = lazy(() => import('./pages/WeatherModelsPage'));

// Forecast Dashboard Related
const ForecastDashboard = lazy(() => import('./pages/ForecastDashboard'));
const ModelProducts = lazy(
  () =>
    import(
      './components/core/ForecastDashboardPage/ForecastSidebarMenu/ModelProducts'
    )
);
const SpecialModelProdcuts = lazy(
  () =>
    import(
      './components/core/ForecastDashboardPage/ForecastSidebarMenu/SpecialModelProdcuts'
    )
);
const ObservationProducts = lazy(
  () =>
    import(
      './components/core/ForecastDashboardPage/ForecastSidebarMenu/ObservationProducts'
    )
);
const AllSpecialProducts = lazy(() => import('./pages/AllSpecialProducts'));
// const ForecastProducts = lazy(() => import('./pages/ForecastProducts')); // Assuming this is used if uncommented

// Computing Related
const Hpc = lazy(() => import('./components/core/Computing/Hpc'));

// NCMNET Related
const Ncmnet = lazy(() => import('./pages/Ncmnet'));
const MonthlyReportsPage = lazy(
  () => import('./components/core/NcmnetPage/MonthlyReportsPage')
);
const ObservationSubOptionPage = lazy(
  () => import('./components/core/NcmnetPage/ObservationSubOptionPage')
);
const DataAssimilationReport = lazy(
  () => import('./components/core/NcmnetPage/DataAssimilationReport')
);
const AboutMet = lazy(
  () => import('./components/core/NcmnetPage/Met/AboutMet')
);
const ModeMet = lazy(() => import('./components/core/NcmnetPage/Met/ModeMet'));
const RmseCharts = lazy(
  () => import('./components/core/NcmnetPage/PointStat/RmseCharts')
);
const MatchedPairPlot = lazy(
  () => import('./components/core/NcmnetPage/PointStat/MatchedPairPlot')
);
const NepsPlume = lazy(() => import('./components/core/NcmnetPage/NepsPlume'));
const Incompass = lazy(() => import('./components/core/NcmnetPage/Incompass'));
const NcmrwfAnalysisVerification = lazy(
  () => import('./components/core/NcmnetPage/NcmrwfAnalysisVerification')
);
const GfsBiasCorrectedTemperatures = lazy(
  () => import('./components/core/NcmnetPage/GfsBiasCorrectedTemperatures')
);
const LightningThreatForecastPage = lazy(
  () =>
    import(
      './components/core/NcmnetPage/GlobalModelThreat/LightningThreatForecastPage'
    )
);
const LightningThreatVerifications = lazy(
  () =>
    import(
      './components/core/NcmnetPage/GlobalModelThreat/LightiningThreatVerifications'
    )
);
const OfficeOrdersPage = lazy(
  () => import('./components/core/NcmnetPage/OfficeOrdersPage')
);

// Footer Links / Misc Pages
const WebAdministrator = lazy(() => import('./pages/WebAdministrator'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const ContactHead = lazy(
  () => import('./components/common/ContactUs/ContactHead')
);
const DownloadForms = lazy(
  () => import('./components/common/Footer/DownloadForms')
);
const Tenders = lazy(() => import('./components/common/Footer/Tenders'));
const Notices = lazy(() => import('./components/common/Footer/Notices'));
const RtiSection = lazy(() => import('./components/common/Footer/RtiSection'));
const IccWomen = lazy(() => import('./components/common/Footer/IccWomen'));
const RajbhashaPortal = lazy(() => import('./pages/RajbhashaPortal'));
const RajbhashaProgram = lazy(
  () => import('./components/core/AboutPage/RajbhashaProgram/RajbhashaProgram')
);
const PolicyPage = lazy(() => import('./pages/PolicyPage'));
const PhotoGallery = lazy(
  () =>
    import(
      './components/core/HomePage/ImpactOverview/OrganizationInfo/PhotoGallery'
    )
);
const MembershipForm = lazy(
  () => import('./components/core/MembershipForm/MembershipForm')
);
const StaticCyclone = lazy(
  () => import('./components/core/TropicalCyclone/StaticCyclone')
);

// Auth / Error
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Error = lazy(() => import('./pages/Error'));

function App() {
  return (
    <div className="min-h-screen w-screen bg-white">
      {/* Central Suspense for all lazy-loaded routes within MainLayout */}
      {/* Routes outside MainLayout (like Login, Error) need their own Suspense if lazy */}
      <Routes>
        {/* Routes using the MainLayout (Header, Navbar, Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/about/directors-desk" element={<DirectorDesk />} />
          <Route
            path="/about-us/organizationalstructure"
            element={<OrganizationalStructure />}
          />
          <Route path="/observation-monitoring" element={<ObservationMenu />} />
          <Route
            path="/observation-monitoring/monthly"
            element={<MonthlyObservation />}
          />
          <Route
            path="/observation-monitoring/daily"
            element={<DailyObservation />}
          />
          <Route path="/region-selection" element={<RegionSelection />} />
          <Route path="/region/:region/:type" element={<WeeklyPdfFetcher />} />
          <Route path="/about/former-directors" element={<FormerDirectors />} />
          <Route path="/about/careers" element={<Careers />} />
          <Route path="/all-jobs" element={<AllJobs />} />
          <Route path="/job-detail" element={<JobDetails />} />{' '}
          {/* Consider lazy loading if JobDetails is heavy */}
          <Route path="/research" element={<Research />} />
          <Route path="/bimstec" element={<Bimstec />} />
          <Route path="/bimstec/charts" element={<BimstecCharts />} />
          <Route path="/reanalysis" element={<Reanalysis />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/full-gallery" element={<PhotoGallery />} />
          <Route path="/computing/milestones" element={<Milestones />} />
          <Route path="/computing/hpc-systems" element={<Hpc />} />
          <Route path="/special-products" element={<AllSpecialProducts />} />
          {/* <Route path="/forecast-products/:modelType" element={<ForecastProducts />} /> */}
          <Route path="/model-guidance" element={<WeatherModelsPage />} />
          <Route path="/about/employees" element={<Employees />} />
          <Route path="/web-administrator" element={<WebAdministrator />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/download-forms" element={<DownloadForms />} />
          <Route path="/tenders" element={<Tenders />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/rti-section" element={<RtiSection />} />
          <Route path="/icc-for-women" element={<IccWomen />} />
          <Route path="/rajbhasha-portal" element={<RajbhashaPortal />} />
          <Route path="/rajbhasha/:id" element={<RajbhashaProgram />} />
          <Route path="/privacy-policy" element={<PolicyPage />} />
          <Route path="/cookie-policy" element={<PolicyPage />} />
          <Route path="/terms-of-use" element={<PolicyPage />} />
          <Route path="/all-projects" element={<AllProjects />} />
          <Route path="/collaborators" element={<Collaborators />} />
          <Route path="/stakeholders" element={<PartnerStakeholderPage />} />
          <Route
            path="/download-forms/membership"
            element={<MembershipForm />}
          />
          <Route path="/contact-us/head" element={<ContactHead />} />
          {/* Nested Layout Routes */}
          <Route element={<ForecastDashboard />}>
            {' '}
            {/* Keep this if ForecastDashboard provides its own sub-layout/context */}
            <Route
              path="forecast-dashboard/model-products"
              element={<ModelProducts />}
            />
            <Route
              path="forecast-dashboard/special-products"
              element={<SpecialModelProdcuts />}
            />
            <Route
              path="forecast-dashboard/observation-products"
              element={<ObservationProducts />}
            />
          </Route>
          <Route element={<BimstecDashboard />}>
            {' '}
            {/* Keep this if BimstecDashboard provides its own sub-layout/context */}
            <Route path="bimstec-charts/*" element={<BimstecProducts />} />
          </Route>
          {/* NCMNET Routes - Protected */}
          <Route
            element={
              <ProtectedRoute>
                <Ncmnet />
              </ProtectedRoute>
            }
          >
            {' '}
            {/* Keep this if Ncmnet provides its own sub-layout/context */}
            <Route path="ncmnet/*" element={<MonthlyReportsPage />} />
            <Route
              path="ncmnet/monthly-reports/:reportType"
              element={<MonthlyReportsPage />}
            />
            <Route
              path="/ncmnet/observation-monitoring/:subOptionSlug"
              element={<ObservationSubOptionPage />}
            />
            <Route path="/ncmnet/rtm-portal" element={<RtmPortal />} />
            <Route
              path="/ncmnet/data-assimilation-report"
              element={<DataAssimilationReport />}
            />
            <Route path="/ncmnet/met/about-met" element={<AboutMet />} />
            <Route path="/ncmnet/met/mode" element={<ModeMet />} />
            <Route
              path="/ncmnet/met/point-stat/rmse"
              element={<RmseCharts />}
            />
            <Route
              path="/ncmnet/met/point-stat/mpr/:hpaLevel"
              element={<MatchedPairPlot />}
            />
            <Route
              path="/ncmnet/Incompass/:chartType"
              element={<Incompass />}
            />
            <Route
              path="/ncmnet/ncmrwf-analysis-verification/:viewType"
              element={<NcmrwfAnalysisVerification />}
            />
            <Route path="/ncmnet/neps-plume" element={<NepsPlume />} />
            <Route
              path="/ncmnet/gfs-bias-corrected-temperatures/:mode"
              element={<GfsBiasCorrectedTemperatures />}
            />
            <Route
              path="/ncmnet/gfs-bias-corrected-temperatures/:mode"
              element={<GfsBiasCorrectedTemperatures />}
            />
            <Route
              path="/ncmnet/data-monitoring"
              element={<DataMonitoring />}
            />
            <Route
              path="/ncmnet/explanation-of-data-types"
              element={<DataTypesExplanationPage />}
            />
            <Route
              path="/ncmnet/data-monitoring/:dataType/:cycleTime"
              element={<DataDetailsPage />}
            />
            <Route
              path="/ncmnet/gfs-bias-corrected-temperatures/forecast"
              element={<LightningThreatForecastPage />}
            />
            <Route
              path="/ncmnet/gfs-bias-corrected-temperatures/verification"
              element={<LightningThreatVerifications />}
            />
            <Route
              path="/ncmnet/office-orders"
              element={<OfficeOrdersPage />}
            />
          </Route>
        </Route>

        {/* Routes WITHOUT the MainLayout (e.g., Login, Signup, Error) */}
        {/* Wrap these in Suspense individually if they are lazy-loaded */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<Spinner />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<Spinner />}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Spinner />}>
              <Error />
            </Suspense>
          }
        />
        <Route
          path="/forecast-dashboard/special-products/statiscyclone"
          element={
            <React.Suspense fallback={<Spinner />}>
              <StaticCyclone />
            </React.Suspense>
          }
        />

        <Route path="/contact-us/head" element={<ContactHead />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Error />} />
      </Routes>

      {/* Footer moved to MainLayout */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
