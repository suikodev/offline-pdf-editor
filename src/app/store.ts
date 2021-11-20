import { configureStore } from "@reduxjs/toolkit";
import pdfInfoReducer from "../features/pdfInfo/pdfInfoSlice";

export const store = configureStore({
  reducer: {
    pdfList: pdfInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
