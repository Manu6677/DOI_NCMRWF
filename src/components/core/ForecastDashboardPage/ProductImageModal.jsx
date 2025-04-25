import React, { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';

const ProductImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="animate-fadeIn relative w-full max-w-3xl rounded-2xl bg-blue-50 p-6 shadow-2xl transition-transform duration-300">
        {/* Close Button */}
        <button
          className="cursor-pointer·text-blue-900·transition absolute right-4 top-4"
          onClick={onClose}
        >
          <IoIosCloseCircle className="text-2xl" />
        </button>

        {/* Title */}
        <h2 className="mb-6 text-center text-3xl font-bold text-blue-900">
          Forecast Product
        </h2>

        {/* Filters */}
        {/* <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-blue-800">
              Date:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={yesterdayStr}
              max={today}
              className="w-full rounded-lg p-2 text-blue-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-blue-800">
              utc:
            </label>
            <select
              value={selectedUtc}
              onChange={(e) => setSelectedUtc(e.target.value)}
              className="w-full rounded-lg p-2 text-blue-900 focus:ring-2 focus:ring-blue-500"
            >
              {['00', '06', '12', '18'].map((utc) => (
                <option key={utc} value={utc}>
                  {utc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-blue-800">
              hpa:
            </label>
            <select
              value={selectedHpa}
              onChange={(e) => setSelectedHpa(e.target.value)}
              className="w-full rounded-lg p-2 text-blue-900 focus:ring-2 focus:ring-blue-500"
            >
              {['500', '700', '850', '1000'].map((hpa) => (
                <option key={hpa} value={hpa}>
                  {hpa}
                </option>
              ))}
            </select>
          </div>
        </div> */}

        {/* Image Section */}
        <div className="rounded-lg·bg-blue-300·p-4·flex·justify-center">
          <img
            src={imageUrl}
            alt="Forecast Product"
            className="max-h-[65vh] w-full rounded-lg shadow-lg transition-transform duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImageModal;
