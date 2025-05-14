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
    if (product?.id === 29) {
      navigate('/observation-monitoring');
      return;
    }

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
        // console.log('response.result  ', response.result);
      }
    } catch (error) {
      console.error('Error fetching observation forecast URL:', error);
    }
  };

  useEffect(() => {
    if (selectedObservationProductId && observationUTC) {
      console.log(
        'selectedObservationProductId',
        selectedObservationProductId,
        'observationUTC',
        observationUTC
      );
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
      label="Observations"
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
                      className="group relative"
                    >
                      <label className="flex cursor-pointer items-center space-x-4">
                        <input
                          type="radio"
                          name="observationProduct"
                          value={product.id}
                          checked={selectedObservationProductId === product.id}
                          onChange={() => handleSelectProduct(product)}
                          // className="size-4 cursor-pointer appearance-none rounded-full border border-blue-200 text-blue-500 checked:border-blue-400 checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-[#003244]"
                          className="size-4 flex-shrink-0 cursor-pointer appearance-none rounded-full border border-blue-200 text-white checked:border-white checked:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#003244]"
                        />
                        <span className="inline-block max-w-[150px] whitespace-normal break-words text-base capitalize">
                          {product.product_name}
                        </span>
                      </label>
                      <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 min-w-max max-w-xs -translate-x-1/2 scale-0 rounded-md bg-orange-900 px-3 py-2 text-xs capitalize text-white opacity-0 shadow-md transition-all duration-200 ease-in-out group-hover:scale-100 group-hover:opacity-100">
                        {product.product_name}
                      </div>
                    </MenuItem>
                  ))}
                </SubMenu>
              ) : (
                products.map((product) => (
                  <MenuItem
                    key={product.id}
                    style={{ backgroundColor: '#003244', color: '#ffffff' }}
                    className="group relative"
                  >
                    <label className="flex cursor-pointer items-center space-x-4">
                      <input
                        type="radio"
                        name="observationProduct"
                        value={product.id}
                        checked={selectedObservationProductId === product.id}
                        onChange={() => handleSelectProduct(product)}
                        // className="size-4 cursor-pointer appearance-none rounded-full border border-blue-200 text-blue-500 checked:border-blue-400 checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-[#003244]"
                        className="size-4 flex-shrink-0 cursor-pointer appearance-none rounded-full border border-blue-200 text-white checked:border-white checked:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#003244]"
                      />
                      <span className="inline-block max-w-[150px] whitespace-normal break-words text-base capitalize">
                        {product.product_name.split('-').join(' ')}
                      </span>
                    </label>
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 min-w-max max-w-xs -translate-x-1/2 scale-0 rounded-md bg-orange-900 px-3 py-2 text-xs capitalize text-white opacity-0 shadow-md transition-all duration-200 ease-in-out group-hover:scale-100 group-hover:opacity-100">
                      {product.product_name.split('-').join(' ')}
                    </div>
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
              className="group relative"
            >
              <label className="flex cursor-pointer items-center space-x-4">
                <input
                  type="radio"
                  name="observationProduct"
                  value={product.id}
                  checked={selectedObservationProductId === product.id}
                  onChange={() => handleSelectProduct(product)}
                  // className="size-4 cursor-pointer appearance-none rounded-full border border-blue-200 text-blue-500 checked:border-blue-400 checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-[#003244]"
                  className="size-4 flex-shrink-0 cursor-pointer appearance-none rounded-full border border-blue-200 text-white checked:border-white checked:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#003244]"
                />
                <span className="inline-block max-w-[150px] whitespace-normal break-words text-base capitalize">
                  {product.product_name}
                </span>
              </label>
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 min-w-max max-w-xs -translate-x-1/2 scale-0 rounded-md bg-orange-900 px-3 py-2 text-xs capitalize text-white opacity-0 shadow-md transition-all duration-200 ease-in-out group-hover:scale-100 group-hover:opacity-100">
                {product.product_name}
              </div>
            </MenuItem>
          ))
        )
      )}
    </SubMenu>
  );
};

export default ObservationProductList;
