import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./api/authApi";
import { employeeApi } from "./api/employeeApi.js";

export const store = configureStore({
  reducer: {
    // auth: userReducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      employeeApi.middleware,
    ]),
});