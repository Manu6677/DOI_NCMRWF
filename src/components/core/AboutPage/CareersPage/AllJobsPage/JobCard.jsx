import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedJob } from '../../../../../slices/jobsSlice';

const JobCard = ({ job, containerStyles }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleJobClick = () => {
    dispatch(setSelectedJob(job));
    navigate('/job-detail', { state: { job } });
  };

  // console.log('job, containerStyles', job, containerStyles);
  return (
    <div
      className={`${containerStyles} cursor-pointer`}
      onClick={handleJobClick}
    >
      <div className="overflow-scroll p-4">
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <p className="mt-2 text-sm">{job.description}</p>
        <p className="mt-4 text-xs">{job.location}</p>
      </div>

      <button className="w-full rounded-b-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
