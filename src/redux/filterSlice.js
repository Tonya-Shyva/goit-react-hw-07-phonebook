import { createSlice } from '@reduxjs/toolkit';

const filterInitialState = { value: '' };
const filterSlice = createSlice({
  name: 'filters',
  initialState: filterInitialState,
  reducers: {
    setFilter(state, action) {
      state.value = action.payload;
    },
  },
});
// Експортуємо генератори екшенів та редюсер
export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
