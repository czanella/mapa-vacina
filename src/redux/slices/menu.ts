import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface IMenuState {
  isOpen: boolean;
}

const initialState: IMenuState = {
  isOpen: false,
};

export const menuSlice = createSlice({
  name: 'menu',
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

export const isMenuOpenSelector = (state: RootState) => state.menu.isOpen;

export default menuSlice.reducer;
