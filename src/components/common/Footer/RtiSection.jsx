import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ASSETS_BASE_URL = process.env.REACT_APP_ASSETS_BASE_URL_NEW || '';

const translations = {
  title: {
    en: 'National Centre for Medium Range Weather Forecasting',
    hi: 'राष्ट्रीय मध्यम श्रेणी मौसम पूर्वानुमान केंद्र',
  },
  rtiAct: {
    en: 'RIGHT TO INFORMATION ACT, 2005',
    hi: 'सूचना का अधिकार अधिनियम, 2005',
  },
  disclosure: {
    en: 'Disclosure of information as per the requirement of Section 4 of the Act.',
    hi: 'अधिनियम की धारा 4 की आवश्यकता के अनुसार जानकारी का प्रकटीकरण।',
  },
  contacts: [
    {
      title: { en: 'First Appellate Authority', hi: 'प्रथम अपीलीय प्राधिकरण' },
      name: {
        en: 'Dr. Saji Mohandas, Scientist-G, NCMRWF',
        hi: 'डॉ. साजी मोहनदास, वैज्ञानिक-जी, NCMRWF',
      },
      email: 'faa.ncmrwf@gov.in',
      phone: '0120-2419412 Ext - 412',
    },
    {
      title: {
        en: 'Central Public Information Officer (CPIO)',
        hi: 'केंद्रीय लोक सूचना अधिकारी (CPIO)',
      },
      name: {
        en: 'Dr. D.K. Mahapatra, Scientist-E',
        hi: 'डॉ. डी.के. महापात्रा, वैज्ञानिक-ई',
      },
      email: 'cpio.ncmrwf@gov.in',
      phone: '0120-2419421 Ext - 421',
    },
    {
      title: {
        en: 'Assistant Public Information Officer (APIO)',
        hi: 'सहायक लोक सूचना अधिकारी (APIO)',
      },
      name: {
        en: 'Dr. Hashmi Fatima, Scientist-D',
        hi: 'डॉ. हाशमी फातिमा, वैज्ञानिक-डी',
      },
      email: 'hashmi.fatima@nic.in',
      phone: '0120-2419429 Ext - 429',
    },
  ],
  rtiInfo: {
    en: 'Click here for RTI Act 2005 details & filing procedure',
    hi: 'RTI अधिनियम 2005 के विवरण और आवेदन प्रक्रिया के लिए यहां क्लिक करें',
  },
  proactiveDisclosure: {
    en: 'Proactive Disclosure Under RTI Act',
    hi: 'RTI अधिनियम के तहत सक्रिय प्रकटीकरण',
  },
  additionalInfo: {
    en: 'Additional Information',
    hi: 'अतिरिक्त जानकारी',
  },
  lastUpdated: {
    en: 'Last Updated on 12-07-2024',
    hi: 'अंतिम अपडेट: 12-07-2024',
  },
  rtiLinks: [
    {
      en: 'RTI Queries Received at NCMRWF',
      hi: 'NCMRWF में प्राप्त RTI प्रश्न',
      link: '/rti/queries',
    },
    {
      en: 'Official Tour Details',
      hi: 'आधिकारिक दौरे का विवरण',
      link: '/rti/tours',
    },
  ],
};

