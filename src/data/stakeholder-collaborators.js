// src/data/stakeholders.js
import imdImg from '../assets/images/imd_logo_a.webp';
import incoisImg from '../assets/images/INCOIS.jpg';
import iitmPuneImg from '../assets/images/IITM.jpg';
import ncporImg from '../assets/images/ncpor.png';
import nccrImg from '../assets/images/nccr.png';

export const stakeholders = [
  {
    name: 'IITM Pune',
    role: 'Research Partner',
    description:
      'Specializes in improving weather and climate models, supporting atmospheric research.',
    logo: iitmPuneImg,
    link: 'https://www.tropmet.res.in/',
  },
  {
    name: 'IMD',
    role: 'Operational Partner',
    description:
      'Responsible for national weather services, observations, and forecast quality control.',
    logo: imdImg,
    link: 'https://mausam.imd.gov.in/',
  },
  {
    name: 'INCOIS',
    role: 'Marine Collaborator',
    description:
      'Provides ocean observations, forecasts, and advisory services for coastal management.',
    logo: incoisImg,
    link: 'https://incois.gov.in/',
  },
  {
    name: 'NCPOR',
    role: 'Polar & Ocean Research',
    description:
      'Conducts research on polar regions and oceanographic sciences, supporting climate studies.',
    logo: ncporImg,
    link: 'https://ncpor.res.in/',
  },
  {
    name: 'NCCR',
    role: 'Coastal Research & Management',
    description:
      'Focuses on coastal erosion, marine ecosystems, and climate change impacts on coastal zones.',
    logo: nccrImg,
    link: 'https://nccr.gov.in/',
  },
];
