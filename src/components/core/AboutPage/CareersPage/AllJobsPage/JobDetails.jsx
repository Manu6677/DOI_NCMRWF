import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { IoLocation } from 'react-icons/io5';
import ApplyJobForm from '../ApplyJobForm/ApplyJobForm';
import { applyForJob } from '../../../../../services/operations/jobOpeningAPI';

const JobDetails = () => {
  const location = useLocation();
  const selectedJob = useSelector((state) => state.openings.selectedJob);
  console.log(selectedJob);

  // Use job from router state if available, otherwise fallback to Redux
  const job = location.state?.job || selectedJob;

  const handleFormSubmit = async (data, reset) => {
    console.log(data);
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      qualification: data.qualification,
      jobId: job.id,
      age: data.age,
    };
    const result = await applyForJob(formData);

    if (result) {
      console.log('Application submitted successfully:', result);
      reset();
    } else {
      console.error('Failed to submit application');
    }
  };

  if (!job) {
    return <p className="text-center ring-richblack-500">No job selected.</p>;
  }

  return (
    <div className="mt-16 flex min-h-screen items-start justify-center space-x-14 px-6">
      {/* Job post details */}
      <div className="w-full max-w-3xl py-12 pr-6">
        <h2 className="mb-4 text-4xl font-bold leading-tight ring-richblack-800">
          {job.title}
        </h2>
        <p className="mb-1 flex items-center text-lg ring-richblack-600">
          <IoLocation className="text-orange-600" />
          <span className="ml-2 font-semibold">{job.location}</span>
        </p>
        <p className="mb-6 text-xl ring-richblack-600">{job.description}</p>
        <p className="text-lg font-medium ring-richblack-600">
          <strong>Salary:</strong> {job.salary || 'Not disclosed'}
        </p>
      </div>

      {/* Application form for job */}
      <ApplyJobForm onSubmit={handleFormSubmit} jobId={selectedJob} />
    </div>
  );
};

export default JobDetails;
