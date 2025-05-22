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
    <div className="flex max-h-screen flex-col bg-slate-100">
      {' '}
      {/* Consistent root styling */}
      {/* Main content and sidebar wrapper */}
      {/* - Default (Mobile): flex-col (Controls/Sidebar on top, Main Content below) */}
      {/* - sm (~640px) and up (Tablets, Desktops): flex-row-reverse (Controls/Sidebar on right, Main Content on left) */}
      <div className="flex flex-1 flex-col gap-4 overflow-hidden p-2 sm:flex-row-reverse sm:gap-6 sm:p-4 md:p-6">
        {/* Controls Section (Transformed into a Sidebar) */}
        {/* - Mobile: w-full, max-h-[45vh] (prevents taking too much vertical space), internal scroll */}
        {/* - sm (~640px): sm:w-auto, sm:max-w-xs */}
        {/* - md (~768px, Tablet Portrait): md:max-w-sm */}
        {/* - lg (~1024px, Tablet Landscape/Small Desktop): lg:max-w-md */}
        <div
          className="flex max-h-[45vh] w-full flex-shrink-0 flex-col overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-lg sm:max-h-full sm:w-auto sm:max-w-xs sm:p-6 md:max-w-sm lg:max-w-md" // Sidebar styling
        >
          {/* UTC Change Component */}
          <div className="flex items-center">
            <ChangeUTC
              selectedUTC={observationUTC}
              setSelectedUTC={(utc) => dispatch(setObservationUTC(utc))}
            />
          </div>

          {/* Forecast Hours Selection or other observation-specific filters would go here, stacked vertically */}
          {/* Example:
      {actualObservationFilters && actualObservationFilters.length > 0 && (
        <div className="mt-4 sm:mt-6">
          <label htmlFor="obs-time-select" className="mr-2 text-sm font-medium text-slate-700">Time:</label>
          <Select id="obs-time-select" options={...} ... />
        </div>
      )}
      */}

          {/* Pagination Controls: Moved into the sidebar */}
          {!loading && totalObservationPages > 1 && (
            <div className="mt-auto border-t border-slate-200 pt-4 sm:pt-6">
              {' '}
              {/* mt-auto pushes to bottom */}
              <Pagination
                page={observationPage}
                totalPages={totalObservationPages}
                onPageChange={(newPage) =>
                  dispatch(setObservationPage(newPage))
                }
                // showHpa={true} // Add if relevant for observations
                // showTimeLine={true} // Add if relevant
              />
            </div>
          )}
          {/* Optional: Simplified footer if no pagination */}
          {(loading || totalObservationPages <= 1) && (
            <div className="mt-auto pt-4 text-center sm:pt-6">
              {' '}
              {/* Ensures a consistent bottom element */}
              <hr className="border-slate-300" />
            </div>
          )}
        </div>

        {/* Main Content Area (Breadcrumbs, Loading, No Products, or Product Grid) */}
        {/* - Takes remaining space (flex-1) and handles its own scrolling (overflow-y-auto) */}
        <div className="flex-1 overflow-y-auto">
          {/* Breadcrumbs: Placed at the top of the scrollable main content */}
          <div className="mb-2 px-1 py-2 sm:mb-4 sm:px-2">
            {' '}
            {/* Padding for breadcrumbs container */}
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex h-full items-center justify-center py-10">
              {' '}
              {/* h-full for better centering */}
              <Spinner size="12" />
            </div>
          )}

          {/* No Products Available Message */}
          {!loading && products.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center p-4 py-10 text-center">
              {' '}
              {/* h-full for centering */}
              <p className="text-base italic text-slate-500 sm:text-lg">
                No observation products available. Please check your selection.
              </p>
            </div>
          )}

          {/* Product Display Grid */}
          {/* - Standardized responsive columns, padding, and gap. */}
          {!loading && products.length > 0 && (
            <div
              className={`grid gap-4 p-2 sm:gap-6 sm:p-4 ${
                // Responsive padding and gap
                products.length === 1
                  ? 'grid-cols-1 place-items-center'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' // Standardized responsive columns
              }`}
            >
              {products.map((imageUrl, index) => (
                <ProductCard
                  key={index}
                  imageUrl={imageUrl}
                  onClick={() => setPreviewProduct(imageUrl)}
                  Class={`${
                    products.length === 1
                      ? 'w-full max-w-lg sm:max-w-xl md:max-w-2xl' // Responsive max-width for single item
                      : 'w-full'
                  } rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 bg-white border`} // Added border
                />
              ))}
            </div>
          )}
        </div>
      </div>
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
