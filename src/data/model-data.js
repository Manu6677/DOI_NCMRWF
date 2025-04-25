export const modelData = [
  {
    id: 1,
    type: 'global',
    name: {
      en: 'Global (NCUM-G)',
      hi: 'वैश्विक (NCUM-G)',
    },
    description: {
      en: 'This section provides details about the Global NCUM-G model.',
      hi: 'यह अनुभाग वैश्विक NCUM-G मॉडल के बारे में विवरण प्रदान करता है।',
    },
    forecastProducts: [
      {
        en: 'Model Details',
        hi: 'मॉडल विवरण',
      },
      {
        en: 'Products',
        hi: 'उत्पाद',
      },
    ],
  },
  {
    id: 2,
    type: 'regional',
    name: {
      en: 'Regional (NCUM-R)',
      hi: 'क्षेत्रीय (NCUM-R)',
    },
    description: {
      en: 'This section covers details about the Regional NCUM-R model.',
      hi: 'यह अनुभाग क्षेत्रीय NCUM-R मॉडल के बारे में विवरण प्रस्तुत करता है।',
    },
    featuresorecastProducts: [
      {
        en: 'Model Details',
        hi: 'मॉडल विवरण',
      },
      {
        en: 'Products',
        hi: 'उत्पाद',
      },
    ],
  },
  {
    id: 3,
    type: 'ensemble',
    name: {
      en: 'Ensemble (NEPS-G)',
      hi: 'एन्सेम्बल (NEPS-G)',
    },
    description: {
      en: 'This section explains the Ensemble NEPS-G model.',
      hi: 'यह अनुभाग एन्सेम्बल NEPS-G मॉडल की व्याख्या करता है।',
    },
    forecastProducts: [
      {
        en: 'Model Details',
        hi: 'मॉडल विवरण',
      },
      {
        en: 'Monsoon Region',
        hi: 'मानसून क्षेत्र',
      },
    ],
  },
  {
    id: 4,
    type: 'coupled-s2s',
    name: {
      en: 'Coupled-S2S',
      hi: 'जुड़ा हुआ-S2S',
    },
    description: {
      en: 'Details about the Coupled-S2S model are provided here.',
      hi: 'यहां जुड़ा हुआ-S2S मॉडल के बारे में विवरण प्रदान किया गया है।',
    },
    forecastProducts: [
      {
        en: 'Model Details',
        hi: 'मॉडल विवरण',
      },
      {
        en: 'Products',
        hi: 'उत्पाद',
      },
    ],
  },
];

export const globalForecastProducts = [
  {
    type: 'NCUM-outputs',
    products: [
      {
        en: 'Wind-Forecast',
        hi: 'हवा का पूर्वानुमान',
      },
      {
        en: 'Rain-Forecast',
        hi: 'बारिश का पूर्वानुमान',
      },
      {
        en: 'Meteogram',
        hi: 'मेटियोग्राम',
      },
      {
        en: 'Dust-Forecast',
        hi: 'धूल का पूर्वानुमान',
      },
      {
        en: 'Trajectory',
        hi: 'पथ',
      },
      {
        en: 'Subdivisional-Rainfall',
        hi: 'उपविभागीय वर्षा',
      },
      {
        en: 'Soil-Moisture',
        hi: 'मिट्टी की नमी',
      },
      {
        en: 'Temperature',
        hi: 'तापमान',
      },
      {
        en: 'Temp-Tendency',
        hi: 'तापमान की प्रवृत्ति',
      },
      {
        en: 'Trajectory-Matrix-Freq',
        hi: 'पथ मैट्रिक्स आवृत्ति',
      },
      {
        en: 'Mslp-10M-Wind-Forecast',
        hi: 'एमएसएलपी-10एम-विंड-फोरकास्ट',
      },
      {
        en: 'NCUMG-AIMR',
        hi: 'एनसीयूएमजी-एआईएमआर',
      },
    ],
  },
  {
    type: 'NCUM-JS-plot',
    products: [
      {
        en: 'NCUM-JS-plot',
        hi: 'एनसीयूएम-जेएस-plot',
      },
    ],
  },
];

