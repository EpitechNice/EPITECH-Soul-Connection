import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tipApi = createApi({
    reducerPath: "tipApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api"}),
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({
        getTips: builder.query({
            query: () => "/tips",
        }),
        createTip: builder.mutation({
            query: (newTipData) => ({
                url: "/tips",
                method: "POST",
                body: newTipData,
            }),
        }),
        updateTip: builder.mutation({
          query: ({ id, ...updatedFields }) => ({
            url: `/tips/${id}`,
            method: "PUT",
            body: updatedFields,
          }),
        }),
        deleteTip: builder.mutation({
          query: (id) => ({
            url: `/tips/${id}`,
            method: "DELETE",
          }),
        }),
    }),
});

//Hook
export const { useGetTipsQuery, useCreateTipMutation, useUpdateTipMutation, useDeleteTipMutation } = tipApi;