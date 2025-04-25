// src/components/FilterTitle.jsx
import React from 'react';

const FilterTitle = ({ filter }) => (
  <div className="mx-auto flex w-full items-center justify-center py-3 text-3xl font-semibold text-blue-800">
    <p>
      {filter === 'scientists' && 'Scientists at NCMRWF'}
      {filter === 'administrator' && 'Administrators at NCMRWF'}
      {filter === 'hindi_section' && 'Hindi Section Members'}
    </p>
  </div>
);

export default FilterTitle;
