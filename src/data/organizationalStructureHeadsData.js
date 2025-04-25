// tableData.js
const columnsStructureHead = [
  {
    id: 'sn',
    label: { en: 'SN.', hi: 'क्रम संख्या' },
    minWidth: 150,
  },
  {
    id: 'abbr',
    label: { en: 'Group Abr.', hi: 'समूह संक्षेप' },
    minWidth: 190,
  },
  {
    id: 'fullName',
    label: { en: 'Group Full Name', hi: 'समूह का पूरा नाम' },
    minWidth: 250,
  },
  {
    id: 'leader',
    label: { en: 'Team Leader', hi: 'टीम लीडर' },
    minWidth: 250,
  },
];

// groupSubHeadData.js
const rowsStructureHead = {
  en: [
    {
      sn: '1.',
      abbr: 'Head/Director',
      fullName: 'Head/Director',
      leader: 'Dr. V.S. Prasad',
    },
    {
      sn: '2.',
      abbr: 'DAE',
      fullName: 'Data Assimilation & Ensembles',
      leader: 'Dr. John P George',
    },
    {
      sn: '3.',
      abbr: 'MD',
      fullName: 'Model Development',
      leader: 'Dr. Saji Mohandas',
    },
    {
      sn: '4.',
      abbr: 'CAI',
      fullName: 'Computer & AI',
      leader: 'Dr. Preveen Kumar D.',
    },
    {
      sn: '5.',
      abbr: 'HPCI',
      fullName: 'HPC & Infrastructure',
      leader: 'Dr. B. Athiyaman',
    },
    {
      sn: '6.',
      abbr: 'CBT',
      fullName: 'Capacity Building & Training',
      leader: 'Dr. Ashish Routray',
    },
    {
      sn: '7.',
      abbr: 'BCWC',
      fullName: 'BIMSTEC Center for Weather & Climate',
      leader: 'Dr. Raghavendra Ashrit',
    },
    {
      sn: '8.',
      abbr: 'ADMIN',
      fullName: 'Administration',
      leader: 'Mr. Biswajit Guha',
    },
  ],
  hi: [
    {
      sn: '1.',
      abbr: 'प्रमुख/निदेशक',
      fullName: 'प्रमुख/निदेशक',
      leader: 'डॉ. वी. एस. प्रसाद',
    },
    {
      sn: '2.',
      abbr: 'डीएई',
      fullName: 'डेटा एसिमिलेशन और एन्सेम्बल',
      leader: 'डॉ. जॉन पी. जॉर्ज',
    },
    {
      sn: '3.',
      abbr: 'एमडी',
      fullName: 'मॉडल डेवलपमेंट',
      leader: 'डॉ. साजी मोहनदास',
    },
    {
      sn: '4.',
      abbr: 'सीएआई',
      fullName: 'कंप्यूटर और एआई',
      leader: 'डॉ. प्रवीण कुमार डी.',
    },
    {
      sn: '5.',
      abbr: 'एचपीसीआई',
      fullName: 'एचपीसी और इन्फ्रास्ट्रक्चर',
      leader: 'डॉ. बी. अतीयमन',
    },
    {
      sn: '6.',
      abbr: 'सीबीटी',
      fullName: 'क्षमता निर्माण और प्रशिक्षण',
      leader: 'डॉ. आशीष राउतराय',
    },
    {
      sn: '7.',
      abbr: 'बीसीडब्ल्यूसी',
      fullName: 'बिम्सटेक मौसम और जलवायु केंद्र',
      leader: 'डॉ. राघवेंद्र अश्रित',
    },
    {
      sn: '8.',
      abbr: 'प्रशासन',
      fullName: 'प्रशासन',
      leader: 'श्री बिस्वजीत गुहा',
    },
  ],
};

const columnsSubStructureHead = [
  {
    id: 'sn',
    label: { en: 'SN.', hi: 'क्रम संख्या' },
    minWidth: 150,
  },
  {
    id: 'abbr',
    label: { en: 'Group Abr.', hi: 'समूह संक्षेप' },
    minWidth: 190,
  },
  {
    id: 'section',
    label: { en: 'Section Name', hi: 'अनुभाग नाम' },
    minWidth: 300,
  },
  {
    id: 'leader',
    label: { en: 'Team Leader', hi: 'टीम लीडर' },
    minWidth: 250,
  },
];

const rowsSubStructureHead = {
  en: [
    {
      sn: '1.',
      abbr: 'DRP',
      section: 'Data Reception & Processing',
      leader: 'Dr. S. Indira Rani',
    },
    {
      sn: '2.',
      abbr: 'DA-1',
      section: 'Data Assimilation-1 (NCUM/NEPS)',
      leader: 'Dr. Imran Ali Momin',
    },
    {
      sn: '3.',
      abbr: 'DA-2',
      section: 'Data Assimilation-2 (NGFS)',
      leader: 'Dr. S. Indira Rani',
    },
    {
      sn: '4.',
      abbr: 'MEDA',
      section: 'Model Evaluation, Diagnostics & Applications',
      leader: 'Dr. Anumeha Dube',
    },
    {
      sn: '5.',
      abbr: 'OM',
      section: 'Ocean Modelling',
      leader: 'Dr. D.K. Mohapatra',
    },
    {
      sn: '6.',
      abbr: 'AM',
      section: 'Atmospheric Modelling',
      leader: 'Dr. A. Jayakumar',
    },
    {
      sn: '7.',
      abbr: 'CM',
      section: 'Coupled Modelling',
      leader: 'Dr. Akhilesh Kumar Mishra',
    },
    {
      sn: '8.',
      abbr: 'RSAI',
      section: 'Remote Sensing & Artificial Intelligence',
      leader: 'Dr. M.N. Raghavendra Sreevathsa',
    },
  ],
  hi: [
    {
      sn: '1.',
      abbr: 'डीआरपी',
      section: 'डेटा प्राप्ति और प्रसंस्करण',
      leader: 'डॉ. एस. इंदिरा रानी',
    },
    {
      sn: '2.',
      abbr: 'डीए-1',
      section: 'डेटा एसिमिलेशन-1 (NCUM/NEPS)',
      leader: 'डॉ. इमरान अली मोमिन',
    },
    {
      sn: '3.',
      abbr: 'डीए-2',
      section: 'डेटा एसिमिलेशन-2 (NGFS)',
      leader: 'डॉ. एस. इंदिरा रानी',
    },
    {
      sn: '4.',
      abbr: 'एमईडीए',
      section: 'मॉडल मूल्यांकन, डायग्नोस्टिक्स और अनुप्रयोग',
      leader: 'डॉ. अनुलेखा दुबे',
    },
    {
      sn: '5.',
      abbr: 'ओएम',
      section: 'महासागर मॉडलिंग',
      leader: 'डॉ. डी. के. मोहापात्रा',
    },
    {
      sn: '6.',
      abbr: 'एएम',
      section: 'वायुमंडलीय मॉडलिंग',
      leader: 'डॉ. ए. जयकुमार',
    },
    {
      sn: '7.',
      abbr: 'सीएम',
      section: 'कपल्ड मॉडलिंग',
      leader: 'डॉ. अखिलेश कुमार मिश्रा',
    },
    {
      sn: '8.',
      abbr: 'आरएसएआई',
      section: 'रिमोट सेंसिंग और आर्टिफिशियल इंटेलिजेंस',
      leader: 'डॉ. एम. एन. राघवेंद्र श्रीवात्स',
    },
  ],
};

export {
  columnsSubStructureHead,
  rowsSubStructureHead,
  columnsStructureHead,
  rowsStructureHead,
};
