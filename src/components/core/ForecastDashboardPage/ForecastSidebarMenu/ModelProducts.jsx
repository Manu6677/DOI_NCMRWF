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
import {
  setSpecialProductsId,
  setForecastUrl,
} from '../../../../slices/allSpecialProductsSliceId';
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
        console.log('No forecast products available.');
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
    dispatch(setForecastUrl(null));
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
    <div className="flex max-h-screen flex-col bg-slate-100">
      {/* Main content and sidebar wrapper */}
      {/* - Default (Mobile): flex-col (Sidebar on top, Main Content below) */}
      {/* - sm (~640px) and up (Tablets, Desktops): flex-row-reverse (Sidebar on right, Main Content on left) */}
      <div className="flex flex-1 flex-col gap-4 overflow-hidden p-2 sm:flex-row-reverse sm:gap-6 sm:p-4 md:p-6">
        {/* Sidebar Controls */}
        {/* - Mobile: w-full, max-h-[45vh] (prevents taking too much vertical space), internal scroll */}
        {/* - sm (~640px): sm:w-auto, sm:max-w-xs, sm:max-h-full (takes available height) */}
        {/* - md (~768px, Tablet Portrait): md:max-w-sm */}
        {/* - lg (~1024px, Tablet Landscape/Small Desktop): lg:max-w-md */}
        <div
          className="flex max-h-[45vh] w-full flex-shrink-0 flex-col overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-lg sm:max-h-full sm:w-auto sm:max-w-xs sm:p-6 md:max-w-sm lg:max-w-md" // max-h for mobile, full height for sm+
        >
          {/* UTC Change */}
          <div className="flex items-center">
            <ChangeUTC
              selectedUTC={selectedUTC}
              setSelectedUTC={setSelectedUTC}
            />
          </div>

          {/* Forecast Hours */}
          {forecastHours.length > 0 && (
            <div className="mt-4 sm:mt-6">
              {' '}
              {/* Margins adapt for screen size */}
              <ForecastHours
                selectedHour={selectedForecastHour}
                onSelect={setSelectedForecastHour}
                forecastHours={forecastHours}
              />
            </div>
          )}

          {/* City Dropdown */}
          {cityNames && cityNames.length > 0 && (
            <div className="mt-4 sm:mt-6">
              <label
                htmlFor="city-select"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                City:
              </label>
              <Select
                id="city-select"
                isDisabled={loading}
                options={cityNames[0]
                  ?.slice()
                  .sort((a, b) => a.localeCompare(b))
                  .map((city) => ({ value: city, label: city }))}
                value={{ label: selectedCity, value: selectedCity }}
                onChange={(option) => setSelectedCity(option.value)}
                className="w-full text-sm"
                placeholder="Select city..."
                isSearchable
              />
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-4 border-t border-slate-200 pt-4 sm:mt-6">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={(newPage) => dispatch(setPage(newPage))}
                showHpa={true}
                showTimeLine={true}
              />
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto pt-4 text-center sm:pt-6">
            {' '}
            {/* mt-auto pushes to bottom, padding adapts */}
            <hr className="border-slate-300" />
          </div>
        </div>

        {/* Main Content Area */}
        {/* - Takes remaining space (flex-1) and handles its own scrolling (overflow-y-auto) on all screen sizes. */}
        <div className="flex-1 overflow-y-auto">
          {/* Loading Spinner */}
          {loading && (
            <div className="flex h-full items-center justify-center py-10">
              <Spinner size="12" />
            </div>
          )}

          {/* No Products Message */}
          {!loading && products.length === 0 && metaData.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center p-4 py-10 text-center">
              <p className="text-base italic text-slate-500 sm:text-lg">
                {' '}
                {/* Slightly smaller text on mobile */}
                Select a forecast model to view products. If nothing appears,
                please try again later.
              </p>
            </div>
          )}

          {/* Products Grid */}
          {/* - Grid columns adapt: */}
          {/* - Mobile: grid-cols-1 */}
          {/* - sm (~640px, Large Phone/Small Tablet): sm:grid-cols-2 */}
          {/* - lg (~1024px, Tablet Landscape/Desktop): lg:grid-cols-3 */}
          {/* - xl (~1280px, Large Desktop): xl:grid-cols-4 */}
          {/* - Padding and gap also adapt. */}
          {!loading && products.length > 0 && (
            <div
              className={`grid gap-4 p-2 sm:gap-6 sm:p-4 ${
                products.length === 1
                  ? 'grid-cols-1 place-items-center' // Center if only one product
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}
            >
              {products.map((imageUrl, index) => (
                <ProductCard
                  key={index}
                  imageUrl={imageUrl}
                  onClick={() => setPreviewProduct(imageUrl)}
                  Class={`${
                    products.length === 1 ? 'w-full max-w-lg' : 'w-full' // Full width in its grid cell
                  } rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 bg-white border`}
                />
              ))}
            </div>
          )}

          {/* MetaData Section */}
          {/* - Similar responsive padding, margin, and gap as Products Grid. */}
          {/* - Layout of items within this section also adapts based on content. */}
          {!loading && metaData.length > 0 && (
            <div
              className={`mt-4 flex flex-col gap-4 p-2 sm:mt-6 sm:gap-6 sm:p-4 ${
                metaData.length === 1 ? 'items-center' : '' // Center if only one metadata item
              }`}
            >
              {(Array.isArray(metaData) ? metaData : [metaData]).map(
                (item, index) => (
                  <ProductCard
                    key={index}
                    imageUrl={item?.link || item?.metadata?.link || ''}
                    title={item?.title}
                    description={item?.description}
                    onClick={() => setPreviewProduct(item.link)}
                    Class={`${
                      metaData.length === 1 ? 'w-full max-w-lg' : 'w-full'
                    } rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 bg-white border`}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      {/* - Modal responsiveness is typically handled by its own internal styles and often aims to be centered with appropriate max-width/height. */}
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
