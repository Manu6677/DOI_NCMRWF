import React, { useEffect, useState } from 'react';
import { fetchBulletinBoardPDFNames } from '../../../services/operations/bulletinAPI';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBulletinData,
  setBulletinData,
} from '../../../slices/bulletinSlice';

const ASSETS_BASE_URL = process.env.REACT_APP_ASSETS_BASE_URL_NEW;

const BulletinBoard = () => {
  const dispatch = useDispatch();
  const bulletins = useSelector(selectBulletinData);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getBulletins = async () => {
      if (bulletins.length === 0) {
        const { data } = await fetchBulletinBoardPDFNames();
        console.log('data bulletin', data);
        dispatch(setBulletinData(data));
      }
    };

    getBulletins();
  }, [dispatch, bulletins]);

  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container');

    if (scrollContainer) {
      scrollContainer.style.animationPlayState = isHovered
        ? 'paused'
        : 'running';
    }
  }, [isHovered]);

  return (
    <div className="h-[70vh] space-y-4 overflow-hidden rounded-lg bg-gradient-to-r from-blue-100 p-6 shadow-md">
      <div className="scroll-container">
        {[...bulletins, ...bulletins].map((bulletin, idx) => (
          <div
            key={idx}
            className="mb-4 rounded-lg border bg-white p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link
              to={`${ASSETS_BASE_URL}${bulletin?.link}`}
              className="block text-blue-600 transition-colors duration-300 hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="mb-2 flex items-center gap-2 text-lg font-semibold">
                {bulletin.title}
                {bulletin.most_recent && (
                  <span className="rounded bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                    NEW
                  </span>
                )}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BulletinBoard;
