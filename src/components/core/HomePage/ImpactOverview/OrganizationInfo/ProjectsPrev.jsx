import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Scheme data
const schemes = [
  {
    name: {
      en: 'Numerical Modelling of Weather and Climate (NMWC)',
      hi: 'जलवायु और मौसम का संख्यात्मक मॉडलिंग (NMWC)',
    },
    implementedBy: {
      en: 'NCMRWF',
      hi: 'NCMRWF',
    },
    objectives: [
      {
        en: 'Improvement of seamless weather and climate prediction system with high reliability over India and neighbouring regions.',
        hi: 'भारत और पड़ोसी क्षेत्रों में उच्च विश्वसनीयता के साथ निर्बाध मौसम और जलवायु पूर्वानुमान प्रणाली में सुधार।',
      },
      {
        en: 'Development of novel applications based on dynamical model outputs for various sectors (viz. Defence, Energy, Water Resource, Transport, Geo-Hazards etc.).',
        hi: 'विभिन्न क्षेत्रों (जैसे रक्षा, ऊर्जा, जल संसाधन, परिवहन, भू-खतरों आदि) के लिए गतिशील मॉडल आउटपुट पर आधारित नए अनुप्रयोगों का विकास।',
      },
      {
        en: 'Establishment, maintenance and enhancement of physical, computational and associated infrastructure for carrying out research and development activities.',
        hi: 'अनुसंधान और विकास गतिविधियों को करने के लिए भौतिक, कम्प्यूटेशनल और संबंधित बुनियादी ढांचे की स्थापना, रखरखाव और संवर्धन।',
      },
    ],
  },
  {
    name: {
      en: 'BIMSTEC Centre for Weather and Climate (BCWC)',
      hi: 'BIMSTEC मौसम और जलवायु केंद्र (BCWC)',
    },
    implementedBy: {
      en: 'NCMRWF',
      hi: 'NCMRWF',
    },
    objectives: [
      {
        en: 'To conduct training, workshops, capacity building, enhancing the observing system for BIMSTEC (for both process understanding and forecast skill improvement).',
        hi: 'BIMSTEC के लिए प्रशिक्षण, कार्यशालाएँ, क्षमता निर्माण, अवलोकन प्रणाली को बढ़ाना (प्रक्रिया की समझ और पूर्वानुमान कौशल सुधार के लिए)।',
      },
      {
        en: 'Deliver products and services in applied scientific research in weather prediction and climate modelling in the BIMSTEC region.',
        hi: 'BIMSTEC क्षेत्र में मौसम पूर्वानुमान और जलवायु मॉडलिंग में अनुप्रयुक्त वैज्ञानिक अनुसंधान में उत्पाद और सेवाएँ प्रदान करना।',
      },
      {
        en: 'Build capacity in the field of weather and climate through training programs, workshops, conferences, scientific personnel exchange in the BIMSTEC region through research fellowships for the scientists.',
        hi: 'वैज्ञानिकों के लिए अनुसंधान फैलोशिप के माध्यम से BIMSTEC क्षेत्र में प्रशिक्षण कार्यक्रमों, कार्यशालाओं, सम्मेलनों, वैज्ञानिक व्यक्तियों के आदान-प्रदान के माध्यम से मौसम और जलवायु के क्षेत्र में क्षमता निर्माण करना।',
      },
      {
        en: 'Enhance observing systems for the BIMSTEC region.',
        hi: 'BIMSTEC क्षेत्र के लिए अवलोकन प्रणालियों को बढ़ाना।',
      },
    ],
  },
  {
    name: {
      en: 'National Monsoon Mission (NMM)',
      hi: 'राष्ट्रीय मानसून मिशन (NMM)',
    },
    implementedBy: {
      en: 'IITM, IMD, INCOIS and NCMRWF',
      hi: 'IITM, IMD, INCOIS और NCMRWF',
    },
    objectives: [
      {
        en: 'A mission mode program to improve quality of Monsoon forecasts at:',
        hi: 'एक मिशन मोड कार्यक्रम मानसून पूर्वानुमान की गुणवत्ता में सुधार करने के लिए:',
      },
      {
        en: 'Seasonal scale (entire season – June-September) with lead times of up to 3 months.',
        hi: 'सीजनल स्केल (पूरा मौसम – जून-सितंबर) 3 महीने तक के लीड समय के साथ।',
      },
      {
        en: 'Extended range (10-30 days).',
        hi: 'विस्तारित रेंज (10-30 दिन)।',
      },
      {
        en: 'Short (3-5 days) and Medium (5-15 days) ranges.',
        hi: 'छोटे (3-5 दिन) और मध्यम (5-15 दिन) रेंज।',
      },
    ],
  },
  {
    name: {
      en: 'High Performance Computing (HPC)',
      hi: 'उच्च प्रदर्शन कंप्यूटिंग (HPC)',
    },
    implementedBy: {
      en: 'IITM/NCMRWF',
      hi: 'IITM/NCMRWF',
    },
    objectives: [
      {
        en: 'Setup a multiple petaflops HPC system (at IITM & NCMRWF) to carry out R&D activities on model developments and to provide operational forecasts.',
        hi: 'मॉडल विकास पर अनुसंधान और विकास गतिविधियों को करने और संचालन पूर्वानुमान प्रदान करने के लिए IITM और NCMRWF में एक से अधिक पेटाफ्लॉप्स HPC सिस्टम स्थापित करना।',
      },
    ],
  },
];

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[2],
  },
  backgroundColor: theme.palette.primary.light, // Add a light primary color background
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    {...props}
    expandIcon={
      <ChevronRightIcon sx={{ fontSize: '1rem', color: 'inherit' }} />
    }
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.primary.light, // Match accordion background
  flexDirection: 'row-reverse',
  padding: theme.spacing(1, 2),
  '& .MuiAccordionSummary-content': {
    marginRight: theme.spacing(1),
    fontWeight: 800,
    color: theme.palette.primary.contrastText, // Use contrasting text color
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: 'none',
  backgroundColor: theme.palette.primary.light, // Match accordion background
  color: theme.palette.primary.contrastText, // Use contrasting text color
}));

