import React from 'react';

const Disclaimer = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8">
      <div className="py-4">
        <p className="text-3xl font-semibold text-richblack-500 sm:text-4xl">
          Disclaimer
        </p>
      </div>
      <div className="w-full max-w-6xl px-4">
        {/* Info */}
        <p className="rounded-md p-4 text-lg leading-relaxed text-richblack-400 sm:text-2xl">
          NCMRWF is a Research and Development Organisation. The products and
          the conclusions drawn thereof are based on Numerical Weather
          Prediction (NWP) models being run at NCMRWF.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
