import React from 'react';
import { Link } from 'react-router-dom';

const FlyoutContent = ({ links, language = 'en' }) => {
  return (
    <div className="w-48 rounded-lg bg-[rgb(241_242_255_/_var(--tw-bg-opacity))] p-4 shadow-lg">
      <div className="space-y-3">
        {links.map((link, index) => (
          <Link
            key={index}
            to={`${link.path}`}
            className="text-gray-700 block text-sm capitalize transition-colors duration-200 hover:text-blue-600 hover:underline"
          >
            {link.title[language]}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FlyoutContent;
