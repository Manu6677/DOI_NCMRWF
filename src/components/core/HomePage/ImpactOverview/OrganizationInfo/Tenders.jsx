import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const tenders = [
  {
    id: 'NMRF/15/01/2010-LIB',
    name: {
      en: 'Change in End Date of Tender for Sale of Raddi (Old Newspapers and Old Magazines)',
      hi: 'रद्दी (पुराने समाचार पत्र और पत्रिकाओं) की बिक्री के लिए निविदा की अंतिम तिथि में परिवर्तन',
    },
    download: 'https://www.ncmrwf.gov.in/Tender/Corrigendum.pdf',
    lastDate: '2024-11-30 13:00:00',
    openingDate: '2024-11-30 15:00:00',
    uploadedDate: '2024-11-14 17:00:00',
  },
  {
    id: 'F-20019/11/2023-Estt.',
    name: {
      en: 'Inviting Quotation for Sale of Obsolete or Unserviceable Scrap',
      hi: 'पुराने या अनुपयोगी स्क्रैप की बिक्री के लिए निविदा आमंत्रण',
    },
    download:
      'https://www.ncmrwf.gov.in/Tender/Inviting%20Quotation%20for%20sale%20of%20scrap001.pdf',
    lastDate: '2024-11-08 13:00:00',
    openingDate: '2024-11-08 14:00:00',
    uploadedDate: '2024-11-01 17:00:00',
  },
  // {
  //   id: 'NMRF/15/01/2010-LIB',
  //   name: {
  //     en: 'Quotation Inviting Letter for Selling Old Newspapers & Magazines',
  //     hi: 'पुराने समाचार पत्र और पत्रिकाओं की बिक्री के लिए निविदा आमंत्रण पत्र',
  //   },
  //   download:
  //     'https://www.ncmrwf.gov.in/Tender/Quotation%20Inviting%20letter%20for%20the%20sale%20of%20raddi.pdf',
  //   lastDate: '2024-10-30 13:00:00',
  //   openingDate: '2024-11-08 00:00:00',
  //   uploadedDate: '2024-10-04 17:00:00',
  // },
];

const TenderList = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language.locale || 'en'; // Default to English if no language is selected

  return (
    <div className="bg-gray-100 relative p-6">
      <h2 className="text-gray-800 mb-4 text-center text-2xl font-bold">
        {locale === 'en' ? 'Latest Tenders' : 'नवीनतम निविदाएं'}
      </h2>
      <div className="space-y-4">
        {tenders.map((tender, index) => (
          <div
            key={index}
            className="flex flex-col space-y-2 rounded-lg bg-white p-4 shadow-md"
          >
            <a
              href={tender.download}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {tender.name[locale]}
            </a>
            <p className="text-gray-600 text-sm">Tender ID: {tender.id}</p>
            <p className="text-gray-500 text-sm">
              {locale === 'en' ? 'Last Date' : 'अंतिम तिथि'}:{' '}
              {new Date(tender.lastDate).toLocaleString()}
            </p>
            <p className="text-gray-500 text-sm">
              {locale === 'en' ? 'Opening Date' : 'खुलने की तिथि'}:{' '}
              {new Date(tender.openingDate).toLocaleString()}
            </p>
            <a
              href={tender.download}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              {locale === 'en' ? 'Download Tender' : 'निविदा डाउनलोड करें'}
            </a>
          </div>
        ))}
      </div>

      <div className="absolute -bottom-6 right-0">
        <Link
          to="/tenders"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          See All Tenders...
        </Link>
      </div>
    </div>
  );
};

export default TenderList;
