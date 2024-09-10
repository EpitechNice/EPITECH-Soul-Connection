import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./api/authApi";
import { employeeApi } from "./api/employeeApi.js";
import { tipApi } from "./api/tipApi.js";


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tipApi.reducerPath]: tipApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      tipApi.middleware,
      authApi.middleware,
    ]),
});

// export const store = configureStore({
//   reducer: {
    // auth: userReducer,
    // [employeeApi.reducerPath]: employeeApi.reducer,
  // },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat([
  //     employeeApi.middleware,
  //   ]),
// });