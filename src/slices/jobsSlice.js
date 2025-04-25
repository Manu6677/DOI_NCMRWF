import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedJob: null,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
  },
});

export const { setSelectedJob } = jobSlice.actions;

export default jobSlice.reducer;
