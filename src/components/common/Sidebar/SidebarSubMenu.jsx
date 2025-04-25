import { SubMenu, MenuItem } from 'react-pro-sidebar';
import { Folder, FolderOpen, FileText, Tag } from 'lucide-react';

const SidebarSubMenu = ({ title, icon, items, selectedItem, onSelectItem }) => {
  // Group items by product_header, then by product_sub_header, then by product_sub_header_item
  const groupedItems = items.reduce((acc, item) => {
    if (!item.product_header) {
      acc._no_header = acc._no_header || [];
      acc._no_header.push(item);
    } else {
      if (!acc[item.product_header]) {
        acc[item.product_header] = {};
      }
      if (item.product_sub_header) {
        if (!acc[item.product_header][item.product_sub_header]) {
          acc[item.product_header][item.product_sub_header] = {};
        }
        if (item.product_sub_header_item) {
          if (
            !acc[item.product_header][item.product_sub_header][
              item.product_sub_header_item
            ]
          ) {
            acc[item.product_header][item.product_sub_header][
              item.product_sub_header_item
            ] = [];
          }
          acc[item.product_header][item.product_sub_header][
            item.product_sub_header_item
          ].push(item);
        } else {
          acc[item.product_header][
            item.product_sub_header
          ]._no_sub_header_item =
            acc[item.product_header][item.product_sub_header]
              ._no_sub_header_item || [];
          acc[item.product_header][
            item.product_sub_header
          ]._no_sub_header_item.push(item);
        }
      } else {
        acc[item.product_header]._no_sub_header =
          acc[item.product_header]._no_sub_header || [];
        acc[item.product_header]._no_sub_header.push(item);
      }
    }
    return acc;
  }, {});

  return (
    <SubMenu
      label={title}
      icon={icon}
      style={{ backgroundColor: '#003244' }}
      className="my-4 text-lg"
      defaultOpen={true}
    >
      {groupedItems._no_header &&
        groupedItems._no_header.map((item) => (
          <MenuItem
            key={item.id}
            style={{ backgroundColor: '#003244', color: '#e0f2ff' }}
          >
            <label className="flex cursor-pointer items-center space-x-4">
              <input
                type="radio"
                name={title}
                value={item.id}
                checked={selectedItem?.id === item.id}
                onChange={() => onSelectItem(item)}
                className="size-4 capitalize text-blue-500"
              />
              <span className="text-lg capitalize">
                {item.product_name.replace(/-/g, ' ')}
              </span>
            </label>
          </MenuItem>
        ))}

      {Object.entries(groupedItems)
        .filter(([header]) => header !== '_no_header')
        .map(([header, subGroups]) => (
          <SubMenu
            key={header}
            label={header.replace(/-/g, ' ')}
            icon={<Folder />}
            style={{ backgroundColor: '#003244', color: '#e0f2ff' }}
            className="capitalize"
          >
            {Object.entries(subGroups).map(([subHeader, subHeaderItems]) => (
              <SubMenu
                key={subHeader}
                label={subHeader}
                icon={<FolderOpen />}
                style={{ backgroundColor: '#003244', color: '#e0f2ff' }}
                className="capitalize"
              >
                {Object.entries(subHeaderItems).map(([subHeaderItem, items]) =>
                  subHeaderItem !== '_no_sub_header_item' ? (
                    <SubMenu
                      key={subHeaderItem}
                      label={subHeaderItem.replace(/-/g, ' ')}
                      icon={<FileText />}
                      style={{ backgroundColor: '#003244', color: '#e0f2ff' }}
                      className="capitalize"
                    >
                      {items.map((item) => (
                        <MenuItem
                          key={item.id}
                          style={{
                            backgroundColor: '#003244',
                            color: '#e0f2ff',
                          }}
                        >
                          <label className="flex cursor-pointer items-center space-x-4">
                            <input
                              type="radio"
                              name={title}
                              value={item.id}
                              checked={selectedItem?.id === item.id}
                              onChange={() => onSelectItem(item)}
                              className="size-4 capitalize text-blue-500"
                            />
                            <span className="text-lg capitalize">
                              {item.product_name.replace(/-/g, ' ')}
                            </span>
                          </label>
                        </MenuItem>
                      ))}
                    </SubMenu>
                  ) : (
                    items.map((item) => (
                      <MenuItem
                        key={item.id}
                        style={{ backgroundColor: '#003244', color: '#e0f2ff' }}
                      >
                        <label className="flex cursor-pointer items-center space-x-4">
                          <input
                            type="radio"
                            name={title}
                            value={item.id}
                            checked={selectedItem?.id === item.id}
                            onChange={() => onSelectItem(item)}
                            className="size-4 text-blue-500"
                          />
                          <span className="text-lg capitalize">
                            {item.product_name.replace(/-/g, ' ')}
                          </span>
                        </label>
                      </MenuItem>
                    ))
                  )
                )}
              </SubMenu>
            ))}
          </SubMenu>
        ))}
    </SubMenu>
  );
};

export default SidebarSubMenu;
