import React from 'react';
import ncmrwfLogo from '../../../../assets/images/NCMRWF_Logo_Hindi-English.png';
import emblemLight from '../../../../assets/svgs/Emblem-of-India-logo-vector-01.svg';
// import { FiExternalLink } from 'react-icons/fi'; // Example icon

const LightningThreatForecastPage = () => {
  const baseUrl =
    process.env.REACT_APP_ASSETS_BASE_URL_NEW || 'https://nwp.ncmrwf.gov.in';
  const verificationImageUrl = `${baseUrl}/verification/Verif_RPLB.png`;

  const legendItems = [
    { color: 'bg-red-600', hoverColor: 'hover:bg-red-700', label: 'Extreme' },
    {
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      label: 'High',
    },
    {
      color: 'bg-yellow-400',
      hoverColor: 'hover:bg-yellow-500',
      label: 'Moderate',
    },
    { color: 'bg-lime-500', hoverColor: 'hover:bg-lime-600', label: 'Low' },
    { color: 'bg-sky-400', hoverColor: 'hover:bg-sky-500', label: 'Very Low' },
    {
      color: 'bg-slate-300',
      hoverColor: 'hover:bg-slate-400',
      label: 'No Threat',
    },
  ];

  const Legend = () => (
    <div className="mt-2 flex flex-col space-y-1.5 pr-2 sm:pr-3">
      {legendItems.map((item) => (
        <div
          key={item.label}
          className="group flex cursor-default items-center"
        >
          <div
            className={`size-3.5 sm:size-4 ${item.color} ${item.hoverColor} mr-2 rounded-sm border border-slate-500 transition-colors duration-150 ease-in-out`}
          ></div>
          <span className="text-xs text-slate-700 transition-colors duration-150 ease-in-out group-hover:text-slate-900">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-2 selection:bg-blue-100 sm:p-4">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center justify-between rounded-md bg-white p-3 shadow-sm">
          <div className="flex flex-shrink-0 items-center space-x-2 sm:space-x-3">
            <img
              src={emblemLight}
              alt="Emblem of India"
              className="h-10 sm:h-12"
            />
            <div className="h-10 w-px bg-slate-300 sm:h-12"></div>
            <p className="hidden text-xs font-semibold text-blue-700 sm:text-sm md:block">
              ESSO
            </p>
          </div>
          <div className="text-center">
            <h1 className="text-xs font-bold uppercase tracking-wide text-blue-800 sm:text-sm">
              National Centre for Medium Range Weather Forecasting
            </h1>
            <h2 className="text-[10px] text-blue-700 sm:text-xs">
              EARTH SYSTEM SCIENCE ORGANIZATION (ESSO)
            </h2>
            <h3 className="text-[10px] text-blue-700 sm:text-xs">
              MINISTRY OF EARTH SCIENCES, GOVERNMENT OF INDIA
            </h3>
          </div>
          <img
            src={ncmrwfLogo}
            alt="NCMRWF Logo"
            className="h-12 flex-shrink-0 sm:h-14"
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="rounded-lg bg-white p-4 shadow-lg sm:p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Left Side - Text Description & Verification Link */}
          <div className="md:w-2/5 lg:w-1/3">
            <h2 className="mb-3 text-xl font-semibold text-blue-700 sm:text-2xl">
              Global Lightning Threat Product
            </h2>
            <div className="prose prose-sm prose-slate max-w-none leading-relaxed text-slate-700">
              <p>
                Cloud to Ground (CG) lightning threat is a derived product from
                the Revised PR-Lopez Blended (RPLB) scheme, utilizing the NCUM-G
                model (12km resolution).
              </p>
              <p>
                Threat indices are categorized as: "No-Threat", "Very Low",
                "Low", "Medium", "High", and "Extreme".
              </p>
            </div>
            {/* Verification Link/Button Added Here */}
            <div className="mt-6">
              <a
                href={verificationImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                View Verification Product
                {/* Optional: Icon */}
                {/* <FiExternalLink className="ml-2 size-4" /> */}
              </a>
            </div>
          </div>

          {/* Right Side - Maps */}
          <div className="md:w-3/5 lg:w-2/3">
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {[
                {
                  title: 'RPLB CG Threat Valid on 20250519',
                  imgSrc: `${baseUrl}/CURTAIN/plot/Accumulated.gif`,
                  altText: 'Accumulated Lightning Threat',
                },
                {
                  title: '12-15 UTC (20250518)',
                  imgSrc: `${baseUrl}/CURTAIN/plot/anim_3hrly.gif`,
                  altText: 'Animated 3-hourly Lightning Threat',
                },
              ].map((mapItem, index) => (
                <div
                  key={index}
                  className="transform rounded-lg border border-slate-200 bg-slate-50 p-2 shadow-md transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-xl"
                >
                  <h3 className="mb-2 text-center text-sm font-medium text-slate-800 sm:text-base">
                    {mapItem.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex-grow">
                      <img
                        src={mapItem.imgSrc}
                        alt={mapItem.altText}
                        className="h-auto w-full rounded border border-slate-300 object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder-map.png';
                        }}
                      />
                    </div>
                    <div className="mt-2 flex-shrink-0 sm:ml-2 sm:mt-0">
                      <Legend />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <footer className="mt-8 py-4 text-center">
        <div className="mx-auto max-w-3xl text-xs text-slate-500">
          <p className="mb-1">
            <strong>Disclaimer:</strong> NCMRWF is a Research and Development
            Organization.
          </p>
          <p>
            The products and the conclusions drawn thereof are based on
            Numerical Weather Prediction (NWP) models being run at NCMRWF.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LightningThreatForecastPage;
