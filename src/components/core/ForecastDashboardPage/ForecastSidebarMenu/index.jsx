import ModelSubMenu from './ModelSubMenu';
import ModelProductsSubMenu from './ModelProductsSubMenu';
import ProductsList from './ProductsList';
import ObservationProductList from './ObservationProductList';
import { useSelector } from 'react-redux';

const ForecastSidebarMenu = () => {
  const selectedModel = useSelector((state) => state.forecast.selectedModel);

  return (
    <div>
      <ModelSubMenu />
      {selectedModel && <ModelProductsSubMenu />}

      <hr />
      <ProductsList />

      <hr />
      <ObservationProductList />
    </div>
  );
};

export default ForecastSidebarMenu;
