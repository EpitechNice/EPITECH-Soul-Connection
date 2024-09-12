import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const encounterApi = createApi({
    reducerPath: "encounterApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
      getEncounters: builder.query({
        query: (params) => ({
          url: "/encounters",
        }),
      }),
      getEncounterDetails: builder.query({
        query: (id) => `/encounters/${id}`,
      }),
      createEncounter: builder.mutation({
        query: (newEncounterData) => ({
            url: "/encounters",
            method: "POST",
            body: newEncounterData,
        }),
      }),
      updateEncounter: builder.mutation({
        query: ({ id, ...updatedFields }) => ({
          url: `/encounters/${id}`,
          method: "PUT",
          body: updatedFields,
        }),
      }),
      deleteEncounter: builder.mutation({
        query: (id) => ({
          url: `/encounters/${id}`,
          method: "DELETE",
        }),
      }),
    }),
  });

export const { useGetEncountersQuery, useGetEncounterDetailsQuery, useCreateEncounterMutation, useUpdateEncounterMutation, useDeleteEncounterMutation } = encounterApi;
