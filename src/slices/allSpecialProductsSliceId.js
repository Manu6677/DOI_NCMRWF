import { createSlice } from '@reduxjs/toolkit';

const now = new Date();
now.setUTCDate(now.getUTCDate() - 1); // Subtract one day to get the previous date
const utcDate = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD

const initialState = {
  selectedProductId: null,
  forecastUrl: null,
  specialForecastHours: [0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240],
  selectedSpecialForecastHour: 24,
  specialProductsPage: 1,
  totalSpecialProductsPages: 1,
  selectedSpecialProductsUTC: {
    label: `${utcDate} (00 UTC)`,
    value: `${utcDate}/00`,
  },
};

const allSpecialProductsId = createSlice({
  name: 'allSpecialProductsId',
  initialState,
  reducers: {
    setSpecialProductsId: (state, action) => {
      state.selectedProductId = action.payload;
    },
    setForecastUrl: (state, action) => {
      state.forecastUrl = action.payload;
    },
    setSpecialForecastHours: (state, action) => {
      state.specialForecastHours = action.payload;
      state.selectedSpecialForecastHour = action.payload[0] || null; // Default to first hour
    },
    setSelectedSpecialForecastHour: (state, action) => {
      state.selectedSpecialForecastHour = action.payload;
    },
    setSpecialProductsPage: (state, action) => {
      state.specialProductsPage = action.payload;
    },
    setTotalSpecialProductsPages: (state, action) => {
      state.totalSpecialProductsPages = action.payload;
    },
    setSelectedSpecialProductsUTC: (state, action) => {
      state.selectedSpecialProductsUTC = action.payload;
    },
    resetPagination: (state) => {
      state.specialProductsPage = 1;
      state.totalSpecialProductsPages = 1;
    },
  },
});

export const {
  setSpecialProductsId,
  setForecastUrl,
  setSpecialForecastHours,
  setSelectedSpecialForecastHour,
  setSpecialProductsPage,
  setTotalSpecialProductsPages,
  resetPagination,
  setSelectedSpecialProductsUTC,
} = allSpecialProductsId.actions;
export default allSpecialProductsId.reducer;
