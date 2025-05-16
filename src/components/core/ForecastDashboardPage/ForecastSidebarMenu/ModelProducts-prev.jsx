import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchProductChart } from '../../../../services/operations/forecastAPI';
import ProductImageModal from '../ProductImageModal';
import Breadcrumbs from '../../../common/Breadcrumbs';
import ProductCard from './ProductCard'; // Assuming this component handles image display well
import Pagination from '../../../common/Pagination';
import ForecastHours from '../ForecastSidebarMenu/ForecastHours';
import { fetchForecastHours } from '../../../../services/operations/forecastAPI';
import Spinner from '../../../common/Spinner';
import ChangeUTC from './ChangeUTC';
import { setSpecialProductsId } from '../../../../slices/allSpecialProductsSliceId';
import { setPage, setTotalPages } from '../../../../slices/paginationSlice';
import Select from 'react-select';

const FORECAST_HOURS = [0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240];
const BASE_CITY_IMG_URL = process.env.REACT_APP_ASSETS_BASE_URL_NEW_DIR;

const ModelProducts = () => {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() - 1);
  const utcDate = now.toISOString().split('T')[0];

  const selectedModel = useSelector((state) => state.forecast.selectedModel);
  const selectedProduct = useSelector(
    (state) => state.modelProducts.selectedProduct
  );
  const forecastUrl = useSelector(
    (state) => state.allSpecialProductsId.forecastUrl
  );
  const page = useSelector((state) => state.pagination.page);
  const totalPages = useSelector((state) => state.pagination.totalPages);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false); // This state is set but not directly used to render map?
  const [cityNames, setCityNames] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [products, setProducts] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [forecastHours, setForecastHours] = useState(FORECAST_HOURS);
  const [selectedForecastHour, setSelectedForecastHour] = useState(
    forecastHours[0]
  );
  const [selectedUTC, setSelectedUTC] = useState({
    label: `${utcDate} (00 UTC)`,
    value: `${utcDate}/00`,
  });

  const loadProducts = useCallback(async () => {
    // ... (loadProducts implementation remains the same)
    const [selectedDate, selectedUtcValue] = selectedUTC.value.split('/');
    setCityNames([]);

    setLoading(true);
    try {
      const response = await fetchProductChart(
        selectedModel?.model_id,
        selectedProduct?.id,
        selectedDate,
        selectedForecastHour,
        selectedUtcValue,
        page,
        1
      );

      setShowMap(response?.showMap); // Still unsure how showMap is used visually

      if (Array.isArray(response?.cityNames) && response.cityNames.length > 0) {
        setCityNames(response.cityNames);
        setSelectedCity(response.cityNames[0][0]);
        setProducts([]); // Clear products if city names are loaded (assuming city selection re-fetches specific product)
      }

      if (response.products.length > 0) {
        setMetaData([]);
        setProducts(response.products);
        dispatch(setTotalPages(response.totalPages));
      } else if (response.metadata.length > 0) {
        setProducts([]);
        setMetaData(response?.metadata[0]); // Assuming metadata is an array with one object
        dispatch(setTotalPages(0)); // Typically metadata might not be paginated the same way
      } else {
        // toast.error('No forecast products available.'); // Removed to avoid too many toasts if it's a common scenario
        // console.log('No forecast products available.');
        setProducts([]);
        setMetaData([]);
        dispatch(setTotalPages(0));
      }
    } catch (error) {
      console.error('Error fetching forecast products:', error);
      toast.error(
        'Unexpected error occurred while fetching forecast products.'
      );
    } finally {
      setLoading(false);
    }
  }, [
    selectedModel,
    selectedProduct,
    selectedForecastHour,
    page,
    selectedUTC,
    dispatch,
  ]); // Added dispatch to dependencies

  useEffect(() => {
    if (forecastUrl) {
      if (Array.isArray(forecastUrl)) {
        setProducts(forecastUrl);
      } else {
        setProducts([forecastUrl]);
      }
      // When forecastUrl is set (e.g. from an external link/slice), clear city-specific data potentially
      setCityNames([]);
      setMetaData([]);
    }
  }, [forecastUrl]);

  useEffect(() => {
    dispatch(setPage(1));
  }, [selectedProduct, dispatch]);

  useEffect(() => {
    // Only load products if not relying on forecastUrl from redux
    // And if essential selections are made
    if (!forecastUrl && selectedModel?.model_id && selectedProduct?.id) {
      loadProducts();
    }
    // If forecastUrl is present, products are set by another useEffect,
    // so loadProducts might not be needed or could lead to conflict unless handled.
    // For now, assuming forecastUrl takes precedence if available.
  }, [loadProducts, forecastUrl, selectedModel, selectedProduct]); // Added forecastUrl, selectedModel, selectedProduct to ensure it re-evaluates

  useEffect(() => {
    const loadForecastHour = async () => {
      // ... (loadForecastHour implementation remains the same)
      setLoading(true);
      try {
        const { hours } = await fetchForecastHours(
          selectedModel?.model_id || 1, // Default values might be risky if they don't match actual available data
          selectedProduct?.id || 2
        );

        if (Array.isArray(hours) && hours.length > 0) {
          setForecastHours(hours);
          // Avoid setting selectedForecastHour if current one is still valid
          if (!hours.includes(selectedForecastHour)) {
            setSelectedForecastHour(hours[0]);
          }
        } else {
          setForecastHours([]);
          setSelectedForecastHour(undefined); // Or null
        }
      } catch (error) {
        console.error('Error fetching forecast hours:', error);
        toast.error('Unexpected error occurred while fetching forecast hours.');
      } finally {
        setLoading(false);
      }
    };

    if (selectedModel?.model_id && selectedProduct?.id) {
      loadForecastHour();
    } else {
      setForecastHours(FORECAST_HOURS); // Reset to default or clear
      setSelectedForecastHour(FORECAST_HOURS[0]);
    }
  }, [selectedModel?.model_id, selectedProduct?.id]); // Removed selectedForecastHour from deps to avoid loop if it's set inside

  useEffect(() => {
    // This useEffect seems to be for a very specific case of NCUM-Outputs for cities
    // It directly sets `products` to a single image URL based on `selectedCity` and `selectedUTC`
    // This might override products loaded by `loadProducts` if a city is selected.
    // Consider if this is the desired behavior or if it should be conditional.
    if (selectedCity && cityNames.length > 0) {
      // Only trigger if cities were loaded and one is selected
      const [urlDate] = selectedUTC.value.split('/');
      let cityname = selectedCity;
      // Normalize city names
      if (cityname.toLowerCase() === 'shillong') cityname = 'shillongani';
      else if (cityname.toLowerCase() === 'aizawal') cityname = 'aizawl';
      else if (cityname.toLowerCase() === 'port_blair') cityname = 'portblair';
      else if (cityname.toLowerCase() === 'silvassa') cityname = 'silvasa';
      else if (cityname.toLowerCase() === 'thiruvananthapuram')
        cityname = 'TRIVANDRUM';
      // `maitri` already in lowercase, toUpperCase() will make it MAITRI if that's intended.
      // If `maitri` should remain lowercase in URL, adjust `toUpperCase()` call.

      const dynamicUrl = `${BASE_CITY_IMG_URL}/${urlDate}/NCUM-Outputs/umInd-${cityname.toUpperCase()}.png`;
      setProducts([dynamicUrl]);
      setMetaData([]); // Clear metadata when city-specific image is shown
      dispatch(setTotalPages(0)); // City images are not paginated here
    }
  }, [selectedCity, selectedUTC, cityNames, dispatch]); // Added cityNames and dispatch

  // Breadcrumb data - ensure selectedProduct and selectedModel are defined
  const breadcrumbItems = [];
  if (selectedModel)
    breadcrumbItems.push({
      name: selectedModel.model_name,
      path: '/forecast/models',
    }); // Example path
  if (selectedProduct)
    breadcrumbItems.push({
      name: selectedProduct.name,
      path: `/forecast/models/${selectedModel?.model_id}`,
    });

  return (
    // Use flex column for overall page structure to better manage footer/pagination
    <div className="flex h-screen flex-col">
      <div className="flex-grow overflow-auto p-4 sm:p-6">
        {' '}
        {/* Added flex-grow to allow this section to take available space */}
        {/* Breadcrumbs */}
        {/* Pass items to Breadcrumbs, assuming it can take an array of breadcrumb objects */}
        <Breadcrumbs items={breadcrumbItems} />
        {/* Controls Section: Added margin-bottom and flex-wrap for responsiveness */}
        <div className="my-4 flex flex-wrap items-center gap-4 rounded-md bg-slate-50 p-2 shadow">
          {' '}
          {/* Added padding, bg, rounded, shadow for better visual grouping */}
          {/* UTC Change Component */}
          <div className="flex items-center">
            <ChangeUTC
              selectedUTC={selectedUTC}
              setSelectedUTC={setSelectedUTC}
            />
          </div>
          {/* Forecast Hours Selection */}
          {forecastHours.length > 0 && (
            <div className="flex items-center">
              <ForecastHours
                selectedHour={selectedForecastHour}
                onSelect={setSelectedForecastHour}
                forecastHours={forecastHours}
              />
            </div>
          )}
          {/* ---- City Dropdown ---- */}
          {cityNames && cityNames.length > 0 && (
            <div className="flex items-center">
              <label
                htmlFor="city-select"
                className="mr-2 text-sm font-medium text-slate-700" // Slightly smaller label
              >
                City:
              </label>
              <Select
                id="city-select"
                isDisabled={loading}
                options={cityNames[0]
                  ?.slice()
                  .sort((a, b) => a.localeCompare(b))
                  .map((city) => ({
                    value: city,
                    label: city,
                  }))}
                value={{ label: selectedCity, value: selectedCity }}
                onChange={(option) => setSelectedCity(option.value)}
                className="min-w-[180px] text-sm" // Slightly smaller min-width and text
                placeholder="Select city..."
                isSearchable
                // styles prop can be used for deeper customization of react-select if needed
              />
            </div>
          )}
        </div>
        {/* Loading State: Centered Spinner */}
        {loading && (
          <div className="flex h-64 items-center justify-center">
            {' '}
            {/* Container for centering spinner */}
            <Spinner size="12" /> {/* Increased size for better visibility */}
          </div>
        )}
        {/* No Products Available Message: Added margin-top for better spacing */}
        {!loading && products.length === 0 && metaData.length === 0 && (
          <p className="py-10 text-center text-lg text-slate-500">
            {' '}
            {/* Adjusted text color and padding */}
            No forecast products available.
          </p>
        )}
        {/* Product Display Grid: Key area for image sizing is within ProductCard component */}
        {/* The `ProductCard` itself should handle how the image is displayed (e.g., aspect ratio, object-fit) */}
        {!loading && products.length > 0 && (
          <div
            className={`grid gap-6 ${
              // If single product, center it and give it more space.
              // ProductCard internal styling for image is crucial.
              products.length === 1
                ? 'grid-cols-1 place-items-center' // Center the single card in the grid cell
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' // More responsive grid
            }`}
          >
            {products.map((imageUrl, index) => (
              <ProductCard
                key={index}
                imageUrl={imageUrl}
                onClick={() => setPreviewProduct(imageUrl)}
                // For a single product, allow it to be wider.
                // The ProductCard should manage its internal image display to prevent excessive height.
                // Example: max-w-full for grid items, or a specific max-w for single item.
                Class={
                  products.length === 1
                    ? 'w-full max-w-2xl' // Larger max-width for a single centered image/card
                    : 'w-full' // Full width within its grid cell
                }
                // Suggestion: ProductCard could have an 'aspectRatio' prop or similar
                // e.g., aspectRatio="16/9" to enforce consistent image dimensions.
              />
            ))}
          </div>
        )}
        {/* MetaData Display Grid: Similar styling to products grid */}
        {!loading &&
          metaData.length > 0 && ( // Assuming metaData is an array of objects
            <div
              className={`mt-6 grid gap-6 ${
                // Added mt-6 if products are also displayed, otherwise it's fine
                metaData.length === 1 // If only one metadata item
                  ? 'grid-cols-1 place-items-center'
                  : 'grid-cols-1 md:grid-cols-2' // Adjust as needed for metadata card content
              }`}
            >
              {/* Ensure metaData is an array before mapping */}
              {(Array.isArray(metaData) ? metaData : [metaData]).map(
                (item, index) => (
                  <ProductCard // Reusing ProductCard for metadata; ensure it can handle text content well
                    key={index}
                    imageUrl={item?.link || item?.metadata?.link || ''} // Provide a fallback image if necessary or style differently if no image
                    title={item?.title}
                    description={item?.description}
                    onClick={() => setPreviewProduct(item.link)} // Ensure item.link is valid for preview
                    Class={
                      metaData.length === 1
                        ? 'w-full max-w-lg' // Max width for a single metadata card
                        : 'w-full'
                    }
                  />
                )
              )}
            </div>
          )}
        {/* Pagination Controls: Added margin-top for spacing */}
      </div>{' '}
      {/* End of scrollable content area */}
      {/* Pagination container at the bottom */}
      {!loading && totalPages > 1 && (
        <div className="border-t border-slate-200 bg-slate-50 p-4">
          {' '}
          {/* Added some styling to pagination container */}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => dispatch(setPage(newPage))}
            showHpa={true}
          />
        </div>
      )}
      {/* Image Preview Modal */}
      {/* The ProductImageModal should internally handle image sizing to fit the viewport */}
      {/* e.g., max-width: 90vw, max-height: 90vh, object-fit: contain for the image */}
      {previewProduct && (
        <ProductImageModal
          imageUrl={previewProduct}
          onClose={() => setPreviewProduct(null)}
        />
      )}
    </div>
  );
};

export default ModelProducts;
