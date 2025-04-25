import { Link } from 'react-router-dom';
import reanalysisImg from '../../../../assets/images/globe-grid.png';
import { useSelector } from 'react-redux';

import {
  ncumG,
  ncumR,
  nepsG,
  cncummodel,
} from '../../../../data/weatherModels';

const ModelGuidance = () => {
  const modelGuidanceTranslations = {
    en: {
      heading: 'About NCMRWF Model Guidance',
      intro: `The National Centre for Medium Range Weather Forecasting (NCMRWF)
      provides advanced model guidance systems that help in weather
      forecasting across India and neighboring regions. The Centre focuses
      on research and development of novel methodologies to enhance weather
      predictions.`,
      button: 'Go to Model Guidance Page',
    },
    hi: {
      heading: 'एनसीएमआरडब्ल्यूएफ मॉडल गाइडेंस के बारे में',
      intro: `नेशनल सेंटर फॉर मीडियम रेंज वेदर फोरकास्टिंग (एनसीएमआरडब्ल्यूएफ)
      भारत और आस-पास के क्षेत्रों में मौसम पूर्वानुमान में सहायता के लिए उन्नत मॉडल गाइडेंस प्रणाली प्रदान करता है। यह केंद्र मौसम पूर्वानुमानों को बेहतर बनाने के लिए नई विधियों के अनुसंधान और विकास पर केंद्रित है।`,
      button: 'मॉडल गाइडेंस पृष्ठ पर जाएं',
    },
  };

  const { language } = useSelector((state) => state.language);
  const locale = language?.locale || 'en';

  return (
    <div className="flex flex-col items-center bg-blue-700 p-6 text-white md:flex-row">
      {/* Image Section */}
      <div className="mb-4 w-auto md:mb-0 md:w-1/2">
        <img
          src={reanalysisImg}
          alt="model guidance"
          className="h-[40rem] rounded-xl object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="w-full text-justify md:w-1/2 md:pl-6">
        <h2 className="mb-4 text-2xl font-bold">
          {' '}
          {modelGuidanceTranslations[locale].heading}
        </h2>
        <p className="mb-4">{modelGuidanceTranslations[locale].intro}</p>

        {/* Overview of Each Model */}
        <ul className="mb-4 list-inside list-disc">
          {/* <li className="mb-4">{ncumG.overview[locale]}</li> */}
          <li className="mb-4">{ncumG.overview[locale]}</li>
          <li className="mb-4">{ncumR.overview[locale]}</li>
          <li className="mb-4">{nepsG.overview[locale]}</li>
          <li>{cncummodel.overview[locale]}</li>
        </ul>

        {/* Button to redirect to the Model Guidance page */}
        <div className="mt-8">
          <Link
            to="/model-guidance"
            className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
          >
            {modelGuidanceTranslations[locale].button}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModelGuidance;
