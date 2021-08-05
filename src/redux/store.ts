import { configureStore } from '@reduxjs/toolkit';
import * as reducers from './slices';
import * as apis from './apis';

export const store = configureStore({
  reducer: {
    ...reducers,
    [apis.vaccinationApi.reducerPath]: apis.vaccinationApi.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
