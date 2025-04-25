import React, { useState, useEffect } from 'react';

const ASSETS_BASE_URL = process.env.REACT_APP_ASSETS_BASE_URL_NEW;
const BASE_PATH = process.env.REACT_APP_ASSETS_BASE_URL_NEW_BASE_PATH;

const EnsembleRainfallPage = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const openLink = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const baseRainUrl = `${ASSETS_BASE_URL}/${BASE_PATH}/${formattedDate}/12-km-ENSEMBLE-Outputs/Ensemble-Stamps/neps_stamp-pptn-day`;
    const urls = [];
    for (let i = 1; i <= 10; i++) {
      urls.push(`${baseRainUrl}${i}.png?v=${Date.now()}`); // ⬅️ cache-busting
    }
    setImageUrls(urls);
  }, []);

  return (
    <div className="dark:bg-gray-900 min-h-screen bg-slate-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-gray-800 dark:text-gray-200 mb-8 text-center text-2xl font-bold">
          Ensemble Rainfall Stamps
        </h1>
        <div className="flex flex-col items-center">
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className="mb-8 flex flex-col items-center justify-center"
            >
              <p className="text-gray-600 dark:text-gray-400 mt-2 pb-3 text-xl font-semibold">
                Day {index + 1}
              </p>
              <img
                src={url}
                alt={`Day ${index + 1}`}
                className="max-h-[800px] max-w-[100%] rounded-md shadow-lg"
                style={{ maxWidth: '100%' }}
                onError={(e) => {
                  e.currentTarget.src =
                    'https://placehold.co/600x400/EEE/31343C?text=No+Image';
                  e.currentTarget.alt = 'Placeholder';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnsembleRainfallPage;
