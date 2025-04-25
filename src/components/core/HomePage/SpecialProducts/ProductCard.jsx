import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ title, desc, img, link }) => {
  return (
    <div className="group relative flex h-[27rem] max-w-lg items-center justify-center overflow-hidden rounded-lg bg-white transition-all duration-300 hover:scale-105">
      {/* Inline style to set background image dynamically */}
      <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-blue-700 bg-cover bg-center">
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50"></div>
      </div>
      <div className="relative px-6 py-10 text-center md:px-12">
        <h2 className="mb-6 text-2xl font-medium text-white">{desc}</h2>
        <h5 className="mb-4 text-xl font-semibold text-slate-300">{title}</h5>
        <img
          alt={`${title}-image`}
          src={img}
          className="relative inline-block h-20 w-20"
        />
      </div>

      {/* Learn More Button */}
      <div className="absolute -bottom-12 transition-all duration-300 group-hover:bottom-4">
        <Link
          to={'/forecast-dashboard'} // Add the appropriate path here
          className="inline-block rounded bg-blue-600 px-6 py-2 text-lg font-semibold text-white transition duration-300 hover:bg-blue-700"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
