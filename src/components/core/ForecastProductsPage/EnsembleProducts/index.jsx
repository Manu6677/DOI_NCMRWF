import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ensembleForecastProducts } from '../../../../data/model-data';

const EnsembleProducts = () => {
  const [selectedType, setSelectedType] = useState(
    ensembleForecastProducts[0].type
  );

  const { language } = useSelector((state) => state.language);
  const { locale } = language;

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="mb-4 text-center text-2xl font-bold">
        Ensemble Monsoon Products
      </h1>

      {/* Type Selector */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {ensembleForecastProducts.map((product, index) => (
          <div
            key={index}
            onClick={() => handleTypeChange(product.type)}
            className={`cursor-pointer rounded-full px-6 py-2 text-center text-sm font-medium transition-all duration-200 ${
              selectedType === product.type
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {product.type}
          </div>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ensembleForecastProducts
          .find((product) => product.type === selectedType)
          ?.products.map((item, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              <h3 className="mb-2 text-lg font-semibold">{item[locale]}</h3>
              <p className="text-gray-600">{item[locale]}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EnsembleProducts;
