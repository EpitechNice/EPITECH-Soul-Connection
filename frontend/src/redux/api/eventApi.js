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
      createEvent: builder.mutation({
        query: (newEventData) => ({
            url: "/events",
            method: "POST",
            body: newEventData,
        }),
      }),
      updateEvent: builder.mutation({
        query: ({ id, ...updatedFields }) => ({
          url: `/events/${id}`,
          method: "PUT",
          body: updatedFields,
        }),
      }),
      deleteEvent: builder.mutation({
        query: (id) => ({
          url: `/events/${id}`,
          method: "DELETE",
        }),
      }),
    }),
  });

export const { useGetEventsQuery, useGetEventDetailsQuery, useCreateEventMutation, useUpdateEventMutation, useDeleteEventMutation } = eventApi;
