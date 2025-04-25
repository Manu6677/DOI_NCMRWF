import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const KeyPartnersAndContributorsItem = ({ items, id }) => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;

  return (
    <div className="h-full rounded-2xl border border-richblack-5 bg-white p-6 transition duration-300 hover:scale-105 hover:border-customRed-500">
      <div className="flex flex-col items-center gap-6">
        <div>
          <img
            src={items.img}
            alt={`items-${id}`}
            className={`w-44 object-cover`}
          />
        </div>
        <p className="text-2xl font-semibold capitalize text-blue-700">
          {`${items.text[locale]}`}
        </p>
        <Link
          to={items.link}
          className="cursor-pointer font-semibold text-slate-800 transition-all duration-200 hover:scale-105 hover:underline"
        >
          {locale === 'hi' ? 'और जानें...' : 'Learn more...'}
        </Link>
      </div>
    </div>
  );
};

export default KeyPartnersAndContributorsItem;
