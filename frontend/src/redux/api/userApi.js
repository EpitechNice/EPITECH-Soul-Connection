import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
      getEmployees: builder.query({
        query: (params) => ({
          url: "/employees",
        }),
      }),
      getEmployeeDetails: builder.query({
        query: (id) => `/employees/${id}`,
      }),
    }),
  });

export const { useGetEmployeesQuery, useGetEmployeeDetailsQuery } = userApi;
