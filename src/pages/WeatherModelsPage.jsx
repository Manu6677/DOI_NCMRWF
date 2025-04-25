import { motion } from 'framer-motion';
import { ncumG, ncumR, nepsG, cncummodel } from '../data/weatherModels';
import { useSelector } from 'react-redux';

const models = [ncumG, ncumR, nepsG, cncummodel];

const WeatherModelsPage = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale || 'en';

  return (
    <div className="w-full bg-white px-8 py-16">
      {/* <h1 className="mb-16 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-center text-5xl font-extrabold text-transparent">
        Seamless Prediction System
      </h1> */}
      <h1 className="mb-16 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text py-2 text-center text-5xl font-extrabold text-transparent">
        {locale === 'en'
          ? 'Seamless Prediction System'
          : 'सुगठित पूर्वानुमान प्रणाली'}
      </h1>

      <div className="grid gap-20">
        {models.map((model, idx) => (
          <motion.div
            key={idx}
            className="mx-auto w-full max-w-7xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <h2 className="text-neutral-900 mb-4 text-3xl font-bold">
              {`${model.name[locale]} (${model.alias[locale]})`}
            </h2>
            {model.overview && (
              <p className="text-neutral-700 mb-4 text-base leading-relaxed">
                {model.overview[locale]}
              </p>
            )}
            <h3 className="text-neutral-800 mb-2 text-xl font-semibold">
              {locale === 'en' ? 'Features :' : 'विशेषताएँ :'}
            </h3>
            <ul className="text-neutral-700 list-inside list-disc space-y-2 text-base leading-relaxed">
              {model.features.map((feature, i) => (
                <li key={i}>
                  <span className="font-semibold">
                    {feature.title[locale]}:
                  </span>{' '}
                  {feature.description[locale]}
                </li>
              ))}
            </ul>
            <h3 className="text-neutral-800 mb-2 mt-6 text-xl font-semibold">
              {locale === 'en' ? 'Operational Standards :' : 'संचालन मानक :'}
            </h3>
            <p className="text-neutral-700 text-base leading-relaxed">
              {model.operationalStandards[locale]}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WeatherModelsPage;
