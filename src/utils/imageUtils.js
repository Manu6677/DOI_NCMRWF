/**
 * Generates a placeholder image URL.
 * @param {number} width - Image width.
 * @param {number} height - Image height.
 * @param {string} text - Text to display on the placeholder.
 * @returns {string} Placeholder image URL.
 */
export const getPlaceholderUrl = (width = 100, height = 75, text = 'Error') => {
  return `https://placehold.co/${width}x${height}/e2e8f0/94a3b8?text=${encodeURIComponent(text)}`;
};

/**
 * Handles image loading errors by replacing the source with a placeholder.
 * @param {React.SyntheticEvent<HTMLImageElement, Event>} e - The error event.
 * @param {number} width - Placeholder width.
 * @param {number} height - Placeholder height.
 * @param {string} errorText - Text for the placeholder.
 */
export const handleImageError = (
  e,
  width = 100,
  height = 75,
  errorText = 'Not Found'
) => {
  e.target.onerror = null; // Prevent infinite loop if placeholder fails
  e.target.src = getPlaceholderUrl(width, height, errorText);
  // Keep the original alt text if possible, or update it
  const originalAlt = e.target.alt || 'Chart';
  e.target.alt = `Error loading: ${originalAlt}`;
};
