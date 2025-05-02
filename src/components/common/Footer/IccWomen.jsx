import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ASSETS_BASE_URL = process.env.REACT_APP_ASSETS_BASE_URL_NEW || '';

const IccWomen = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale || 'en';

  const committeeMembers = [
    {
      role: { en: 'Presiding Officer', hi: 'अध्यक्ष' },
      name: 'Dr. Anitha Gera',
      designation: 'Scientist-F, NCMRWF',
      email: 'anitha.gera@nic.in',
      mobile: '9871844955',
    },
    {
      role: { en: 'Member', hi: 'सदस्य' },
      name: 'Dr. A Jayakumar',
      designation: 'Scientist-E',
      email: 'jayakumar.a@nic.in',
      mobile: '8860555241',
    },
    {
      role: { en: 'External Member', hi: 'बाहरी सदस्य' },
      name: 'Ms. Deepa Chaudhary',
      designation:
        'Operation Head, Akhandjyoti Foundation (NGO Representative)',
      email: '',
      mobile: '',
    },
    {
      role: { en: 'Member', hi: 'सदस्य' },
      name: 'Dr. Hashmi Fatima',
      designation: 'Scientist-D',
      email: 'hashmi.fatima@nic.in',
      mobile: '',
    },
    {
      role: { en: 'Convener', hi: 'संयोजक' },
      name: 'Sh. Ashutosh Srivastava',
      designation: 'Section Officer',
      email: 'ashutosh_so@ncmrwf.gov.in',
      mobile: '8587829691',
    },
  ];

  const documents = [
    {
      title: {
        en: 'Sexual Harassment of Women at Workplace (Prevention, Prohibition, and Redressal) Act and Rule 2013',
        hi: 'कार्यस्थल पर महिलाओं के यौन उत्पीड़न (रोकथाम, निषेध और निवारण) अधिनियम और नियम 2013',
      },
      link: '/Documents/icc-for-women/1-shc_acts2013.pdf',
    },
    {
      title: {
        en: 'Handbook on Sexual Harassment of Women at Workplace',
        hi: 'कार्यस्थल पर महिलाओं के यौन उत्पीड़न पर पुस्तिका',
      },
      link: '/Documents/icc-for-women/2-Handbook-on-Sexual-Harassment-of-Women-at-Workplace.pdf',
    },
    {
      title: {
        en: 'Composition Order of Internal Complaints Committee (ICC), NCMRWF',
        hi: 'आंतरिक शिकायत समिति (आईसीसी), एनसीएमआरडब्ल्यूएफ का गठन आदेश',
      },
      link: '/Documents/icc-for-women/3-OM_ICC_26Feb21_NCMRWF.pdf',
    },
    {
      title: {
        en: "DOP & T.O.M. Dated 1 November 2017 Regarding Online Complaint Management System Titled 'Sexual Harassment Electronic box' (SHe - Box )",
        hi: "डीओपी और टी.ओ.एम. दिनांक 1 नवंबर 2017 'यौन उत्पीड़न इलेक्ट्रॉनिक बॉक्स' (एसएचई-बॉक्स) शीर्षक से ऑनलाइन शिकायत प्रबंधन प्रणाली के संबंध में",
      },
      link: '/Documents/icc-for-women/4-1013-7-2016-esttAIII.pdf',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl rounded-lg bg-white p-8 shadow-lg">
      {/* Title */}
      <h2 className="mb-2 text-center text-3xl font-extrabold text-slate-800">
        {locale === 'en'
          ? 'Internal Complaints Committee (ICC) - Women'
          : 'आंतरिक शिकायत समिति (आईसीसी) - महिला'}
      </h2>
      <hr className="mb-6 border-slate-300" />

      {/* Committee Members */}
      <div className="mb-8">
        <h3 className="mb-4 text-2xl font-semibold text-slate-700">
          {locale === 'en' ? 'Committee Members' : 'समिति सदस्य'}
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {committeeMembers.map((member, index) => (
            <div
              key={index}
              className="rounded-lg border bg-slate-50 p-4 shadow-sm"
            >
              <h4 className="text-xl font-semibold text-blue-700">
                {member.role[locale]}
              </h4>
              <p className="font-medium text-slate-800">{member.name}</p>
              <p className="text-slate-600">{member.designation}</p>
              <p className="text-slate-500">📧 {member.email || 'N/A'}</p>
              <p className="text-slate-500">📞 {member.mobile || 'N/A'}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PoSH Act Info */}
      <div>
        <h3 className="mb-4 text-2xl font-semibold text-slate-700">
          {locale === 'en'
            ? 'Information Related to PoSH - Act 2013'
            : 'पीओएसएच - अधिनियम 2013 से संबंधित जानकारी'}
        </h3>
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-slate-100 p-4 shadow-sm"
            >
              <p className="text-slate-800">{doc.title[locale]}</p>
              <Link
                to={`${ASSETS_BASE_URL}${doc.link}`}
                className="font-semibold text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                PDF 📄
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IccWomen;
