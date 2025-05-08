import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vacancies: [],
};

const vacancySlice = createSlice({
  name: 'vacancy',
  initialState,
  reducers: {
    // This reducer sets the fetched vacancy data
    setVacancyData: (state, action) => {
      state.vacancies = action.payload;
    },
  },
});

// ✅ Export the action
export const { setVacancyData } = vacancySlice.actions;

// ✅ Selector to access vacancies from Redux store
export const selectVacancies = (state) => state.vacancy.vacancies;

// ✅ Export the reducer
export default vacancySlice.reducer;
