import {
  FaCogs,
  FaNetworkWired,
  FaLayerGroup,
  FaSatelliteDish,
} from 'react-icons/fa';

// export const ncumG = {
//   name: 'NCUM-G Model',
//   alias: 'Medium Range',
//   overview:
//     'The NCUM-G (National Centre for Medium Range Weather Forecasting Unified Model - Global) is a high-resolution atmospheric model used for accurate and detailed weather forecasting.',
//   features: [
//     {
//       icon: FaCogs,
//       title: 'Advanced Dynamical Core',
//       description:
//         'Uses the ENDGame core to solve complex atmospheric equations with semi-implicit, semi-Lagrangian methods, ensuring stability, efficiency, and accuracy for realistic forecasts.',
//     },
//     {
//       icon: FaLayerGroup,
//       title: 'High-Resolution Grid',
//       description:
//         'A 12 km horizontal grid and 70 vertical levels reaching up to 80 km altitude captures localized weather details, enhancing forecast accuracy.',
//     },
//     {
//       icon: FaNetworkWired,
//       title: 'Physical Parameterizations',
//       description: 'Sophisticated schemes for various atmospheric processes.',
//       details: [
//         'Convection: Handles updrafts and downdrafts in thunderstorms.',
//         'Boundary Layer Turbulence: Accounts for surface turbulence.',
//         'Radiation: Models solar and terrestrial radiation.',
//         'Cloud Microphysics: Simulates cloud formation and precipitation.',
//         'Orographic Drag: Represents terrain-based drag effects.',
//       ],
//     },
//     {
//       icon: FaSatelliteDish,
//       title: 'Data Assimilation System',
//       description:
//         'Employs a 6-hourly hybrid 4D-Var data assimilation method to update forecasts with real-time data from satellites and weather stations.',
//     },
//   ],
//   operationalStandards:
//     'The NCUM-G operates on version UM11.2 of the Unified Model, utilizing configurations Global Atmosphere 7.0 (GA7.0) and Global Land 7.0 (GL7.0) for comprehensive coverage.',
// };

// export const ncumR = {
//   name: 'NCUM-R Model',
//   alias: 'Short Range',
//   overview:
//     'The NCUM-R (National Centre for Medium Range Weather Forecasting Unified Model - Regional) is a high-resolution convective-scale model focused on delivering precise regional weather forecasts for India and surrounding areas.',
//   features: [
//     {
//       icon: FaCogs,
//       title: 'Focused Regional Coverage',
//       description:
//         'Covers India and nearby regions, with coordinates ranging from 62°E to 106°E and 6°S to 41°N, capturing localized weather patterns with 1200x1200 grid points and 90 vertical levels.',
//     },
//     {
//       icon: FaLayerGroup,
//       title: 'High-Resolution Forecasting',
//       description:
//         '4 km grid spacing allows for precise regional forecasting, with 75-hour forecasts updated twice daily based on 00 UTC and 12 UTC initial conditions.',
//     },
//     {
//       icon: FaSatelliteDish,
//       title: 'Advanced Terrain Representation',
//       description:
//         'Employs NASA’s 90m digital elevation map, using a rotated grid with Arakawa-C staggering and terrain-following hybrid vertical coordinate system.',
//     },
//     {
//       icon: FaNetworkWired,
//       title: 'Explicit Deep Convection Modeling',
//       description:
//         'Captures extreme weather events with high fidelity, enabling critical storm dynamics forecasts for regional weather.',
//     },
//     {
//       title: 'Sophisticated Cloud and Precipitation Schemes',
//       description:
//         'NCUM-R includes advanced cloud microphysics parameterizations, with schemes like CASIM and Bimodal Cloud Generation Scheme.',
//     },
//   ],
//   operationalStandards:
//     'Based on the UK Met Office’s Regional Atmosphere and Land version 3 (RAL3) configuration, operational since October 1, 2022. Enhanced to capture lightning and precipitation.',
// };

