import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IVaccinationEquipment {
  equipamento: string;
  endereco: string;
  tipo_posto: string;
  status_fila: string;
  posicao: {
    lat: number;
    lng: number;
  };
}

export const vaccinationApi = createApi({
  reducerPath: 'vaccinationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_VACCINATION_API ?? '',
  }),
  endpoints: (builder) => ({
    getVaccinationStatuses: builder.query<IVaccinationEquipment[], string>({
      query: () => '/vaccineStatus',
    }),
  }),
});

export const { useGetVaccinationStatusesQuery } = vaccinationApi;
