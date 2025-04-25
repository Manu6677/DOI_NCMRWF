import { Link } from 'react-router-dom';
import reanalysisImg from '../assets/images/reanalysis.png';
import imdaaReanalysisImg from '../assets/images/imdaaReanalysis.png';
import { useSelector } from 'react-redux';

const reanalysisTranslations = {
  title: {
    en: 'Reanalysis',
    hi: 'रीएनालिसिस (पुनः विश्लेषण)',
  },
  description: {
    en: `Reanalysis provides comprehensive and consistent weather data over extended periods, overcoming the limitations of direct observations. NCMRWF has developed both global and regional reanalysis capabilities to enhance weather and climate research. Key products include the NGFS-based Global Reanalysis System, covering 1999–2018, and IMDAA (Indian Monsoon Data Assimilation and Analysis), a high-resolution (12 km) regional reanalysis spanning 42 years (1979–2020). These datasets, developed in collaboration with leading institutions, are freely available and widely used for studying monsoon variability and long-term climate trends.`,
    hi: `रीएनालिसिस विस्तारित अवधि में व्यापक और सुसंगत मौसम डेटा प्रदान करता है, जो प्रत्यक्ष अवलोकनों की सीमाओं को पार करता है। एनसीएमआरडब्ल्यूएफ ने मौसम और जलवायु अनुसंधान को बढ़ाने के लिए वैश्विक और क्षेत्रीय रीएनालिसिस क्षमताओं का विकास किया है। प्रमुख उत्पादों में NGFS आधारित वैश्विक रीएनालिसिस सिस्टम (1999–2018) और IMDAA (भारतीय मानसून डेटा एसिमिलेशन और विश्लेषण), एक उच्च-रिज़ॉल्यूशन (12 किमी) क्षेत्रीय रीएनालिसिस (1979–2020) शामिल हैं। ये डेटासेट प्रमुख संस्थानों के सहयोग से विकसित किए गए हैं और मानसून विविधता व दीर्घकालिक जलवायु प्रवृत्तियों के अध्ययन के लिए व्यापक रूप से उपयोग किए जाते हैं।`,
  },
  cards: [
    {
      title: {
        en: 'IMDAA Data',
        hi: 'IMDAA डेटा',
      },
      description: {
        en: 'High resolution (12km, 1-hourly) regional reanalysis over India, from 1979 to 2018 (Extended up to December 2020).',
        hi: 'भारत पर उच्च रिज़ॉल्यूशन (12 किमी, प्रति घंटे) क्षेत्रीय रीएनालिसिस, 1979 से 2018 तक (दिसंबर 2020 तक विस्तारित)।',
      },
    },
    {
      title: {
        en: 'NGFS Data',
        hi: 'NGFS डेटा',
      },
      description: {
        en: 'High resolution (25km, 6-hourly) Global reanalysis, from 1999 to 2018.',
        hi: 'उच्च रिज़ॉल्यूशन (25 किमी, 6-घंटे) वैश्विक रीएनालिसिस, 1999 से 2018 तक।',
      },
    },
    {
      title: {
        en: 'IMDAA-Like Products',
        hi: 'IMDAA जैसे उत्पाद',
      },
      description: {
        en: 'For continuity beyond 31 Dec 2020, derived from NCUM global NWP system (12km resolution). Some products available only at 3-hourly intervals.',
        hi: '31 दिसंबर 2020 के बाद निरंतरता के लिए, एनसीयूएम वैश्विक एनडब्ल्यूपी सिस्टम (12 किमी रिज़ॉल्यूशन) से व्युत्पन्न। कुछ उत्पाद केवल 3-घंटे के अंतराल पर उपलब्ध हैं।',
      },
    },
  ],
  linkText: {
    en: 'Go to Reanalysis Page',
    hi: 'रीएनालिसिस पेज पर जाएं',
  },
};

const Reanalysis = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale || 'en';

  return (
    <div className="bg-slate-950 flex min-h-screen flex-col items-center justify-center p-10 text-white">
      <div className="w-full max-w-6xl text-center">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
          <img
            src={imdaaReanalysisImg}
            alt="IMDAA Reanalysis"
            className="w-full max-w-xs rounded-xl border-4 border-blue-500 object-contain shadow-xl md:max-w-sm lg:max-w-md"
          />
          <img
            src={reanalysisImg}
            alt="Reanalysis"
            className="w-full max-w-xs rounded-xl border-4 border-blue-500 object-contain shadow-xl md:max-w-sm lg:max-w-md"
          />
        </div>

        <h2 className="mt-6 text-5xl font-extrabold text-blue-400">
          {reanalysisTranslations.title[locale]}
        </h2>
        <p className="mx-auto mt-4 max-w-6xl text-center text-lg text-slate-300">
          {reanalysisTranslations.description[locale]}
        </p>
      </div>

      <div className="mt-12 grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {reanalysisTranslations.cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 p-6 text-center text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl"
          >
            <h3 className="text-2xl font-semibold text-blue-400">
              {card.title[locale]}
            </h3>
            <p className="mt-2 text-slate-300">{card.description[locale]}</p>
          </div>
        ))}
      </div>

      <Link
        to="https://rds.ncmrwf.gov.in/"
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 hover:shadow-2xl"
        target="_blank"
      >
        {reanalysisTranslations.linkText[locale]}
      </Link>
    </div>
  );
};

export default Reanalysis;