// export const nepsG = {
//   name: 'NEPS-G Model',
//   alias: 'Ensemble',
//   overview:
//     'The NEPS-G (NCMRWF Global Ensemble Prediction System) is a high-resolution global model designed to deliver reliable ensemble-based weather forecasts, supporting accurate 10-day weather predictions.',
//   features: [
//     {
//       icon: FaLayerGroup,
//       title: 'High-Resolution Global Coverage',
//       description:
//         'Operates at a 12 km horizontal resolution with 70 vertical levels up to 80 km altitude, providing precise global forecasts responsive to changing conditions.',
//     },
//     {
//       icon: FaNetworkWired,
//       title: 'Ensemble Prediction for Greater Reliability',
//       description:
//         'Uses an ensemble approach with 22 perturbed members generated through the Ensemble Transform Kalman Filter (ETKF), enhancing forecast reliability with a range of possible outcomes.',
//     },
//     {
//       icon: FaCogs,
//       title: 'Advanced Perturbation Techniques',
//       description:
//         'Employs several techniques to improve accuracy, including Stochastic Kinetic Energy Backscattering (SKEB), Random Parameter (RP) Scheme, and Sea Surface Temperature (SST) Perturbations.',
//     },
//     {
//       icon: FaSatelliteDish,
//       title: 'Extended Forecast Cycles',
//       description:
//         "Produces 10-day forecasts with updates four times daily (00, 06, 12, and 18 UTC), ensuring the latest observations are reflected in the model's output.",
//     },
//   ],
//   operationalStandards:
//     'Runs on Unified Model version 11.2 with the Global Atmosphere 7.2 (GA7.2) configuration, ensuring accurate simulation of atmospheric and land processes.',
// };

