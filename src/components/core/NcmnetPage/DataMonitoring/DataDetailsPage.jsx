import React, { useState, useEffect } from 'react'; // Added useState, useEffect
import { useParams, Link, useLocation } from 'react-router-dom';

// Ensure this matches your environment variable name
const baseUrl = process.env.REACT_APP_ASSETS_BASE_URL_NEW || '';

const parseBufrDataText = (textData) => {
  if (!textData || typeof textData !== 'string') return [];
  return textData
    .trim()
    .split('\n')
    .map((line) => {
      const parts = line.trim().split(/\s+/); // Split by one or more spaces
      if (parts.length >= 4) {
        const hourly = parseInt(parts[1], 10);
        const monthly = parseInt(parts[2], 10);
        const departure = parseFloat(parts[3]);
        if (isNaN(hourly) || isNaN(monthly) || isNaN(departure)) {
          console.warn('Skipping malformed line (invalid numbers):', line);
          return null;
        }
        return {
          type: parts[0],
          hourly: hourly,
          monthly: monthly,
          departure: departure,
        };
      }
      console.warn(
        'Skipping malformed line (incorrect number of parts):',
        line
      );
      return null;
    })
    .filter((item) => item !== null);
};

const getColorForDeparture = (departure) => {
  const dep = Number(departure);
  if (isNaN(dep))
    return 'text-slate-500 hover:text-slate-700 bg-white hover:bg-slate-50';
  if (dep < -30)
    return 'text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300';
  if (dep < -5)
    return 'text-orange-700 hover:text-orange-900 bg-orange-50 hover:bg-orange-100 border-orange-200 hover:border-orange-300';
  if (dep <= 5)
    return 'text-slate-800 hover:text-black bg-white hover:bg-slate-50 border-slate-300 hover:border-slate-400';
  if (dep <= 30)
    return 'text-green-700 hover:text-green-900 bg-green-50 hover:bg-green-100 border-green-200 hover:border-green-300';
  return 'text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border-blue-200 hover:border-blue-300';
};

const formatDateYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
};

