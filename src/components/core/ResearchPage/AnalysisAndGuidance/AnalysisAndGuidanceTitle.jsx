import React from 'react';

const AnalysisAndGuidanceSectionTitle = ({
  feature,
  selectedSection,
  click,
  color,
}) => {
  const isSelected = selectedSection === feature?.id;

  return (
    <div
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 px-8 py-6 ${isSelected ? 'bg-blue-700 text-white' : `bg-${color} text-blue-700`}`}
      onClick={click}
    >
      <div className="text-3xl">{feature?.icon}</div>
      <div className="text-center text-xl">{feature?.title}</div>
    </div>
  );
};

export default AnalysisAndGuidanceSectionTitle;
