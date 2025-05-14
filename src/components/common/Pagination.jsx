import TooltipButton from './TooltipButton';

const Pagination = ({ page, totalPages, onPageChange, showHpa = false }) => {
  const HPA_LEVELS = [200, 500, 700, 850, 925];

  return (
    <div className="mt-6 flex justify-center gap-6">
      {showHpa ? (
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
      ) : (
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
      )}
    </div>
  );
};

export default Pagination;
