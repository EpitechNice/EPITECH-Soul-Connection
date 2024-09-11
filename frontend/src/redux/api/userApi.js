import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setUser, setLoading } from "../features/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getEmployeeProfile: builder.query({
      query: () => `/employees/me`,
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(false));
          console.log(error);
        }
      },
      providesTags: ["User"],
    }),
    // updateProfile: builder.mutation({
    //   query(body) {
    //     return {
    //       url: "/profile/update",
    //       method: "PUT",
    //       body,
    //     };
    //   },
    //   invalidatesTags: ["User"],
    // }),
    // uploadAvatar: builder.mutation({
    //   query(body) {
    //     return {
    //       url: "/profile/upload_avatar",
    //       method: "PUT",
    //       body,
    //     };
    //   },
    //   invalidatesTags: ["User"],
    // }),
    // updatePassword: builder.mutation({
    //   query(body) {
    //     return {
    //       url: "/password/update",
    //       method: "PUT",
    //       body,
    //     };
    //   },
    // }),
  }),
});

export const {useGetEmployeeProfileQuery } = userApi;
