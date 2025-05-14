import { useState } from 'react';
import { FileText } from 'lucide-react'; // PDF icon

const ProductCard = ({ imageUrl, title = '', description = '', onClick }) => {
  const [isError, setIsError] = useState(false);

  // console.log(imageUrl);
  // Check if the URL is a PDF
  const isPdf = false;

  // Extract date and hPa value from image URL using regex
  // const match = imageUrl.match(
  //   /(\d{4}-\d{2}-\d{2})\/(\d{2})\/NCUM-Outputs\/Wind-Forecast\/pf0_(\d+)\.png/
  // );
  const dateUTC = '';
  const hpaValue = '';

  return (
    <div
      className="group relative cursor-pointer overflow-hidden overflow-y-scroll rounded-lg bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg"
      onClick={!isPdf ? onClick : undefined}
      role="button"
      tabIndex={0}
      aria-label={`Wind Forecast - Date: ${dateUTC}, Pressure: ${hpaValue} hPa`}
      onKeyDown={(e) => e.key === 'Enter' && !isPdf && onClick()}
    >
      {isPdf ? (
        <div
          className="flex h-40 items-center justify-center rounded-lg bg-slate-200 text-slate-700"
          onClick={() => window.open(imageUrl, '_blank')}
        >
          <FileText className="size-10" />
          <p className="mt-2 text-sm">Open PDF</p>
        </div>
      ) : isError ? (
        <div className="flex h-40 items-center justify-center rounded-lg bg-slate-200">
          <p className="text-sm text-slate-500">
            Image unavailable. Please select a different date and try again.
          </p>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={`Wind Forecast - ${dateUTC}, ${hpaValue} hPa`}
          className="w-full rounded-lg object-cover"
          loading="lazy"
          onError={() => setIsError(true)}
        />
      )}
    </div>
  );
};

export default ProductCard;