const DataDetailsPage = () => {
  const { dataType, cycleTime } = useParams();
  const location = useLocation();

  const [bufrData, setBufrData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [dataError, setDataError] = useState(null);

  const yesterdayDateObj = new Date();
  yesterdayDateObj.setDate(yesterdayDateObj.getDate() - 1);
  const todayDateObj = new Date();

  const hourStringFromCycleTime = cycleTime ? cycleTime.substring(0, 2) : '00';
  const currentCycleHour = cycleTime
    ? parseInt(cycleTime.substring(0, 2), 10)
    : NaN;

  const queryParams = new URLSearchParams(location.search);
  const highlightParam = queryParams.get('highlight');
  let highlightHour = NaN;
  if (highlightParam) {
    const parsedHighlightHour = parseInt(highlightParam.substring(0, 2), 10);
    if (!isNaN(parsedHighlightHour)) {
      highlightHour = parsedHighlightHour;
    }
  }

  let chosenDateObj = yesterdayDateObj;
  if (!isNaN(highlightHour) && !isNaN(currentCycleHour)) {
    if (highlightHour >= currentCycleHour) {
      chosenDateObj = todayDateObj;
    }
  }
  const chosenDateYYYYMMDD = formatDateYYYYMMDD(chosenDateObj);

  const dateStringForTitle = chosenDateYYYYMMDD;
  const dateTimeStringForCurrentDataImages = `${chosenDateYYYYMMDD}${hourStringFromCycleTime}`;
  const pdfDateTimeString = `${chosenDateYYYYMMDD}${hourStringFromCycleTime}`;

  const displayDataType = dataType
    ? dataType.charAt(0).toUpperCase() + dataType.slice(1)
    : 'Unknown';
  const lowerCaseDataType = dataType ? dataType.toLowerCase() : 'unknown'; // For data URL
  const displayCycleTime = cycleTime ? cycleTime.toUpperCase() : 'Unknown';

  useEffect(() => {
    if (!baseUrl || !cycleTime || !dataType) {
      // Added dataType check for the URL
      setDataError(
        'Base URL, Data Type, or Cycle Time is missing for fetching data.'
      );
      setLoadingData(false);
      setBufrData([]);
      return;
    }

    setLoadingData(true);
    setDataError(null);
    setBufrData([]);

    // Using lowerCaseDataType (derived from dataType param) in the URL
    const dataUrl = `${baseUrl}/data-monitoring/image/${lowerCaseDataType}/DATA_TABLE/${hourStringFromCycleTime}/percentage.txt`;

    fetch(dataUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status} while fetching ${dataUrl}`
          );
        }
        return response.text();
      })
      .then((text) => {
        const parsedData = parseBufrDataText(text);
        if (parsedData.length === 0 && text.trim() !== '') {
          console.warn(
            `Parsed data is empty, but fetched text was not. URL: ${dataUrl}. Raw text:`,
            text
          );
        }
        setBufrData(parsedData);
      })
      .catch((error) => {
        console.error('Failed to fetch or parse BUFR data:', error);
        setDataError(error.message);
      })
      .finally(() => {
        setLoadingData(false);
      });
  }, [
    baseUrl,
    dataType,
    cycleTime,
    hourStringFromCycleTime,
    lowerCaseDataType,
  ]); // Added dataType and lowerCaseDataType to dependencies

  const plotImageUrl = `${baseUrl}/data-monitoring/image/PLOT/percentage_${hourStringFromCycleTime}_${dataType}.png`;
  const receptionStatusPdfUrl = `${baseUrl}/data-monitoring/image/update-assimlation/${pdfDateTimeString}/Reception_Status_Update.pdf`;
  const assimilationStatusPdfUrl = `${baseUrl}/data-monitoring/image/update-assimlation/${pdfDateTimeString}/Assimilation_Status_Update.pdf`;

  if (!dataType || !cycleTime || !baseUrl) {
    return (
      <div className="m-4 rounded-lg border border-orange-300 bg-orange-100 p-6 text-center text-orange-800 shadow-md">
        Error: Missing data type, cycle time in URL, or Base URL configuration.
      </div>
    );
  }

  return (
    <div className="from-sky-100 min-h-screen bg-gradient-to-br via-white to-orange-100 p-4 pt-6 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            NGFS Dump Data Counts Time Series Plots
          </h1>
          <h2 className="text-indigo-700 mt-2 text-xl font-medium sm:text-2xl">
            Valid {displayCycleTime} {displayDataType} Cycle (Date:{' '}
            {dateStringForTitle})
          </h2>
        </header>

        <nav className="mb-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm sm:text-base">
          <Link
            to="/ncmnet/explanation-of-data-types" // Ensure this route exists
            className="font-medium text-blue-700 hover:text-blue-900 hover:underline"
          >
            Explanation
          </Link>
          <span className="text-slate-400" aria-hidden="true">
            |
          </span>
          {/* Updated GFS Summary Link */}
          <Link
            to={`/ncmnet/data-monitoring/gfs-summary/${dataType}/${cycleTime}${location.search}`}
            className="font-medium text-blue-700 hover:text-blue-900 hover:underline"
          >
            GFS Summary
          </Link>
          <span className="text-slate-400" aria-hidden="true">
            |
          </span>
          <a
            href={receptionStatusPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-700 hover:text-blue-900 hover:underline"
          >
            Reception Status
          </a>
          <span className="text-slate-400" aria-hidden="true">
            |
          </span>
          <a
            href={assimilationStatusPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-700 hover:text-blue-900 hover:underline"
          >
            Assimilation Departure Difference
          </a>
        </nav>

        {/* ... rest of the DataDetailsPage component remains the same ... */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
              <h3 className="mb-5 text-center text-base font-semibold text-slate-800">
                View Time Series Plot (opens image in new tab)
              </h3>
              {loadingData && (
                <div className="text-md flex h-20 items-center justify-center font-semibold text-slate-600">
                  Loading data types...
                </div>
              )}
              {dataError && (
                <div className="my-4 rounded-md border border-red-200 bg-red-50 p-4 text-center text-sm text-red-700">
                  Error fetching data: {dataError}
                </div>
              )}
              {!loadingData && !dataError && bufrData.length === 0 && (
                <div className="text-md flex h-20 items-center justify-center font-semibold text-slate-500">
                  No data types available for the selected cycle or an issue
                  occurred with data parsing.
                </div>
              )}
              {!loadingData && !dataError && bufrData.length > 0 && (
                <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9">
                  {bufrData.map((item) => {
                    // Image URLs use dateTimeStringForCurrentDataImages derived from chosenDateObj
                    const imageUrl = `${baseUrl}/data-monitoring/image/${dataType}/${dateTimeStringForCurrentDataImages}/${item.type}.png`;
                    return (
                      <a
                        key={item.type}
                        href={imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`View plot for ${item.type}`}
                        className={`focus:ring-indigo-500 flex h-10 items-center justify-center rounded-md border px-1 text-center text-xs font-semibold shadow-sm transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 sm:h-11 sm:text-sm ${getColorForDeparture(
                          item.departure
                        )}`}
                      >
                        {item.type}
                      </a>
                    );
                  })}
                </div>
              )}
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
              <h3 className="mb-5 text-center text-base font-semibold text-slate-800">
                Explanation of Colors (based on Departure %)
              </h3>
              <div className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border border-slate-300 bg-red-600"></span>
                  <div>
                    <strong className="font-semibold text-red-700">
                      &lt; -30%:
                    </strong>{' '}
                    Abnormal Shortage (Investigate)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border border-slate-300 bg-orange-500"></span>
                  <div>
                    <strong className="font-semibold text-orange-700">
                      -30% to -5%:
                    </strong>{' '}
                    Shortage (Monitor)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border border-slate-400 bg-white"></span>
                  <div>
                    <strong className="font-semibold text-slate-800">
                      -5% to +5%:
                    </strong>{' '}
                    Normal Counts
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border border-slate-300 bg-green-600"></span>
                  <div>
                    <strong className="font-semibold text-green-700">
                      +5% to +30%:
                    </strong>{' '}
                    Overage (Monitor)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border border-slate-300 bg-blue-600"></span>
                  <div>
                    <strong className="font-semibold text-blue-700">
                      &gt; +30%:
                    </strong>{' '}
                    Abnormal Overage (Investigate)
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Link
                  to={`${baseUrl}/data-monitoring/information_pdf/ColorCoding_Criteria.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  More Information
                </Link>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-lg">
              <h3 className="mb-4 text-base font-semibold text-slate-800">
                Bufr Dump: {displayCycleTime} ({displayDataType}) Plot
              </h3>
              <div className="flex min-h-[200px] items-center justify-center overflow-hidden rounded-md border border-slate-300 bg-slate-50">
                <img
                  src={plotImageUrl} // This URL structure is not affected by chosenDateObj
                  alt={`BUFR Dump Plot for ${displayCycleTime} ${displayDataType}`}
                  className="h-auto w-full max-w-full object-contain"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.style.display = 'none';
                    const parent = currentTarget.parentNode;
                    if (parent) {
                      // Remove previous error message if any
                      const existingError = parent.querySelector(
                        '.plot-error-message'
                      );
                      if (existingError) {
                        parent.removeChild(existingError);
                      }
                      const errorDiv = document.createElement('div');
                      errorDiv.textContent = 'Plot image not available.';
                      errorDiv.className =
                        'p-4 text-sm text-red-600 plot-error-message';
                      parent.appendChild(errorDiv);
                    }
                  }}
                />
              </div>
            </div>
          </aside>
        </div>

        <footer className="mt-12 border-t border-slate-300 pt-8 text-center">
          <p className="mx-auto max-w-2xl text-xs text-slate-500">
            Disclaimer : NCMRWF is a Research and Development Organization. The
            products and the conclusion drawn thereof are based on Numerical
            Weather Prediction(NWP) models being run at NCMRWF.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DataDetailsPage;
