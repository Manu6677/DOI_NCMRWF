import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  totalPages: 1,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    resetPagination: (state) => {
      state.page = 1;
      state.totalPages = 1;
    },
  },
});

export const { setPage, setTotalPages, resetPagination } =
  paginationSlice.actions;
export default paginationSlice.reducer;
