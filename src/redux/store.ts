import { configureStore } from '@reduxjs/toolkit';
import * as reducers from './slices';
import * as apis from './apis';
import { STORAGE_KEY } from './utils/storedReducer';

const preloadedState =
  typeof window !== 'undefined'
    ? JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}')
    : {};

export const store = configureStore({
  reducer: {
    ...reducers,
    [apis.vaccinationApi.reducerPath]: apis.vaccinationApi.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
