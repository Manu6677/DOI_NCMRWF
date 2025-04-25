import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaLayerGroup, FaGlobe, FaCubes } from 'react-icons/fa';
import { SubMenu, MenuItem } from 'react-pro-sidebar';
import {
  fetchSpecialProductsNames,
  fetchForecastUrl,
} from '../../../../services/operations/specialProductsApi';
import {
  setSpecialProductsId,
  setForecastUrl,
} from '../../../../slices/allSpecialProductsSliceId';
import {
  setSpecialProductsPage,
  setTotalSpecialProductsPages,
  setSelectedSpecialProductsUTC,
} from '../../../../slices/allSpecialProductsSliceId';
import { useNavigate } from 'react-router-dom';

const ProductsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    selectedProductId,
    selectedSpecialForecastHour,
    selectedSpecialProductsUTC,
    specialProductsPage,
  } = useSelector((state) => state.allSpecialProductsId);

  const [specialProducts, setSpecialProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchSpecialProductsNames();
        setSpecialProducts(products);
      } catch (error) {
        console.error('Error fetching product names:', error);
      }
    };
    getProducts();
  }, []);

  const handleSelectProduct = async (product) => {
    if (product?.id !== selectedProductId) {
      dispatch(setSpecialProductsPage(1));
    }

    navigate('/forecast-dashboard/special-products');
    dispatch(setSpecialProductsId(product.id));
    const [selectedDate, selectedUtcValue] =
      selectedSpecialProductsUTC.value.split('/');

    try {
      const model = 'UM-Reg4Km';
      // dispatch(setSpecialProductsPage(1));

      const response = await fetchForecastUrl(
        model,
        product.url_product_name,
        product.category,
        product.product_header,
        selectedDate,
        selectedUtcValue,
        selectedSpecialForecastHour,
        specialProductsPage,
        4
      );
      if (response) {
        dispatch(setTotalSpecialProductsPages(response.totalPages));
        dispatch(setForecastUrl(response.result));
      }
    } catch (error) {
      console.error('Error fetching forecast URL:', error);
    }
  };

  useEffect(() => {
    if (selectedProductId && selectedSpecialProductsUTC) {
      const selectedProduct = specialProducts.find(
        (product) => product.id === selectedProductId
      );
      if (selectedProduct) {
        handleSelectProduct(selectedProduct);
      }
    }
  }, [
    selectedSpecialProductsUTC,
    specialProducts,
    selectedSpecialForecastHour,
    specialProductsPage,
  ]);

  const groupedProducts = specialProducts.reduce((acc, product) => {
    if (product.product_sub_header) {
      if (!acc[product.product_sub_header]) {
        acc[product.product_sub_header] = {};
      }
      if (product.product_sub_header_item) {
        if (!acc[product.product_sub_header][product.product_sub_header_item]) {
          acc[product.product_sub_header][product.product_sub_header_item] = [];
        }
        acc[product.product_sub_header][product.product_sub_header_item].push(
          product
        );
      } else {
        acc[product.product_sub_header].products =
          acc[product.product_sub_header].products || [];
        acc[product.product_sub_header].products.push(product);
      }
    } else {
      acc.products = acc.products || [];
      acc.products.push(product);
    }
    return acc;
  }, {});

  return (
    <SubMenu
      label="Special Products"
      icon={<FaLayerGroup />}
      style={{ backgroundColor: '#003244', color: '#ffffff' }}
    >
      {Object.entries(groupedProducts).map(([product_sub_header, subItems]) =>
        product_sub_header !== 'products' ? (
          <SubMenu
            key={product_sub_header}
            label={product_sub_header.replace(/-/g, ' ')}
            icon={<FaGlobe />}
            style={{ backgroundColor: '#003244', color: '#ffffff' }}
            className="capitalize"
          >
            {Object.entries(subItems).map(
              ([product_sub_header_item, products]) =>
                product_sub_header_item !== 'products' ? (
                  <SubMenu
                    key={product_sub_header_item}
                    label={product_sub_header_item.replace(/-/g, ' ')}
                    icon={<FaCubes />}
                    style={{ backgroundColor: '#003244', color: '#ffffff' }}
                  >
                    {products.map((product) => (
                      <MenuItem
                        key={product.id}
                        style={{ backgroundColor: '#003244', color: '#ffffff' }}
                      >
                        <label className="flex cursor-pointer items-center space-x-4">
                          <input
                            type="radio"
                            name="specialProduct"
                            value={product.id}
                            checked={selectedProductId === product.id}
                            onChange={() => handleSelectProduct(product)}
                            className="size-4 text-blue-500"
                          />
                          <span className="text-lg capitalize">
                            {product.product_name}
                          </span>
                        </label>
                      </MenuItem>
                    ))}
                  </SubMenu>
                ) : (
                  products.map((product) => (
                    <MenuItem
                      key={product.id}
                      style={{ backgroundColor: '#003244', color: '#ffffff' }}
                    >
                      <label className="flex cursor-pointer items-center space-x-4">
                        <input
                          type="radio"
                          name="specialProduct"
                          value={product.id}
                          checked={selectedProductId === product.id}
                          onChange={() => handleSelectProduct(product)}
                          className="size-4 text-blue-500"
                        />
                        <span className="text-lg capitalize">
                          {product.product_name}
                        </span>
                      </label>
                    </MenuItem>
                  ))
                )
            )}
          </SubMenu>
        ) : (
          subItems.map((product) => (
            <MenuItem
              key={product.id}
              style={{ backgroundColor: '#003244', color: '#ffffff' }}
            >
              <label className="flex cursor-pointer items-center space-x-4">
                <input
                  type="radio"
                  name="specialProduct"
                  value={product.id}
                  checked={selectedProductId === product.id}
                  onChange={() => handleSelectProduct(product)}
                  className="size-4 text-blue-500"
                />
                <span className="text-lg capitalize">
                  {product.product_name}
                </span>
              </label>
            </MenuItem>
          ))
        )
      )}
    </SubMenu>
  );
};

export default ProductsList;