// export const cncummodel = {
//   name: 'CNCUM Model',
//   alias: 'Extended Range',
//   overview:
//     'The CNCUM (Coupled NCMRWF Unified Model) integrates atmospheric, oceanic, and sea ice models to deliver precise forecasts over a range of timescales, from daily weather to seasonal climate patterns.',
//   features: [
//     {
//       icon: FaCogs,
//       title: 'Comprehensive Model Components',
//       description:
//         'Based on the UK Met Office’s Global Coupled Model Version 2 (GC2), including Global Atmosphere 6.0, Global Land 6.0, Global Ocean 5.0 (NEMO), and Global Sea Ice 6.0 (CICE).',
//     },
//     {
//       icon: FaLayerGroup,
//       title: 'High-Resolution Forecasting',
//       description:
//         'Operates with a grid resolution of 0.833° x 0.556° in the atmosphere and 85 vertical levels. Uses a tri-polar ORCA025 grid with 75 ocean levels for detailed simulations, particularly at the surface.',
//     },
//     {
//       icon: FaNetworkWired,
//       title: 'Three-Hourly Atmosphere-Ocean Coupling',
//       description:
//         'Uses the OASIS coupler to synchronize atmospheric and ocean data every three hours, enhancing short-term weather and long-term climate prediction accuracy.',
//     },
//     {
//       icon: FaSatelliteDish,
//       title: 'Data Assimilation for Real-Time Initialization',
//       description:
//         'Atmosphere initialized with NCUM data; ocean and sea ice use the NEMOVAR data assimilation system, providing up-to-date starting conditions daily.',
//     },
//   ],
//   operationalStandards:
//     'Supports daily 15-day deterministic forecasts, extended 16-member weekly multi-week forecasts, and experimental 55-member seasonal projections, aiding both short-term and climate planning.',
// };

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const ncumG = {
  name: {
    en: 'NCUM-G Model',
    hi: 'NCUM-G मॉडल',
  },
  alias: {
    en: 'Medium Range',
    hi: 'मध्यम अवधि',
  },

  overview: {
    en: 'The NCUM-G (National Centre for Medium Range Weather Forecasting Unified Model - Global) is a high-resolution atmospheric model used for accurate and detailed weather forecasting.',
    hi: 'NCUM-G (राष्ट्रीय मध्यम अवधि मौसम पूर्वानुमान केंद्र एकीकृत मॉडल - वैश्विक) एक उच्च-रिज़ॉल्यूशन वायुमंडलीय मॉडल है जिसका उपयोग सटीक और विस्तृत मौसम पूर्वानुमान के लिए किया जाता है।',
  },
  features: [
    {
      icon: FaCogs,
      title: {
        en: 'Advanced Dynamical Core',
        hi: 'उन्नत गतिशील कोर',
      },
      description: {
        en: 'Uses the ENDGame core to solve complex atmospheric equations with semi-implicit, semi-Lagrangian methods, ensuring stability, efficiency, and accuracy for realistic forecasts.',
        hi: 'वायुमंडलीय समीकरणों को हल करने के लिए ENDGame कोर का उपयोग करता है, जो अर्ध-निहित, अर्ध-लैग्रेंजियन विधियों द्वारा स्थिरता, दक्षता और सटीकता सुनिश्चित करता है।',
      },
    },
    {
      icon: FaLayerGroup,
      title: {
        en: 'High-Resolution Grid',
        hi: 'उच्च-रिज़ॉल्यूशन ग्रिड',
      },
      description: {
        en: 'A 12 km horizontal grid and 70 vertical levels reaching up to 80 km altitude captures localized weather details, enhancing forecast accuracy.',
        hi: '12 किमी क्षैतिज ग्रिड और 70 ऊर्ध्वाधर स्तर, जो 80 किमी ऊंचाई तक पहुंचते हैं, स्थानीय मौसम की जानकारी को कैप्चर करते हैं, जिससे पूर्वानुमान की सटीकता बढ़ती है।',
      },
    },
    {
      icon: FaNetworkWired,
      title: {
        en: 'Physical Parameterizations',
        hi: 'भौतिक पैरामीट्रीकरण',
      },
      description: {
        en: 'Sophisticated schemes for various atmospheric processes.',
        hi: 'विभिन्न वायुमंडलीय प्रक्रियाओं के लिए उन्नत योजनाएं।',
      },
      details: {
        en: [
          'Convection: Handles updrafts and downdrafts in thunderstorms.',
          'Boundary Layer Turbulence: Accounts for surface turbulence.',
          'Radiation: Models solar and terrestrial radiation.',
          'Cloud Microphysics: Simulates cloud formation and precipitation.',
          'Orographic Drag: Represents terrain-based drag effects.',
        ],
        hi: [
          'संवहन: गरज-तूफान में ऊपर और नीचे की हवा को संभालता है।',
          'सीमा परत में अशांति: सतही अशांति को ध्यान में रखता है।',
          'विकिरण: सौर और पृथ्वी विकिरण को मॉडल करता है।',
          'बादल सूक्ष्म भौतिकी: बादलों के निर्माण और वर्षा का अनुकरण करता है।',
          'ओरोग्राफिक ड्रैग: स्थलाकृतिक ड्रैग प्रभावों का प्रतिनिधित्व करता है।',
        ],
      },
    },
    {
      icon: FaSatelliteDish,
      title: {
        en: 'Data Assimilation System',
        hi: 'डेटा समाकलन प्रणाली',
      },
      description: {
        en: 'Employs a 6-hourly hybrid 4D-Var data assimilation method to update forecasts with real-time data from satellites and weather stations.',
        hi: 'पूर्वानुमानों को अपडेट करने के लिए 6-घंटे की आवृत्ति पर हाइब्रिड 4D-Var डेटा समाकलन विधि का उपयोग करता है, जो उपग्रहों और मौसम स्टेशनों से रीयल-टाइम डेटा को सम्मिलित करता है।',
      },
    },
  ],
  operationalStandards: {
    en: 'The NCUM-G operates on version UM11.2 of the Unified Model, utilizing configurations Global Atmosphere 7.0 (GA7.0) and Global Land 7.0 (GL7.0) for comprehensive coverage.',
    hi: 'NCUM-G यूनिफाइड मॉडल के संस्करण UM11.2 पर संचालित होता है, जिसमें Global Atmosphere 7.0 (GA7.0) और Global Land 7.0 (GL7.0) कॉन्फ़िगरेशन का उपयोग किया जाता है।',
  },
};

