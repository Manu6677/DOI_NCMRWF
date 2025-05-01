// import BimstecProductsList from './BimstecProductsList';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   setBimstecProductId,
//   setBimstecForecastHours,
//   setBimstecForecastUrls,
// } from '../../../slices/bimstecSlice';
// import { useState } from 'react';

// const BimstecSidebarMenu = () => {
//   const dispatch = useDispatch();
//   const [selectedHour, setSelectedHour] = useState(24);

//   const selectedUTC = useSelector(
//     (state) => state.allBimstec.selectedBimstecUTC
//   );

//   const handleProductSelect = async (product) => {
//     const date = selectedUTC?.value?.split('/')?.[0]; // "2024-04-15"

//     dispatch(setBimstecProductId(product.id));
//     console.log('product', product);

//     //   try {
//     //     const res = await fetch(
//     //       `http://localhost:8000/api/v1/bimstec/forecast-hours?product_header=${product.product_header}&product_sub_header=${product.product_sub_header}&product_name=${encodeURIComponent(product.product_name)}&forecastHour=${selectedHour}`
//     //     );
//     //     const data = await res.json();

//     //     console.log('Received data:', data); // Check the entire data structure

//     //     if (Array.isArray(data.forecastHours)) {
//     //       dispatch(setBimstecForecastHours(data.forecastHours));
//     //     } else {
//     //       console.error('forecastHours is not an array');
//     //     }

//     //     if (Array.isArray(data.forecastUrls)) {
//     //       dispatch(setBimstecForecastUrls(data.forecastUrls)); // Store URLs in Redux
//     //     } else {
//     //       console.error('forecastUrls is not an array');
//     //     }
//     //   } catch (err) {
//     //     console.error('Error fetching forecast hours:', err);
//     //   }
//     // };

//     try {
//       const res = await fetch(
//         `http://localhost:8000/api/v1/bimstec/forecast-hours?product_header=${product.product_header}&product_sub_header=${product.product_sub_header}&product_name=${encodeURIComponent(product.product_name)}&forecastHour=${selectedHour}&date=${date}`
//       );
//       const data = await res.json();

//       if (Array.isArray(data.forecastHours)) {
//         dispatch(setBimstecForecastHours(data.forecastHours));
//       } else {
//         console.error('forecastHours is not an array');
//       }

//       if (Array.isArray(data.forecastUrls)) {
//         dispatch(setBimstecForecastUrls(data.forecastUrls));
//       } else {
//         console.error('forecastUrls is not an array');
//       }
//     } catch (err) {
//       console.error('Error fetching forecast hours:', err);
//     }
//   };

//   return (
//     // <div>
//     //   <BimstecProductsList onProductSelect={handleProductSelect} />
//     // </div>

//     <div>
//       <BimstecProductsList
//         onProductSelect={handleProductSelect}
//         selectedUTC={selectedUTC} // pass it down too if needed
//       />
//     </div>
//   );
// };

// export default BimstecSidebarMenu;

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
