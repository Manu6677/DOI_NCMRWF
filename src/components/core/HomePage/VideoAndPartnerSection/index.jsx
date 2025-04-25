// import React from 'react';
// import { useSelector } from 'react-redux';
// import VideoSection from './VideoSection';
// // import PartnerCarousel from './PartnerCarousel';
// import LogoCarousel from './LogoCarousel';

// const VideoAndPartnerSection = () => {
//   const { language } = useSelector((state) => state.language);
//   const locale = language?.locale;

//   const translations = {
//     en: {
//       heading: 'Explore Our Journey',
//       description:
//         'Discover our story through engaging videos, events, and partner collaborations that drive our mission forward and create lasting change',
//     },
//     hi: {
//       heading: 'हमारी यात्रा का अन्वेषण करें',
//       description:
//         'रोमांचक वीडियो, कार्यक्रमों और साझेदार सहयोगों के माध्यम से हमारी कहानी की खोज करें, जो हमारे मिशन को आगे बढ़ाते हैं और स्थायी परिवर्तन लाते हैं',
//     },
//   };

//   return (
//     <section className="from-gray-50 to-gray-100 text-gray-900 bg-blue-700 bg-gradient-to-r py-8">
//       <div className="mx-auto my-4">
//         {/* Header */}
//         <div className="mb-4 text-center">
//           <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
//             {translations[locale]?.heading || translations.en.heading}
//           </h2>
//           <p className="text-lg text-white md:text-xl">
//             {translations[locale]?.description || translations.en.description}
//           </p>
//         </div>

//         <div className="mx-auto flex flex-col flex-wrap lg:mx-0 lg:flex-row lg:items-center lg:justify-center">
//           <div className="col-span-1 w-10/12 lg:w-6/12">
//             <VideoSection />
//           </div>
//           <div className="col-span-1 w-10/12 lg:w-5/12">
//             <LogoCarousel />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default VideoAndPartnerSection;

import React from 'react';
import { useSelector } from 'react-redux';
import VideoSection from './VideoSection';
import LogoCarousel from './LogoCarousel';

const VideoAndPartnerSection = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;

  const translations = {
    en: {
      heading: 'Explore Our Journey',
      description:
        'Discover our story through engaging videos, events, and partner collaborations that drive our mission forward and create lasting change',
    },
    hi: {
      heading: 'हमारी यात्रा का अन्वेषण करें',
      description:
        'रोमांचक वीडियो, कार्यक्रमों और साझेदार सहयोगों के माध्यम से हमारी कहानी की खोज करें, जो हमारे मिशन को आगे बढ़ाते हैं और स्थायी परिवर्तन लाते हैं',
    },
  };

  return (
    <section className="from-gray-50 to-gray-100 text-gray-900 bg-blue-700 bg-gradient-to-r py-8">
      <div className="mx-auto my-4 max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
            {translations[locale]?.heading || translations.en.heading}
          </h2>
          <p className="text-lg text-white md:text-xl">
            {translations[locale]?.description || translations.en.description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center">
          {/* Video */}
          <div className="w-full max-w-2xl lg:w-6/12">
            <VideoSection />
          </div>

          {/* Carousel */}
          <div className="w-full max-w-2xl lg:w-5/12">
            <LogoCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoAndPartnerSection;
