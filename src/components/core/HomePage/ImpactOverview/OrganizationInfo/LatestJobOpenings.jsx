import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { latestJobs } from '../../../../../data/latest-openings';

const LatestJobOpenings = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language.locale;

  return (
    <div className="relative">
      <div className="flex flex-col gap-2">
        <h2 className="text-gray-800 text-center text-2xl font-semibold">
          Latest Job Openings
        </h2>
        <div className="mt-3 grid h-72 grid-cols-1 gap-4 overflow-y-scroll p-2 sm:grid-cols-2">
          {latestJobs.map(({ id, title, description, location }) => (
            <div
              key={id}
              className="p-4transition-transform group relative transform overflow-hidden rounded-lg bg-white hover:scale-105"
            >
              <h3 className="text-lg font-semibold text-blue-700">
                {title[locale]}
              </h3>
              <p className="text-gray-600 mt-1 text-sm">
                {`${description[locale].substring(0, 20)}...`}
              </p>
              <p className="text-gray-500 mt-2 text-sm font-medium">
                {location}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-6 right-0">
        <Link
          to="/all-jobs"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          See All Jobs
        </Link>
      </div>
    </div>
  );
};

export default LatestJobOpenings;
