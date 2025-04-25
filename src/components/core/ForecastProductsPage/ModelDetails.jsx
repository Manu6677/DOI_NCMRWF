import React from 'react';
import {
  FaCogs,
  FaNetworkWired,
  FaLayerGroup,
  FaSatelliteDish,
} from 'react-icons/fa';

const featureIcons = {
  cogs: FaCogs,
  network: FaNetworkWired,
  layer: FaLayerGroup,
  satellite: FaSatelliteDish,
};

const ModelDetails = React.memo(({ model }) => {
  return (
    <div className="mx-auto my-8 max-w-5xl rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-8 text-slate-800 shadow-xl">
      <h1 className="mb-6 border-b-2 border-blue-700 pb-4 text-center text-4xl font-extrabold text-blue-700">
        {model.name} Overview
      </h1>
      <p className="mb-8 text-center text-lg text-slate-700">
        {model.overview}
      </p>

      <h2 className="mb-4 mt-6 text-2xl font-bold text-blue-600">
        Key Features
      </h2>

      <div className="space-y-6">
        {model.features.map((feature, index) => {
          const IconComponent = featureIcons[feature.icon]; // Get the icon component from the mapping
          return (
            <div
              key={`${model.name}-feature-${index}`} // Ensure a unique key for each feature
              className="flex items-start rounded-lg bg-white p-6 shadow-md transition hover:scale-105"
              role="group"
            >
              {IconComponent && (
                <IconComponent className="mr-4 text-4xl text-blue-500" />
              )}
              <div>
                <h3 className="mb-2 text-xl font-semibold text-blue-700">
                  {feature.title}
                </h3>
                <p>{feature.description}</p>
                {feature.details && (
                  <ul className="ml-4 mt-2 list-inside list-disc text-slate-600">
                    {feature.details.map((detail, idx) => (
                      <li key={`${model.name}-detail-${idx}`}>{detail}</li> // Ensure a unique key for each detail
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="mb-4 mt-10 text-2xl font-bold text-blue-600">
        Operational Standards
      </h2>
      <p className="rounded-lg bg-white p-6 shadow-md">
        {model.operationalStandards}
      </p>
    </div>
  );
});

export default ModelDetails;
