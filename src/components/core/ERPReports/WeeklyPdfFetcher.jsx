import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const REACT_APP_ASSETS_BASE_URL_NEW = process.env.REACT_APP_ASSETS_BASE_URL_NEW;
const REACT_APP_ASSETS_BASE_URL_NEW_BASE_PATH =
  process.env.REACT_APP_ASSETS_BASE_URL_NEW_BASE_PATH;

const getThursdays = (year, month) => {
  const thursdays = [];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    if (date.getDay() === 4) {
      thursdays.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }

  return thursdays;
};

const WeeklyPdfFetcher = () => {
  const { region, type } = useParams();
  //   const [saturdays, setSaturdays] = useState([]);
  const [thursdays, setThursdays] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    const today = new Date();
    const thuDates = getThursdays(today.getFullYear(), today.getMonth());
    setThursdays(thuDates); // you can rename this state too for clarity
  }, []);

  //   const handleChange = (e) => {
  //     const selected = e.target.value;
  //     setSelectedDate(selected);

  //     const formattedRegion =
  //       region === 'india-region' ? 'India-Region' : 'BIMSTEC-Region';
  //     const formattedType =
  //       type === 'weeklymean' ? 'Weekly-Mean' : 'Four-week-Mean';
  //     const pdfName =
  //       region === 'india-region'
  //         ? type === 'weeklymean'
  //           ? 'india.weekly.pdf'
  //           : 'india.4weekMean.pdf'
  //         : type === 'weeklymean'
  //           ? 'bimstec.weekly.pdf'
  //           : 'bimstec.4weekMean.pdf';

  //     const url = `https://nwp.ncmrwf.gov.in/Data/mihir/${selected}/ERF_PROD/${formattedRegion}/${formattedType}/${pdfName}`;
  //     setPdfUrl(url);
  //   };

  const handleChange = (e) => {
    const selected = e.target.value;
    setSelectedDate(selected);

    const formattedRegion =
      region === 'india-region' ? 'India-Region' : 'BIMSTEC-Region';
    const formattedType =
      type === 'weeklymean' ? 'Weekly-Mean' : 'Four-week-Mean';

    // const baseUrl = 'https://nwp.ncmrwf.gov.in/Data/mihir'; // ✅ CORRECT domain for iframes

    let pdfName = '';

    if (formattedRegion === 'India-Region') {
      pdfName =
        formattedType === 'Weekly-Mean'
          ? 'india.weekly.pdf'
          : 'india.4weekMean.pdf';
    } else {
      pdfName =
        formattedType === 'Weekly-Mean'
          ? 'extended_india.weekly.pdf'
          : 'extended_india.4weekMean.pdf';
    }

    const url = `${REACT_APP_ASSETS_BASE_URL_NEW}/${REACT_APP_ASSETS_BASE_URL_NEW_BASE_PATH}/${selected}/ERF_PROD/${formattedRegion}/${formattedType}/${pdfName}`;
    console.log('pdfUrl', url);
    setPdfUrl(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-8 text-center">
      <h2 className="mb-6 text-3xl font-bold text-blue-700">
        {region.replace('-', ' ')} - {type.replace('-', ' ')}
      </h2>
      <div className="mb-6">
        <select
          className="border-gray-300 rounded-md border bg-white px-4 py-2 text-lg shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onChange={handleChange}
          value={selectedDate}
        >
          <option value="">Select Thursday</option>
          {thursdays.map((date) => (
            <option
              key={date.toISOString()}
              value={date.toLocaleDateString('en-CA')}
            >
              {date.toLocaleDateString('en-CA')}
            </option>
          ))}
        </select>
      </div>

      {pdfUrl && (
        <iframe
          src={pdfUrl}
          title="Weekly Report"
          className="h-[80vh] w-full rounded-md border shadow"
        />
      )}
    </div>
  );
};

export default WeeklyPdfFetcher;
