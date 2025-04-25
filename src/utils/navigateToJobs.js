/**
 * Helper function to navigate to the jobs page with optional query parameters.
 * @param {object} navigate - The navigate function from useNavigate hook.
 * @param {string} jobTitle - The job title to filter by.
 * @param {string} location - The location to filter by.
 */
export const navigateToJobs = (navigate, jobTitle, location) => {
  let url = '/all-jobs';
  if (jobTitle || location) {
    url += `?jobTitle=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(location)}`;
  }
  console.log(url);

  navigate(url); // Navigate to the constructed URL
};
