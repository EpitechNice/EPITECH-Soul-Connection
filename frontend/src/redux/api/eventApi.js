import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventApi = createApi({
    reducerPath: "eventApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
      getEvents: builder.query({
        query: (params) => ({
          url: "/events",
        }),
      }),
      getEventDetails: builder.query({
        query: (id) => `/events/${id}`,
      }),
    }),
  });

export const { useGetEventsQuery, useGetEventDetailsQuery } = eventApi;
