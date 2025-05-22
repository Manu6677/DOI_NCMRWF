import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVacancies } from '../../../../../services/operations/vacancyAPI';
import {
  setVacancyData,
  selectVacancies,
} from '../../../../../slices/vacancySlice';
import { Link } from 'react-router-dom';

const ASSETS_BASE_URL = process.env.REACT_APP_ASSETS_BASE_URL_NEW;

const LatestJobOpenings = () => {
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale || 'en';

  const allVacancies = useSelector(selectVacancies);
  const latestVacancies = allVacancies.filter(
    (vac) => vac.most_recent === true
  );

  useEffect(() => {
    if (allVacancies.length === 0) {
      fetchVacancies().then(({ data }) => dispatch(setVacancyData(data)));
    }
  }, [dispatch, allVacancies]);

  return (
    <div className="relative">
      <div className="flex flex-col gap-2">
        <h2 className="text-gray-800 text-center text-2xl font-semibold">
          Latest Job Openings
        </h2>
        <div className="mt-3 grid h-72 grid-cols-1 gap-4 overflow-y-scroll p-2 sm:grid-cols-2">
          {latestVacancies.length > 0 ? (
            latestVacancies.map((vacancy, index) => (
              <div
                key={index}
                className="group relative transform overflow-hidden rounded-lg bg-white p-4 transition-transform hover:scale-105"
              >
                <h3 className="text-lg font-semibold text-blue-700">
                  {Array.isArray(vacancy.vacancy_name)
                    ? vacancy.vacancy_name.join(', ')
                    : vacancy.vacancy_name}
                </h3>
                <p className="text-gray-600 mt-1 text-sm">
                  {vacancy.advt_no || 'No description'}
                </p>
                <p className="text-gray-500 mt-2 text-sm font-medium">
                  {vacancy.venue ? (
                    vacancy.venue
                  ) : vacancy.download_title?.[0] && vacancy.link?.[0] ? (
                    <a
                      href={`${ASSETS_BASE_URL}${vacancy.link[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {vacancy.download_title[0]}
                    </a>
                  ) : (
                    'Not Available'
                  )}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No recent vacancies available.
            </p>
          )}
        </div>
      </div>
      <div className="absolute -bottom-6 right-0">
        <Link
          to="/about/careers"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          See All Jobs
        </Link>
      </div>
    </div>
  );
};

export default LatestJobOpenings;
