import React from 'react';

const NavDropdown = ({ children, dropDownData, locale }) => {
  console.log(dropDownData);

  return (
    <div className="relative text-white">
      {children}
      <div className="absolute left-0 z-10 grid w-full transform gap-2 bg-richblack-50 transition-transform duration-500 group-hover:grid">
        {dropDownData.map((data, index) => (
          <p key={index} className="p-2">
            {data?.title[locale]}
          </p>
        ))}
      </div>
    </div>
  );
};

export default NavDropdown;
