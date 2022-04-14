import { configureStore } from "@reduxjs/toolkit";
import pdfInfoReducer from "../features/pdfInfo/pdfInfoSlice";
import serviceWorkerReducer from "../features/serviceWorker/serviceWorkerSlice";

export const store = configureStore({
  reducer: {
    pdfList: pdfInfoReducer,
    serviceWorker: serviceWorkerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
