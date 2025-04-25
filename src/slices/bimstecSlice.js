import { createSlice } from '@reduxjs/toolkit';

const now = new Date();
now.setUTCDate(now.getUTCDate() - 1); // Previous day
const utcDate = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD

const initialState = {
  selectedBimstecProductId: null,
  bimstecForecastUrl: null,
  bimstecForecastUrlsByHour: {}, // ✅ ADD THIS
  bimstecForecastHours: [0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240],
  selectedBimstecForecastHour: 24,
  bimstecForecastUrls: [],
  bimstecProductsPage: 1,
  totalBimstecProductsPages: 1,
  selectedBimstecUTC: {
    label: `${utcDate} (00 UTC)`,
    value: `${utcDate}/00`,
  },
};

const bimstecSlice = createSlice({
  name: 'bimstecProducts',
  initialState,
  reducers: {
    setBimstecProductId: (state, action) => {
      state.selectedBimstecProductId = action.payload;
    },
    setBimstecForecastUrls: (state, action) => {
      state.bimstecForecastUrls = action.payload; // Store all URLs
    },
    setBimstecForecastUrl: (state, action) => {
      state.bimstecForecastUrl = action.payload;
    },
    setBimstecForecastUrlsByHour: (state, action) => {
      state.bimstecForecastUrlsByHour = action.payload;
    },
    setBimstecForecastHours: (state, action) => {
      state.bimstecForecastHours = action.payload;
      state.selectedBimstecForecastHour = action.payload[0] || null;
    },
    setSelectedBimstecForecastHour: (state, action) => {
      state.selectedBimstecForecastHour = action.payload;
    },
    setBimstecProductsPage: (state, action) => {
      state.bimstecProductsPage = action.payload;
    },
    setTotalBimstecProductsPages: (state, action) => {
      state.totalBimstecProductsPages = action.payload;
    },
    // setSelectedBimstecUTC: (state, action) => {
    //   state.selectedBimstecUTC = action.payload;
    // },
    setSelectedBimstecUTC: (state, action) => {
      state.selectedBimstecUTC = { ...action.payload }; // ✅ Force new reference
    },
    resetBimstecPagination: (state) => {
      state.bimstecProductsPage = 1;
      state.totalBimstecProductsPages = 1;
    },
  },
});

export const {
  setBimstecProductId,
  setBimstecForecastUrls,
  setBimstecForecastUrl,
  setBimstecForecastUrlsByHour,
  setBimstecForecastHours,
  setSelectedBimstecForecastHour,
  setBimstecProductsPage,
  setTotalBimstecProductsPages,
  setSelectedBimstecUTC,
  resetBimstecPagination,
} = bimstecSlice.actions;

export default bimstecSlice.reducer;
