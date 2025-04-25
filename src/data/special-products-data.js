import severWeatherImg from '../assets/images/special-products/weather-svgrepo-com.svg';
import partnerShip from '../assets/images/special-products/neighborhood-svgrepo-com.svg';
// import extremeWeatherImg from '../assets/images/special-products/lightening-storm-cloud-svgrepo-com.svg';
import swfdpImg from '../assets/images/special-products/box-cross-view-svgrepo-com.svg';
import avivationImg from '../assets/images/special-products/modeling-svgrepo-com.svg';
import insightImg from '../assets/images/special-products/insight-svgrepo-com.svg';
import observationImg from '../assets/images/special-products/observation-svgrepo-com.svg';
import statisticsImg from '../assets/images/special-products/statistics-svgrepo-com.svg';
import energyImg from '../assets/images/special-products/nuclear-energy-svgrepo-com.svg';
import oceanImg from '../assets/images/special-products/sea-svgrepo-com.svg';

export const specialProductsData = [
  {
    title: { en: 'Severe Weather', hi: 'कठोर मौसम' },
    desc: {
      en: 'Real-time weather insights through dynamic, regularly updated charts',
      hi: 'नियमित रूप से अपडेट किए गए चार्ट के माध्यम से वास्तविक समय में मौसम की जानकारी',
    },
    img: severWeatherImg,
    link: 'forecast-dashboard',
  },
  {
    title: {
      en: 'Services for Neighbouring Regions',
      hi: 'पड़ोसी क्षेत्रों के लिए सेवाएँ',
    },
    desc: {
      en: 'Customized weather services for neighboring regions',
      hi: 'पड़ोसी क्षेत्रों के लिए अनुकूलित मौसम सेवाएँ',
    },
    img: partnerShip,
    link: 'https://www.ncmrwf.gov.in/product_main_reg_mihir',
  },
  {
    title: { en: 'SW-FDP', hi: 'एसडब्ल्यू-एफडीपी' },
    desc: {
      en: 'NCUM products supporting WMO’s weather forecast demonstration',
      hi: 'डब्लूएमओ के मौसम पूर्वानुमान प्रदर्शन का समर्थन करने वाले एनसीयूएम उत्पाद।',
    },
    img: swfdpImg,
    link: 'https://www.ncmrwf.gov.in/HomePage/index',
  },
  {
    title: { en: 'Aviation Products', hi: 'विमानन उत्पाद' },
    desc: {
      en: 'Explore daily aviation products from the NCUM-Regional model',
      hi: 'एनसीयूएम-क्षेत्रीय मॉडल से दैनिक विमानन उत्पादों का अन्वेषण करें।',
    },
    img: avivationImg,
    link: 'https://www.ncmrwf.gov.in/Aviation',
  },
  {
    title: { en: 'Multi-Hazard Products', hi: 'बहु-खतरा उत्पाद' },
    desc: {
      en: 'Daily insights for cyclones, visibility, and TCHP from NCUM',
      hi: 'एनसीयूएम से चक्रवात, दृश्यता, और टीसीएचपी के लिए दैनिक अंतर्दृष्टि',
    },
    img: insightImg,
    link: 'https://www.ncmrwf.gov.in/All_times_mihir-multi_h',
  },
  {
    title: { en: 'Observation Monitoring', hi: 'प्रेक्षण निगरानी' },
    desc: {
      en: 'Monitoring results for improved data assimilation by NCMRWF',
      hi: 'रा.म.अ.मौ.पू.कें द्वारा बेहतर डेटा आत्मसात के लिए निगरानी परिणाम',
    },
    img: observationImg,
    link: 'https://www.ncmrwf.gov.in/observation-monitoring-report',
  },
  {
    title: { en: 'Probabilistic Products', hi: 'संभाव्य उत्पाद' },
    desc: {
      en: "Stay updated with NCMRWF's probabilistic forecast systems",
      hi: 'रा.म.अ.मौ.पू.कें की संभाव्य पूर्वानुमान प्रणालियों से अपडेट रहें',
    },
    img: statisticsImg,
    link: 'https://www.ncmrwf.gov.in/Probabilistic_forecast',
  },
  {
    title: {
      en: 'Solar & Wind Energy Products',
      hi: 'सौर और पवन ऊर्जा उत्पाद',
    },
    desc: {
      en: 'NCUM model guidance for renewable energy sources',
      hi: 'नवीकरणीय ऊर्जा स्रोतों के लिए एनसीयूएम मॉडल मार्गदर्शन',
    },
    img: energyImg,
    link: 'https://www.ncmrwf.gov.in/solar-wind',
  },
  {
    title: { en: 'Ocean State Forecasting', hi: 'महासागर स्थिति पूर्वानुमान' },
    desc: {
      en: 'Daily ocean state forecast from the CNCUM model',
      hi: 'सीएनसीयूएम मॉडल से महासागर स्थिति का दैनिक पूर्वानुमान',
    },
    img: oceanImg,
    link: 'https://www.ncmrwf.gov.in/ocean-meteogram.php',
  },
];
