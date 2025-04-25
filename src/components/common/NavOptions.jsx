import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavOptions = ({
  links,
  language,
  children,
  dropdownContainerClass,
  arrowClass,
  id, // Unique ID for each NavOptions
  activeDropdown, // The currently active dropdown ID
  setActiveDropdown, // Function to set the active dropdown ID
  setHoverTimeout, // Function to manage the hover timeout
}) => {
  const handleOpen = (e) => {
    e.preventDefault(); // Prevent default behavior
    setActiveDropdown(id); // Set this dropdown as active
    clearTimeout(setHoverTimeout.current); // Clear any existing timeout
  };

  const handleHoverLeave = () => {
    // Start the timeout to reset the active dropdown after 2 seconds
    setHoverTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 1000);
  };

  const isOpen = activeDropdown === id; // Check if this dropdown is open

  return (
    <nav
      className=""
      onMouseLeave={handleHoverLeave} // Start the timeout on mouse leave
      onMouseEnter={() => clearTimeout(setHoverTimeout.current)} // Clear timeout on hover
    >
      <div onMouseEnter={(e) => handleOpen(e)}>{children}</div>

      {isOpen && (
        <div
          className={`absolute z-10 flex justify-between gap-2 rounded-md bg-[rgb(241_242_255_/_var(--tw-bg-opacity))] p-2 text-blue-700 ${dropdownContainerClass}`}
        >
          <div className="absolute left-0 right-0 top-6 h-6 bg-transparent" />
          <div
            className={`absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[rgb(241_242_255_/_var(--tw-bg-opacity))] ${arrowClass}`}
          />

          {links.map((link, index) => (
            <Link to={link.path} key={index}>
              <span className="rounded-lg text-base font-medium capitalize hover:underline">
                {link.title[language]}
              </span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavOptions;
