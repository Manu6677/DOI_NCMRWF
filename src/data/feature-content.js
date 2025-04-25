// import { FaCogs, FaChartLine, FaGlobe, FaFlask, FaWater } from 'react-icons/fa';
import { MdOutlineModelTraining } from 'react-icons/md';
import { AiFillProduct } from 'react-icons/ai';
import { BiSolidAnalyse } from 'react-icons/bi';
import { SiRoamresearch } from 'react-icons/si';
import { FaWater } from 'react-icons/fa';
import { MdOutlineMap } from 'react-icons/md';

export const featureSections = [
  // {
  //   id: 1,
  //   title: 'Reanalysis Portal',
  //   description:
  //     'Navigate through the Reanalysis Portal to review historical climate data and perform in-depth analysis.',
  //   icon: <BiSolidAnalyse />,
  //   path: 'https://rds.ncmrwf.gov.in/',
  // },
  {
    id: 2,
    title: 'Model Guidance',
    description:
      'Explore detailed guidance and tools on meteorological models, including updates, simulations, and configuration guides.',
    icon: <MdOutlineModelTraining />,
    path: '/modelGuidance',
  },
  {
    id: 3,
    title: 'Data Assimilation',
    description:
      'Understand and implement advanced data assimilation techniques for integrating observational data into meteorological models for improved forecasts.',
    icon: <AiFillProduct />,
    path: '/dataAssimilation',
  },
];