export const regionalForecastProducts = [
  {
    type: 'UM Reg4Km',
    products: [
      { en: 'Wind-Forecast', hi: 'हवा का पूर्वानुमान' },
      { en: 'Rain-Forecast', hi: 'बारिश का पूर्वानुमान' },
    ],
  },
  {
    type: 'DM Chem',
    products: [
      { en: 'Visibility (330m)', hi: 'दृश्यता (330 मीटर)' },
      { en: 'Visibility (1.5km)', hi: 'दृश्यता (1.5 किमी)' },
      { en: 'Hourly', hi: 'घंटिक' },
      { en: 'IGI-Delhi', hi: 'IGI-दिल्ली' },
      { en: 'Ncmrwf', hi: 'रा.म.अ.मौ.पू.कें' },
      { en: 'Lucknow (1.5km)', hi: 'लखनऊ (1.5 किमी)' },
      { en: 'Jaipur (1.5km)', hi: 'जयपुर (1.5 किमी)' },
      { en: 'Amritsar (1.5km)', hi: 'अमृतसर (1.5 किमी)' },
      { en: 'RH (330m)', hi: 'RH (330 मीटर)' },
      { en: 'Surface-Temperature (330m)', hi: 'सतह का तापमान (330 मीटर)' },
      {
        en: 'Ventilation-Index (330m)',
        hi: 'हवा के प्रवाह का सूचकांक (330 मीटर)',
      },
      {
        en: 'Ventilation-Index (1.5km)',
        hi: 'हवा के प्रवाह का सूचकांक (1.5 किमी)',
      },
      { en: 'Surface-Temperature (1.5km)', hi: 'सतह का तापमान (1.5 किमी)' },
      { en: 'RH (1.5km)', hi: 'RH (1.5 किमी)' },
      { en: 'Minimum Visibility', hi: 'न्यूनतम दृश्यता' },
      { en: 'Maximum PM2.5', hi: 'अधिकतम PM2.5' },
    ],
  },
];

export const ensembleForecastProducts = [
  {
    type: '12 km ENSEMBLE Outputs',
    products: [
      {
        en: 'Geo-potential Height',
        hi: 'भू-पोटेंशियल ऊँचाई',
      },
      {
        en: 'Rainfall Probability',
        hi: 'बारिश की संभावना',
      },
      {
        en: 'Mean Sea Level Pressure (MSLP)',
        hi: 'औसत समुद्र स्तर का दबाव (MSLP)',
      },
      {
        en: 'Ensemble Stamps',
        hi: 'एन्सेम्बल स्टैम्प्स',
      },
      {
        en: 'EPSgrams',
        hi: 'EPSgrams',
      },
      {
        en: 'Wind Forecast',
        hi: 'हवा का पूर्वानुमान',
      },
      {
        en: 'TC Tracker',
        hi: 'TC ट्रैकर',
      },
      {
        en: 'Temperature-Departure',
        hi: 'तापमान-ह्रास',
      },
      {
        en: 'Temperature-Probability',
        hi: 'तापमान-संभावना',
      },
      {
        en: 'Subdivisional-Rainfall-Departure',
        hi: 'उपविभाजनिक-बर्षा-ह्रास',
      },
      {
        en: 'Subdivisional-Rainfall-Probability',
        hi: 'उपविभाजनिक-बर्षा-संभावना',
      },
      {
        en: 'District-Wise-EPSgrams',
        hi: 'जिला-वार-EPSgrams',
      },
      {
        en: 'District-Wise-PQPF',
        hi: 'जिला-वार-PQPF',
      },
    ],
  },
];

export const coupledForecastProducts = [
  {
    type: 'Rain',
    subTypes: [
      {
        subType: 'Rain',
        products: [
          {
            en: 'Full-Field',
            hi: 'पूर्ण क्षेत्र',
          },
          {
            en: 'Anomaly',
            hi: 'विकृति',
          },
        ],
      },
    ],
  },
  {
    type: 'Temperature',
    subTypes: [
      {
        subType: 'Tmin',
        products: [
          {
            en: 'Full-Field',
            hi: 'पूर्ण क्षेत्र',
          },
          {
            en: 'Anomaly',
            hi: 'विकृति',
          },
        ],
      },
      {
        subType: 'Tmax',
        products: [
          {
            en: 'Full-Field',
            hi: 'पूर्ण क्षेत्र',
          },
          {
            en: 'Anomaly',
            hi: 'विकृति',
          },
        ],
      },
    ],
  },
  {
    type: 'Wind',
    subTypes: [
      {
        subType: '850hPa',
        products: [
          {
            en: 'Full-Field',
            hi: 'पूर्ण क्षेत्र',
          },
          {
            en: 'Anomaly',
            hi: 'विकृति',
          },
        ],
      },
      {
        subType: '500hPa',
        products: [
          {
            en: 'Full-Field',
            hi: 'पूर्ण क्षेत्र',
          },
          {
            en: 'Anomaly',
            hi: 'विकृति',
          },
        ],
      },
      {
        subType: '200hPa',
        products: [
          {
            en: 'Full-Field',
            hi: 'पूर्ण क्षेत्र',
          },
          {
            en: 'Anomaly',
            hi: 'विकृति',
          },
        ],
      },
    ],
  },
  {
    type: 'Combined Pdfs',
    subTypes: [
      {
        subType: 'India-Region',
        products: [
          {
            en: 'Weekly-Mean',
            hi: 'साप्ताहिक औसत',
          },
          {
            en: 'Four-week-Mean',
            hi: 'चार सप्ताह का औसत',
          },
        ],
      },
      {
        subType: 'BIMSTEC-Region',
        products: [
          {
            en: 'Weekly-Mean',
            hi: 'साप्ताहिक औसत',
          },
          {
            en: 'Four-week-Mean',
            hi: 'चार सप्ताह का औसत',
          },
        ],
      },
    ],
  },
];
