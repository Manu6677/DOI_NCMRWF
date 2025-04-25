import { FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Report links data
const reportLinks = [
  {
    id: 'neps-plume',
    label: 'NEPS Plume',
    url: '/india-map-neps.php',
  },
];

// Base URL for assets (in case served from a different origin)
const base_url = process.env.REACT_APP_ASSETS_BASE_URL_NEW || '';

const NepsPlume = () => {
  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
      {/* Page heading */}
      <h2 className="border-b border-slate-200 pb-3 text-2xl font-semibold text-slate-800">
        NEPS Plume
      </h2>

      {/* Links list */}
      <div className="space-y-3">
        {reportLinks.length > 0 ? (
          reportLinks.map((link) => (
            <Link
              key={link.id}
              to={`${base_url}${link.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-3 rounded-md border border-transparent p-3 text-slate-700 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FiExternalLink className="size-4 shrink-0 text-blue-600 transition-colors group-hover:text-blue-700" />
              <span className="font-medium group-hover:underline">
                {link.label}
              </span>
            </Link>
          ))
        ) : (
          <p className="text-slate-500">
            No links available. Please check back later.
          </p>
        )}
      </div>
    </div>
  );
};

export default NepsPlume;
