import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const customerApi = createApi({
    reducerPath: "customerApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api"}),
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({
        getCustomers: builder.query({
            query: () => "/customers",
        }),
        getCustomerDetails: builder.query({
            query: (id) => `/customers/${id}`,
        }),
        getCustomerImg: builder.query({
            query: (id) => `/customers/${id}/image`,
        }),
        getCustomerPayments: builder.query({
            query: (id) => `/customers/${id}/payments_history`,
        }),
        getCustomerClothes: builder.query({
            query: (id) => `/customers/${id}/clothes`,
        }),
        createCustomer: builder.mutation({
            query: (newCustomerData) => ({
                url: "/customers",
                method: "POST",
                body: newCustomerData,
            }),
        }),
        updateCustomer: builder.mutation({
            query: ({ id, ...updatedFields }) => ({
                url: `/customers/${id}`,
                method: "PUT",
                body: updatedFields,
            }),
        }),
        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: `/customers/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

//Hook
export const { useGetCustomersQuery, useGetCustomerDetailsQuery, useGetCustomerImgQuery, useGetCustomerPaymentsQuery, useGetCustomerClothesQuery, useCreateCustomerMutation, useUpdateCustomerMutation, useDeleteCustomerMutation } = customerApi;