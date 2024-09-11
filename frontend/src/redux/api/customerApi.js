import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const customerApi = createApi({
    reducerPath: "customerApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api"}),
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({
        getCustomers: builder.query({
            query: () => "/customers",
        }),
        
    })
})

//Hook
export const { useGetCustomersQuery } = customerApi;