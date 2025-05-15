import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { specialProductsData } from '../../../../data/special-products-data';

const SpecialProducts = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll
    ? specialProductsData
    : specialProductsData.slice(0, 6);

  const translations = {
    en: {
      heading: 'Special Products',
      description:
        'Get real-time weather updates, severe alerts, regional services, aviation data, and multi-hazard insights for better forecasting.',
      buttonTranslation: 'See all special Products',
    },
    hi: {
      heading: 'विशेष उत्पाद',
      description:
        'बेहतर पूर्वानुमान के लिए वास्तविक समय के मौसम अपडेट, गंभीर चेतावनियाँ, क्षेत्रीय सेवाएँ, विमानन डेटा और बहु-जोखिम जानकारी प्राप्त करें।',
      buttonTranslation: 'सभी विशेष उत्पाद देखें',
    },
  };

  return (
    <section className="my-8 bg-gradient-to-r py-4 text-slate-900">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-3xl font-bold text-blue-700 md:text-5xl">
            {translations[locale]?.heading || translations.en.heading}
          </h2>
          <p className="text-lg text-blue-700 md:text-xl">
            {translations[locale]?.description || translations.en.description}
          </p>
        </div>

        <div className="mx-auto grid w-9/12 grid-cols-1 items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayedProducts.map((item, index) => (
            <ProductCard
              title={item.title[locale]}
              desc={item?.desc[locale]}
              img={item?.img}
              link={item?.link}
              key={index}
            />
          ))}
        </div>

        {/* Show More Button */}
        <div className="mt-8 text-center">
          <Link to="/forecast-dashboard/special-products">
            {' '}
            {/* Update the path to your Special Products page */}
            <button className="rounded-lg bg-blue-700 px-6 py-2 capitalize text-white hover:bg-blue-600">
              {translations[locale]?.buttonTranslation ||
                translations.en.buttonTranslation}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialProducts;
