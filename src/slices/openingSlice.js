import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllJobs } from '../services/operations/jobOpeningAPI';

// Thunk to fetch jobs from the API
export const fetchJobsThunk = createAsyncThunk(
  'jobs/fetchAllJobs',
  async (_, thunkAPI) => {
    try {
      const response = await fetchAllJobs();
      return response.jobs || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const openingSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    selectedJob: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload || []; // ✅ Ensure jobs is an array
      })
      .addCase(fetchJobsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setSelectedJob } = openingSlice.actions;
export default openingSlice.reducer;
