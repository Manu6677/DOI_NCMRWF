// src/store/slices/forecastSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedModel: null, // Initially no model is selected
};

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    setSelectedModel: (state, action) => {
      state.selectedModel = action.payload;
    },
  },
});

export const { setSelectedModel } = forecastSlice.actions;

export default forecastSlice.reducer;
