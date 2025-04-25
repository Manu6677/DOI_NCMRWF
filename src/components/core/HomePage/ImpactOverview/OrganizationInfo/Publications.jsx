import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';

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
  backgroundColor: theme.palette.primary.light,
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    {...props}
    expandIcon={
      <ChevronRightIcon sx={{ fontSize: '1rem', color: 'inherit' }} />
    }
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  flexDirection: 'row-reverse',
  padding: theme.spacing(1, 2),
  '& .MuiAccordionSummary-content': {
    marginRight: theme.spacing(1),
    fontWeight: 800,
    color: theme.palette.primary.contrastText,
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: 'none',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
}));

const Publications = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language.locale;

  const publicationsData = [
    // Data for 2024
    {
      year: '2024',
      publications: [
        {
          authors:
            'A.G. Rangaraj, Y. Srinath, K. Boopathi, Reddy Prasad D. M., and Sushant Kumar',
          title:
            'Statistical post-processing of numerical weather prediction data using distribution-based scaling for wind energy',
          journal: 'Wind Energy',
          doi: '10.1177/0309524X241238353',
        },
        {
          authors:
            'Arijit Chakraborty, Manabendra Saharia, Sumedha Chakma, Dharmendra Kumar Pandey, Kondapalli Niranjan Kumar, Praveen K. Thakur, Sujay Kumar, and Augusto Getirana',
          title:
            'Improved soil moisture estimation and detection of irrigation signal by incorporating SMAP soil moisture into the Indian Land Data Assimilation System (ILDAS)',
          journal: 'Journal of Hydrology',
          doi: '10.1016/j.jhydrol.2024.131581',
        },
        // More publications for 2024...
      ],
    },
    // Data for 2023
    {
      year: '2023',
      publications: [
        {
          authors:
            'A. Munsi, A.P. Kesarkar, J.N. Bhate, K. Singh, A. Panchal, G. Kutty, M.M. Ali, Ashish Routray, and R.K. Giri',
          title:
            'Atmosphere-upper-ocean interactions during three rare cases of rapidly intensified tropical cyclones over North Indian oceans',
          journal: 'Journal of Oceanography',
          doi: '10.1007/s10872-022-00664-3',
        },
        // More publications for 2023...
      ],
    },
    // Data for 2022...
  ];

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 relative rounded-lg p-6">
      <h2 className="text-gray-800 dark:text-gray-100 mb-3 text-center text-2xl font-semibold">
        {locale === 'en' ? 'Publications' : 'प्रकाशन'}
      </h2>
      <div className="space-y-4 overflow-y-scroll">
        {publicationsData.map((data, index) => (
          <div key={index}>
            <Accordion
              expanded={expanded === `panel${index + 1}`}
              onChange={handleChange(`panel${index + 1}`)}
            >
              <AccordionSummary
                aria-controls={`panel${index + 1}d-content`}
                id={`panel${index + 1}d-header`}
              >
                <Typography variant="h6">{data.year}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {data.publications.map((publication, pubIndex) => (
                  <div key={pubIndex} className="mb-2 flex flex-col gap-2">
                    <Typography variant="body1">
                      <strong>{locale === 'en' ? 'Title:' : 'शीर्षक:'}</strong>{' '}
                      {publication.title}
                    </Typography>

                    <Typography variant="body2">
                      <strong>{locale === 'en' ? 'Authors:' : 'लेखक:'}</strong>{' '}
                      {publication.authors}
                    </Typography>
                    <Typography variant="body2">
                      <strong>{locale === 'en' ? 'Journal:' : 'जर्नल:'}</strong>{' '}
                      {publication.journal}
                    </Typography>
                    <Typography variant="body2">
                      <strong>{locale === 'en' ? 'DOI:' : 'DOI:'}</strong>{' '}
                      <a
                        href={`https://doi.org/${publication.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {publication.doi}
                      </a>
                    </Typography>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
      <div className="absolute -bottom-6 right-0">
        <Link to="/publications" className="text-blue-600 hover:underline">
          {locale === 'en' ? 'See more publications...' : 'और प्रकाशन देखें...'}
        </Link>
      </div>
    </div>
  );
};

export default Publications;
