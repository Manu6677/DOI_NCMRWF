import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import toast from 'react-hot-toast'; // Not used in the provided snippet, uncomment if needed
import ProductImageModal from '../ProductImageModal';
import Breadcrumbs from '../../../common/Breadcrumbs';
import ProductCard from './ProductCard';
import Pagination from '../../../common/Pagination';
// import ForecastHours from '../ForecastSidebarMenu/ForecastHours'; // Commented out as in original
// import { fetchForecastHours } from '../../../../services/operations/forecastAPI'; // Commented out as in original
import Spinner from '../../../common/Spinner';
import ChangeUTC from './ChangeUTC';
import {
  setObservationPage,
  setObservationUTC,
  // setObservationProductId, // Not used in the provided snippet, uncomment if needed
  // setObservationUrl, // Not used directly as a setter in this component, URL comes from selector
  // resetObservationPagination, // Not used in the provided snippet, uncomment if needed
} from '../../../../slices/observationProductsSlice';

const ObservationProducts = () => {
  const {
    // selectedObservationProductId, // Available but not directly used for rendering in this version
    observationPage,
    totalObservationPages,
    observationUTC,
    observationUrl,
    // Potentially get a name for the selected observation product for breadcrumbs
    // selectedObservationProductName
  } = useSelector((state) => state.observationProducts);

  const dispatch = useDispatch();

  // The 'loading' state is declared but not actively managed within this component's useEffects.
  // It's assumed that the loading state related to fetching observationUrl is handled elsewhere (e.g., in a thunk setting observationUrl).
  // If this component were responsible for fetching, setLoading(true/false) would be used.
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  // const [metaData, setMetaData] = useState([]); // metaData state was present but not used, keeping it commented.
  const [previewProduct, setPreviewProduct] = useState(null);

  // Breadcrumb items - customize as needed
  const breadcrumbItems = [
    { name: 'Dashboard', path: '/' }, // Example base path
    { name: 'Observations', path: '/observations' }, // Example path for observation products
    // Optionally, add a dynamic breadcrumb for the selected observation product if a name is available
    // { name: selectedObservationProductName || `Product ID: ${selectedObservationProductId}`, path: '#' },
  ];

  useEffect(() => {
    if (observationUrl) {
      if (Array.isArray(observationUrl)) {
        setProducts(observationUrl);
      } else {
        setProducts([observationUrl]); // Wrap it in array if it's a single URL
      }
    } else {
      setProducts([]); // Clear products if observationUrl is not available
    }
  }, [observationUrl]);

  // If there's a scenario where products for observations might need to be fetched when UTC or page changes,
  // a useEffect similar to the one in ModelProducts would be needed here, calling an API and managing setLoading.
  // For now, it's assumed observationUrl is fully managed by other dispatches.

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-grow overflow-auto p-4 sm:p-6">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Controls Section */}
        <div className="my-4 flex flex-wrap items-center gap-4 rounded-md bg-slate-50 p-2 px-4 shadow">
          {/* UTC Change Component */}
          <div className="flex items-center">
            <ChangeUTC
              selectedUTC={observationUTC}
              setSelectedUTC={(utc) => dispatch(setObservationUTC(utc))}
              // You might want to add specific props to ChangeUTC if observation date ranges differ
            />
          </div>

          {/* Forecast Hours Selection or other observation-specific filters would go here */}
          {/* Example: If observation products have different time slots within the selected UTC day */}
          {/* <div className="flex items-center">
            <label htmlFor="obs-time-select" className="mr-2 text-sm font-medium text-slate-700">Time:</label>
            <Select id="obs-time-select" ... />
          </div> */}
        </div>

        {/* Loading State: Centered Spinner */}
        {/* This spinner will show if 'loading' state is true. Ensure 'loading' is managed appropriately. */}
        {loading && (
          <div className="flex h-64 items-center justify-center">
            <Spinner size="12" /> {/* Increased size for better visibility */}
          </div>
        )}

        {/* No Products Available Message */}
        {!loading &&
          products.length === 0 && ( // Removed metaData.length check as it's not used here
            <p className="py-10 text-center text-lg text-slate-500">
              No observation products available. Please check your selection.
            </p>
          )}

        {/* Product Display Grid */}
        {!loading && products.length > 0 && (
          <div
            className={`grid gap-6 ${
              products.length === 1
                ? 'grid-cols-1 place-items-center' // Center the single card
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' // Responsive grid
            }`}
          >
            {products.map((imageUrl, index) => (
              <ProductCard
                key={index}
                imageUrl={imageUrl}
                onClick={() => setPreviewProduct(imageUrl)}
                // Pass classes for width control, consistent with other components
                Class={
                  products.length === 1
                    ? 'w-full max-w-2xl' // Larger max-width for a single centered image/card
                    : 'w-full' // Full width within its grid cell
                }
              />
            ))}
          </div>
        )}
      </div>{' '}
      {/* End of scrollable content area */}
      {/* Pagination Controls: Styled container at the bottom */}
      {!loading && totalObservationPages > 1 && (
        <div className="border-t border-slate-200 bg-slate-50 p-4">
          <Pagination
            page={observationPage}
            totalPages={totalObservationPages}
            onPageChange={(newPage) => dispatch(setObservationPage(newPage))}
            // showHpa={true} // Add if this prop is relevant
          />
        </div>
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