const ProjectsPrev = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language.locale;

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // return (
  //     <div className="p-6 bg-gray-100 rounded-lg relative dark:bg-gray-800">
  //         <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-3">
  //             {locale === 'en' ? 'Projects' : 'परियोजनाएँ'}
  //         </h2>
  //         <div className="space-y-4 overflow-y-scroll">
  //             {schemes.slice(0, 3).map((scheme, index) => (
  //                 <div key={index}>
  //                     <Accordion expanded={expanded === `panel${index + 1}`} onChange={handleChange(`panel${index + 1}`)}>
  //                         <AccordionSummary aria-controls={`panel${index + 1}d-content`} id={`panel${index + 1}d-header`}>
  //                             <Typography variant="body1">
  //                                 {scheme.name[locale]} ({locale === 'en' ? `Implemented by: ${scheme.implementedBy[locale]}` : `द्वारा लागू किया गया: ${scheme.implementedBy[locale]}`})
  //                             </Typography>
  //                         </AccordionSummary>
  //                         <AccordionDetails>
  //                             <Typography variant="body2">
  //                                 <strong className='text-lg mb-1'>{locale === 'en' ? 'Objectives:' : 'उद्देश्य:'}</strong>
  //                                 <ul style={{ listStyleType: 'disc', marginLeft: '1rem' }}>
  //                                     {scheme.objectives.map((objective, objIndex) => (
  //                                         <li key={objIndex} className='text-base'>{objective[locale]}</li>
  //                                     ))}
  //                                 </ul>
  //                             </Typography>
  //                         </AccordionDetails>
  //                     </Accordion>
  //                 </div>
  //             ))}
  //         </div>
  //         <div className="absolute -bottom-6 right-0">
  //             <Link to="/projects" className="text-blue-600 hover:underline">
  //                 {locale === 'en' ? 'See more projects...' : 'और परियोजनाएँ देखें...'}
  //             </Link>
  //         </div>
  //     </div>
  // );
  return <></>;
};

export default ProjectsPrev;
