import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./api/authApi";
import { employeeApi } from "./api/employeeApi.js";
import { tipApi } from "./api/tipApi.js";
import { customerApi } from "./api/customerApi.js";
import { eventApi } from "./api/eventApi.js";


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tipApi.reducerPath]: tipApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      tipApi.middleware,
      employeeApi.middleware,
      authApi.middleware,
      customerApi.middleware,
      eventApi.middleware,
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