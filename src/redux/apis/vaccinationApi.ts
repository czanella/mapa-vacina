import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IVaccinePoint } from '../../types';

export const vaccinationApi = createApi({
  reducerPath: 'vaccinationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_VACCINATION_API ?? '',
  }),
  endpoints: (builder) => ({
    getVaccinationStatuses: builder.query<IVaccinePoint[], string>({
      query: () => '/vaccineStatus',
    }),
  }),
});

export const { useGetVaccinationStatusesQuery } = vaccinationApi;
