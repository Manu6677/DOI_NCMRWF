import React from 'react';
import '../../styles/spinner.css';

const Spinner = () => {
  return (
    <div className="overlay">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
