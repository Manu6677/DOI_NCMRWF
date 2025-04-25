import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { coupledForecastProducts } from '../../../../data/model-data';

const CoupledProducts = () => {
  const [selectedType, setSelectedType] = useState(
    coupledForecastProducts[0].type
  );
  const [selectedSubType, setSelectedSubType] = useState(
    coupledForecastProducts[0].subTypes[0].subType
  );

  const { language } = useSelector((state) => state.language);
  const { locale } = language;

  const handleTypeChange = (type) => {
    setSelectedType(type);
    const subTypes = coupledForecastProducts.find(
      (product) => product.type === type
    )?.subTypes;
    if (subTypes && subTypes.length > 0) {
      setSelectedSubType(subTypes[0].subType);
    }
  };

  const handleSubTypeChange = (subType) => {
    setSelectedSubType(subType);
  };

  const selectedTypeData = coupledForecastProducts.find(
    (product) => product.type === selectedType
  );

  const selectedSubTypeData = selectedTypeData?.subTypes.find(
    (subType) => subType.subType === selectedSubType
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="mb-4 text-center text-2xl font-bold">
        Coupled Monsoon Products
      </h1>

      {/* Type Selector */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {coupledForecastProducts.map((product, index) => (
          <div
            key={index}
            onClick={() => handleTypeChange(product.type)}
            className={`cursor-pointer rounded-full px-6 py-2 text-center text-sm font-medium transition-all duration-200 ${
              selectedType === product.type
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {product?.type}
          </div>
        ))}
      </div>

      {/* SubType Selector */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {selectedTypeData?.subTypes.map((subType, index) => (
          <div
            key={index}
            onClick={() => handleSubTypeChange(subType.subType)}
            className={`cursor-pointer rounded-lg border p-4 text-center shadow-sm transition-all duration-200 ${
              selectedSubType === subType.subType
                ? 'border-green-500 bg-green-100 shadow-md'
                : 'border-gray-300 bg-white hover:shadow-lg'
            }`}
          >
            <p
              className={`text-sm font-semibold ${
                selectedSubType === subType?.subType
                  ? 'text-green-600'
                  : 'text-gray-800'
              }`}
            >
              {subType?.subType}
            </p>
          </div>
        ))}
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {selectedSubTypeData?.products.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer rounded-lg bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <h3 className="mb-2 text-lg font-semibold">{item[locale]}</h3>
            <p className="text-gray-600">{item[locale]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoupledProducts;
