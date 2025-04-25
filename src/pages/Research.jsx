import React from 'react';
import earhGridImg from '../assets/images/earth-grid.png';
import AnalysisAndGuidance from '../components/core/ResearchPage/AnalysisAndGuidance';
import { useSelector } from 'react-redux';

const researchTranslations = {
  en: {
    heading: "Advancing India's Numerical Weather Prediction",
    subheading:
      'For over three decades, NCMRWF has been enhancing Numerical Weather Prediction (NWP) through cutting-edge research, model development, and global collaborations.',
    body: `Our operational NWP begins with gathering atmospheric data from satellites, radars, weather stations, aircraft, ships, and buoys. These observations undergo rigorous quality control before feeding into advanced data assimilation systems, which generate accurate initial conditions—the foundation for precise forecasts.

Using high-resolution global and regional models, we solve complex hydrodynamic equations to predict weather across short to seasonal timescales. NCMRWF ensures the highest forecast accuracy through continuous verification and refinement, integrating the latest scientific advancements.

NCMRWF actively supports the India Meteorological Department (IMD) and other MoES sister organizations, enhancing national capabilities in disaster management, climate resilience, and sector-specific forecasting.`,
  },
  hi: {
    heading: 'भारत की संख्यात्मक मौसम पूर्वानुमान प्रणाली को प्रगतिशील बनाना',
    subheading:
      'एनसीएमआरडब्ल्यूएफ तीन दशकों से अधिक समय से अत्याधुनिक अनुसंधान, मॉडल विकास और वैश्विक सहयोग के माध्यम से संख्यात्मक मौसम पूर्वानुमान (एनडब्ल्यूपी) को बेहतर बना रहा है।',
    body: `हमारी परिचालन एनडब्ल्यूपी प्रणाली उपग्रहों, राडारों, मौसम स्टेशनों, विमानों, जहाजों और बॉय से वायुमंडलीय डेटा एकत्र करने से शुरू होती है। इन प्रेक्षणों को कठोर गुणवत्ता नियंत्रण प्रक्रियाओं से गुजारा जाता है, इसके बाद इन्हें उन्नत डेटा आत्मसात प्रणाली (data assimilation systems) में प्रविष्ट किया जाता है, जिससे सटीक आरंभिक स्थितियाँ प्राप्त होती हैं—जो कि सटीक पूर्वानुमान का आधार होती हैं।

हम उच्च-रिज़ॉल्यूशन वाले वैश्विक और क्षेत्रीय मॉडलों का उपयोग करके जटिल हाइड्रोडायनामिक समीकरणों को हल करते हैं ताकि अल्पकालिक से लेकर मौसमी समय सीमाओं तक मौसम की भविष्यवाणी की जा सके। एनसीएमआरडब्ल्यूएफ निरंतर सत्यापन और परिष्करण के माध्यम से पूर्वानुमान की उच्चतम सटीकता सुनिश्चित करता है, जिसमें नवीनतम वैज्ञानिक प्रगति को शामिल किया जाता है।

एनसीएमआरडब्ल्यूएफ भारत मौसम विज्ञान विभाग (IMD) और पृथ्वी विज्ञान मंत्रालय (MoES) के अन्य सहयोगी संगठनों को सक्रिय रूप से समर्थन देता है, जिससे आपदा प्रबंधन, जलवायु लचीलापन और क्षेत्र-विशिष्ट पूर्वानुमानों में राष्ट्रीय क्षमताएं सुदृढ़ होती हैं।`,
  },
};

const Research = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale || 'en';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <img
          src={earhGridImg}
          alt="Earth Grid Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center bg-black/60 px-4 py-8 sm:px-6 md:px-12">
          <div className="max-w-6xl text-white">
            <div className="w-full text-left md:w-8/12">
              <h2 className="text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
                {researchTranslations[locale].heading}
              </h2>
              <p className="mt-4 text-sm sm:text-lg md:text-lg lg:text-xl">
                {researchTranslations[locale].subheading}
              </p>
              <p className="text- mt-4 whitespace-pre-line leading-relaxed sm:text-sm md:text-base lg:text-lg">
                {researchTranslations[locale].body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Section */}
      <AnalysisAndGuidance color="white" />
    </div>
  );
};

export default Research;
