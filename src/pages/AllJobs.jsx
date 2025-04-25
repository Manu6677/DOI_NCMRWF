import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import JobSearchForm from '../components/core/AboutPage/CareersPage/JobSearchForm';
import PaginatedJobList from '../components/core/AboutPage/CareersPage/AllJobsPage/PaginatedJobList';
import JobDetails from '../components/core/AboutPage/CareersPage/AllJobsPage/JobDetails';
import { setSelectedJob } from '../slices/jobsSlice';
import { fetchAllJobs } from '../services/operations/jobOpeningAPI';

const AllJobs = () => {
  const dispatch = useDispatch();
  const selectedJob = useSelector((state) => state.jobs?.selectedJob || null);
  // console.log(selectedJob);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { touched },
  } = useForm({
    defaultValues: {
      jobTitle: '',
      location: '',
    },
  });

  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onSubmit = (data) => {
    const { jobTitle, location } = data;
    fetchOpenings(jobTitle, location, 1); // Call with page 1 on submit
  };

  const handleBackToJobList = () => {
    dispatch(setSelectedJob(null));
  };

  const fetchOpenings = async (jobTitle, location, page = 1) => {
    try {
      const response = await fetchAllJobs(jobTitle, location, page);
      if (response) {
        setJobs(response.jobs); // Set the jobs in state
        setTotalPages(response.totalPages || 1); // Set the total pages for pagination
      }
    } catch (error) {
      console.error('Error fetching job openings:', error);
    }
  };

  useEffect(() => {
    fetchOpenings('', '', 1);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchOpenings('', '', page); // Fetch data for the selected page
  };

  return (
    <div>
      <section className="flex w-full items-center justify-center bg-blue-100">
        <div className="my-12 flex items-center justify-center bg-white p-4">
          {/* Search Form */}
          <JobSearchForm
            formName={'allJobs'}
            formStyle={
              'flex justify-center items-center w-full flex-wrap gap-4 p-4'
            }
            fieldStyle={'border-none p-2 text-base outline-none'}
            inputContainerStyle={'flex items-center justify-between'}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            btnStyle={
              'bg-blue-500 px-4 h-12 font-semibold text-white hover:bg-blue-600'
            }
          />
        </div>
      </section>

      <section className="my-12 p-2">
        {selectedJob ? (
          <div>
            <button
              onClick={handleBackToJobList}
              className="mb-4 rounded bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
            >
              Back to Job List
            </button>
            <JobDetails job={selectedJob} />
          </div>
        ) : (
          <>
            <h2 className="text-center text-xl font-semibold">
              Browse Open Positions
            </h2>
            <div className="mt-4 bg-white p-4">
              {loading ? (
                <p className="text-center text-3xl text-blue-600">
                  Vacancy coming soon...
                </p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : jobs.length === 0 ? (
                <p className="text-center text-blue-600">
                  No jobs found. Please try a different search.
                </p>
              ) : (
                <PaginatedJobList
                  jobs={jobs}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default AllJobs;
