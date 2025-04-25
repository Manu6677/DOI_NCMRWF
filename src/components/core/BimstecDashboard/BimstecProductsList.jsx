import { useEffect, useState } from 'react';
import { SubMenu, MenuItem } from 'react-pro-sidebar';
import { FaGlobe, FaCubes, FaLayerGroup } from 'react-icons/fa';
import { fetchBimstecProductsNames } from '../../../services/operations/bimstecAPI';

const BimstecProductsList = ({ onProductSelect, selectedUTC }) => {
  const [bimstecProducts, setBimstecProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchBimstecProductsNames();
        setBimstecProducts(products);
      } catch (error) {
        console.error('Error fetching BIMSTEC product names:', error);
      }
    };
    getProducts();
  }, []);

  const groupedProducts = bimstecProducts.reduce((acc, product) => {
    const header = product.product_header || 'Other';
    const subHeader = product.product_sub_header;
    const subItem = product.product_sub_header_item;

    if (!acc[header]) acc[header] = {};

    if (subHeader) {
      if (!acc[header][subHeader]) acc[header][subHeader] = {};

      if (subItem) {
        if (!acc[header][subHeader][subItem])
          acc[header][subHeader][subItem] = [];
        acc[header][subHeader][subItem].push(product);
      } else {
        acc[header][subHeader].products = acc[header][subHeader].products || [];
        acc[header][subHeader].products.push(product);
      }
    } else {
      acc[header].products = acc[header].products || [];
      acc[header].products.push(product);
    }

    return acc;
  }, {});

  return (
    <>
      {Object.entries(groupedProducts).map(([header, subHeaders]) => (
        <SubMenu
          key={header}
          label={header.replace(/-/g, ' ')}
          icon={<FaGlobe />}
          style={{ backgroundColor: '#003244', color: '#ffffff' }}
          className="capitalize"
        >
          {Object.entries(subHeaders).map(([subHeader, subItems]) =>
            subHeader !== 'products' ? (
              <SubMenu
                key={subHeader}
                label={subHeader.replace(/-/g, ' ')}
                icon={<FaCubes />}
                style={{ backgroundColor: '#003244', color: '#ffffff' }}
              >
                {Object.entries(subItems).map(([item, products]) =>
                  item !== 'products' ? (
                    <SubMenu
                      key={item}
                      label={item.replace(/-/g, ' ')}
                      icon={<FaCubes />}
                      style={{ backgroundColor: '#003244', color: '#ffffff' }}
                    >
                      {products.map((product) => (
                        <MenuItem
                          key={product.id}
                          style={{
                            backgroundColor: '#003244',
                            color: '#ffffff',
                          }}
                        >
                          <label className="flex cursor-pointer items-center space-x-4">
                            <input
                              type="radio"
                              name="bimstecProduct"
                              value={product.id}
                              className="size-4 text-blue-500"
                              onChange={() => onProductSelect(product)}
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
                            name="bimstecProduct"
                            value={product.id}
                            className="size-4 text-blue-500"
                            onChange={() => onProductSelect(product)}
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
                      name="bimstecProduct"
                      value={product.id}
                      className="size-4 text-blue-500"
                      onChange={() => onProductSelect(product)}
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
      ))}
    </>
  );
};

export default BimstecProductsList;
