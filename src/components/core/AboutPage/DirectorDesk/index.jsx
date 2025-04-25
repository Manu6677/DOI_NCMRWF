import React from 'react';
import directorImg from '../../../../assets/images/leaders/head_ncmrwf.jpg';
import { useSelector } from 'react-redux';

const DirectorDesk = () => {
  const directorDeskTranslations = {
    heading: {
      en: "From the Head's Desk",
      hi: 'प्रमुख के डेस्क से',
    },
    subheading: {
      en: 'National Centre for Medium Range Weather Forecasting (NCMRWF)',
      hi: 'राष्ट्रीय मध्यम अवधि मौसम पूर्वानुमान केंद्र (एनसीएमआरडब्ल्यूएफ)',
    },
    name: {
      en: 'Dr. V. S. Prasad',
      hi: 'डॉ. वी. एस. प्रसाद',
    },
    designation: {
      en: 'Head, NCMRWF',
      hi: 'प्रमुख, एनसीएमआरडब्ल्यूएफ',
    },
    section_1: {
      en: `Welcome to the National Centre for Medium Range Weather Forecasting (NCMRWF), a Centre of Excellence under the Ministry of Earth Sciences (MoES), Government of India. Our mission is to elevate India’s capabilities in Numerical Weather Prediction (NWP) and contribute to societal and economic resilience through pioneering advancements in weather and climate modelling. Over the years, NCMRWF has made remarkable progresses in expanding observation utilization, refining data assimilation (DA) techniques, improving model physics, enhancing model resolution, and coupled model development.`,
      hi: `राष्ट्रीय मध्यम अवधि मौसम पूर्वानुमान केंद्र (NCMRWF), पृथ्वी विज्ञान मंत्रालय (MoES), भारत सरकार के अधीन एक उत्कृष्टता केंद्र में आपका स्वागत है। हमारा मिशन भारत की संख्यात्मक मौसम पूर्वानुमान (NWP) क्षमताओं को ऊंचा उठाना और मौसम एवं जलवायु मॉडलिंग में अग्रणी प्रगति के माध्यम से सामाजिक और आर्थिक लचीलापन सुनिश्चित करना है। वर्षों से, NCMRWF ने अवलोकन उपयोग में विस्तार, डेटा एसिमिलेशन (DA) तकनीकों को परिष्कृत करने, मॉडल भौतिकी को बेहतर बनाने, मॉडल रिज़ॉल्यूशन बढ़ाने, और युग्मित मॉडल विकास में उल्लेखनीय प्रगति की है।`,
    },
    section_3: {
      en: `These advancements have not only strengthened disaster risk
              reduction efforts but also supported economic growth. Our
              innovations in ensemble forecasting, improved representation of
              physical processes, and the development of high-impact products
              for strategic applications have significantly enhanced our
              forecasting capabilities, particularly for extreme weather events.
              Our focus lies in operationalizing advanced global and regional
              coupled NWP systems. A global coupled model with 10 km resolution
              is nearing operational readiness, and a regional coupled model
              tailored for the Indian region is under development. These systems
              are designed to improve tropical cyclone forecasts and
              medium-range predictions, ensuring better protection of lives and
              livelihoods. Ensemble forecasting remains central to our approach,
              transforming uncertainties in NWP into actionable insights. NCMRWF
              operates one of the highest-resolution global ensemble prediction
              systems worldwide, integrating cutting-edge advancements such as
              double-moment microphysics, lightning schemes, and irrigation
              effects. These innovations enable more precise, location-specific
              forecasts.`,
      hi: `इन प्रगतियों ने न केवल आपदा जोखिम न्यूनीकरण के प्रयासों को सशक्त बनाया है, बल्कि आर्थिक विकास को भी समर्थन प्रदान किया है। हमारे समष्टि पूर्वानुमान (Ensemble Forecasting) में नवाचार, भौतिक प्रक्रियाओं की उन्नत अभिव्यक्ति, और रणनीतिक उपयोगों के लिए उच्च-प्रभावी उत्पादों के विकास ने विशेष रूप से चरम मौसम घटनाओं के लिए हमारी पूर्वानुमान क्षमताओं को महत्वपूर्ण रूप से बढ़ाया है। हमारा ध्यान उन्नत वैश्विक और क्षेत्रीय युग्मित संख्यात्मक मौसम पूर्वानुमान (NWP) प्रणालियों के संचालन पर केंद्रित है। 10 किमी रिज़ॉल्यूशन वाला एक वैश्विक युग्मित मॉडल परिचालन तत्परता के करीब है, और भारतीय क्षेत्र के लिए अनुकूलित एक क्षेत्रीय युग्मित मॉडल का विकास किया जा रहा है। ये प्रणालियाँ उष्णकटिबंधीय चक्रवात पूर्वानुमानों और मध्यम अवधि के पूर्वानुमानों को बेहतर बनाने के लिए डिज़ाइन की गई हैं, जिससे जीवन और आजीविका की बेहतर सुरक्षा सुनिश्चित हो सके। समष्टि पूर्वानुमान हमारी रणनीति का मुख्य आधार बना हुआ है, जो संख्यात्मक मौसम पूर्वानुमान (NWP) में अनिश्चितताओं को व्यावहारिक अंतर्दृष्टियों में बदलता है। NCMRWF दुनिया की सबसे उच्च-रिज़ॉल्यूशन वाली वैश्विक समष्टि पूर्वानुमान प्रणालियों में से एक का संचालन करता है, जिसमें डबल-मोमेंट माइक्रोफिज़िक्स, बिजली योजनाएँ और सिंचाई प्रभाव जैसी नवीनतम प्रगतियाँ एकीकृत की गई हैं। ये नवाचार अधिक सटीक, स्थान-विशिष्ट पूर्वानुमान सक्षम करते हैं।`,
    },
    section_4: {
      en: `We are also advancing Sub-seasonal to Seasonal (S2S) forecasting
              by leveraging enhanced model resolutions and advanced physical
              representations. Additionally, we prioritize assimilating global
              observational data, including Indian satellite observations to
              refine initial conditions in our NWP models. Our advanced DA
              system, targeting "all-sky and all-surface" radiance assimilation,
              aims to achieve unprecedented forecast accuracy. Reanalysis
              production and diagnostics of observation impact remain key areas
              of focus, enabling us to better understand Earth system processes
              and support diverse research and development efforts. These
              efforts align with the Government of India’s vision of "Viksit
              Bharat @2047," leveraging state-of-the-art computing
              infrastructure and fostering skill development and capacity
              building to empower the next generation of scientists and
              researchers. Recognizing the vital role of technology, NCMRWF is
              integrating Artificial Intelligence, Machine Learning, and quantum
              computing into the NWP workflow to drive innovation and enhance
              prediction accuracy. At NCMRWF, we are committed to serving
              society with timely, accurate, and impactful forecasts. Through
              collaboration across sectors and continuous advancements in
              science and technology, we aim to build a resilient and
              sustainable future.`,
      hi: `हम उप-मौसमी से मौसमी (Sub-seasonal to Seasonal - S2S) पूर्वानुमान को भी आगे बढ़ा रहे हैं, जिसके लिए हम उन्नत मॉडल रिज़ॉल्यूशन और परिष्कृत भौतिक प्रस्तुतियों का उपयोग कर रहे हैं। इसके अतिरिक्त, हम वैश्विक अवलोकन डेटा, विशेष रूप से भारतीय उपग्रह अवलोकनों को प्राथमिकता के साथ आत्मसात कर रहे हैं, ताकि हमारे संख्यात्मक मौसम पूर्वानुमान (NWP) मॉडलों में आरंभिक स्थितियों को बेहतर बनाया जा सके। हमारा उन्नत डेटा एसिमिलेशन (DA) सिस्टम, जो 'संपूर्ण आकाश और सम्पूर्ण सतह' रेडियंस एसिमिलेशन को लक्षित करता है, अभूतपूर्व पूर्वानुमान सटीकता प्राप्त करने का उद्देश्य रखता है। पुनःविश्लेषण (Reanalysis) उत्पादन और अवलोकन प्रभाव का निदान हमारे लिए प्रमुख क्षेत्रों में बना हुआ है, जो पृथ्वी प्रणाली प्रक्रियाओं को बेहतर ढंग से समझने और विविध अनुसंधान एवं विकास प्रयासों को समर्थन देने में सहायक है। ये प्रयास भारत सरकार की 'विकसित भारत @2047' की दृष्टि के अनुरूप हैं, जो अत्याधुनिक कंप्यूटिंग अवसंरचना का लाभ उठाते हुए कौशल विकास और क्षमता निर्माण को प्रोत्साहित करते हैं, ताकि अगली पीढ़ी के वैज्ञानिकों और शोधकर्ताओं को सशक्त किया जा सके। प्रौद्योगिकी की महत्वपूर्ण भूमिका को पहचानते हुए, NCMRWF अपने NWP कार्यप्रवाह में कृत्रिम बुद्धिमत्ता (AI), मशीन लर्निंग (ML), और क्वांटम कंप्यूटिंग को एकीकृत कर रहा है, ताकि नवाचार को बढ़ावा दिया जा सके और पूर्वानुमान सटीकता में सुधार हो सके। NCMRWF समाज को समयबद्ध, सटीक और प्रभावी पूर्वानुमान सेवाएं प्रदान करने के लिए प्रतिबद्ध है। विज्ञान और प्रौद्योगिकी में निरंतर प्रगति और विभिन्न क्षेत्रों के साथ सहयोग के माध्यम से हम एक लचीला और टिकाऊ भविष्य निर्मित करने का लक्ष्य रखते हैं।`,
    },
  };
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;

  return (
    <div className="bg-gray-100 text-gray-900">
      {/* Header Section */}
      <header className="bg-blue-800 py-6 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold capitalize">
            {directorDeskTranslations.heading[locale]}
          </h1>
          <h2 className="mt-2 text-xl">
            {directorDeskTranslations.subheading[locale]}
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-11/12 px-2 py-8 md:px-12">
        <div className="rounded-lg border-2 border-blue-800 bg-white p-6 md:p-10">
          {/* First Section */}
          <section className="relative">
            <div className="float-left mb-6 mr-6">
              <img
                src={directorImg}
                alt="Director"
                className="border-gray-300 h-60 w-60 rounded-lg"
              />
              <div className="mt-4 flex flex-col items-center justify-center">
                <h3 className="text-2xl font-semibold text-blue-800">
                  {directorDeskTranslations.name[locale]}
                </h3>
                <p className="text-gray-700 mb-4 text-lg italic">
                  {directorDeskTranslations.designation[locale]}
                </p>
              </div>
            </div>

            {/* <p className="text-lg leading-relaxed">
              {directorDeskTranslations.section_1[locale]}{' '}
              <span className="font-bold text-blue-800">
                National Centre for Medium Range Weather Forecasting (NCMRWF)
              </span>
              {directorDeskTranslations.section_2[locale]}
            </p> */}

            <p className="text-lg leading-relaxed">
              {language === 'en' && (
                <span className="font-bold text-blue-800">
                  National Centre for Medium Range Weather Forecasting (NCMRWF)
                </span>
              )}
              {directorDeskTranslations.section_1[locale]}
            </p>

            <p className="mt-4 text-lg leading-relaxed">
              {directorDeskTranslations.section_3[locale]}
            </p>

            <p className="mt-4 text-lg leading-relaxed">
              {directorDeskTranslations.section_4[locale]}
            </p>
          </section>

          {/* <div className="container mx-auto px-6 pt-8 text-center">
            <p className="text-lg">
              To view the full profile of Dr. V. S. Prasad,{' '}
              <a
                href="/director-profile"
                className="font-semibold text-blue-800"
              >
                Click here
              </a>
              .
            </p>
          </div> */}
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-100 py-6 text-center"></footer>
    </div>
  );
};

export default DirectorDesk;
