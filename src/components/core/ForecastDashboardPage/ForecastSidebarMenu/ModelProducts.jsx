import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchProductChart } from '../../../../services/operations/forecastAPI';
import ProductImageModal from '../ProductImageModal';
import Breadcrumbs from '../../../common/Breadcrumbs';
import ProductCard from './ProductCard';
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
  now.setUTCDate(now.getUTCDate() - 1); // Subtract one day to get the previous date
  const utcDate = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD

  const selectedModel = useSelector((state) => state.forecast.selectedModel);
  const selectedProduct = useSelector(
    (state) => state.modelProducts.selectedProduct
  );
  // const selectedProductId = useSelector(
  //   (state) => state.allSpecialProductsId.selectedProductId
  // );
  const forecastUrl = useSelector(
    (state) => state.allSpecialProductsId.forecastUrl
  );
  // const selectedUTC = useSelector((state) => state.utc.selectedUTC);
  const page = useSelector((state) => state.pagination.page);
  const totalPages = useSelector((state) => state.pagination.totalPages);

  // console.log('Selected Product ID from Redux:', selectedProductId);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
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
        6
      );

      setShowMap(response?.showMap);

      if (Array.isArray(response?.cityNames) && response.cityNames.length > 0) {
        setCityNames(response.cityNames);
        setSelectedCity(response.cityNames[0][0]);
        setProducts([]);
      }

      if (response.products.length > 0) {
        setMetaData([]);
        setProducts(response.products);
        dispatch(setTotalPages(response.totalPages));
      } else if (response.metadata.length > 0) {
        setProducts([]);
        setMetaData(response?.metadata[0]);
        dispatch(setTotalPages(0));
      } else {
        console.log('No forecast products available.');
        // toast.error('No forecast products available.');
      }
    } catch (error) {
      console.error('Error fetching forecast products:', error);
      toast.error(
        'Unexpected error occurred while fetching forecast products.'
      );
    } finally {
      setLoading(false);
    }
  }, [selectedModel, selectedProduct, selectedForecastHour, page, selectedUTC]);

  useEffect(() => {
    if (forecastUrl) {
      if (Array.isArray(forecastUrl)) {
        setProducts(forecastUrl);
      } else {
        setProducts([forecastUrl]); // Wrap it in array if it's a single URL
      }
    }
  }, [forecastUrl]);

  useEffect(() => {
    dispatch(setPage(1)); // Reset page when product changes
  }, [selectedProduct, dispatch]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    const loadForecastHour = async () => {
      setLoading(true);
      try {
        const { hours } = await fetchForecastHours(
          selectedModel?.model_id || 1,
          selectedProduct?.id || 2
        );

        if (Array.isArray(hours) && hours.length > 0) {
          setForecastHours(hours);
          setSelectedForecastHour(hours[0]);
        } else {
          setForecastHours([]);
        }
      } catch (error) {
        console.error('Error fetching forecast hours:', error);
        toast.error('Unexpected error occurred while fetching forecast hours.');
      } finally {
        setLoading(false);
      }
    };

    loadForecastHour();
  }, [selectedModel?.model_id, selectedProduct?.id]);

  useEffect(() => {
    const [urlDate] = selectedUTC.value.split('/');
    let cityname = selectedCity;
    if (cityname.toLowerCase() === 'shillong') {
      cityname = 'shillongani';
    } else if (cityname.toLowerCase() === 'aizawal') {
      cityname = 'aizawl';
    } else if (cityname.toLowerCase() === 'port_blair') {
      cityname = 'portblair';
    } else if (cityname.toLowerCase() === 'silvassa') {
      cityname = 'silvasa';
    } else if (cityname.toLowerCase() === 'thiruvananthapuram') {
      cityname = 'TRIVANDRUM';
    } else if (cityname.toLowerCase() === 'maitri') {
      cityname = 'maitri';
    }
    const dynamicUrl = `${BASE_CITY_IMG_URL}/${urlDate}/NCUM-Outputs/umInd-${cityname.toUpperCase()}.png`;
    setProducts([dynamicUrl]);
  }, [selectedCity, selectedUTC]);

  return (
    <div className="h-screen overflow-auto p-6">
      {/* Breadcrumbs */}
      <Breadcrumbs
        selectedModel={selectedModel}
        selectedProduct={selectedProduct}
      />

      <div className="flex items-center gap-2">
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
              className="mr-2 font-medium text-slate-700"
            >
              City:
            </label>
            <Select
              id="city-select"
              isDisabled={loading}
              options={cityNames[0]
                ?.slice() // make a copy to avoid mutation
                .sort((a, b) => a.localeCompare(b)) // sort alphabetically
                .map((city) => ({
                  value: city,
                  label: city,
                }))}
              value={{ label: selectedCity, value: selectedCity }}
              onChange={(option) => setSelectedCity(option.value)}
              className="min-w-[200px]"
              placeholder="Select city..."
              isSearchable
            />
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && <Spinner size="8" />}

      {/* No Products Available */}
      {!loading && products.length === 0 && metaData.length === 0 && (
        <p className="text-center text-lg text-slate-600">
          No forecast products available.
        </p>
      )}

      {/* Product Display Grid */}
      {!loading && products.length > 0 && (
        <div
          className={`grid justify-center gap-6 ${
            products.length === 1 ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'
          }`}
        >
          {products.map((imageUrl, index) => (
            <ProductCard
              key={index}
              imageUrl={imageUrl}
              onClick={() => setPreviewProduct(imageUrl)}
              Class={`${
                products.length === 1
                  ? 'max-w-md w-full h-auto mx-auto' // Better single image styling
                  : ''
              }`}
            />
          ))}
        </div>
      )}

      {/* MetaData Display Grid */}
      {!loading && metaData.length > 0 && (
        <div
          className={`grid gap-6 ${
            products.length === 1
              ? 'mx-auto max-w-md grid-cols-1'
              : 'grid-cols-1 lg:grid-cols-2'
          }`}
        >
          {metaData.map((item, index) => (
            <ProductCard
              key={index}
              imageUrl={item?.link || item?.metadata?.link || ''}
              title={item?.title}
              description={item?.description}
              onClick={() => setPreviewProduct(item.link)}
              Class={products.length === 1 ? 'h-auto w-full' : ''}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(newPage) => dispatch(setPage(newPage))}
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

export default ModelProducts;
