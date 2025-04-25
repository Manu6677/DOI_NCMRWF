import React from 'react';
import { useSelector } from 'react-redux';

const newsTitles = [
  { en: 'Weather Forecast Updated', hi: 'मौसम पूर्वानुमान अपडेट किया गया' },
  { en: 'New Climate Models Released', hi: 'नए जलवायु मॉडल जारी किए गए' },
  {
    en: 'Monsoon Impact Analysis Published',
    hi: 'मानसून प्रभाव विश्लेषण प्रकाशित',
  },
  { en: 'Severe Weather Alert Issued', hi: 'कठोर मौसम चेतावनी जारी' },
];

const TopTitles = () => {
  const { language } = useSelector((state) => state.language);
  const { locale } = language;

  return (
    <div className="bg-gray-100 relative flex items-center">
      {/* Fixed heading */}
      <div className="w-1/8 px-4 text-xl font-medium text-customRed-500">
        Top Headlines
      </div>

      {/* Scrolling news titles */}
      <div className="w-7/8 overflow-hidden">
        <div className="animate-scroll-titles flex gap-8 whitespace-nowrap text-blue-700">
          {newsTitles.map((title, index) => (
            <span
              key={index}
              className="cursor-pointer text-lg font-semibold hover:underline"
            >
              {title[locale]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopTitles;
