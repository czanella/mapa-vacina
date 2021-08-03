import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const vaccinationApi = createApi({
  reducerPath: 'vaccinationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_VACCINATION_API ?? '',
  }),
  endpoints: (builder) => ({
    getVaccinationStatuses: builder.query({
      query: () => '/vaccineStatus',
    }),
  }),
});

export const { useGetVaccinationStatusesQuery } = vaccinationApi;
