export const navData = [
  {
    id: 1,
    title: {
      en: 'Home',
      hi: 'मुखपृष्ठ',
    },
    path: '/',
    dropdown: false,
  },
  {
    id: 2,
    title: {
      en: 'About',
      hi: 'परिचय',
    },
    path: '',
    dropdown: true,
    dropdownContainerClass: '-left-[15rem] w-[40rem] top-12',
    arrowClass: 'left-[17rem] top-0',
    dropdownData: [
      {
        id: 1,
        title: {
          en: 'About Us',
          hi: 'हमारे बारे में',
        },
        path: '/about-us',
      },
      {
        id: 2,
        title: {
          en: "Director's Desk",
          hi: 'निर्देशक का संदेश',
        },
        path: '/about/directors-desk',
      },
      {
        id: 3,
        title: {
          en: 'Organizational Structure',
          hi: 'संगठनात्मक संरचना',
        },
        path: '/about-us/organizationalstructure',
      },
      {
        id: 4,
        title: {
          en: 'Former Directors',
          hi: 'पूर्व निदेशक',
        },
        path: '/about/former-directors',
      },
      {
        id: 5,
        title: {
          en: 'Employees',
          hi: 'कर्मचारी',
        },
        path: '/about/employees',
      },
    ],
  },
  {
    id: 3,
    title: {
      en: 'Products',
      hi: 'पूर्वानुमान',
    },
    path: '/forecast-dashboard/model-products',
    // path: '/forecast-products/',
    dropdown: false,
    dropdownContainerClass: '-left-[18rem] w-[45rem] top-12',
    arrowClass: 'left-[21rem] top-0',
    dropdownData: [
      {
        id: 1,
        title: {
          en: 'Short Range',
          hi: 'क्षेत्रीय मौसम पूर्वानुमान',
        },
        path: '/forecast-products/regional',
      },
      {
        id: 2,
        title: {
          en: 'Medium Range',
          hi: 'वैश्विक मौसम पूर्वानुमान',
        },
        path: '/forecast-products/global',
      },
      {
        id: 3,
        title: {
          en: 'Extended Range',
          hi: 'मौसमी से उपमौसमी (S2S) पूर्वानुमान',
        },
        path: '/forecast-products/coupled-s2s',
      },
      {
        id: 4,
        title: {
          en: 'Ensemble Forecast',
          hi: 'प्रायिक पूर्वानुमान',
        },
        path: '/forecast-products/ensemble',
      },
      {
        id: 5,
        title: {
          en: 'Special Products',
          hi: 'विशेष उत्पाद',
        },
        path: '/special-products',
      },
    ],
  },
  {
    id: 4,
    title: {
      en: 'Research',
      hi: 'अनुसंधान और विकास',
    },
    path: '/research',
    // dropdown: true,
    dropdownContainerClass: '-left-[8rem] w-[22rem] top-12',
    arrowClass: 'left-[10rem] top-0',
    dropdownData: [
      {
        id: 1,
        title: {
          // en: 'Numerical Weather Prediction (NWP) Models',
          en: 'Modelling',
          hi: 'संख्यात्मक मौसम भविष्यवाणी (NWP) मॉडल',
        },
        path: '/research-development/nwp-models',
      },
      {
        id: 2,
        title: {
          en: 'Reanalysis',
          hi: 'जलवायु पुनर्विश्लेषण',
        },
        path: '/research-development/climate-reanalysis',
      },
      {
        id: 3,
        title: {
          en: 'Data Assimilation',
          hi: 'डेटा आत्मसात तकनीक',
        },
        path: '/research-development/data-assimilation-techniques',
      },
    ],
  },
  {
    id: 5,
    title: {
      en: 'BIMSTEC',
      hi: 'बिम्सटेक',
    },
    path: '/bimstec',
    dropdown: true,
    dropdownContainerClass: '-left-[6rem] w-[17rem] top-12',
    arrowClass: 'left-[8rem] top-0',
    dropdownData: [
      {
        id: 1,
        title: {
          // en: 'Numerical Weather Prediction (NWP) Models',
          en: 'About Bimstec',
          hi: 'बिम्सटेक के बारे में',
        },
        path: '/bimstec',
      },
      {
        id: 2,
        title: {
          en: 'Bimstec Charts',
          hi: 'बिम्सटेक आरेख',
        },
        path: '/bimstec/charts',
      },
    ],
  },
  {
    id: 6,
    title: {
      en: 'Reanalysis',
      hi: 'पुनर्विश्लेषण',
    },
    path: '/reanalysis',
    dropdown: false,
  },
  {
    id: 6,
    title: {
      en: 'Computing',
      hi: 'कंप्यूटिंग',
    },
    path: '/computing',
    dropdown: true,
    dropdownContainerClass: '-left-[2rem] w-[12rem] top-12',
    arrowClass: 'left-[5rem] top-0',
    dropdownData: [
      {
        id: 1,
        title: {
          en: 'Arunika',
          hi: 'एचपीसी सिस्टम और बुनियादी ढांचा',
        },
        path: '/computing/hpc-systems',
      },
      // {
      //   id: 2,
      //   title: {
      //     en: 'Data Storage',
      //     hi: 'डेटा प्रसंस्करण और भंडारण',
      //   },
      //   path: '/computing/data-storage',
      // },
      {
        id: 3,
        title: {
          en: 'Milestones',
          hi: 'सुपरकंप्यूटिंग माइलस्टोन्स',
        },
        path: '/computing/milestones',
      },
    ],
  },
  {
    id: 7,
    title: {
      en: 'Publications',
      hi: 'प्रकाशन',
    },
    path: '/publications',
    dropdown: false,
  },
];

export const navHeading = {
  title: {
    en: 'National Centre For Medium Range Weather Forecasting',
    hi: 'राष्ट्रीय मध्यम अवधि मौसम पूर्वानुमान केंद्र',
  },
  subtitle: {
    en: 'Ministry of Earth Sciences, Government of India',
    hi: 'पृथ्वी विज्ञान मंत्रालय, भारत सरकार',
  },
};

// {
//   id: 1,
//   title: {
//     en: 'Model Details',
//     hi: 'मॉडल विवरण'
//   },
//   path: '/charts'
// },
// {
//   id: 2,
//   title: {
//     en: 'Forecast Products',
//     hi: 'पूर्वानुमान उत्पाद'
//   },
//   path: '/special-products'
// }
