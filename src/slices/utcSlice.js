import { createSlice } from '@reduxjs/toolkit';

// Get the previous date in UTC format
const getPreviousUTC = () => {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() - 1); // Subtract one day to get the previous date
  const utcDate = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  return { label: `${utcDate} (00 UTC)`, value: `${utcDate}/00` };
};

// Initial state with previous date
const initialState = {
  selectedUTC: getPreviousUTC(),
};

const utcSlice = createSlice({
  name: 'utc',
  initialState,
  reducers: {
    setSelectedUTC: (state, action) => {
      state.selectedUTC = action.payload;
    },
  },
});

// Export actions and reducer
export const { setSelectedUTC } = utcSlice.actions;
export default utcSlice.reducer;
