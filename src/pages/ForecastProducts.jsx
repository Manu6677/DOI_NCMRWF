import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { modelData } from '../data/model-data';
import { useParams } from 'react-router-dom';
import ModelDetails from '../components/core/ForecastProductsPage/ModelDetails';
import Products from '../components/core/ForecastProductsPage/Products';
import GlobalProducts from '../components/core/ForecastProductsPage/GlobalProducts';
import RegionalProducts from '../components/core/ForecastProductsPage/RegionalProducts';
import CoupledProducts from '../components/core/ForecastProductsPage/CoupledProducts';
import EnsembleProducts from '../components/core/ForecastProductsPage/EnsembleProducts';
import { ncumG, ncumR, nepsG, cncummodel } from '../data/weatherModels';

const ForecastProducts = () => {
  const { modelType } = useParams();
  const { language } = useSelector((state) => state.language);
  const { locale } = language;

  const selectedModel = useMemo(
    () => modelData.find((model) => model.type === modelType),
    [modelType]
  );

  const [showDetails, setShowDetails] = useState(true);
  const [selectedProductComponent, setSelectedProductComponent] =
    useState(null);
  const [model, setModel] = useState(ncumG);
  const [selectedButton, setSelectedButton] = useState(null);

  const productComponents = useMemo(
    () => ({
      global: <GlobalProducts />,
      regional: <RegionalProducts />,
      ensemble: <EnsembleProducts />,
      'coupled-s2s': <CoupledProducts />,
    }),
    []
  );

  const modelConfig = useMemo(
    () => ({
      global: ncumG,
      regional: ncumR,
      ensemble: nepsG,
      'coupled-s2s': cncummodel,
    }),
    []
  );

  const handleButtonClick = useCallback(
    (product) => {
      if (product?.en.toLowerCase().split(' ').join('') === 'modeldetails') {
        setShowDetails(true);
      } else {
        setSelectedButton(product);
        setShowDetails(false);
        setSelectedProductComponent(productComponents[modelType]);
        setModel(modelConfig[modelType] || ncumG); // Fallback to default model if type is invalid
      }
    },
    [modelType, productComponents, modelConfig]
  );

  useEffect(() => {
    if (modelType) handleButtonClick();
  }, [modelType, handleButtonClick]);

  if (!selectedModel) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
        <div className="max-w-4xl rounded-lg bg-white p-6 shadow-lg">
          <p className="mt-4 text-lg text-red-500">
            {locale === 'en'
              ? 'Please select a valid model from the available routes.'
              : 'कृपया उपलब्ध मार्गों में से एक वैध मॉडल चुनें।'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-4">
      {/* <div className="mx-auto mb-4 flex w-9/12 items-center justify-center gap-4 text-blue-700">
        {selectedModel.forecastProducts.map((product, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(product)}
            className={`rounded-lg px-4 py-2 text-white transition duration-200 ${
              product === selectedButton
                ? 'bg-blue-400'
                : 'bg-blue-600 hover:bg-blue-200'
            }`}
          >
            {product[locale]}
          </button>
        ))}
      </div> */}
      {/* <div className="mx-auto w-9/12">
        <ModelDetails model={model} />
      </div> */}
      {/* <ModelDetails model={model} /> */}
    </div>
  );
};

export default ForecastProducts;
