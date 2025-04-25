import React from 'react';
import { useSelector } from 'react-redux';
import KeyPartnersAndContributorsItem from './KeyPartnersAndContributors/KeyPartnersAndContributorsItem';
import employeeImg from '../../../../assets/images/employees.png';
import stakeholdersImg from '../../../../assets/images/beneficiary.png';
import collaboratorsImg from '../../../../assets/images/collaborators.png';
import { testimonialList } from '../../../../data/testimonial-data';

const dataList = [
  {
    img: employeeImg,
    text: {
      en: 'employees',
      hi: 'कर्मचारी',
    },
    link: '/about/employees',
  },
  {
    img: stakeholdersImg,
    text: {
      en: 'stakeholders',
      hi: 'हितधारक',
    },
    link: '/stakeholders',
  },
  {
    img: collaboratorsImg,
    text: {
      en: 'collaborators',
      hi: 'सहयोगी',
    },
    link: '/collaborators',
  },
];

const LeadershipAndPartners = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;

  return (
    <div className="bg-light-default py-4">
      <div className="container mx-auto mb-12 w-9/12 px-6">
        {/* Leaders Section */}
        <div className="mb-12">
          <h2 className="mb-6 text-center text-4xl font-semibold text-slate-700">
            {locale === 'hi' ? 'हमारे नेता' : 'Our Leaders'}
          </h2>
          <p className="mb-8 text-center text-lg text-slate-600">
            {locale === 'hi'
              ? 'हमारे संगठन को आगे बढ़ाने वाले दूरदर्शी नेताओं से मिलें'
              : 'Meet the visionary leaders who drive our organization forward'}
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Leader */}
            {testimonialList.map((item, index) => (
              <div
                className="h-full rounded-2xl border border-richblack-5 bg-white p-6 transition duration-300 hover:scale-105 hover:border-customRed-500"
                key={index}
              >
                <img
                  src={item?.author?.picture}
                  alt={item?.author?.fullName}
                  className="mx-auto mb-4 h-32 w-32 rounded-full"
                />
                <div className="flex flex-col items-center justify-center text-center">
                  <h3 className="text-xl font-semibold text-slate-700">
                    {item.author.fullName[locale]}
                  </h3>
                  <p className="text-slate-600">
                    {item?.author?.designation[locale]}
                  </p>
                </div>
              </div>
            ))}
            {/* Add more leader profiles here */}
          </div>
        </div>

        {/* Key Partners and Contributors Section */}
        <div className="mb-12">
          <h2 className="mb-6 text-center text-4xl font-semibold text-slate-700">
            {locale === 'hi'
              ? 'हमारे प्रमुख भागीदार और योगदानकर्ता'
              : 'Our Key Partners and Contributors'}
          </h2>
          <p className="mb-8 text-center text-lg text-slate-600">
            {locale === 'hi'
              ? 'हमारे दृष्टिकोण का समर्थन करने वाले भागीदारों और योगदानकर्ताओं से मिलें'
              : 'Meet the partners and contributors who support our vision'}
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dataList.map((data, i) => (
              <div key={i} className="col-span-1">
                <KeyPartnersAndContributorsItem items={data} id={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadershipAndPartners;