export const ncumR = {
  name: {
    en: 'NCUM-R Model',
    hi: 'NCUM-R मॉडल',
  },
  alias: {
    en: 'Short Range',
    hi: 'लघु अवधि',
  },
  overview: {
    en: 'The NCUM-R (National Centre for Medium Range Weather Forecasting Unified Model - Regional) is a high-resolution convective-scale model focused on delivering precise regional weather forecasts for India and surrounding areas.',
    hi: 'NCUM-R (राष्ट्रीय मध्यम अवधि मौसम पूर्वानुमान केंद्र एकीकृत मॉडल - क्षेत्रीय) एक उच्च-रिज़ॉल्यूशन संवहन-स्तरीय मॉडल है जो भारत और आस-पास के क्षेत्रों के लिए सटीक क्षेत्रीय मौसम पूर्वानुमान प्रदान करने पर केंद्रित है।',
  },
  features: [
    {
      icon: FaCogs,
      title: {
        en: 'Focused Regional Coverage',
        hi: 'केन्द्रित क्षेत्रीय कवरेज',
      },
      description: {
        en: 'Covers India and nearby regions, with coordinates ranging from 62°E to 106°E and 6°S to 41°N, capturing localized weather patterns with 1200x1200 grid points and 90 vertical levels.',
        hi: 'यह भारत और आस-पास के क्षेत्रों को कवर करता है, जिसमें निर्देशांक 62°E से 106°E और 6°S से 41°N तक फैले हैं, और इसमें 1200x1200 ग्रिड बिंदु तथा 90 ऊर्ध्वाधर स्तर शामिल हैं, जो स्थानीय मौसम पैटर्न को पकड़ते हैं।',
      },
    },
    {
      icon: FaLayerGroup,
      title: {
        en: 'High-Resolution Forecasting',
        hi: 'उच्च-रिज़ॉल्यूशन पूर्वानुमान',
      },
      description: {
        en: '4 km grid spacing allows for precise regional forecasting, with 75-hour forecasts updated twice daily based on 00 UTC and 12 UTC initial conditions.',
        hi: '4 किमी ग्रिड दूरी सटीक क्षेत्रीय पूर्वानुमान को सक्षम बनाती है, जिसमें 00 UTC और 12 UTC प्रारंभिक स्थितियों के आधार पर प्रतिदिन दो बार 75 घंटे का पूर्वानुमान अपडेट किया जाता है।',
      },
    },
    {
      icon: FaSatelliteDish,
      title: {
        en: 'Advanced Terrain Representation',
        hi: 'उन्नत स्थलाकृति प्रतिनिधित्व',
      },
      description: {
        en: 'Employs NASA’s 90m digital elevation map, using a rotated grid with Arakawa-C staggering and terrain-following hybrid vertical coordinate system.',
        hi: 'नासा के 90 मीटर डिजिटल एलिवेशन मैप का उपयोग करता है, जिसमें अरेकावा-C स्टैगर्ड और स्थलाकृति-अनुगामी हाइब्रिड ऊर्ध्वाधर निर्देशांक प्रणाली के साथ एक घूर्णित ग्रिड का उपयोग होता है।',
      },
    },
    {
      icon: FaNetworkWired,
      title: {
        en: 'Explicit Deep Convection Modeling',
        hi: 'स्पष्ट गहन संवहन मॉडलिंग',
      },
      description: {
        en: 'Captures extreme weather events with high fidelity, enabling critical storm dynamics forecasts for regional weather.',
        hi: 'गंभीर मौसम की घटनाओं को उच्च सटीकता के साथ कैप्चर करता है, जिससे क्षेत्रीय मौसम के लिए महत्वपूर्ण तूफानी गतिकी पूर्वानुमान संभव होता है।',
      },
    },
    {
      title: {
        en: 'Sophisticated Cloud and Precipitation Schemes',
        hi: 'उन्नत बादल और वर्षा योजनाएं',
      },
      description: {
        en: 'NCUM-R includes advanced cloud microphysics parameterizations, with schemes like CASIM and Bimodal Cloud Generation Scheme.',
        hi: 'NCUM-R में उन्नत बादल सूक्ष्म भौतिकी पैरामीटराइजेशन शामिल हैं, जिनमें CASIM और बायमॉडल क्लाउड जनरेशन स्कीम जैसी योजनाएं हैं।',
      },
    },
  ],
  operationalStandards: {
    en: 'Based on the UK Met Office’s Regional Atmosphere and Land version 3 (RAL3) configuration, operational since October 1, 2022. Enhanced to capture lightning and precipitation.',
    hi: 'यह UK Met Office के Regional Atmosphere and Land संस्करण 3 (RAL3) कॉन्फ़िगरेशन पर आधारित है और 1 अक्टूबर 2022 से संचालन में है। इसमें बिजली और वर्षा को बेहतर तरीके से पकड़ने की क्षमता है।',
  },
};

