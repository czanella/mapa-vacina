import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface IAboutModalState {
  isOpen: boolean;
}

const initialState: IAboutModalState = {
  isOpen: false,
};

export const aboutModalSlice = createSlice({
  name: 'aboutModal',
  initialState,
  reducers: {
    openAboutModal: (state) => {
      state.isOpen = true;
    },
    closeAboutModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openAboutModal, closeAboutModal } = aboutModalSlice.actions;

export const isAboutModalOpenSelector = (state: RootState) =>
  state.aboutModal.isOpen;

export default aboutModalSlice.reducer;
