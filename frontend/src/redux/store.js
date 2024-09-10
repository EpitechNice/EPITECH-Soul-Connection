import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/userSlice";

import { authApi } from "./api/authApi";
import { employeeApi } from "./api/employeeApi.js";
import { tipApi } from "./api/tipApi.js";
import { userApi } from "./api/userApi.js";


export const store = configureStore({
  reducer: {
    auth: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [tipApi.reducerPath]: tipApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      tipApi.middleware,
      userApi.middleware,
      authApi.middleware,
      employeeApi.middleware,
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