export const nepsG = {
  name: {
    en: 'NEPS-G Model',
    hi: 'NEPS-G मॉडल',
  },
  alias: {
    en: 'Ensemble',
    hi: 'एनसेंबल',
  },

  overview: {
    en: 'The NEPS-G (NCMRWF Global Ensemble Prediction System) is a high-resolution global model designed to deliver reliable ensemble-based weather forecasts, supporting accurate 10-day weather predictions.',
    hi: 'NEPS-G (NCMRWF ग्लोबल एन्सेम्बल प्रेडिक्शन सिस्टम) एक उच्च-रिज़ॉल्यूशन वैश्विक मॉडल है जो विश्वसनीय एन्सेम्बल-आधारित मौसम पूर्वानुमान प्रदान करता है, जो 10-दिवसीय सटीक पूर्वानुमानों का समर्थन करता है।',
  },
  features: [
    {
      icon: FaLayerGroup,
      title: {
        en: 'High-Resolution Global Coverage',
        hi: 'उच्च-रिज़ॉल्यूशन वैश्विक कवरेज',
      },
      description: {
        en: 'Operates at a 12 km horizontal resolution with 70 vertical levels up to 80 km altitude, providing precise global forecasts responsive to changing conditions.',
        hi: 'यह 12 किमी क्षैतिज रिज़ॉल्यूशन और 70 ऊर्ध्वाधर स्तरों (80 किमी ऊँचाई तक) पर संचालित होता है, जो बदलती स्थितियों के अनुसार सटीक वैश्विक पूर्वानुमान प्रदान करता है।',
      },
    },
    {
      icon: FaNetworkWired,
      title: {
        en: 'Ensemble Prediction for Greater Reliability',
        hi: 'बेहतर विश्वसनीयता के लिए एन्सेम्बल पूर्वानुमान',
      },
      description: {
        en: 'Uses an ensemble approach with 22 perturbed members generated through the Ensemble Transform Kalman Filter (ETKF), enhancing forecast reliability with a range of possible outcomes.',
        hi: 'एन्सेम्बल ट्रांसफॉर्म काल्मन फ़िल्टर (ETKF) के माध्यम से उत्पन्न 22 विकृत सदस्यों के साथ एन्सेम्बल दृष्टिकोण अपनाता है, जो संभावित परिणामों की विविधता के साथ पूर्वानुमान की विश्वसनीयता को बढ़ाता है।',
      },
    },
    {
      icon: FaCogs,
      title: {
        en: 'Advanced Perturbation Techniques',
        hi: 'उन्नत विकृति तकनीकें',
      },
      description: {
        en: 'Employs several techniques to improve accuracy, including Stochastic Kinetic Energy Backscattering (SKEB), Random Parameter (RP) Scheme, and Sea Surface Temperature (SST) Perturbations.',
        hi: 'सटीकता बढ़ाने के लिए कई तकनीकों का उपयोग करता है, जिनमें स्टोकास्टिक काइनेटिक एनर्जी बैकस्कैटरिंग (SKEB), रैंडम पैरामीटर (RP) योजना, और समुद्री सतह तापमान (SST) विकृति शामिल हैं।',
      },
    },
    {
      icon: FaSatelliteDish,
      title: {
        en: 'Extended Forecast Cycles',
        hi: 'विस्तारित पूर्वानुमान चक्र',
      },
      description: {
        en: "Produces 10-day forecasts with updates four times daily (00, 06, 12, and 18 UTC), ensuring the latest observations are reflected in the model's output.",
        hi: 'प्रति दिन चार बार (00, 06, 12, और 18 UTC) अपडेट के साथ 10-दिन का पूर्वानुमान उत्पन्न करता है, जिससे नवीनतम अवलोकन मॉडल के आउटपुट में सम्मिलित होते हैं।',
      },
    },
  ],
  operationalStandards: {
    en: 'Runs on Unified Model version 11.2 with the Global Atmosphere 7.2 (GA7.2) configuration, ensuring accurate simulation of atmospheric and land processes.',
    hi: 'यह यूनिफाइड मॉडल संस्करण 11.2 पर Global Atmosphere 7.2 (GA7.2) कॉन्फ़िगरेशन के साथ चलता है, जो वायुमंडलीय और स्थल प्रक्रियाओं के सटीक अनुकरण को सुनिश्चित करता है।',
  },
};

