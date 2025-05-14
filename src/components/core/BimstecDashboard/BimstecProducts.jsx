import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedBimstecForecastHour } from '../../../slices/bimstecSlice';
import ForecastHours from '../ForecastDashboardPage/ForecastSidebarMenu/ForecastHours';
import ProductCard from '../ForecastDashboardPage/ForecastSidebarMenu/ProductCard';
import ProductImageModal from '../ForecastDashboardPage/ProductImageModal';
import ChangeUTC from '../ForecastDashboardPage/ForecastSidebarMenu/ChangeUTC';
import { setSelectedBimstecUTC } from '../../../slices/bimstecSlice';

const BimstecProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [previewProduct, setPreviewProduct] = useState(null);

  const forecastHours = useSelector(
    (state) => state.allBimstec.bimstecForecastHours
  );
  const selectedHour = useSelector(
    (state) => state.allBimstec.selectedBimstecForecastHour
  );
  const forecastUrls = useSelector(
    (state) => state.allBimstec.bimstecForecastUrls
  );

  const { selectedBimstecUTC } = useSelector((state) => state.allBimstec);

  const dispatch = useDispatch();

  const handleHourSelect = (hour) => {
    dispatch(setSelectedBimstecForecastHour(hour));
  };

  // Find the URLs corresponding to the selected hour
  const selectedForecast = forecastUrls.find(
    (item) => item.hour === selectedHour
  );
  const selectedUrls = selectedForecast ? selectedForecast.urls : [];

  return (
    <div className="p-4">
      {/* Make these two components sit side by side */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <ChangeUTC
          selectedUTC={selectedBimstecUTC}
          setSelectedUTC={(utc) => dispatch(setSelectedBimstecUTC(utc))}
        />
        <ForecastHours
          selectedHour={selectedHour}
          forecastHours={forecastHours}
          onSelect={handleHourSelect}
        />
      </div>

      {!loading && selectedUrls.length === 0 && (
        <p className="text-gray-600 mt-6 text-center text-base font-medium italic tracking-wide">
          Please select an option from the left sidebar to view Bimstec charts.
        </p>
      )}

      {/* Product Display Grid */}
      {!loading && selectedUrls.length > 0 && (
        <div
          className={`grid gap-6 ${
            selectedUrls.length === 1
              ? 'mx-auto grid-cols-1'
              : 'grid-cols-1 lg:grid-cols-2'
          }`}
        >
          {selectedUrls.map((imageUrl, index) => (
            <ProductCard
              key={index}
              imageUrl={imageUrl}
              onClick={() => setPreviewProduct(imageUrl)}
              Class={products.length === 1 ? 'h-auto w-full' : ''}
            />
          ))}
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

export default BimstecProducts;

// <div className="p-4">
//   <div className="flex items-center">
//     <ChangeUTC
//       selectedUTC={selectedBimstecUTC}
//       setSelectedUTC={(utc) => dispatch(setSelectedBimstecUTC(utc))}
//     />
//   </div>
//   <ForecastHours
//     selectedHour={selectedHour}
//     forecastHours={forecastHours}
//     onSelect={handleHourSelect}
//   />

//   {/* Product Display Grid */}
//   {!loading && selectedUrls.length > 0 && (
//     <div
//       className={`grid gap-6 ${
//         selectedUrls.length === 1
//           ? 'mx-auto grid-cols-1'
//           : 'grid-cols-1 lg:grid-cols-2'
//       }`}
//     >
//       {selectedUrls.map((imageUrl, index) => (
//         <ProductCard
//           key={index}
//           imageUrl={imageUrl}
//           onClick={() => setPreviewProduct(imageUrl)}
//           Class={products.length === 1 ? 'h-auto w-full' : ''}
//         />
//       ))}
//     </div>
//   )}

//   {/* Image Preview Modal */}
//   {previewProduct && (
//     <ProductImageModal
//       imageUrl={previewProduct}
//       onClose={() => setPreviewProduct(null)}
//     />
//   )}
// </div>
