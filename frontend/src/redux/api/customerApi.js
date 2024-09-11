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
    })
})

//Hook
export const { useGetCustomersQuery, useGetCustomerDetailsQuery, useGetCustomerImgQuery } = customerApi;