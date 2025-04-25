import { apiConnector } from '../apiConnector';
import { allJobsOpeningsEndpoints, jobApplicationEndpoints } from '../apis';
import { toast } from 'react-hot-toast';

const { GET_ALL_JOBS } = allJobsOpeningsEndpoints;
const { APPLY_JOB } = jobApplicationEndpoints;
const BASE_URL = process.env.REACT_APP_BASE_URL;
export const fetchAllJobs = async (jobTitle, location, page = 1) => {
  const toastId = toast.loading('Loading job openings...');
  let result = [];
  let totalPages = 0;

  try {
    const params = new URLSearchParams();
    if (jobTitle) params.append('jobTitle', jobTitle);
    if (location) params.append('location', location);
    params.append('page', page);

    const response = await apiConnector(
      'GET',
      `${GET_ALL_JOBS}?${params.toString()}`
    );

    console.log(
      'Fetching job openings from:',
      `${GET_ALL_JOBS}?${params.toString()}`
    );

    if (response?.data?.success) {
      result = response.data.jobs || [];
      totalPages = response.data.totalPages || 1;
    } else {
      toast.error('Failed to fetch job openings');
    }
  } catch (error) {
    toast.error('Failed to load job openings');
  } finally {
    toast.dismiss(toastId);
  }

  return { jobs: result, totalPages };
};

export const applyForJob = async (formData) => {
  const toastId = toast.loading('Submitting your application...');

  try {
    const response = await apiConnector(
      'POST',
      APPLY_JOB, // Use the endpoint from apis.js
      formData, // Send the form data
      {
        'Content-Type': 'application/json',
      }
    );

    if (response?.data?.message === 'Application submitted successfully') {
      toast.success('Application submitted successfully');
      return response.data;
    } else {
      toast.error('Failed to submit application');
      return null;
    }
  } catch (error) {
    toast.error('Failed to submit application');
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};
