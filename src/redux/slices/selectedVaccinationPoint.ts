import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface ISelectedVaccinationPoint {
  selectedIndex: number | null;
}

export const initialState: ISelectedVaccinationPoint = {
  selectedIndex: null,
};

export const selectedVaccinationPoint = createSlice({
  name: 'selectedVaccinationPoint',
  initialState,
  reducers: {
    selectVaccinationPoint: (state, action: PayloadAction<number>) => {
      state.selectedIndex = action.payload;
    },
    clearVaccinationPoint: (state) => {
      state.selectedIndex = null;
    },
  },
});

export const { selectVaccinationPoint, clearVaccinationPoint } =
  selectedVaccinationPoint.actions;

export const vaccinationPointSelector = (state: RootState) =>
  state.selectedVaccinationPoint.selectedIndex;

export default selectedVaccinationPoint.reducer;
