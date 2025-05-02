import React from 'react';
import { useTable } from 'react-table';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ASSETS_BASE_URL = process.env.REACT_APP_ASSETS_BASE_URL_NEW || '';

const tenderData = [
  {
    srNo: 1,
    tenderId: 'NMRF/15/01/2010-LIB',
    tenderName: {
      en: 'Change in End Date of Tender for Sale of Raddi (Old Newspapers and Old Magazines)',
      hi: 'पुरानी अखबारों और पत्रिकाओं की बिक्री के लिए निविदा की समाप्ति तिथि में परिवर्तन',
    },
    download: {
      en: 'Download',
      hi: 'डाउनलोड',
    },
    downloadLink: 'Documents/Tender/Corrigendum.pdf',
    lastDateOfSubmission: '2024-11-30 13:00:00',
    tenderOpening: '2024-11-30 15:00:00',
    uploadedDateTime: '2024-11-14 17:00:00',
  },
  {
    srNo: 2,
    tenderId: 'F-20019/11/2023-Estt.',
    tenderName: {
      en: 'Inviting Quotation for sale of obsolete or unserviceable scrap',
      hi: 'बेकार या अनुपयोगी कबाड़ की बिक्री के लिए कोटेशन आमंत्रित किया गया',
    },
    download: {
      en: 'Download',
      hi: 'डाउनलोड',
    },
    downloadLink:
      'Documents/Tender/Inviting Quotation for sale of scrap001.pdf',
    lastDateOfSubmission: '2024-11-08 13:00:00',
    tenderOpening: '2024-11-08 14:00:00',
    uploadedDateTime: '2024-11-01 17:00:00',
  },
  {
    srNo: 3,
    tenderId: 'NMRF/15/01/2010-LIB',
    tenderName: {
      en: "Quotation inviting letter for selling old newspapers & magazines of NCMRWF's Library",
      hi: 'एनसीएमआरडब्ल्यूएफ पुस्तकालय के पुराने समाचार पत्रों और पत्रिकाओं की बिक्री के लिए कोटेशन आमंत्रण पत्र',
    },
    download: {
      en: 'Download Tender',
      hi: 'निविदा डाउनलोड करें',
    },
    downloadLink:
      'Documents/Tender/Quotation Inviting letter for the sale of raddi.pdf',
    lastDateOfSubmission: '2024-10-30 13:00:00',
    tenderOpening: '2024-11-08 00:00:00',
    uploadedDateTime: '2024-10-04 17:00:00',
  },
  {
    srNo: 4,
    tenderId: 'NMRF/15/03/2011-LIB (E-392)',
    tenderName: {
      en: 'Notice Inviting Tenders for supply newspapers and magazines in NCMRWF’s Library',
      hi: 'एनसीएमआरडब्ल्यूएफ पुस्तकालय में समाचार पत्र और पत्रिकाएं आपूर्ति करने के लिए निविदा आमंत्रण सूचना',
    },
    download: {
      en: 'Download Tender',
      hi: 'निविदा डाउनलोड करें',
    },
    downloadLink:
      'Documents/Tender/Final- Revised Tender For supply newspapers and magazines.pdf',
    lastDateOfSubmission: '2023-12-15 12:00:00',
    tenderOpening: '2023-12-15 02:30:00',
    uploadedDateTime: '2023-11-24 16:00:00',
  },
  {
    srNo: 5,
    tenderId: 'NMRF/25/04/2022-LIB/01/2022',
    tenderName: {
      en: 'Advertisement for Empanelment of Vendors for Supply of Books to NCMRWF Library for Two Years',
      hi: 'एनसीएमआरडब्ल्यूएफ पुस्तकालय के लिए दो वर्षों के लिए पुस्तकों की आपूर्ति हेतु विक्रेताओं के पैनल के लिए विज्ञापन',
    },
    download: {
      en: 'Download Tender',
      hi: 'निविदा डाउनलोड करें',
    },
    downloadLink:
      'Documents/Tender/Advertisement-EmanelmentOfVendorsOrSuppliersOfBooks.pdf',
    lastDateOfSubmission: '2022-07-22 17:00:00',
    tenderOpening: '2022-07-25 11:00:00',
    uploadedDateTime: '2022-06-24 17:00:00',
  },
  {
    srNo: 6,
    tenderId: 'D-21014/03/2015-NMRF',
    tenderName: {
      en: 'Notice Inviting Tender (NIT) from manufacturers/experienced service providers for Comprehensive Annual Maintenance Contract of Air Conditioners',
      hi: 'एयर कंडीशनरों के व्यापक वार्षिक रखरखाव अनुबंध के लिए निर्माताओं/अनुभवी सेवा प्रदाताओं से निविदा आमंत्रण सूचना (एनआईटी)',
    },
    download: {
      en: 'Download Tender',
      hi: 'निविदा डाउनलोड करें',
    },
    downloadLink: 'Documents/Tender/Tendernotice.pdf',
    lastDateOfSubmission: '2022-05-18 18:30:00',
    tenderOpening: '2022-05-20 11:00:00',
    uploadedDateTime: '2022-05-05 12:00:00',
  },
  {
    srNo: 7,
    tenderId: 'D-19015/01/2011-NMRF',
    tenderName: {
      en: 'Change in Bid Submission End Date and Bid Opening Date of the Tender for Comprehensive Annual Maintenance of Local Area Network (CLAN)',
      hi: 'स्थानीय क्षेत्र नेटवर्क (CLAN) के व्यापक वार्षिक रखरखाव के लिए निविदा की बोली जमा करने की अंतिम तिथि और निविदा खुलने की तिथि में परिवर्तन',
    },
    download: {
      en: 'Download Corrigendum',
      hi: 'परिशिष्ट डाउनलोड करें',
    },
    downloadLink: 'Documents/Tender/CorrigendumLAN.pdf',
    lastDateOfSubmission: '2020-11-12 14:00:00',
    tenderOpening: '2020-11-13 15:00:00',
    uploadedDateTime: '2020-11-05 16:00:00',
  },
  {
    srNo: 8,
    tenderId: 'HMS-1(NMRF)-Vol-1',
    tenderName: {
      en: 'RFP for Comprehensive Hardware Maintenance Services (HMS)',
      hi: 'व्यापक हार्डवेयर रखरखाव सेवाओं (एचएमएस) के लिए निविदा अनुरोध (आरएफपी)',
    },
    download: {
      en: 'Download Tender',
      hi: 'निविदा डाउनलोड करें',
    },
    downloadLink: 'Documents/Tender/NIT_-final.pdf',
    lastDateOfSubmission: '2020-11-10 14:00:00',
    tenderOpening: '2020-11-11 15:00:00',
    uploadedDateTime: '2020-10-20 16:00:00',
  },
];

