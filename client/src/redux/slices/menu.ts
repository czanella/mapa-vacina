import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface IMenuState {
  isOpen: boolean;
}

// Define the initial state using that type
const initialState: IMenuState = {
  isOpen: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openMenu: (state) => {
      state.isOpen = true;
    },
    closeMenu: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openMenu, closeMenu } = menuSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const isMenuOpenSelector = (state: RootState) => state.menu.isOpen;

export default menuSlice.reducer;
