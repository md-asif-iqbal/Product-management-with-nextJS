// file: store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { api } from "./services/api";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: { auth: authReducer, [api.reducerPath]: api.reducer },
  middleware: (gDM) => gDM().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
