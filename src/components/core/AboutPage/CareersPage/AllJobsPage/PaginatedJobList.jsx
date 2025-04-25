import JobCard from './JobCard';

const PaginatedJobList = ({ jobs, currentPage, totalPages, onPageChange }) => {
  const displayedJobs = jobs.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <div>
      <div className="mx-auto grid w-10/12 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {displayedJobs.map((job, id) => (
          <JobCard
            job={job}
            key={id}
            containerStyles={
              'flex flex-col items-start justify-between overflow-hidden rounded-lg border border-richblack-100 bg-white shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer'
            }
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2"
        >
          Previous
        </button>
        <span className="mx-2">{currentPage}</span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedJobList;
