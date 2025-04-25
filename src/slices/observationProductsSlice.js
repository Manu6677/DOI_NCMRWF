import { createSlice } from '@reduxjs/toolkit';

const now = new Date();
now.setUTCDate(now.getUTCDate() - 1); // Previous date
const utcDate = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD

const initialState = {
  selectedObservationProductId: null,
  observationUrl: null,
  observationUTC: {
    label: `${utcDate} (00 UTC)`,
    value: `${utcDate}/00`,
  },
  observationPage: 1,
  totalObservationPages: 1,
};

const observationProductsSlice = createSlice({
  name: 'observationProducts',
  initialState,
  reducers: {
    setObservationProductId: (state, action) => {
      state.selectedObservationProductId = action.payload;
    },
    setObservationUrl: (state, action) => {
      state.observationUrl = action.payload;
    },
    setObservationUTC: (state, action) => {
      state.observationUTC = action.payload;
    },
    setObservationPage: (state, action) => {
      state.observationPage = action.payload;
    },
    setTotalObservationPages: (state, action) => {
      state.totalObservationPages = action.payload;
    },
    resetObservationPagination: (state) => {
      state.observationPage = 1;
      state.totalObservationPages = 1;
    },
  },
});

export const {
  setObservationProductId,
  setObservationUrl,
  setObservationUTC,
  setObservationPage,
  setTotalObservationPages,
  resetObservationPagination,
} = observationProductsSlice.actions;

export default observationProductsSlice.reducer;
