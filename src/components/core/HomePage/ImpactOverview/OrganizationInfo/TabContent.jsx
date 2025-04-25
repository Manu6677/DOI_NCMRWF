import React from 'react';
import UpcomingEvents from './UpcomingEvents';
import PhotoGallery from './PhotoGallery';
import Tenders from './Tenders';
import LatestJobOpenings from './LatestJobOpenings';

const TabContent = ({ activeTab }) => {
  let content;

  switch (activeTab) {
    case 0:
      content = <UpcomingEvents />;
      break;
    case 1:
      content = <LatestJobOpenings />;
      break;
    case 2:
      content = <Tenders />;
      break;
    case 3:
      content = <PhotoGallery />;
      break;
    default:
      content = <UpcomingEvents />;
  }

  const heightClass =
    activeTab === 0
      ? 'h-[15.6rem] md:h-[30rem]' // Shorter height for UpcomingEvents
      : 'h-[27rem] md:h-[32rem]'; // Taller height for others

  return (
    <div
      className={`mt-8 overflow-y-scroll rounded-lg border border-richblack-25 bg-white p-6 transition-all duration-300 ${heightClass}`}
    >
      {content}
    </div>
  );
};

export default TabContent;
