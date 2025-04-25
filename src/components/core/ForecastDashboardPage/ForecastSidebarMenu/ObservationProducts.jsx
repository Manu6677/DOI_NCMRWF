import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import ProductImageModal from '../ProductImageModal';
import Breadcrumbs from '../../../common/Breadcrumbs';
import ProductCard from './ProductCard';
import Pagination from '../../../common/Pagination';
import ForecastHours from '../ForecastSidebarMenu/ForecastHours';
import { fetchForecastHours } from '../../../../services/operations/forecastAPI';
import Spinner from '../../../common/Spinner';
import ChangeUTC from './ChangeUTC';
import {
  setObservationPage,
  setObservationUTC,
  setObservationProductId,
  setObservationUrl,
  resetObservationPagination,
} from '../../../../slices/observationProductsSlice';

const ObservationProducts = () => {
  const {
    selectedObservationProductId,
    observationPage,
    totalObservationPages,
    observationUTC,
    observationUrl,
  } = useSelector((state) => state.observationProducts);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [previewProduct, setPreviewProduct] = useState(null);

  useEffect(() => {
    if (observationUrl) {
      if (Array.isArray(observationUrl)) {
        setProducts(observationUrl);
      } else {
        setProducts([observationUrl]); // Wrap it in array if it's a single URL
      }
    }
  }, [observationUrl]);

  return (
    <div className="h-screen overflow-auto p-6">
      {/* Breadcrumbs */}
      {/* <Breadcrumbs
        selectedModel={selectedModel}
        selectedProduct={selectedProduct}
      /> */}

      <div className="flex items-center gap-2">
        {/* UTC Change Component */}
        <div className="flex items-center">
          <ChangeUTC
            selectedUTC={observationUTC}
            setSelectedUTC={(utc) => dispatch(setObservationUTC(utc))}
          />
        </div>

        {/* Forecast Hours Selection */}
        {/* Forecast hours can be set similarly if available */}
        {/* <div className="flex items-center">
          <ForecastHours
            selectedHour={selectedSpecialForecastHour}
            onSelect={(hour) => dispatch(setSelectedSpecialForecastHour(hour))}
            forecastHours={specialForecastHours}
          />
        </div> */}
      </div>

      {/* Loading State */}
      {loading && <Spinner size="8" />}

      {/* No Products Available */}
      {!loading && products.length === 0 && metaData.length === 0 && (
        <p className="text-center text-lg text-slate-600">
          No products found. Please try again later.
        </p>
      )}

      {/* Product Display Grid */}
      {!loading && products.length > 0 && (
        <div
          className={`grid gap-6 ${
            products.length === 1
              ? 'mx-auto grid-cols-1'
              : 'grid-cols-1 lg:grid-cols-2'
          }`}
        >
          {products.map((imageUrl, index) => (
            <ProductCard
              key={index}
              imageUrl={imageUrl}
              onClick={() => setPreviewProduct(imageUrl)}
              Class={products.length === 1 ? 'h-auto w-full' : ''}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && totalObservationPages > 1 && (
        <Pagination
          page={observationPage}
          totalPages={totalObservationPages}
          onPageChange={(newPage) => dispatch(setObservationPage(newPage))}
        />
      )}

      {/* Image Preview Modal */}
      {previewProduct && (
        <ProductImageModal
          imageUrl={previewProduct}
          onClose={() => setPreviewProduct(null)}
        />
      )}
    </div>
  );
};

export default ObservationProducts;
