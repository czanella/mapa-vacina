import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import storedReducer from '../utils/storedReducer';

interface ICookieConsentState {
  consentGiven: boolean | undefined;
}

const initialState: ICookieConsentState = {
  consentGiven: undefined,
};

export const cookieConsentSlice = createSlice({
  name: 'cookieConsent',
  initialState,
  reducers: {
    acceptCookies: (state) => {
      state.consentGiven = true;
    },
    rejectCookies: (state) => {
      state.consentGiven = false;
    },
  },
});

export const { acceptCookies, rejectCookies } = cookieConsentSlice.actions;

export const hasCookieConsentSelector = (state: RootState) =>
  state.cookieConsent.consentGiven;

export default storedReducer(cookieConsentSlice.reducer, 'cookieConsent');
