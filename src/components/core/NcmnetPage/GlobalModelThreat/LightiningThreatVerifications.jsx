import React from 'react';

// Assuming you might want to reuse the header and footer or parts of it later.
// For now, this component will just focus on displaying the verification image.

const LightningThreatVerifications = () => {
  // Define the base URL for your assets, same as in your forecast page
  const baseUrl =
    process.env.REACT_APP_ASSETS_BASE_URL_NEW || 'https://nwp.ncmrwf.gov.in';

  const verificationImageUrl = `${baseUrl}/verification/Verif_RPLB.png`;
  const placeholderImageUrl = '/placeholder-map.png'; // A fallback placeholder

  return (
    <div className="min-h-screen bg-slate-50 p-2 selection:bg-blue-100 sm:p-4">
      {/* You might want to add a similar header here as in LightningThreatForecastPage */}
      {/* <HeaderComponent /> */}

      <main className="mt-6 rounded-lg bg-white p-4 shadow-lg sm:p-6">
        <h2 className="mb-4 text-center text-xl font-semibold text-blue-700 sm:text-2xl">
          Lightning Threat Verification
        </h2>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-4xl">
            {' '}
            {/* Constrain the width of the image container */}
            <img
              src={verificationImageUrl}
              alt="Lightning Threat Verification - RPLB"
              className="h-auto w-full rounded border border-slate-300 object-contain shadow-md"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop if placeholder also fails
                e.target.src = placeholderImageUrl;
                e.target.alt = 'Verification image not available';
              }}
            />
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-slate-600">
          Verification product: Verif_RPLB.png
        </p>
      </main>
    </div>
  );
};

export default LightningThreatVerifications;
