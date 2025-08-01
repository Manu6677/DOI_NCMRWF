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
        1
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
                        className="group relative"
                      >
                        <label className="flex cursor-pointer items-center space-x-4">
                          <input
                            type="radio"
                            name="specialProduct"
                            value={product.id}
                            checked={selectedProductId === product.id}
                            onChange={() => handleSelectProduct(product)}
                            // className="size-4 cursor-pointer appearance-none rounded-full border border-blue-200 text-blue-500 checked:border-blue-400 checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-[#003244]"
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
                          name="specialProduct"
                          value={product.id}
                          checked={selectedProductId === product.id}
                          onChange={() => handleSelectProduct(product)}
                          // className="checked:border-white-400 size-4 cursor-pointer appearance-none rounded-full border text-blue-500 checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-[#003244]"
                          // className="size-4 flex-shrink-0 cursor-pointer appearance-none rounded-full border text-white checked:border-white checked:bg-white"
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

export default ProductsList;
