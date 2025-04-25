import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaDatabase } from 'react-icons/fa';
import { setSelectedProduct } from '../../../../slices/modelProductsSlice';
import SidebarSubMenu from '../../../common/Sidebar/SidebarSubMenu';
import { useNavigate } from 'react-router-dom';

const ModelProductsSubMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modelProducts = useSelector(
    (state) => state.modelProducts.modelProducts
  );
  const selectedProduct = useSelector(
    (state) => state.modelProducts.selectedProduct
  );

  useEffect(() => {
    if (modelProducts.length > 0) {
      dispatch(setSelectedProduct(modelProducts[0]));
    }
  }, [modelProducts, dispatch]);

  const handleSelectItem = useCallback(
    (modelProduct) => {
      navigate('/forecast-dashboard/');
      dispatch(setSelectedProduct(modelProduct));
    },
    [dispatch]
  );

  return (
    <SidebarSubMenu
      title="Model Products"
      icon={<FaDatabase />}
      items={modelProducts}
      selectedItem={selectedProduct}
      onSelectItem={handleSelectItem}
    />
  );
};

export default ModelProductsSubMenu;
