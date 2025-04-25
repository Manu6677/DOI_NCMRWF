import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to install react-router-dom
import reportImg2324 from '../../../../../assets/images/reportsImg/reports2324.png';
import reportImg2223 from '../../../../../assets/images/reportsImg/reports2223.png';
import { FaDownload, FaEye } from 'react-icons/fa';

const reports = [
  {
    name: '2023-2024',
    img: reportImg2324, // report image for Report 1
    //   pdf: pdfFile1, // PDF for Report 1
    pdf: '',
  },
  {
    name: '2023-2024',
    img: reportImg2223, // report image for Report 2
    pdf: '', // PDF for Report 2
  },
  {
    name: '2023-2024',
    img: reportImg2324, // report image for Report 3
    pdf: '', // PDF for Report 3
  },
  {
    name: '2023-2024',
    img: reportImg2223, // report image for Report 4
    pdf: '', // PDF for Report 4
  },
  {
    name: '2023-2024',
    img: reportImg2324, // report image for Report 5
    pdf: '', // PDF for Report 5
  },
  {
    name: '2023-2024',
    img: reportImg2223, // report image for Report 6
    pdf: '', // PDF for Report 6
  },
  {
    name: '2023-2024',
    img: reportImg2324, // report image for Report 7
    pdf: '', // PDF for Report 7
  },
  {
    name: '2023-2024',
    img: reportImg2223, // report image for Report 8
    pdf: '', // PDF for Report 8
  },
];

const Reports = () => {
  const handleDownload = (pdf) => {
    // Your download logic here
    console.log('Downloading', pdf);
    const link = document.createElement('a');
    link.href = pdf;
    link.download = pdf.split('/').pop(); // Use the file name from URL
    link.click();
  };

  const handleView = (item) => {
    // Your view logic here
    console.log('Viewing', item);
  };

  return (
    <div className="bg-gray-100 relative rounded-lg p-6">
      <h2 className="text-gray-800 mb-3 text-center text-2xl font-semibold">
        Reports <span role="img" aria-label="report"></span>
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="transform rounded-lg bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out hover:shadow-xl"
          >
            <h3 className="mb-2 text-center text-lg font-semibold text-blue-600">{`Annual Report ${item?.name}`}</h3>
            <img
              src={item?.img}
              alt={`report-${index + 1}`}
              className="h-40 w-40 object-contain"
            />
            <div className="mt-2 flex items-center justify-between">
              <button
                className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition duration-200 hover:bg-blue-700"
                // onClick={() => handleDownload(item.pdf)}
              >
                <FaDownload />
              </button>
              <button
                className="hover:bg-gray-700 rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition duration-200"
                onClick={() => handleView(item)}
              >
                <FaEye />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute -bottom-6 right-0">
        <Link to="/reports" className="block text-blue-700 hover:underline">
          See More Reports...
        </Link>
      </div>
    </div>
  );
};

export default Reports;