const rtiDocuments = [
  {
    srNo: 1,
    description: { en: 'Particulars of organization', hi: 'संगठन का विवरण' },
    link: '/Documents/RTI-Section/RTINEW-1.pdf',
  },
  {
    srNo: 2,
    description: {
      en: 'Power and duties of officers/Employee',
      hi: 'अधिकारियों/कर्मचारियों की शक्तियाँ और कर्तव्य',
    },
    link: '/Documents/RTI-Section/RTI-2-3-4.pdf',
  },
  {
    srNo: 3,
    description: {
      en: 'Procedure for Decision Making',
      hi: 'निर्णय लेने की प्रक्रिया',
    },
    link: '/Documents/RTI-Section/Process%20of%20decision%20making%20Identify%20key%20decision%20making%20points.pdf',
  },
  {
    srNo: 4,
    description: {
      en: 'Norms for discharge of functions',
      hi: 'कार्य निर्वहन के मानदंड',
    },
    link: '/Documents/RTI-Section/Nature%20of%20functions.pdf',
  },
  {
    srNo: 5,
    description: {
      en: 'List of boards, Councils, committees and other bodies',
      hi: 'बोर्ड, परिषद, समितियों और अन्य निकायों की सूची',
    },
    link: '/Documents/RTI-Section/List%20of%20boards,%20Councils,%20committees%20and%20other%20bodies.pdf',
  },
  {
    srNo: 6,
    description: {
      en: 'Monthly remuneration of officers/employees',
      hi: 'अधिकारियों/कर्मचारियों का मासिक पारिश्रमिक',
    },
    link: '/Documents/RTI-Section/Basic Pay of Official of NCMRWF as on 01.01.2024.pdf',
  },
  {
    srNo: 7,
    description: {
      en: 'Budget allocated to each agency',
      hi: 'प्रत्येक एजेंसी को आवंटित बजट',
    },
    link: '/Documents/RTI-Section/Details of Budget estimates.pdf',
  },
  {
    srNo: 8,
    description: {
      en: 'Execution of subsidy program',
      hi: 'अनुदान कार्यक्रम का क्रियान्वयन',
    },
    link: '/Documents/RTI-Section/RTI-12.pdf',
  },
  {
    srNo: 9,
    description: {
      en: 'Particulars of recipients of concessions, permits',
      hi: 'रियायतों, परमिटों के प्राप्तकर्ताओं का विवरण',
    },
    link: '/Documents/RTI-Section/RTI-13.pdf',
  },
  {
    srNo: 10,
    description: {
      en: 'Particulars of PIOs',
      hi: 'सार्वजनिक सूचना अधिकारियों (PIOs) का विवरण',
    },
    link: '/Documents/RTI-Section/pio.pdf',
  },
  {
    srNo: 11,
    description: {
      en: 'Other Information Prescribed',
      hi: 'अन्य निर्दिष्ट जानकारी',
    },
    link: '/Documents/RTI-Section/NCMRWF_RTI_Audit_Page_25Jul2024.pdf',
  },
  {
    srNo: 12,
    description: {
      en: 'NCMRWF Transparency Audit Report 2022 - 2023',
      hi: 'NCMRWF पारदर्शिता ऑडिट रिपोर्ट',
    },
    link: '/Documents/RTI-Section/National_Centre_for_Medium_Range_Weather_Forecasting_Audited_Report_2022_23.pdf',
  },
  {
    srNo: 13,
    description: {
      en: 'NCMRWF Transparency Audit Report 2023 - 2024',
      hi: 'NCMRWF पारदर्शिता ऑडिट रिपोर्ट',
    },
    link: '/Documents/RTI-Section/TP_AuditedReport_NCMRWF_Noida_MoES_2023-24.pdf',
  },
  {
    srNo: 14,
    description: {
      en: 'Official Tour Details',
      hi: 'आधिकारिक यात्रा विवरण',
    },
    link: '/Documents/RTI-Section/Sc%20G%20&%20above.pdf',
  },
];

const RtiSection = () => {
  const [language, setLanguage] = useState('en');

  return (
    <div className="mx-auto max-w-5xl p-6">
      {/* Language Toggle Button */}
      <div className="mb-4 flex justify-end">
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-md hover:bg-blue-700"
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
        >
          {language === 'en' ? 'हिंदी में देखें' : 'View in English'}
        </button>
      </div>

      {/* Title and RTI Act Info */}
      <h1 className="mb-6 text-center text-3xl font-bold text-slate-800">
        {translations.title[language]}
      </h1>
      <h2 className="mb-4 text-center text-xl font-semibold text-blue-600">
        {translations.rtiAct[language]}
      </h2>
      <p className="mb-6 text-center text-slate-700">
        {translations.disclosure[language]}
      </p>

      {/* Contact Information */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {translations.contacts.map((contact, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-md"
          >
            <h3 className="text-lg font-semibold text-slate-800">
              {contact.title[language]}
            </h3>
            <p className="text-slate-600">{contact.name[language]}</p>
            <p className="text-slate-600">
              📧{' '}
              <a href={`mailto:${contact.email}`} className="text-blue-600">
                {contact.email}
              </a>
            </p>
            <p className="text-slate-600">📞 {contact.phone}</p>
          </div>
        ))}
      </div>

      {/* RTI Act Info Link */}
      <div className="mb-8 text-center">
        <a
          href="https://rti.gov.in/rtiact.asp"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 hover:underline"
        >
          {translations.rtiInfo[language]}
        </a>
      </div>

      {/* Proactive Disclosure Table */}
      <h3 className="mb-4 text-xl font-semibold text-slate-800">
        {translations.proactiveDisclosure[language]}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full rounded-lg border border-slate-300 shadow-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">Sr No</th>
              <th className="p-3 text-left">
                {language === 'en' ? 'Description' : 'विवरण'}
              </th>
              <th className="p-3 text-left">
                {language === 'en' ? 'Download' : 'डाउनलोड'}
              </th>
            </tr>
          </thead>
          <tbody>
            {rtiDocuments.map((item) => (
              <tr key={item.srNo} className="bg-white hover:bg-slate-100">
                <td className="border p-3">{item.srNo}</td>
                <td className="border p-3">{item.description[language]}</td>
                <td className="border p-3">
                  <Link
                    to={`${ASSETS_BASE_URL}${item.link}`}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    PDF
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Last Updated */}
      <p className="mt-8 text-right text-sm text-slate-600">
        {translations.lastUpdated[language]}
      </p>
    </div>
  );
};

export default RtiSection;
