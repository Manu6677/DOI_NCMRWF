import { FiX } from 'react-icons/fi';
import { getPlaceholderUrl } from '../../utils/imageUtils'; // Assuming utils folder structure

const ImageModal = ({ isOpen, onClose, chartInfo }) => {
  if (!isOpen || !chartInfo) return null;

  // Generate title dynamically based on available info
  let modalTitle = 'Verification Chart';
  if (chartInfo.viewType === 'daily') {
    modalTitle = `Daily: ${chartInfo.statLabel || '?'} - ${chartInfo.varLabel || '?'} (${chartInfo.date || '?'} ${chartInfo.time || '?'}Z)`;
  } else if (chartInfo.viewType === 'weekly') {
    modalTitle = `Weekly: ${chartInfo.regionId || '?'} ${chartInfo.varLabel || '?'} at ${chartInfo.hpaLevel || '?'}hPa (Ending ${chartInfo.date || '?'})`;
  }

  const handleImageErrorModal = (e) => {
    e.target.onerror = null;
    e.target.src = getPlaceholderUrl(600, 400, 'Image Not Found');
    e.target.alt = `Error loading chart for ${modalTitle}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 transition-opacity duration-300"
      onClick={onClose} // Close on backdrop click
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
    >
      <div
        className="relative w-full max-w-4xl rounded-lg bg-white p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <button
          onClick={onClose}
          className="absolute -right-2 -top-2 z-10 rounded-full bg-slate-600 p-1 text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          aria-label="Close image viewer"
        >
          <FiX className="size-5" />
        </button>
        <h3
          id="image-modal-title"
          className="mb-3 border-b border-slate-200 pb-2 text-lg font-semibold text-slate-800"
        >
          {modalTitle}
        </h3>
        <div className="overflow-hidden rounded">
          <img
            src={chartInfo.url}
            alt={`Chart for ${modalTitle}`}
            className="block h-auto max-h-[80vh] w-full rounded object-contain"
            onError={handleImageErrorModal}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
