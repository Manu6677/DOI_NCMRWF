const MonthlyObservation = () => {
  const urls = {
    'Monthly Observation Monitoring':
      'https://nwp.ncmrwf.gov.in/t574-model/obs_monitor/NCMRWF_MMR.pdf',
    'Monthly Ocean Observation':
      'https://nwp.ncmrwf.gov.in/t574-model/obs_ocean_monitor/merged_monthly.pdf',
  };

  return (
    <div className="to-cyan-50 min-h-screen w-full bg-gradient-to-br from-blue-50 via-white p-4">
      <h3 className="mb-16 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text pt-8 text-center text-5xl font-extrabold text-transparent drop-shadow-lg">
        Monthly Observation Monitoring
      </h3>

      {/* Atmosphere Section */}
      <div className="mx-auto mb-16 max-w-4xl">
        <h4 className="text-cyan-800 mb-6 text-center text-2xl font-bold">
          🌤️ Atmosphere
        </h4>

        <div className="flex justify-center">
          <div className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg">
            <a
              href={urls['Monthly Observation Monitoring']}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-700 hover:text-red-900"
            >
              <div className="rounded-full bg-red-100 px-6 py-3 text-lg font-bold text-red-700 shadow">
                Monthly Atmosphere Observation
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Ocean Section */}
      <div className="mx-auto max-w-4xl text-blue-700">
        <h4 className="text-cyan-800 mb-6 text-center text-2xl font-bold">
          🌊 Ocean
        </h4>

        <div className="flex justify-center">
          <div className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg">
            <a
              href={urls['Monthly Ocean Observation']}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-700 hover:text-cyan-900"
            >
              <div className="bg-cyan-100 text-cyan-700 rounded-full px-6 py-3 text-lg font-bold shadow">
                Monthly Ocean Observation
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyObservation;
