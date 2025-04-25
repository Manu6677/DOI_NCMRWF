import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const ErrorDisplay = ({ message }) => (
  <div className="flex items-center space-x-3 rounded border border-red-300 bg-red-50 p-4 text-sm text-red-700">
    <FiAlertCircle className="size-5 shrink-0" />
    <span>Error: {message || 'An unexpected error occurred.'}</span>
  </div>
);

export default ErrorDisplay;
