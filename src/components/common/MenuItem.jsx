// src/components/MenuItem.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';

const base_url = process.env.REACT_APP_ASSETS_BASE_URL_NEW || '';

const MenuItem = ({ item, level = 0, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  // Determine item characteristics
  const hasChildren = item.children && item.children.length > 0;
  // Check if path exists and is a non-empty string
  const hasPath = typeof item.path === 'string' && item.path.length > 0;

  // --- Event Handlers ---

  // Toggles the submenu open/closed for items with children
  const handleToggle = (e) => {
    e.stopPropagation(); // Prevent clicks bubbling up if nested
    setIsOpen(!isOpen);
  };

  // Navigates to the item's path if it exists
  const handleNavigate = (e) => {
    e.stopPropagation();
    if (hasPath) {
      navigate(`${item.path}`);
      // Also call onSelect if provided - useful for highlighting the selected item
      if (onSelect) {
        onSelect(item.id, item.path); // Pass path as well? Optional.
      }
    }
  };

  // Handles selection for leaf items that don't have a path
  const handleSelect = (e) => {
    e.stopPropagation();
    // Only trigger select if it's a leaf node without a path AND onSelect is provided
    if (!hasChildren && !hasPath && onSelect) {
      onSelect(item.id); // Pass only ID for generic selection
    }
    // If it's a leaf node without path and without onSelect, clicking does nothing
  };

  // Determine the primary action when the main item row is clicked
  // Priority: 1. Toggle if it has children, 2. Navigate if it has a path, 3. Select if leaf without path
  const handleClick = hasChildren
    ? handleToggle
    : hasPath
      ? handleNavigate
      : handleSelect;

  // Calculate indentation based on nesting level
  const paddingLeft = `${1 + level * 1.5}rem`;

  return (
    <div className="relative text-sm">
      {/* Item Row Wrapper */}
      <div
        className={`flex cursor-pointer items-center justify-between rounded-md px-4 py-2.5 transition-colors duration-150 hover:bg-blue-600`} // Consistent hover effect
        style={{ paddingLeft }}
        onClick={handleClick} // Attach the determined click handler
        role="button" // Accessibility: Indicate it's interactive
        tabIndex={0} // Accessibility: Make focusable
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleClick(e);
        }} // Accessibility: Allow activation with Enter/Space
        aria-expanded={hasChildren ? isOpen : undefined} // Accessibility: Indicate expanded state for parents
      >
        {/* Label and Icon */}
        <div className="flex items-center space-x-3 truncate">
          {item.icon && <item.icon className="size-4 flex-shrink-0" />}
          <span className="group truncate">
            {item.label}
            <span className="absolute right-4 top-0 z-10 hidden w-max max-w-xs -translate-y-full whitespace-normal rounded-md bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:block group-hover:opacity-100">
              {item.label}
            </span>
          </span>
        </div>

        {/* Chevron for expandable items (items with children) */}
        {hasChildren && (
          // Using a button ensures it's focusable and announced correctly by screen readers
          // The handleToggle here ensures the chevron click *only* toggles,
          // matching the behavior of clicking the row for parent items.
          <button
            onClick={handleToggle}
            className="ml-auto rounded-full p-1 hover:bg-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
            aria-label={isOpen ? 'Collapse submenu' : 'Expand submenu'} // More descriptive aria-label
          >
            {isOpen ? (
              <FiChevronDown className="size-4" />
            ) : (
              <FiChevronRight className="size-4" />
            )}
          </button>
        )}
      </div>

      {/* Sub-menu (Recursive Rendering) */}
      {hasChildren && isOpen && (
        <div className="mt-1 space-y-1 overflow-hidden">
          {' '}
          {/* Added overflow-hidden if needed for animations */}
          {item.children.map((child) => (
            <MenuItem
              key={child.id}
              item={child}
              level={level + 1} // Increase level for indentation
              onSelect={onSelect} // Pass onSelect down to children
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
