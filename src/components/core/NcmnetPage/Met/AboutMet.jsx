import { FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const reportLinks = [
  {
    id: 'about-met',
    label: 'About MET',
    url: '/AboutMET.pdf',
  },
];

// Define base URL for assets if they are hosted separately
const base_url = process.env.REACT_APP_ASSETS_BASE_URL_NEW || '';

const AboutMet = () => {
  return (
    // Main container styling
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
      {/* Page Title */}
      <h2 className="border-b border-slate-200 pb-3 text-2xl font-semibold text-slate-800">
        About MET
      </h2>

      {/* List container */}
      <div className="space-y-3">
        {' '}
        {/* Vertical spacing between links */}
        {reportLinks.length > 0 ? (
          reportLinks.map((link) => (
            // Use standard <a> tag for external links or files opening in new tab
            <Link
              key={link.id}
              // Combine base_url and relative path if needed
              to={`${base_url}${link.url}`}
              target="_blank" // Open in new tab
              rel="noopener noreferrer" // Security for target="_blank"
              // Styling for the link - making it block-like
              className="group flex items-center space-x-3 rounded-md border border-transparent p-3 text-slate-700 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FiExternalLink className="size-4 shrink-0 text-blue-600 transition-colors group-hover:text-blue-700" />
              <span className="font-medium group-hover:underline">
                {link.label}
              </span>
            </Link>
          ))
        ) : (
          // Optional: Message if no links are available
          <p className="text-slate-500">
            Information not available at this time.
          </p>
        )}
      </div>
    </div>
  );
};

export default AboutMet;
