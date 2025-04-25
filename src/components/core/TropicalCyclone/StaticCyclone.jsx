import React, { useState, useEffect } from 'react';
import EnsembleRainfallPage from './EnsembleRainfallPage';
import EnsembleWindPage from './EnsembleWindPage';
import EnsembleMslpPage from './EnsembleMslpPage';
import { fetchCyclonesUrl } from '../../../services/operations/specialProductsApi';
const ASSETS_BASE_URL = process.env.REACT_APP_ASSETS_BASE_URL_NEW;
const BASE_PATH = process.env.REACT_APP_ASSETS_BASE_URL_NEW_BASE_PATH;

// ASSETS_BASE_URL = REACT_APP_ASSETS_BASE_URL_NEW = "https://nwp.ncmrwf.gov.in"
// BASE_PATH = REACT_APP_ASSETS_BASE_URL_NEW_BASE_PATH = "Data/mihir"

function WeatherForecastPage() {
  const [cycle, setCycle] = useState('');
  const [mapImage, setMapImage] = useState('placeholder_map.png');
  const [pastCycles, setPastCycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windUrl, setWindUrl] = useState('');
  const [rainUrl, setRainUrl] = useState('');
  const [mslpUrl, setMslpUrl] = useState('');
  const [animationUrl, setAnimationUrl] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const [isNCUMRModalOpen, setIsNCUMRModalOpen] = useState(false);
  const [showEnsembleRainfall, setShowEnsembleRainfall] = useState(false);
  const [showEnsembleWind, setShowEnsembleWind] = useState(false);
  const [showEnsembleMslp, setShowEnsembleMslp] = useState(false);
  const [isOpenNcumG, setIsOpenNcumG] = useState(false);
  const [isOpenNcumR, setIsOpenNcumR] = useState(false);

  useEffect(() => {
    const generatePastCycles = async () => {
      setLoading(true);
      setError(null);
      try {
        const now = new Date();
        const utcNowHour = now.getUTCHours();
        const utcNowDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          0,
          0,
          0,
          0
        );

        const cycles = new Set();
        const currentCycleHour = utcNowHour < 12 ? '00' : '12';
        cycles.add(
          `${utcNowDate.getFullYear()}-${String(
            utcNowDate.getMonth() + 1
          ).padStart(2, '0')}-${String(utcNowDate.getDate()).padStart(
            2,
            '0'
          )} ${currentCycleHour}UTC`
        );

        for (let i = 1; cycles.size < 6; i++) {
          const pastDate = new Date(utcNowDate);
          pastDate.setUTCHours(utcNowHour - i * 12);
          cycles.add(
            `${pastDate.getFullYear()}-${String(pastDate.getMonth() + 1).padStart(2, '0')}-${String(pastDate.getDate()).padStart(2, '0')} ${
              pastDate.getUTCHours() < 12 ? '00' : '12'
            }UTC`
          );
        }

        const sortedCycles = Array.from(cycles).sort(
          (a, b) =>
            new Date(b.replace(' UTC', 'Z')) - new Date(a.replace(' UTC', 'Z'))
        );

        setPastCycles(sortedCycles);
        if (sortedCycles.length > 0) {
          setCycle(sortedCycles[0]);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    generatePastCycles();
  }, []);

  useEffect(() => {
    const fetchMapImage = async () => {
      if (cycle) {
        setLoading(true);
        setError(null);
        try {
          const imageUrl = await fetchCyclonesUrl(cycle);
          setMapImage(imageUrl);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchMapImage();
  }, [cycle]);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setWindUrl(
      `https://ncmrwf.gov.in/HomePage/NEPS-prod-winds.php?id=${formattedDate}`
    );
    setRainUrl(
      `https://ncmrwf.gov.in/HomePage/NEPS-prod-Rainfall.php?id=${formattedDate}`
    );
    setMslpUrl(
      `${ASSETS_BASE_URL}/${BASE_PATH}/${formattedDate}/12-km-ENSEMBLE-Outputs/MSLP/pmsl-day0.png`
    );
    setAnimationUrl(
      `${ASSETS_BASE_URL}/${BASE_PATH}/${formattedDate}/NEPS-G_22mem/NI_${formattedDate}00.gif`
    ); //set the default 00utc
  }, []);

  const handleCycleChange = (event) => {
    const selectedCycle = event.target.value;
    setCycle(selectedCycle);
    setShowAnimation(false);
    setIsNCUMRModalOpen(false);
    setShowEnsembleRainfall(false);
  };

  const handlePrevCycle = () => {
    const currentIndex = pastCycles.indexOf(cycle);
    if (currentIndex > 0) {
      setCycle(pastCycles[currentIndex - 1]);
      setShowAnimation(false);
      setIsNCUMRModalOpen(false);
      setShowEnsembleRainfall(false);
    }
  };

  const handleNextCycle = () => {
    const currentIndex = pastCycles.indexOf(cycle);
    if (currentIndex < pastCycles.length - 1) {
      setCycle(pastCycles[currentIndex + 1]);
      setShowAnimation(false);
      setIsNCUMRModalOpen(false);
      setShowEnsembleRainfall(false);
    }
  };

  const openLink = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleAnimationClick = () => {
    const datePart = cycle.split(' ')[0];
    const timePart = cycle.split(' ')[1];
    const utc = timePart === '00UTC' ? '00' : '12';
    const formattedAnimationUrl = `${ASSETS_BASE_URL}/${BASE_PATH}/${datePart}/NEPS-G_22mem/NI_${datePart}${utc}.gif`;
    setAnimationUrl(formattedAnimationUrl);
    setShowAnimation(true);
    setIsNCUMRModalOpen(false);
    setShowEnsembleRainfall(false);
  };

  const handleStrikeProbabilityClick = () => {
    if (cycle) {
      const datePart = cycle.split(' ')[0];
      const timePart = cycle.split(' ')[1];
      const utc = timePart === '00UTC' ? '00' : '12';
      const imageUrl = `${ASSETS_BASE_URL}/${BASE_PATH}/${datePart}/NEPS-G_22mem/NI_${datePart}${utc}comp.png`;
      setMapImage(imageUrl);
      setShowAnimation(false);
      setIsNCUMRModalOpen(false);
      setShowEnsembleRainfall(false);
    }
  };

  const getCorrectDateForLinks = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes
    const fourTenPM = 16 * 60 + 10; // 16:10 in minutes

    let targetDate;
    if (currentTime < fourTenPM) {
      // If before 4:10 PM, use yesterday's date
      targetDate = new Date(now.setDate(now.getDate() - 1));
    } else {
      // If after 4:10 PM, use today's date
      targetDate = now;
    }

    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const windClickHandler = () => {
    const correctDate = getCorrectDateForLinks();
    const windLink = `https://www.ncmrwf.gov.in/HomePage/NEPS-prod-winds.php?id=${correctDate}`;
    setWindUrl(windLink);
    openLink(windLink);
    setShowEnsembleRainfall(false);
  };

  const rainClickHandler = () => {
    const correctDate = getCorrectDateForLinks();
    const rainLink = `https://www.ncmrwf.gov.in/HomePage/NEPS-prod-Rainfall.php?id=${correctDate}`;
    setRainUrl(rainLink);
    setShowEnsembleRainfall(false);
  };

  const handleDayClick = (day) => {
    const correctDate = getCorrectDateForLinks();
    let hour = '';
    if (day === 'Day1') {
      hour = '024';
    } else if (day === 'Day2') {
      hour = '048';
    } else if (day === 'Day3') {
      hour = '072';
    } else if (day === 'Day4') {
      hour = '096';
    } else if (day === 'Day5') {
      hour = '120';
    }
    const dayUrl = `${ASSETS_BASE_URL}/${BASE_PATH}/${correctDate}/NCUM-Js-Plot/Forecast/demo2a_surface_${hour}.html`;
    openLink(dayUrl);
    setShowEnsembleRainfall(false);
  };

  if (showEnsembleRainfall) {
    return <EnsembleRainfallPage />;
  }

  if (showEnsembleWind) {
    return <EnsembleWindPage />;
  }

  if (showEnsembleMslp) {
    return <EnsembleMslpPage />;
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Left Sidebar */}
        <div className="flex flex-col space-y-2">
          <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
            12km NEPS-G
          </button>
          {/* <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
            NCUM-C
          </button> */}
          {/* Trigger Button */}
          <button
            onClick={() => setIsOpenNcumG(true)}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          >
            NCUM-G
          </button>

          {/* Modal NCUM G*/}
          {isOpenNcumG && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-11/12 max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-semibold">NCUM-G Modal</h2>
                <a
                  href="https://nwp.ncmrwf.gov.in/NCUM-tc_traker/NCUM_G_TCTRAK.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="rounded bg-orange-400 px-4 py-2 text-white hover:bg-orange-600">
                    Text file
                  </button>
                </a>

                <button
                  onClick={() => setIsOpenNcumG(false)}
                  className="ml-6 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            onClick={() => setIsOpenNcumR(true)}
          >
            NCUM-R
          </button>

          {/* Modal NCUM R */}
          {isOpenNcumR && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-11/12 max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-semibold">NCUM-R Modal</h2>
                <a
                  href={`${ASSETS_BASE_URL}/NCUM-tc_traker/NCUM_REG_TCTRAK.png`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="rounded bg-orange-400 px-4 py-2 text-white hover:bg-orange-600">
                    Text file
                  </button>
                </a>

                <button
                  onClick={() => setIsOpenNcumR(false)}
                  className="ml-6 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="rounded-md bg-white p-6 shadow-md md:col-span-2">
          <div className="mb-4 flex items-center justify-center">
            <button
              onClick={handlePrevCycle}
              className="rounded-l bg-slate-300 px-4 py-2 font-bold text-slate-800 hover:bg-slate-400"
            >
              Prev
            </button>
            <div className="relative px-1">
              <select
                value={cycle}
                onChange={handleCycleChange}
                className="block w-full appearance-none rounded border border-slate-300 bg-white px-3 py-2 pr-8 leading-tight text-slate-900 focus:border-blue-500 focus:outline-none"
              >
                {pastCycles.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <button
              onClick={handleNextCycle}
              className="rounded-r bg-slate-300 px-4 py-2 font-bold text-slate-800 hover:bg-slate-400"
            >
              Next
            </button>
          </div>
          <h2 className="mb-2 text-center text-xl font-semibold">
            Strike Probability for Active System
          </h2>

          {showAnimation ? (
            <img
              src={animationUrl}
              alt="Animation"
              className="w-full rounded-md shadow-md"
            />
          ) : (
            <img
              src={mapImage}
              alt="Weather Map"
              className="w-full rounded-md shadow-md"
            />
          )}
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col space-y-2">
          <button
            className="rounded bg-slate-200 px-4 py-2 font-bold text-slate-900 hover:bg-slate-300"
            onClick={handleStrikeProbabilityClick}
          >
            Strike Probability
          </button>
          <button
            className="rounded bg-slate-200 px-4 py-2 font-bold text-slate-900 hover:bg-slate-300"
            onClick={handleAnimationClick}
          >
            Animations
          </button>
          <button className="rounded bg-slate-200 px-4 py-2 font-bold text-slate-900 hover:bg-slate-300">
            Tracks and Meteogram
          </button>

          <div className="mt-4">
            <h3 className="mb-2 text-lg font-semibold">
              Useful Links For Current Forecast
            </h3>
            <button className="w-full rounded bg-slate-200 p-2 text-center font-bold text-slate-900 hover:bg-slate-300">
              Probabilities Forecast
            </button>
            <div className="mt-1 flex space-x-2">
              <a
                href={windUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  windUrl
                    ? 'w-1/2 rounded bg-slate-200 p-2 text-center font-bold text-slate-900 hover:bg-slate-300'
                    : 'w-1/2 rounded bg-slate-200 p-2 text-center font-bold text-slate-900'
                }
                onClick={windClickHandler}
              >
                10m Wind
              </a>
              <a
                href={rainUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  rainUrl
                    ? 'w-1/2 rounded bg-slate-200 p-2 text-center font-bold text-slate-900 hover:bg-slate-300'
                    : 'w-1/2 rounded bg-slate-200 p-2 text-center font-bold text-slate-900'
                }
                onClick={rainClickHandler}
              >
                Rain
              </a>
            </div>
            <div className="mt-1 flex space-x-2">
              <p className="w-full rounded p-2 text-center font-bold text-slate-900 hover:bg-slate-300">
                Ensemble Stamps
              </p>
            </div>
            <div className="mt-1 flex space-x-2">
              <button
                className="w-1/2 rounded bg-slate-200 p-2 text-center font-bold text-slate-900 hover:bg-slate-300"
                onClick={() => setShowEnsembleRainfall(true)}
              >
                Rain
              </button>
              <button
                className="w-1/2 rounded bg-slate-200 p-2 text-center font-bold text-slate-900 hover:bg-slate-300"
                onClick={() => setShowEnsembleWind(true)}
              >
                Wind
              </button>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="mb-2 text-lg font-semibold">MSLP</h3>
            <button
              onClick={() => setShowEnsembleMslp(true)}
              className="w-full rounded bg-slate-200 px-4 py-2 text-center font-bold text-slate-900 hover:bg-slate-300"
            >
              MSLP
            </button>
          </div>

          <div className="mt-4">
            <h3 className="mb-2 text-lg font-semibold">
              Surface Wind Animations
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                className="rounded bg-slate-200 px-2 py-1 text-sm font-bold text-slate-900 hover:bg-slate-300"
                onClick={() => handleDayClick('Day1')}
              >
                Day1
              </button>
              <button
                className="rounded bg-slate-200 px-2 py-1 text-sm font-bold text-slate-900 hover:bg-slate-300"
                onClick={() => handleDayClick('Day2')}
              >
                Day2
              </button>
              <button
                className="rounded bg-slate-200 px-2 py-1 text-sm font-bold text-slate-900 hover:bg-slate-300"
                onClick={() => handleDayClick('Day3')}
              >
                Day3
              </button>
              <button
                className="rounded bg-slate-200 px-2 py-1 text-sm font-bold text-slate-900 hover:bg-slate-300"
                onClick={() => handleDayClick('Day4')}
              >
                Day4
              </button>
              <button
                className="rounded bg-slate-200 px-2 py-1 text-sm font-bold text-slate-900 hover:bg-slate-300"
                onClick={() => handleDayClick('Day5')}
              >
                Day5
              </button>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-slate-700">
              Note: Please check the "Wind" option to view the forecast
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherForecastPage;
