import { configureStore } from '@reduxjs/toolkit';
import * as reducers from './slices';

export const store = configureStore({
  reducer: reducers,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
