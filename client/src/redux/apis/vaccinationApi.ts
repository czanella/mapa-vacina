import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';

const vaccinationBaseQuery = (): BaseQueryFn<
  { bodyData: Record<string, string> },
  Object[],
  Error
> => async ({ bodyData }) => {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

    const body = new URLSearchParams();
    Object.keys(bodyData).forEach(key => body.append(key, bodyData[key]))

    const requestOptions = {
      method: 'POST',
      headers,
      body,
    };

    console.log("HERE WE GO!")

    const response = await fetch(
      process.env.REACT_APP_VACCINATION_POINTS_ENDPOINT as string,
      requestOptions,
    );

    console.log("GOT RESPONSE!");

    const data = await response.json();

    console.log("GOT JSON!");

    return { data };
  } catch(error) {
    console.error("ONOES!", error);
    return { error };
  }
};

export const vaccinationApi = createApi({
  reducerPath: 'vaccinationApi',
  baseQuery: vaccinationBaseQuery(),
  endpoints: (builder) => ({
    getVaccinationStatuses: builder.query({
      query: () => ({ bodyData: { dados: 'dados' } }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetVaccinationStatusesQuery } = vaccinationApi;
