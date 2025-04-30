const DailyObservation = () => {
  const urls = {
    '00Z (Early)':
      'https://nwp.ncmrwf.gov.in/t574-model/obs_monitor/Daily_MR_00.pdf',
    '06Z (Early)':
      'https://nwp.ncmrwf.gov.in/t574-model/obs_monitor/Daily_MR_06.pdf',
    '12Z (Early)':
      'https://nwp.ncmrwf.gov.in/t574-model/obs_monitor/Daily_MR_12.pdf',
    '18Z (Early)':
      'https://nwp.ncmrwf.gov.in/t574-model/obs_monitor/Daily_MR_18.pdf',
    '00Z (Update)':
      'https://nwp.ncmrwf.gov.in/t574-model/obs_monitor/update/Daily_MR_00_U.pdf',
    '06Z (Update)':
      'https://nwp.ncmrwf.gov.in/t574-model/obs_monitor/update/Daily_MR_06_U.pdf',
    '12Z (Update)':
      'https://nwp.ncmrwf.gov.in/t574-model/obs_monitor/update/Daily_MR_12_U.pdf',
    '18Z (Update)':
      'https://nwp.ncmrwf.gov.in/t574-model/obs_monitor/update/Daily_MR_18_U.pdf',
    Ocean: 'https://nwp.ncmrwf.gov.in/t574-model/obs_ocean_monitor/merged.pdf',
  };

  return (
    <div className="to-cyan-50 min-h-screen w-full bg-gradient-to-br from-blue-50 via-white p-4">
      <h3 className="mb-16 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text pt-8 text-center text-5xl font-extrabold text-transparent drop-shadow-lg">
        Daily Observation Monitoring
      </h3>

      {/* Atmosphere Section */}
      <div className="mx-auto mb-16 max-w-4xl">
        <h4 className="text-cyan-800 mb-6 text-center text-2xl font-bold text-blue-700">
          🌤️ Atmosphere
        </h4>

        <div className="grid grid-cols-1 gap-4 px-0 md:grid-cols-2">
          {/* Early Column */}
          <div className="rounded-xl bg-white p-4 shadow-md transition hover:shadow-lg">
            <a
              href={urls['00Z (Early)']}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-800"
            >
              <h5 className="mb-4 rounded bg-red-100 px-3 py-2 text-center font-semibold text-red-600">
                🕒 00Z (Early)
              </h5>
            </a>
            {['06Z (Early)', '12Z (Early)', '18Z (Early)'].map((time) => (
              <a
                href={urls[time]} // Dynamically select URL based on time
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900"
              >
                <div
                  key={time}
                  className="mb-2 rounded-lg bg-blue-50 px-3 py-2 text-center font-medium text-blue-700"
                >
                  {time}
                </div>
              </a>
            ))}
          </div>

          {/* Update Column */}
          <div className="rounded-xl bg-white p-4 shadow-md transition hover:shadow-lg">
            <a
              href={urls['00Z (Update)']}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-800"
            >
              <h5 className="mb-4 rounded bg-red-100 px-3 py-2 text-center font-semibold text-red-600">
                🔄 00Z (Update)
              </h5>
            </a>
            {['06Z (Update)', '12Z (Update)', '18Z (Update)'].map((time) => (
              <a
                href={urls[time]} // Dynamically select URL based on time
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900"
              >
                <div
                  key={time}
                  className="mb-2 rounded-lg bg-blue-50 px-3 py-2 text-center font-medium text-blue-700"
                >
                  {time}
                </div>
              </a>
            ))}
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
              href={urls['Ocean']}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-700 hover:text-cyan-900"
            >
              <div className="bg-cyan-100 text-cyan-700 rounded-full px-6 py-3 text-lg font-bold shadow">
                Ocean Observation
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyObservation;
