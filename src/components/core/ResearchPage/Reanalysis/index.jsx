import { Link } from 'react-router-dom'; // Import Link component for routing
import reanalysisImg from '../../../../assets/images/reanalysis.png';

const Reanalysis = () => {
  return (
    <div className="flex flex-col items-center bg-blue-700 p-6 text-white shadow-lg md:flex-row">
      {/* Image Section */}
      <div className="mb-4 w-full md:mb-0 md:w-1/2">
        <img
          src={reanalysisImg}
          alt="reanalysis"
          className="size-full rounded-xl object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="w-full text-justify md:w-1/2 md:pl-6">
        <h2 className="mb-4 text-2xl font-bold">About NCMRWF</h2>
        <p className="mb-4">
          The National Centre for Medium Range Weather Forecasting (NCMRWF) is a
          Centre of Excellence in Weather and Climate Modelling under the
          Ministry of Earth Sciences. The mission of the Centre is to
          continuously develop advanced numerical weather prediction systems,
          with increased reliability and accuracy over India and neighboring
          regions through research, development, and demonstration of new and
          novel applications, maintaining the highest level of knowledge,
          skills, and technical bases.
        </p>
        <p className="mb-4">This data web portal contains:</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            IMDAA Data - High resolution (12km, 1-hourly) regional reanalysis
            over India, from 1979 to 2018 (Extended up to December 2020).
          </li>
          <li>
            NGFS Data - High resolution (25km, 6-hourly) Global reanalysis, from
            1999 to 2018.
          </li>
        </ul>
        <p>
          For continuity beyond 31 December 2020, NCMRWF is releasing IMDAA-Like
          products derived from the operational NCMRWF Unified Model (NCUM)
          global NWP system of 12 km resolution. Unlike IMDAA reanalysis
          products, a few of the IMDAA-Like products are only available at
          3-hourly intervals. Multi-level IMDAA-Like products are available only
          at 18 pressure levels. For more details, kindly refer to the table in
          the "ABOUT IMDAA" tab.
        </p>

        {/* Button to redirect to the Reanalysis page */}
        <div className="mt-8">
          <Link
            to="https://rds.ncmrwf.gov.in/"
            className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
          >
            Go to Reanalysis Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reanalysis;
