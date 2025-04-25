import ModelSubMenu from './ModelSubMenu';
import ModelProductsSubMenu from './ModelProductsSubMenu';
import ProductsList from './ProductsList';
import ObservationProductList from './ObservationProductList';

const ForecastSidebarMenu = () => {
  return (
    <div>
      <ModelSubMenu />
      <ModelProductsSubMenu />

      <hr />
      <ProductsList />

      <hr />
      <ObservationProductList />
    </div>
  );
};

export default ForecastSidebarMenu;
