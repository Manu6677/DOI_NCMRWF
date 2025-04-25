import React, { useEffect, useState } from 'react';
import { content } from '../../../../../data/organization-info-data';
import { useSelector } from 'react-redux';
import TabContent from './TabContent';

const OrganizationInfo = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language.locale;

  const [activeTab, setActiveTab] = useState(0);

  const handleActiveTab = (index) => {
    setActiveTab(index);
  };

  return (
    <section className="from-gray-50 to-gray-100 text-gray-900 bg-gradient-to-r py-10 md:py-20">
      <div className="container mx-auto flex flex-col justify-center">
        <div className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-1 py-1 text-white">
          {content.map((contentItem, index) => (
            <span
              key={index}
              className={`cursor-pointer rounded-3xl px-3 py-2 transition-all duration-300 hover:text-blue-700 ${activeTab === index ? 'bg-white text-blue-700' : ''}`}
              onClick={() => handleActiveTab(index)}
            >
              {contentItem[locale]}
            </span>
          ))}
        </div>

        {/* Display the content of the active tab */}
        <div className="mt-4">
          <TabContent activeTab={activeTab} />
        </div>
      </div>
    </section>
  );
};

export default OrganizationInfo;
