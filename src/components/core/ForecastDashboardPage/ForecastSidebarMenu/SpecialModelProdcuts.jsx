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
import { Navigate, useNavigate } from 'react-router-dom';

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
  } = useSelector((state) => state.allSpecialProductsId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [previewProduct, setPreviewProduct] = useState(null);

  const hasUserSelectedRef = useRef(false);
  const hasNavigatedRef = useRef(false);

  // const redirectMap = {
  //   30: `${REACT_APP_ASSETS_BASE_URL_NEW}/NIOTC/niotc.html`,
  //   31: '/forecast-dashboard/special-products/statiscyclone',
  //   32: `${REACT_APP_ASSETS_BASE_URL_NEW}/STRIKE/strike.html`,
  //   34: `${REACT_APP_ASSETS_BASE_URL_NEW}/HomePage/index.php`,
  //   35: `${REACT_APP_ASSETS_BASE_URL_NEW}/india_map_pqpf.php`,
  //   36: `${REACT_APP_ASSETS_BASE_URL_NEW}/india-map.php`,
  // };

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
    }
  }, [forecastUrl]);

  useEffect(() => {
    if (
      selectedProductId === 30 ||
      selectedProductId === 31 ||
      selectedProductId === 32 ||
      selectedProductId === 34 ||
      selectedProductId === 35 ||
      selectedProductId === 36 ||
      selectedProductId === 37
    )
      return;

    const loadForecastHour = async () => {
      setLoading(true);
      try {
        const { hours } = await fetchForecastHours(
          null,
          null,
          selectedProductId
        );

        if (Array.isArray(hours) && hours.length > 0) {
          dispatch(setSpecialForecastHours(hours));
          dispatch(setSelectedSpecialForecastHour(hours[0]));
        } else {
          dispatch(setSpecialForecastHours([]));
        }
      } catch (error) {
        console.error('Error fetching forecast hours:', error);
        toast.error('Unexpected error occurred while fetching forecast hours.');
      } finally {
        setLoading(false);
      }
    };

    loadForecastHour();
  }, [selectedProductId]);

  useEffect(() => {
    if (!hasUserSelectedRef.current || hasNavigatedRef.current) return;

    if (selectedProductId === 34) {
      hasNavigatedRef.current = true;
      window.location.href = `${REACT_APP_ASSETS_BASE_URL_NEW}/HomePage/index.php`;
      return;
    }

    if (selectedProductId === 30) {
      hasNavigatedRef.current = true;
      window.location.href = `${REACT_APP_ASSETS_BASE_URL_NEW}/NIOTC/niotc.html`;
      return;
    }

    if (selectedProductId === 31) {
      hasNavigatedRef.current = true;
      navigate('/forecast-dashboard/special-products/statiscyclone');
      return;
    }

    if (selectedProductId === 32) {
      hasNavigatedRef.current = true;
      window.location.href = `${REACT_APP_ASSETS_BASE_URL_NEW}/STRIKE/strike.html`;
      return;
    }
    if (selectedProductId === 35) {
      hasNavigatedRef.current = true;
      window.location.href = `${REACT_APP_ASSETS_BASE_URL_NEW}/india_map_pqpf.php`;
      return;
    }
    if (selectedProductId === 36) {
      hasNavigatedRef.current = true;
      window.location.href = `${REACT_APP_ASSETS_BASE_URL_NEW}/india-map.php`;
      return;
    }
    if (selectedProductId === 37) {
      hasNavigatedRef.current = true;
      window.location.href = `${REACT_APP_ASSETS_BASE_URL_NEW}/mjo-charts.php`;
      return;
    }
  }, [selectedProductId, navigate]);

  // const shouldRedirect = (id) => Object.keys(redirectMap).includes(String(id));

  // useEffect(() => {
  //   if (shouldRedirect(selectedProductId)) return;

  //   const loadForecastHour = async () => {
  //     setLoading(true);
  //     try {
  //       const { hours } = await fetchForecastHours(
  //         null,
  //         null,
  //         selectedProductId
  //       );
  //       if (Array.isArray(hours) && hours.length > 0) {
  //         dispatch(setSpecialForecastHours(hours));
  //         dispatch(setSelectedSpecialForecastHour(hours[0]));
  //       } else {
  //         dispatch(setSpecialForecastHours([]));
  //       }
  //     } catch (error) {
  //       console.error('Error fetching forecast hours:', error);
  //       toast.error('Unexpected error occurred while fetching forecast hours.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadForecastHour();
  // }, [selectedProductId]);

  // useEffect(() => {
  //   if (!hasUserSelectedRef.current || hasNavigatedRef.current) return;

  //   const redirectUrl = redirectMap[selectedProductId];
  //   if (redirectUrl) {
  //     hasNavigatedRef.current = true;

  //     if (selectedProductId === 31) {
  //       navigate(redirectUrl); // internal route
  //     } else {
  //       window.location.href = redirectUrl; // external link
  //     }
  //   }
  // }, [selectedProductId, navigate]);

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
            selectedUTC={selectedSpecialProductsUTC}
            setSelectedUTC={(utc) =>
              dispatch(setSelectedSpecialProductsUTC(utc))
            }
          />
        </div>

        {/* Forecast Hours Selection */}
        {specialForecastHours.length > 0 && (
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

      {/* MetaData Display Grid */}
      {/* {!loading && selectedProduct?.id === 5 && metaData.length > 0 && (
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
              imageUrl={item.link}
              title={item.title}
              description={item.description}
              onClick={() => setPreviewProduct(item.link)}
              Class={products.length === 1 ? 'h-auto w-full' : ''}
            />
          ))}
        </div>
      )} */}

      {/* Pagination Controls */}
      {!loading && totalSpecialProductsPages > 1 && (
        <Pagination
          page={specialProductsPage}
          totalPages={totalSpecialProductsPages}
          onPageChange={(newPage) => dispatch(setSpecialProductsPage(newPage))}
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

export default SpecialModelProducts;
