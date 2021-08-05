import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface IGmaps {
  isLoaded: boolean;
}

const initialState: IGmaps = {
  isLoaded: false,
};

export const gmapsSlice = createSlice({
  name: 'gmaps',
  initialState,
  reducers: {
    gmapsApiLoaded: (state) => {
      state.isLoaded = true;
    },
  },
});

export const { gmapsApiLoaded } = gmapsSlice.actions;

export const isGmapsApiLoaded = (state: RootState) => state.gmaps.isLoaded;

export default gmapsSlice.reducer;
