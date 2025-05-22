import { useEffect, useRef, useState } from 'react';
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
  setSpecialProductsPage,
  setSpecialForecastHours,
  setSelectedSpecialForecastHour,
  setSelectedSpecialProductsUTC,
} from '../../../../slices/allSpecialProductsSliceId';
import { useNavigate } from 'react-router-dom'; // Removed Navigate as it wasn't used directly for rendering

const REACT_APP_ASSETS_BASE_URL_NEW = process.env.REACT_APP_ASSETS_BASE_URL_NEW;

const SpecialModelProducts = () => {
  const forecastUrl = useSelector(
    (state) => state.allSpecialProductsId.forecastUrl
  );
  const {
    selectedProductId,
    specialProductsPage,
    totalSpecialProductsPages,
    specialForecastHours,
    selectedSpecialForecastHour,
    selectedSpecialProductsUTC,
    // Attempt to get a name for breadcrumbs if available, e.g., from a product details object
    // For example, if your state had: allSpecialProductsId.productDetails.name
    // currentSpecialProductName
  } = useSelector((state) => state.allSpecialProductsId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  // metaData state was present but not used in the original SpecialModelProducts, keeping it commented for now
  // const [metaData, setMetaData] = useState([]);
  const [previewProduct, setPreviewProduct] = useState(null);

  const hasUserSelectedRef = useRef(false);
  const hasNavigatedRef = useRef(false); // To prevent multiple navigations

  // Breadcrumb items - customize as needed
  const breadcrumbItems = [
    { name: 'Forecast Dashboard', path: '/forecast-dashboard' }, // Example base path
    { name: 'Special Products', path: '/forecast-dashboard/special-products' },
  ];

  // set hasUserSelectedRef to true when a user selects a product
  useEffect(() => {
    const handleUserClick = () => {
      hasUserSelectedRef.current = true;
    };
    window.addEventListener('click', handleUserClick);
    return () => {
      window.removeEventListener('click', handleUserClick);
    };
  }, []);

  useEffect(() => {
    if (forecastUrl) {
      if (Array.isArray(forecastUrl)) {
        setProducts(forecastUrl);
      } else {
        setProducts([forecastUrl]);
      }
    } else {
      setProducts([]); // Clear products if forecastUrl is not available
    }
  }, [forecastUrl]);

  useEffect(() => {
    // Early exit for products that redirect or don't have forecast hours
    const productsWithoutHours = [30, 31, 32, 34, 35, 36, 37];
    if (productsWithoutHours.includes(selectedProductId)) {
      dispatch(setSpecialForecastHours([])); // Clear forecast hours for these products
      return;
    }

    const loadForecastHour = async () => {
      setLoading(true);
      try {
        // Assuming selectedProductId is what's needed for special products
        const { hours } = await fetchForecastHours(
          null, // model_id not applicable here
          null, // product_id not applicable here
          selectedProductId
        );

        if (Array.isArray(hours) && hours.length > 0) {
          dispatch(setSpecialForecastHours(hours));
          // Set selected hour only if not already set or if current selected is not in new hours
          if (
            !selectedSpecialForecastHour ||
            !hours.includes(selectedSpecialForecastHour)
          ) {
            dispatch(setSelectedSpecialForecastHour(hours[0]));
          }
        } else {
          dispatch(setSpecialForecastHours([]));
          dispatch(setSelectedSpecialForecastHour(undefined)); // Or null
        }
      } catch (error) {
        console.error('Error fetching forecast hours:', error);
        toast.error('Unexpected error occurred while fetching forecast hours.');
      } finally {
        setLoading(false);
      }
    };

    if (selectedProductId) {
      // Only load if a selectedProductId exists
      loadForecastHour();
    }
    // Ensure selectedSpecialForecastHour is not in dependencies to avoid potential loops if set inside
  }, [selectedProductId, dispatch]);

  useEffect(() => {
    if (
      !hasUserSelectedRef.current ||
      hasNavigatedRef.current ||
      !selectedProductId
    )
      return;

    let redirectUrl = null;
    let internalNavigatePath = null;

    switch (selectedProductId) {
      case 30:
        redirectUrl = `${REACT_APP_ASSETS_BASE_URL_NEW}/NIOTC/niotc.html`;
        break;
      case 31:
        internalNavigatePath =
          '/forecast-dashboard/special-products/statiscyclone';
        break;
      case 32:
        redirectUrl = `${REACT_APP_ASSETS_BASE_URL_NEW}/STRIKE/strike.html`;
        break;
      case 34:
        redirectUrl = `${REACT_APP_ASSETS_BASE_URL_NEW}/HomePage/index.php`;
        break;
      case 35:
        redirectUrl = `${REACT_APP_ASSETS_BASE_URL_NEW}/india_map_pqpf.php`;
        break;
      case 36:
        redirectUrl = `${REACT_APP_ASSETS_BASE_URL_NEW}/india-map.php`;
        break;
      case 37:
        redirectUrl = `${REACT_APP_ASSETS_BASE_URL_NEW}/mjo-charts.php`;
        break;
      default:
        // No redirection for other product IDs
        return;
    }

    hasNavigatedRef.current = true; // Set flag to prevent re-navigation

    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else if (internalNavigatePath) {
      navigate(internalNavigatePath);
    }
  }, [selectedProductId, navigate]); // Removed hasUserSelectedRef from deps as its .current value change won't trigger re-run

  // Conditional rendering: if a redirecting ID is selected, show loading or minimal UI
  // This helps prevent flashing content before redirection
  const isRedirectingProduct = [30, 31, 32, 34, 35, 36, 37].includes(
    selectedProductId
  );
  if (isRedirectingProduct && hasUserSelectedRef.current) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-4 sm:p-6">
        <Spinner size="12" />
        <p className="mt-4 text-slate-600">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex max-h-screen flex-col bg-slate-100">
      {/* Main content and sidebar wrapper */}
      {/* - Default (Mobile): flex-col (Controls/Sidebar on top, Main Content below) */}
      {/* - sm (~640px) and up (Tablets, Desktops): flex-row-reverse (Controls/Sidebar on right, Main Content on left) */}
      <div className="flex flex-1 flex-col gap-4 overflow-hidden p-2 sm:gap-6 sm:p-4 md:flex-row-reverse md:p-6">
        {/* Controls Section (Now styled as a Sidebar) */}
        {/* - Mobile: w-full, max-h-[45vh] (prevents taking too much vertical space), internal scroll */}
        {/* - sm (~640px): sm:w-auto, sm:max-w-xs (e.g., 320px) */}
        {/* - md (~768px, Tablet Portrait): md:max-w-sm (e.g., 384px) */}
        {/* - lg (~1024px, Tablet Landscape/Small Desktop): lg:max-w-md (e.g., 448px) */}
        <div
          className="flex max-h-[45vh] w-full shrink-0 flex-col overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-lg sm:max-h-full sm:w-auto sm:max-w-xs sm:p-6 md:max-w-sm lg:max-w-md" // Styles for sidebar behavior
        >
          {/* Breadcrumbs could go here or above the main flex wrapper if they span the full width */}
          {/* Example: <Breadcrumbs items={breadcrumbItems} className="mb-4" /> */}

          {/* UTC Change Component */}
          <div className="flex items-center">
            <ChangeUTC
              selectedUTC={selectedSpecialProductsUTC}
              setSelectedUTC={(utc) =>
                dispatch(setSelectedSpecialProductsUTC(utc))
              }
            />
          </div>

          {/* Forecast Hours Selection */}
          {specialForecastHours && specialForecastHours.length > 0 && (
            <div className="mt-4 sm:mt-6">
              {' '}
              {/* Added margin for spacing */}
              <ForecastHours
                selectedHour={selectedSpecialForecastHour}
                onSelect={(hour) =>
                  dispatch(setSelectedSpecialForecastHour(hour))
                }
                forecastHours={specialForecastHours}
              />
            </div>
          )}

          {/* Pagination Controls: Placed within the sidebar */}
          {!loading && totalSpecialProductsPages > 1 && (
            <div className="mt-auto border-t border-slate-200 pt-4 sm:pt-6">
              {' '}
              {/* mt-auto pushes to bottom if space allows, responsive padding */}
              <Pagination
                page={specialProductsPage}
                totalPages={totalSpecialProductsPages}
                onPageChange={(newPage) =>
                  dispatch(setSpecialProductsPage(newPage))
                }
                showHpa={true} // Assuming this is intended
                showTimeLine={true} // Assuming this is intended
              />
            </div>
          )}
          {/* If there's no pagination, you might want a simple footer or just let content fill */}
          {(loading || totalSpecialProductsPages <= 1) && (
            <div className="mt-auto pt-4 text-center sm:pt-6">
              <hr className="border-slate-300" />
            </div>
          )}
        </div>

        {/* Main Content Area (Loading, No Products, or Product Grid) */}
        {/* - Takes remaining space (flex-1) and handles its own scrolling (overflow-y-auto) */}
        <div className="flex-1 overflow-y-auto">
          {/* Loading State */}
          {loading && (
            <div className="flex h-full items-center justify-center py-10">
              {' '}
              {/* h-full to use available space */}
              <Spinner size="12" />
            </div>
          )}

          {/* No Products Available Message */}
          {!loading && products.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center p-4 py-10 text-center">
              {' '}
              {/* h-full, flex-col for text centering */}
              <p className="text-base italic text-slate-500 sm:text-lg">
                No products found. Please check the selection or try again
                later.
              </p>
            </div>
          )}

          {/* Product Display Grid */}
          {/* - Responsive columns, padding, and gap are preserved and enhanced. */}
          {!loading && products.length > 0 && (
            <div
              className={`grid gap-4 p-2 sm:gap-6 sm:p-4 ${
                // Responsive padding and gap
                products.length === 1
                  ? 'grid-cols-1 place-items-center'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
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
                  } rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 bg-white border`}
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

export default SpecialModelProducts;
