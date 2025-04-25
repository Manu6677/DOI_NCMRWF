import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ASSETS_BASE_URL = process.env.REACT_APP_ASSETS_BASE_URL_NEW || '';

const noticesData = [
  {
    srNo: 1,
    subject: {
      en: 'Vacancy Circular for the post of Mission Director',
      hi: 'मिशन निदेशक के पद के लिए रिक्ति परिपत्र',
    },
    download: {
      en: 'View/Download',
      hi: 'देखें/डाउनलोड करें',
    },
    downloadLink: '/Vacancy%20Circular%20English.pdf',
  },
  {
    srNo: 2,
    subject: {
      en: "List of Empanelled vendors / Book suppliers in NCMRWF's Library",
      hi: 'एनसीएमआरडब्ल्यूएफ की लाइब्रेरी में सूचीबद्ध विक्रेताओं / पुस्तक आपूर्तिकर्ताओं की सूची',
    },
    download: {
      en: 'View/Download',
      hi: 'देखें/डाउनलोड करें',
    },
    downloadLink: '/List_of_Empanelled_Book_Suppliers_in_NCMRWF.pdf',
  },
  {
    srNo: 3,
    subject: {
      en: 'Office Notice',
      hi: 'कार्यालय सूचना',
    },
    download: {
      en: 'View/Download',
      hi: 'देखें/डाउनलोड करें',
    },
    downloadLink: '/Notic_Board/Notice-board-hindi-2020.pdf',
  },
];

const Notices = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale || 'en';

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h2 className="mb-4 text-center text-2xl font-bold text-slate-800">
        {locale === 'en' ? 'Notices' : 'सूचनाएं'}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full rounded-lg border border-slate-300 shadow-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">
                {locale === 'en' ? 'S.No' : 'क्रमांक'}
              </th>
              <th className="p-3 text-left">
                {locale === 'en' ? 'Subject' : 'विषय'}
              </th>
              <th className="p-3 text-left">
                {locale === 'en' ? 'Action' : 'कार्रवाई'}
              </th>
            </tr>
          </thead>
          <tbody>
            {noticesData.map((notice, index) => (
              <tr
                key={notice.srNo}
                className={`${
                  index % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                } transition-all duration-200 hover:bg-slate-100`}
              >
                <td className="border p-3">{notice.srNo}</td>
                <td className="border p-3">{notice.subject[locale]}</td>
                <td className="border p-3">
                  <Link
                    to={`${ASSETS_BASE_URL}${notice.downloadLink}`}
                    className="font-medium text-blue-600 transition-all hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {notice.download[locale]}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notices;
