import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tipApi = createApi({
    reducerPath: "tipApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api"}),
    endpoints: (builder) => ({
        getTips: builder.query({
            query: () => "/tips",
        })
    })
})

//Hook
export const { useGetTipsQuery } = tipApi;