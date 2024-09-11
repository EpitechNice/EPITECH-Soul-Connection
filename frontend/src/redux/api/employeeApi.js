import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApi = createApi({
    reducerPath: "employeeApi",
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
      getEmployeeImg: builder.query({
        query: (id) => `/employees/${id}/image`,
      }),
      createEmployee: builder.mutation({
        query: (newEmployeeData) => ({
          url: "/employees",
          method: "POST",
          body: newEmployeeData,
        }),
      }),
      updateEmployee: builder.mutation({
        query: ({ id, ...updatedFields }) => ({
          url: `/employees/${id}`,
          method: "PUT",
          body: updatedFields,
        }),
      }),
      deleteEmployee: builder.mutation({
        query: (id) => ({
          url: `/employees/${id}`,
          method: "DELETE",
        }),
      }),
    }),
  });

export const { useGetEmployeesQuery, useGetEmployeeDetailsQuery, useGetEmployeeImgQuery, useCreateEmployeeMutation, useUpdateEmployeeMutation, useDeleteEmployeeMutation } = employeeApi;
