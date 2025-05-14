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
    <div className="flex h-screen flex-col">
      <div className="flex-grow overflow-auto p-4 sm:p-6">
        {/* Breadcrumbs */}
        {/* <Breadcrumbs items={breadcrumbItems} /> */}

        {/* Controls Section */}
        <div className="my-4 flex flex-wrap items-center gap-4 rounded-md bg-slate-50 p-2 px-4 shadow">
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
            <div className="flex items-center">
              <ForecastHours
                selectedHour={selectedSpecialForecastHour}
                onSelect={(hour) =>
                  dispatch(setSelectedSpecialForecastHour(hour))
                }
                forecastHours={specialForecastHours}
              />
            </div>
          )}
        </div>

        {/* Loading State: Centered Spinner */}
        {loading && (
          <div className="flex h-64 items-center justify-center">
            <Spinner size="12" /> {/* Increased size for better visibility */}
          </div>
        )}

        {/* No Products Available Message */}
        {!loading &&
          products.length === 0 && ( // Removed metaData.length check as it's not used here
            <p className="py-10 text-center text-lg text-slate-500">
              No products found. Please check the selection or try again later.
            </p>
          )}

        {/* Product Display Grid */}
        {!loading && products.length > 0 && (
          <div
            className={`grid gap-6 ${
              products.length === 1
                ? 'grid-cols-1 place-items-center' // Center the single card
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' // Responsive grid, adjust xl:grid-cols-3 if needed
            }`}
          >
            {products.map((imageUrl, index) => (
              <ProductCard
                key={index}
                imageUrl={imageUrl}
                onClick={() => setPreviewProduct(imageUrl)}
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
      {!loading && totalSpecialProductsPages > 1 && (
        <div className="border-t border-slate-200 bg-slate-50 p-4">
          <Pagination
            page={specialProductsPage}
            totalPages={totalSpecialProductsPages}
            onPageChange={(newPage) =>
              dispatch(setSpecialProductsPage(newPage))
            }
            // showHpa={true} // Add if this prop is relevant for SpecialModelProducts
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

export default SpecialModelProducts;
