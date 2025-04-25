import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { specialProductsData } from '../data/special-products-data';

const AllSpecialProducts = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;

  return (
    <section className="my-8 bg-gradient-to-r from-slate-50 to-slate-100 py-4 text-slate-900">
      <div className="mb-10 text-center">
        <h2 className="mb-4 text-3xl font-bold text-blue-700 md:text-5xl">
          All Special Products
        </h2>
        <p className="text-lg text-blue-700 md:text-xl">
          Explore the complete range of specialized products and services.
        </p>
      </div>

      <div className="mx-auto w-9/12 space-y-6">
        {specialProductsData.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center gap-6 rounded-lg p-6 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 md:flex-row ${
              index % 2 === 0 ? 'bg-slate-100' : 'bg-slate-200'
            }`}
          >
            <img
              src={item.img}
              alt={item.title[locale]}
              className="h-20 w-20 object-contain"
            />
            <div className="flex-grow">
              <h3 className="mb-2 text-2xl font-semibold text-blue-700">
                {item.title[locale]}
              </h3>
              <p className="mb-4 text-lg text-slate-700">{item.desc[locale]}</p>
              <Link
                to={`${item?.link}`}
                className="inline-block rounded bg-blue-700 px-4 py-2 font-semibold text-white transition hover:bg-blue-800"
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllSpecialProducts;