const Tenders = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale || 'en';

  const columns = React.useMemo(
    () => [
      { Header: locale === 'en' ? 'Sr No' : 'क्रमांक', accessor: 'srNo' },
      {
        Header: locale === 'en' ? 'Tender Id' : 'निविदा आईडी',
        accessor: 'tenderId',
      },
      {
        Header: locale === 'en' ? 'Tender Name' : 'निविदा नाम',
        accessor: 'tenderName',
        Cell: ({ value }) => value[locale],
      },
      {
        Header: locale === 'en' ? 'Download' : 'डाउनलोड',
        accessor: 'download',
        Cell: ({ row }) => (
          <Link
            to={`${ASSETS_BASE_URL}/${row.original.downloadLink}`}
            className="text-blue-600 underline hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            {row.original.download[locale]}
          </Link>
        ),
      },
      {
        Header:
          locale === 'en'
            ? 'Last Date Of Submission'
            : 'जमा करने की अंतिम तिथि',
        accessor: 'lastDateOfSubmission',
      },
      {
        Header: locale === 'en' ? 'Tender Opening' : 'निविदा खुलने की तिथि',
        accessor: 'tenderOpening',
      },
      {
        Header:
          locale === 'en' ? 'Uploaded Date & Time' : 'अपलोड की गई तिथि और समय',
        accessor: 'uploadedDateTime',
      },
    ],
    [locale]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: tenderData,
    });

  return (
    <div className="overflow-x-auto rounded-lg bg-white p-4 shadow-lg sm:p-6">
      <table
        {...getTableProps()}
        className="min-w-full border border-slate-300 text-sm sm:text-base"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="bg-slate-200 text-slate-700"
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="whitespace-nowrap border p-2 text-left sm:p-3"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-slate-100">
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="max-w-[200px] whitespace-normal break-words border p-2 text-sm sm:max-w-none sm:p-3 sm:text-base"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tenders;
