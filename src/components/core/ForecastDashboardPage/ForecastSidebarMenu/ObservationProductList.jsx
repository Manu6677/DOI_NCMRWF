import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaLayerGroup, FaGlobe, FaCubes } from 'react-icons/fa';
import { SubMenu, MenuItem } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';

import {
  fetchObservationProductsNames,
  fetchForecastUrl,
} from '../../../../services/operations/specialProductsApi';

import {
  setObservationProductId,
  setObservationUrl,
  setObservationPage,
  setTotalObservationPages,
  setobservationUTC,
} from '../../../../slices/observationProductsSlice';

const ObservationProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedObservationProductId, observationUTC, observationPage } =
    useSelector((state) => state.observationProducts);

  const [observationProducts, setObservationProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchObservationProductsNames();
        setObservationProducts(products);
      } catch (error) {
        console.error('Error fetching observation product names:', error);
      }
    };
    getProducts();
  }, []);

  const handleSelectProduct = async (product) => {
    if (product?.id !== selectedObservationProductId) {
      dispatch(setObservationPage(1));
    }

    navigate('/forecast-dashboard/observation-products');
    dispatch(setObservationProductId(product.id));

    const [selectedDate, selectedUtcValue] = observationUTC.value.split('/');

    try {
      const model = 'UM-Reg4Km';
      const response = await fetchForecastUrl(
        model,
        product.url_product_name,
        product.category,
        product.product_header,
        selectedDate,
        selectedUtcValue,
        null,
        observationPage,
        4
      );
      if (response) {
        dispatch(setTotalObservationPages(response.totalPages));
        dispatch(setObservationUrl(response.result));
        console.log('response.result  ', response.result);
      }
    } catch (error) {
      console.error('Error fetching observation forecast URL:', error);
    }
  };

  useEffect(() => {
    if (selectedObservationProductId && observationUTC) {
      const selectedProduct = observationProducts.find(
        (product) => product.id === selectedObservationProductId
      );
      if (selectedProduct) {
        handleSelectProduct(selectedProduct);
      }
    }
  }, [observationUTC, observationProducts, observationPage]);

  const groupedProducts = observationProducts.reduce((acc, product) => {
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
      label="Observational Products"
      icon={<FaLayerGroup />}
      style={{ backgroundColor: '#003244', color: '#ffffff' }}
    >
      {Object.entries(groupedProducts).map(([subHeader, subItems]) =>
        subHeader !== 'products' ? (
          <SubMenu
            key={subHeader}
            label={subHeader.replace(/-/g, ' ')}
            icon={<FaGlobe />}
            style={{ backgroundColor: '#003244', color: '#ffffff' }}
            className="capitalize"
          >
            {Object.entries(subItems).map(([subHeaderItem, products]) =>
              subHeaderItem !== 'products' ? (
                <SubMenu
                  key={subHeaderItem}
                  label={subHeaderItem.replace(/-/g, ' ')}
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
                          name="observationProduct"
                          value={product.id}
                          checked={selectedObservationProductId === product.id}
                          onChange={() => handleSelectProduct(product)}
                          className="size-4 cursor-pointer appearance-none rounded-full border border-blue-200 text-blue-500 checked:border-blue-400 checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-[#003244]"
                        />
                        <span className="inline-block max-w-[150px] whitespace-normal break-words text-base capitalize">
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
                        name="observationProduct"
                        value={product.id}
                        checked={selectedObservationProductId === product.id}
                        onChange={() => handleSelectProduct(product)}
                        className="size-4 cursor-pointer appearance-none rounded-full border border-blue-200 text-blue-500 checked:border-blue-400 checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-[#003244]"
                      />
                      <span className="inline-block max-w-[150px] whitespace-normal break-words text-base capitalize">
                        {product.product_name.split('-').join(' ')}
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
                  name="observationProduct"
                  value={product.id}
                  checked={selectedObservationProductId === product.id}
                  onChange={() => handleSelectProduct(product)}
                  className="size-4 cursor-pointer appearance-none rounded-full border border-blue-200 text-blue-500 checked:border-blue-400 checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-[#003244]"
                />
                <span className="inline-block max-w-[150px] whitespace-normal break-words text-base capitalize">
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

export default ObservationProductList;