export const cncummodel = {
  name: {
    en: 'CNCUM Model',
    hi: 'CNCUM मॉडल',
  },
  alias: {
    en: 'Extended Range',
    hi: 'विस्तारित अवधि',
  },
  overview: {
    en: 'The CNCUM (Coupled NCMRWF Unified Model) integrates atmospheric, oceanic, and sea ice models to deliver precise forecasts over a range of timescales, from daily weather to seasonal climate patterns.',
    hi: 'CNCUM (कपल्ड NCMRWF यूनिफाइड मॉडल) वायुमंडलीय, महासागरीय और समुद्री बर्फ मॉडल को एकीकृत करता है ताकि दैनिक मौसम से लेकर मौसमी जलवायु पैटर्न तक विभिन्न समयसीमाओं पर सटीक पूर्वानुमान प्रदान किए जा सकें।',
  },
  features: [
    {
      icon: FaCogs,
      title: {
        en: 'Comprehensive Model Components',
        hi: 'व्यापक मॉडल घटक',
      },
      description: {
        en: 'Based on the UK Met Office’s Global Coupled Model Version 2 (GC2), including Global Atmosphere 6.0, Global Land 6.0, Global Ocean 5.0 (NEMO), and Global Sea Ice 6.0 (CICE).',
        hi: 'यूके मेट ऑफिस के ग्लोबल कपल्ड मॉडल वर्शन 2 (GC2) पर आधारित, जिसमें ग्लोबल एटमॉस्फियर 6.0, ग्लोबल लैंड 6.0, ग्लोबल ओशन 5.0 (NEMO), और ग्लोबल सी आइस 6.0 (CICE) शामिल हैं।',
      },
    },
    {
      icon: FaLayerGroup,
      title: {
        en: 'High-Resolution Forecasting',
        hi: 'उच्च-रिज़ॉल्यूशन पूर्वानुमान',
      },
      description: {
        en: 'Operates with a grid resolution of 0.833° x 0.556° in the atmosphere and 85 vertical levels. Uses a tri-polar ORCA025 grid with 75 ocean levels for detailed simulations, particularly at the surface.',
        hi: 'वायुमंडल में 0.833° x 0.556° ग्रिड रिज़ॉल्यूशन और 85 ऊर्ध्वाधर स्तरों पर संचालित होता है। यह त्रि-ध्रुवीय ORCA025 ग्रिड और 75 महासागरीय स्तरों का उपयोग करता है, विशेष रूप से सतह पर विस्तृत सिमुलेशन के लिए।',
      },
    },
    {
      icon: FaNetworkWired,
      title: {
        en: 'Three-Hourly Atmosphere-Ocean Coupling',
        hi: 'तीन-घंटे का वायुमंडल-महासागर युग्मन',
      },
      description: {
        en: 'Uses the OASIS coupler to synchronize atmospheric and ocean data every three hours, enhancing short-term weather and long-term climate prediction accuracy.',
        hi: 'OASIS कपलर का उपयोग हर तीन घंटे में वायुमंडलीय और महासागरीय डेटा को समन्वयित करने के लिए करता है, जिससे अल्पकालिक मौसम और दीर्घकालिक जलवायु पूर्वानुमानों की सटीकता बढ़ती है।',
      },
    },
    {
      icon: FaSatelliteDish,
      title: {
        en: 'Data Assimilation for Real-Time Initialization',
        hi: 'रीयल-टाइम प्रारंभिककरण के लिए डेटा एसिमिलेशन',
      },
      description: {
        en: 'Atmosphere initialized with NCUM data; ocean and sea ice use the NEMOVAR data assimilation system, providing up-to-date starting conditions daily.',
        hi: 'वायुमंडल को NCUM डेटा से प्रारंभ किया जाता है; महासागर और समुद्री बर्फ के लिए NEMOVAR डेटा एसिमिलेशन सिस्टम का उपयोग किया जाता है, जिससे प्रतिदिन अद्यतन प्रारंभिक स्थितियाँ प्राप्त होती हैं।',
      },
    },
  ],
  operationalStandards: {
    en: 'Supports daily 15-day deterministic forecasts, extended 16-member weekly multi-week forecasts, and experimental 55-member seasonal projections, aiding both short-term and climate planning.',
    hi: 'यह दैनिक 15-दिवसीय पूर्वानुमान, विस्तारित 16-सदस्यीय साप्ताहिक बहु-सप्ताह पूर्वानुमान और प्रयोगात्मक 55-सदस्यीय मौसमी पूर्वानुमानों का समर्थन करता है, जो अल्पकालिक और जलवायु नियोजन दोनों में सहायक हैं।',
  },
};
