import React from 'react';
import { FiFileText } from 'react-icons/fi';

const NoDataMessage = ({ message }) => (
  <div className="flex items-center justify-center space-x-2 py-10 text-slate-500">
    <FiFileText className="size-6" />
    <span>
      {message || 'No verification data available for the selected criteria.'}
    </span>
  </div>
);

export default NoDataMessage;
