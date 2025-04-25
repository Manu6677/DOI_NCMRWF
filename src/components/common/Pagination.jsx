const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="mt-6 flex justify-center gap-4">
      <button
        className="rounded-lg bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>

      <span className="text-lg font-semibold">
        Page {page} of {totalPages}
      </span>

      <button
        className="rounded-lg bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
