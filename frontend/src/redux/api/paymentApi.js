import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
      getPayments: builder.query({
        query: (params) => ({
          url: "/payments",
        }),
      }),
      getPaymentsByCustomer: builder.query({
        query: (id) => `/payments/customer/${id}`,
      }),
      createPayment: builder.mutation({
        query: (newPaymentData) => ({
            url: "/payments",
            method: "POST",
            body: newPaymentData,
        }),
      }),
      updatePayment: builder.mutation({
        query: ({ id, ...updatedFields }) => ({
          url: `/payments/${id}`,
          method: "PUT",
          body: updatedFields,
        }),
      }),
      deletePayment: builder.mutation({
        query: (id) => ({
          url: `/payments/${id}`,
          method: "DELETE",
        }),
      }),
    }),
  });

export const { useGetPaymentsQuery, useGetPaymentsByCustomerQuery, useCreatePaymentMutation, useUpdatePaymentMutation, useDeletePaymentMutation } = paymentApi;
