import { useState } from 'react';
import { featureSections } from '../../../../data/feature-content';
import AnalysisAndGuidanceTitle from './AnalysisAndGuidanceTitle';
import { useMemo } from 'react';
import { lazy } from 'react';
import { Suspense } from 'react';

const DataAssimilation = lazy(() => import('../DataAssimilation'));
const ModelGuidance = lazy(() => import('../ModelGuidance'));
const Reanalysis = lazy(() => import('../Reanalysis'));

const AnalysisAndGuidanceSection = ({ color }) => {
  const [selectedSection, setSelectedSection] = useState(2);

  const selectedFeature = useMemo(() => {
    return featureSections.find((feature) => feature.id === selectedSection);
  }, [selectedSection]);

  const renderSelectedComponent = useMemo(() => {
    switch (selectedSection) {
      case 1:
        return <Reanalysis />;
      case 2:
        return <ModelGuidance />;
      case 3:
        return <DataAssimilation />;
      default:
        return null;
    }
  }, [selectedSection]);

  return (
    <div className="">
      {/* Feature title */}
      <div className={`grid grid-cols-2 gap-6 bg-${color}`}>
        {featureSections.map((feature) => (
          <AnalysisAndGuidanceTitle
            key={feature?.id}
            feature={feature}
            selectedSection={selectedSection}
            click={() => setSelectedSection(feature?.id)}
            color={color}
            className="cursor-pointer"
          />
        ))}
      </div>

      {/* Display details of the selected feature */}
      {renderSelectedComponent && (
        <Suspense fallback={<div>Loading...</div>}>
          {renderSelectedComponent}
        </Suspense>
      )}
    </div>
  );
};

export default AnalysisAndGuidanceSection;
