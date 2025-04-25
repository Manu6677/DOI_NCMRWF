import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modelProducts: [],
  selectedProduct: null,
  error: null,
  forecastHours: [],
  selectedForecastHour: 0,
};

const modelProductsSlice = createSlice({
  name: 'modelProducts',
  initialState,
  reducers: {
    setModelProducts: (state, action) => {
      state.modelProducts = action.payload;
      state.error = null;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearModelProducts: (state) => {
      state.modelProducts = [];
      state.selectedProduct = null;
      state.error = null;
    },
    setForecastModelHours: (state, action) => {
      state.forecastHours = action.payload;
      state.selectedForecastHour = action.payload[0] || null;
    },
    setSelectedForecastModelHour: (state, action) => {
      state.selectedForecastHour = action.payload;
    },
  },
});

export const {
  setModelProducts,
  setSelectedProduct,
  setError,
  clearModelProducts,
  setForecastModelHours,
  setSelectedForecastModelHour,
} = modelProductsSlice.actions;

export default modelProductsSlice.reducer;
