  import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  export const clothingApi = createApi({
      reducerPath: "clothingApi",
      baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
      endpoints: (builder) => ({
        getClothes: builder.query({
          query: (params) => ({
            url: "/clothes",
          }),
        }),
        getClothingImg: builder.query({
          query: (id) => `/clothes/${id}/image`,
        }),
        createClothing: builder.mutation({
          query: (newClothingData) => ({
            url: "/clothes",
            method: "POST",
            body: newClothingData,
          }),
        }),
        updateClothing: builder.mutation({
          query: ({ id, ...updatedFields }) => ({
            url: `/clothes/${id}`,
            method: "PUT",
            body: updatedFields,
          }),
        }),
        deleteClothing: builder.mutation({
          query: (id) => ({
            url: `/clothes/${id}`,
            method: "DELETE",
          }),
        }),
      }),
    });

  export const { useGetClothesQuery, useGetClothingImgQuery, useCreateClothingMutation, useUpdateClothingMutation, useDeleteClothingMutation } = clothingApi;
