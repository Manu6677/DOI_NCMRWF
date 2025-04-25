import React from 'react';
import { useSelector } from 'react-redux';
import UpcomingEvents1 from './UpcomingEvents1';
import OrganizationInfo from './OrganizationInfo';
import MapComponent from '../MapComponent';

const ImpactOverview = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;

  const translations = {
    en: {
      heading: 'Explore Our Organization & Impact',
      description:
        'Learn more about our organization’s initiatives, mission, and see our impact through detailed maps and valuable insights.',
    },
    hi: {
      heading: 'हमारे संगठन और प्रभाव की खोज करें',
      description:
        'हमारे संगठन की पहलों, मिशन के बारे में अधिक जानें और विस्तृत मानचित्रों और मूल्यवान अंतर्दृष्टियों के माध्यम से हमारे प्रभाव को देखें',
    },
  };

  return (
    // <section className="bg-blue-700 bg-gradient-to-r py-4">
    //   <div className="mx-auto mt-4">
    //     {/* Header */}
    //     <div className="mb-4 text-center">
    //       <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
    //         {translations[locale]?.heading || translations.en.heading}
    //       </h2>
    //       <p className="text-lg text-white md:text-xl">
    //         {translations[locale]?.description || translations.en.description}
    //       </p>
    //     </div>

    //     {/* Featured Sections: Latest News & Upcoming Events */}
    //     <div className="mx-auto flex flex-wrap items-center justify-center gap-4">
    //       <div className="col-span-1 w-6/12">
    //         <OrganizationInfo />
    //       </div>
    //       <div className="col-span-1 w-5/12">
    //         <h2 className="mb-4 text-2xl font-bold text-white">
    //           {locale === 'en'
    //             ? 'GIS-Based Weather Mapping and Analysis'
    //             : 'जीआईएस आधारित मौसम मानचित्रण और विश्लेषण'}
    //         </h2>
    //         <MapComponent />
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <section className="bg-blue-700 bg-gradient-to-r py-4">
      <div className="mx-auto mt-2 px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
            {translations[locale]?.heading || translations.en.heading}
          </h2>
          <p className="text-lg text-white md:text-xl">
            {translations[locale]?.description || translations.en.description}
          </p>
        </div>

        {/* Featured Sections */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-center">
          <div className="-mt-12 w-full md:w-6/12">
            <OrganizationInfo />
          </div>

          <div className="w-full md:w-5/12">
            <h2 className="mb-4 text-2xl font-bold text-white">
              {locale === 'en'
                ? 'GIS-Based Weather Mapping and Analysis'
                : 'जीआईएस आधारित मौसम मानचित्रण और विश्लेषण'}
            </h2>
            <MapComponent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactOverview;
