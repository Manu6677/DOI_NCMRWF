import React from 'react';
import Button from '@mui/material/Button';

const FilterButtons = ({ filter, setFilter }) => (
  <div className="mb-4 flex flex-wrap justify-center gap-2 sm:gap-4">
    <Button
      variant={filter === 'scientists' ? 'contained' : 'outlined'}
      onClick={() => setFilter('scientists')}
    >
      Scientists
    </Button>
    <Button
      variant={filter === 'administrator' ? 'contained' : 'outlined'}
      onClick={() => setFilter('administrator')}
    >
      Administration
    </Button>
    <Button
      variant={filter === 'hindi_section' ? 'contained' : 'outlined'}
      onClick={() => setFilter('hindi_section')}
    >
      Hindi Section
    </Button>
    <Button
      variant={filter === 'directorate' ? 'contained' : 'outlined'}
      onClick={() => setFilter('directorate')}
    >
      Directorate
    </Button>
  </div>
);

export default FilterButtons;
