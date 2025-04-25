/**
 * Formats a Date object into 'YYYY-MM-DD' string.
 * @param {Date} date - The date object.
 * @returns {string} Formatted date string or empty string if invalid.
 */
export const formatDateYYYYMMDD = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    return '';
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Generates date options for a dropdown.
 * @param {number} numberOfDays - How many past days to include (including today).
 * @returns {Array<{value: string, label: string}>} Array of date options.
 */
export const generateDateOptions = (numberOfDays = 7) => {
  const options = [];
  const today = new Date();
  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const value = formatDateYYYYMMDD(date);
    if (!value) continue; // Skip invalid dates

    let label = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    if (i === 0) label = `Today (${label})`;
    else if (i === 1) label = `Yesterday (${label})`;
    options.push({ value, label });
  }
  return options;
};
