import TooltipButton from './TooltipButton';

const Pagination = ({
  page,
  totalPages,
  onPageChange,
  showHpa = false,
  showTimeLine = false,
}) => {
  const HPA_LEVELS = [200, 500, 700, 850, 925];

  const renderTimeline = () => (
    <>
      <div className="relative mt-2 flex w-full max-w-lg items-center justify-between px-6">
        {HPA_LEVELS.map((level, index) => (
          <div key={level} className="relative flex flex-col items-center">
            {/* Connector line (except last item) */}
            {index < HPA_LEVELS.length - 1 && (
              <div className="bg-gray-300 absolute left-1/2 top-2 z-0 h-0.5 w-full" />
            )}

            {/* Dot */}
            <button
              onClick={() => onPageChange(index + 1)}
              className={`z-10 h-5 w-5 rounded-full border-2 transition-all duration-200 ${
                page === index + 1
                  ? 'scale-125 border-blue-600 bg-blue-600'
                  : 'border-gray-400 hover:bg-gray-100 bg-white'
              }`}
              title={`${level} hPa`}
            ></button>

            {/* Label */}
            <span
              className={`mt-2 text-xs ${
                page === index + 1
                  ? 'font-medium text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              {level}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 text-lg font-semibold text-slate-700">
        Selected: {HPA_LEVELS[page - 1]} hPa
      </div>
    </>
  );

  const renderHpaNavigation = () => (
    <>
      <TooltipButton
        label="Previous"
        tooltip="Go to previous HPA level"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      />
      <span className="self-center text-lg font-semibold">
        {HPA_LEVELS[page - 1]} hPa
      </span>
      <TooltipButton
        label="Next"
        tooltip="Go to next HPA level"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      />
    </>
  );

  const renderDefaultNavigation = () => (
    <>
      <TooltipButton
        label="Previous"
        tooltip="Go to previous page"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      />
      <span className="self-center text-lg font-semibold">
        Page {page} of {totalPages}
      </span>
      <TooltipButton
        label="Next"
        tooltip="Go to next page"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      />
    </>
  );

  return (
    <div className="mt-6 flex justify-center gap-6">
      {showHpa
        ? showTimeLine
          ? renderTimeline()
          : renderHpaNavigation()
        : renderDefaultNavigation()}
    </div>
  );
};

export default Pagination;
