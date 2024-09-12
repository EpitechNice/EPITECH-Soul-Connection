import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/userSlice";

import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi.js";
import { employeeApi } from "./api/employeeApi.js";
import { customerApi } from "./api/customerApi.js";
import { tipApi } from "./api/tipApi.js";
import { clothingApi } from "./api/clothingApi.js";
import { eventApi } from "./api/eventApi.js";
import { encounterApi } from "./api/encounterApi.js";


export const store = configureStore({
  reducer: {
    auth: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [tipApi.reducerPath]: tipApi.reducer,
    [clothingApi.reducerPath]: clothingApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [encounterApi.reducerPath]: encounterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      employeeApi.middleware,
      customerApi.middleware,
      tipApi.middleware,
      clothingApi.middleware,
      eventApi.middleware,
      encounterApi.middleware,
    ]),
});
