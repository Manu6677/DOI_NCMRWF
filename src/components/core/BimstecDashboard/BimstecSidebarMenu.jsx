import BimstecProductsList from './BimstecProductsList';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBimstecProductId,
  setBimstecForecastHours,
  setBimstecForecastUrls,
} from '../../../slices/bimstecSlice';
import { useState, useEffect } from 'react';
import { fetchBimstecForecastHoursAndUrls } from '../../../services/operations/bimstecAPI';

const BimstecSidebarMenu = () => {
  const dispatch = useDispatch();
  const [selectedHour, setSelectedHour] = useState(24);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const selectedUTC = useSelector(
    (state) => state.allBimstec.selectedBimstecUTC
  );
  const selectedProductId = useSelector(
    (state) => state.allBimstec.selectedProductId
  );
  const products = useSelector((state) => state.allBimstec.products);

  const fetchForecastData = async (product, hour, date) => {
    try {
      const { forecastHours, forecastUrls } =
        await fetchBimstecForecastHoursAndUrls({
          product,
          hour,
          date,
        });

      if (Array.isArray(forecastHours)) {
        dispatch(setBimstecForecastHours(forecastHours));
      } else {
        console.error('forecastHours is not an array');
      }

      if (Array.isArray(forecastUrls)) {
        dispatch(setBimstecForecastUrls(forecastUrls));
      } else {
        console.error('forecastUrls is not an array');
      }
    } catch (err) {
      console.error('Error fetching forecast data:', err);
    }
  };

  const handleProductSelect = async (product) => {
    const date = selectedUTC?.value?.split('/')?.[0];
    dispatch(setBimstecProductId(product.id));
    setSelectedProduct(product); // ✅ Store it in local state
    if (!date) return;

    fetchForecastData(product, selectedHour, date);
  };

  useEffect(() => {
    if (!selectedUTC) return;
    if (!Array.isArray(products)) return;

    const product = products.find((p) => p.id === selectedProductId);
    if (!product) {
      console.warn('Product not found for id:', selectedProductId);
      return;
    }

    const date = selectedUTC?.value?.split('/')?.[0];
    if (!date) return;

    fetchForecastData(product, selectedHour, date);
  }, [selectedUTC]);

  return (
    <div>
      <BimstecProductsList
        onProductSelect={handleProductSelect}
        selectedUTC={selectedUTC}
      />
    </div>
  );
};

export default BimstecSidebarMenu;
