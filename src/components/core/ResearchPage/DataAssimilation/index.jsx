import { Link } from 'react-router-dom'; // Import Link component for routing
import dataAssimilationImg from '../../../../assets/images/data-assimilation.png';
import { useSelector } from 'react-redux';
const DataAssimilation = () => {
  const dataAssimilationTranslations = {
    title: {
      en: 'About Data Assimilation',
      hi: 'डेटा समाकलन के बारे में',
    },
    intro: {
      en: 'Data assimilation is a technique used to combine observational data with model outputs to produce a more accurate state of the system. In weather forecasting, data assimilation plays a critical role in improving the accuracy of weather predictions by integrating real-world data with numerical weather prediction (NWP) models.',
      hi: 'डेटा समाकलन एक ऐसी तकनीक है जिसका उपयोग प्रेक्षणीय डेटा को मॉडल आउटपुट्स के साथ जोड़कर सिस्टम की अधिक सटीक स्थिति प्राप्त करने के लिए किया जाता है। मौसम पूर्वानुमान में, डेटा समाकलन मौसम की भविष्यवाणियों की सटीकता बढ़ाने में महत्वपूर्ण भूमिका निभाता है, क्योंकि यह वास्तविक डेटा को संख्यात्मक मौसम पूर्वानुमान (NWP) मॉडल्स के साथ एकीकृत करता है।',
    },
    portalIntro: {
      en: 'This data web portal contains:',
      hi: 'यह डेटा वेब पोर्टल निम्नलिखित शामिल करता है:',
    },
    list: [
      {
        en: 'Data Assimilation Models - High-resolution regional and global assimilation models, from 2005 to present.',
        hi: 'डेटा समाकलन मॉडल - उच्च-रिज़ॉल्यूशन क्षेत्रीय और वैश्विक समाकलन मॉडल, 2005 से वर्तमान तक।',
      },
      {
        en: 'Assimilation Process Data - Time series data showing the assimilation process in model forecasts.',
        hi: 'समाकलन प्रक्रिया डेटा - मॉडल पूर्वानुमानों में समाकलन प्रक्रिया को दर्शाने वाला समय श्रृंखला डेटा।',
      },
    ],
    conclusion: {
      en: 'The NCMRWF team has developed advanced data assimilation techniques that significantly improve the quality of weather models, particularly for short to medium-range forecasting.',
      hi: 'NCMRWF टीम ने उन्नत डेटा समाकलन तकनीकें विकसित की हैं, जो विशेष रूप से अल्प और मध्यम अवधि के पूर्वानुमान के लिए मौसम मॉडल की गुणवत्ता को काफी हद तक बेहतर बनाती हैं।',
    },
  };

  const { language } = useSelector((state) => state.language);
  const locale = language?.locale || 'en';

  return (
    <div className="flex flex-col items-center bg-blue-700 p-6 text-white md:flex-row">
      {/* Image Section */}
      <div className="mb-4 w-full rounded-md bg-white md:mb-0 md:w-1/2">
        <img
          src={dataAssimilationImg}
          alt="data assimilation"
          className="w-full rounded-xl object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="w-full text-justify md:w-1/2 md:pl-6">
        <h2 className="mb-4 text-2xl font-bold">
          {dataAssimilationTranslations.title[locale]}
        </h2>
        <p className="mb-4">{dataAssimilationTranslations.intro[locale]}</p>
        {/* <p className="mb-4">
          {dataAssimilationTranslations.portalIntro[locale]}
        </p> */}
        {/* <ul className="mb-4 list-inside list-disc">
          {dataAssimilationTranslations.list.map((item, index) => (
            <li key={index}>{item[locale]}</li>
          ))}
        </ul> */}

        <p>{dataAssimilationTranslations.conclusion[locale]}</p>

        {/* Button to redirect to the Data Assimilation page */}
        {/* <div className="mt-4">
          <Link
            to="/data-assimilation"
            className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
          >
            Go to Data Assimilation Page
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default DataAssimilation;
