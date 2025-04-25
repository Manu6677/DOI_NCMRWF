import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  specialProducts: [],
  selectedSpecialProduct: null,
  selectedSpecialProductModel: null,
  selectedSpecialProductItem: null,
};

const specialProductsSlice = createSlice({
  name: 'specialProducts',
  initialState,
  reducers: {
    setSpecialProducts: (state, action) => {
      state.specialProducts = action.payload;
    },
    setSelectedSpecialProduct: (state, action) => {
      state.selectedSpecialProduct = action.payload;
    },
    clearSelectedSpecialProduct: (state) => {
      state.selectedSpecialProduct = null;
      state.selectedSpecialProductItem = null; // Clear selected item as well
    },
    setSelectedSpecialProductModel: (state, action) => {
      state.selectedSpecialProductModel = action.payload;
    },
    clearSelectedSpecialProductModel: (state) => {
      state.selectedSpecialProductModel = null;
    },
    setSelectedSpecialProductItem: (state, action) => {
      state.selectedSpecialProductItem = action.payload; // Set the selected item from array
    },
    clearSelectedSpecialProductItem: (state) => {
      state.selectedSpecialProductItem = null; // Clear the selected item
    },
  },
});

export const {
  setSpecialProducts,
  setSelectedSpecialProduct,
  clearSelectedSpecialProduct,
  setSelectedSpecialProductModel,
  clearSelectedSpecialProductModel,
  setSelectedSpecialProductItem,
  clearSelectedSpecialProductItem,
} = specialProductsSlice.actions;

export default specialProductsSlice.reducer;
