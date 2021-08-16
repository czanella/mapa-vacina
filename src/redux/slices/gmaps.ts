import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface IGmaps {
  isLoaded: boolean;
  error: boolean;
}

const initialState: IGmaps = {
  isLoaded: false,
  error: false,
};

export const gmapsSlice = createSlice({
  name: 'gmaps',
  initialState,
  reducers: {
    gmapsApiLoaded: (state) => {
      state.isLoaded = true;
    },
    gmapsApiError: (state) => {
      state.error = true;
    },
  },
});

export const { gmapsApiLoaded, gmapsApiError } = gmapsSlice.actions;

export const isGmapsApiLoadedSelector = (state: RootState) =>
  state.gmaps.isLoaded;

export const gmapsApiErrorSelector = (state: RootState) => state.gmaps.error;

export default gmapsSlice.reducer;
