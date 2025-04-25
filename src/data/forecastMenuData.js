import {
  FaChartPie,
  FaChartLine,
  FaBook,
  FaCalendarAlt,
  FaSun,
  FaCloud,
  FaWater,
} from 'react-icons/fa';

export const forecastMenuData = [
  {
    title: 'Forecast Range',
    icon: 'FaSun',
    items: [
      { title: 'Short (72 hours)', icon: 'FaCloud' },
      { title: 'Medium (10 days)', icon: 'FaChartPie' },
      { title: 'Extended (36 days)', icon: 'FaChartLine' },
      { title: 'Seasonal (3 months)', icon: 'FaChartLine' },
      { title: 'Ensemble (Months)', icon: 'FaChartPie' },
    ],
  },
  {
    title: 'Level',
    icon: 'FaCloud',
    items: [
      { title: 'Surface', icon: 'FaSun' },
      { title: 'Atmosphere', icon: 'FaCloud' },
      { title: 'Ocean', icon: 'FaWater' },
    ],
  },
  {
    title: 'Parameters',
    icon: 'FaBook',
    items: [
      { title: 'Pressure', icon: 'FaChartPie' },
      { title: 'Wind', icon: 'FaCalendarAlt' },
    ],
  },
];

// Function to dynamically return icons
export const getIcon = (iconName) => {
  const icons = {
    FaChartPie: <FaChartPie />,
    FaChartLine: <FaChartLine />,
    FaBook: <FaBook />,
    FaCalendarAlt: <FaCalendarAlt />,
    FaSun: <FaSun />,
    FaCloud: <FaCloud />,
    FaWater: <FaWater />,
  };
  return icons[iconName] || <FaChartPie />;
};
