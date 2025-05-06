import React, { useState } from 'react';
import { SubMenu, MenuItem } from 'react-pro-sidebar';
import { Folder, FolderOpen, FileText, Tag } from 'lucide-react';

// RenderItem component remains the same
const RenderItem = ({
  item,
  radioGroupName,
  selectedItem,
  onSelectItem,
  level,
}) => {
  const paddingLeft = 20 + level * 20;

  return (
    <MenuItem
      key={item.id}
      style={{ backgroundColor: '#003244', color: '#e0f2ff' }}
    >
      <label className="flex cursor-pointer items-center space-x-4">
        <input
          type="radio"
          name={radioGroupName}
          value={item.id}
          checked={selectedItem?.id === item.id}
          onChange={() => onSelectItem(item)}
          // className="size-4 flex-shrink-0 cursor-pointer appearance-none rounded-full border border-blue-200 text-blue-500 checked:border-blue-400 checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-[#003244]"
          className="size-4 flex-shrink-0 cursor-pointer appearance-none rounded-full border border-blue-200 text-white checked:border-white checked:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#003244]"
        />
        <span className="inline-block max-w-[150px] whitespace-normal break-words text-base capitalize">
          {item.product_name.replace(/-/g, ' ')}
        </span>
      </label>
    </MenuItem>
  );
};

// Updated RenderLevel component
const RenderLevel = ({
  data,
  level,
  radioGroupName,
  selectedItem,
  onSelectItem,
  parentPath,
  openSubMenuPath, // Path of the *deepest* currently open SubMenu
  setOpenSubMenuPath,
}) => {
  const levelIcons = [Folder, FolderOpen, FileText];
  const defaultIcon = Tag;

  const directItems = data._items || [];
  const subGroups = Object.entries(data).filter(([key]) => key !== '_items');

  return (
    <>
      {/* Render direct items */}
      {directItems.map((item) => (
        <RenderItem
          key={item.id}
          item={item}
          radioGroupName={radioGroupName}
          selectedItem={selectedItem}
          onSelectItem={onSelectItem}
          level={level}
        />
      ))}

      {/* Render subgroups */}
      {subGroups.map(([groupName, groupData]) => {
        const IconComponent = levelIcons[level] || defaultIcon;
        const currentPath = parentPath
          ? `${parentPath}/${groupName}`
          : groupName;

        // --- Updated isOpen logic ---
        // A SubMenu is open if its path matches the open path OR
        // if its path is an ancestor of the open path.
        const isOpen =
          openSubMenuPath === currentPath ||
          (openSubMenuPath && openSubMenuPath.startsWith(currentPath + '/'));
        // --- End updated isOpen logic ---

        // --- Updated handleOpenChange logic ---
        const handleOpenChange = (newOpenState) => {
          if (newOpenState) {
            // If opening, set this path as the deepest open path
            setOpenSubMenuPath(currentPath);
          } else {
            // If closing, only change state if this *specific* path was the deepest one open.
            // Set the open path to its parent, effectively closing this level.
            if (openSubMenuPath === currentPath) {
              const parent = currentPath.includes('/')
                ? currentPath.substring(0, currentPath.lastIndexOf('/'))
                : null;
              setOpenSubMenuPath(parent);
            }
            // If a deeper path is open (e.g., closing 'HeaderA' when 'HeaderA/SubB' is open),
            // do nothing, because the child menu forces the parent to stay open.
            // The `isOpen` logic above handles keeping the parent visually open.
          }
        };
        // --- End updated handleOpenChange logic ---

        return (
          <SubMenu
            key={currentPath}
            label={groupName.replace(/-/g, ' ')}
            icon={<IconComponent size={18} />}
            style={{ backgroundColor: '#003244', color: '#e0f2ff' }}
            className="capitalize"
            open={isOpen}
            onOpenChange={handleOpenChange} // Use the refined handler
          >
            {/* Recursive call */}
            <RenderLevel
              data={groupData}
              level={level + 1}
              radioGroupName={radioGroupName}
              selectedItem={selectedItem}
              onSelectItem={onSelectItem}
              parentPath={currentPath}
              openSubMenuPath={openSubMenuPath}
              setOpenSubMenuPath={setOpenSubMenuPath}
            />
          </SubMenu>
        );
      })}
    </>
  );
};

// SidebarSubMenu component remains structurally the same, just passes state
const SidebarSubMenu = ({
  title,
  icon,
  items = [],
  selectedItem,
  onSelectItem,
}) => {
  const [openSubMenuPath, setOpenSubMenuPath] = useState(null); // State stores the deepest open path

  // Grouping function (no changes needed)
  const groupItemsRecursive = (itemsToGroup, keys) => {
    // ... (exact same grouping logic as before)
    const groups = { _items: [] }; // Initialize with _items for items directly at this level

    if (!keys || keys.length === 0) {
      // Base case: No more keys left, all remaining items belong directly here
      groups._items = itemsToGroup;
      return groups;
    }

    const currentKey = keys[0]; // e.g., 'product_header'
    const remainingKeys = keys.slice(1);

    itemsToGroup.forEach((item) => {
      const groupName = item[currentKey];

      if (groupName && typeof groupName === 'string') {
        // Check if key exists and is valid
        if (!groups[groupName]) {
          groups[groupName] = { _tempItemsHolder: [] };
        }
        groups[groupName]._tempItemsHolder.push(item);
      } else {
        groups._items.push(item);
      }
    });

    Object.keys(groups).forEach((groupName) => {
      if (groupName !== '_items' && groups[groupName]._tempItemsHolder) {
        const itemsToGroupFurther = groups[groupName]._tempItemsHolder;
        delete groups[groupName]._tempItemsHolder;
        const subGroupResult = groupItemsRecursive(
          itemsToGroupFurther,
          remainingKeys
        );
        groups[groupName] = {
          ...groups[groupName],
          ...subGroupResult,
        };
        if (!groups[groupName]._items) {
          groups[groupName]._items = [];
        }
      }
    });

    if (groups._items && groups._items.length === 0) {
      delete groups._items;
    }

    Object.keys(groups).forEach((groupName) => {
      if (groupName !== '_items') {
        const group = groups[groupName];
        const isEmpty =
          (!group._items || group._items.length === 0) &&
          Object.keys(group).filter((k) => k !== '_items').length === 0;
        if (isEmpty) {
          delete groups[groupName];
        }
      }
    });

    return groups;
  };

  const groupingKeys = [
    'product_header',
    'product_sub_header',
    'product_sub_header_item',
  ];
  const groupedData = groupItemsRecursive(items || [], groupingKeys);

  return (
    <SubMenu
      label={title}
      icon={icon}
      style={{ backgroundColor: '#003244' }}
      className="my-4 text-lg"
      defaultOpen={true} // Top level remains open by default
    >
      {/* Pass state down */}
      <RenderLevel
        data={groupedData}
        level={0}
        radioGroupName={title}
        selectedItem={selectedItem}
        onSelectItem={onSelectItem}
        parentPath={null}
        openSubMenuPath={openSubMenuPath}
        setOpenSubMenuPath={setOpenSubMenuPath}
      />
    </SubMenu>
  );
};

export default SidebarSubMenu;
