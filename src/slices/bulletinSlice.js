import { createSlice } from '@reduxjs/toolkit';

export const bulletinSlice = createSlice({
  name: 'bulletin',
  initialState: {
    open: false,
    data: [],
  },
  reducers: {
    toggleBulletin: (state) => {
      state.open = !state.open;
    },
    openBulletin: (state) => {
      state.open = true;
    },
    closeBulletin: (state) => {
      state.open = false;
    },
    setBulletinData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { toggleBulletin, openBulletin, closeBulletin, setBulletinData } =
  bulletinSlice.actions;

export const selectBulletinOpen = (state) => state.bulletin.open;
export const selectBulletinData = (state) => state.bulletin.data;

export default bulletinSlice.reducer;
