import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./api/authApi";
import { employeeApi } from "./api/employeeApi.js";
import { tipApi } from "./api/tipApi";

export const store = configureStore({
  reducer: {
    // auth: userReducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [tipApi.reducerPath]: tipApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      employeeApi.middleware,
      tipApi.middleware,
    ]),
});