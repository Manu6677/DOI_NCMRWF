import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const countries = [
  { name: 'Bangladesh', flag: '🇧🇩', slug: 'bangladesh' },
  { name: 'Bhutan', flag: '🇧🇹', slug: 'bhutan' },
  { name: 'Myanmar', flag: '🇲🇲', slug: 'myanmar' },
  { name: 'Nepal', flag: '🇳🇵', slug: 'nepal' },
  { name: 'Sri Lanka', flag: '🇱🇰', slug: 'sri-lanka' },
  { name: 'Thailand', flag: '🇹🇭', slug: 'thailand' },
];

const BimstecCharts = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-6 py-14 text-white">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-4 text-5xl font-extrabold text-blue-400">
          BIMSTEC Forecast Charts
        </h2>
        <p className="mb-12 text-xl text-slate-300">
          Click the country for respective forecast charts
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((country) => (
            <motion.button
              key={country.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex w-full cursor-pointer flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition hover:shadow-xl"
              onClick={() => navigate(`/bimstec-charts/${country.slug}`)}
            >
              <span className="mb-4 text-7xl sm:text-8xl">{country.flag}</span>
              <span className="text-xl font-semibold text-slate-700 sm:text-2xl">
                {country.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BimstecCharts;
