import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  totalCount: 0,
};

const allEmployeesSlice = createSlice({
  name: 'allEmployees',
  initialState,
  reducers: {
    allListOfEmployees: (state, action) => {
      // console.log('Redux Action Payload:', action.payload);
      // console.log([...state.data, ...action.payload.data]);

      return {
        ...state,
        data: [
          ...state.data,
          ...action.payload.data.filter(
            (newEmp) =>
              !state.data.some((existingEmp) => existingEmp.id === newEmp.id)
          ),
        ],

        totalCount: action.payload.totalCount,
      };
    },
  },
});

export const { allListOfEmployees } = allEmployeesSlice.actions;
export default allEmployeesSlice.reducer;
