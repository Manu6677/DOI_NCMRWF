import { createSlice } from '@reduxjs/toolkit';

const defaultLanguage = {
  locale: 'en',
  label: 'English',
};

const initialState = {
  language: localStorage.getItem('language')
    ? JSON.parse(localStorage.getItem('language'))
    : defaultLanguage, // Default language object
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('language', JSON.stringify(state.language));
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
