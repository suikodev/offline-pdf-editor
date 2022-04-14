import { createSlice } from "@reduxjs/toolkit";

type ServiceWorkerState = {
  isUpdateAvailable: boolean;
};

const initialState: ServiceWorkerState = {
  isUpdateAvailable: false,
};

const serviceWorkerSlice = createSlice({
  name: "serviceWorker",
  initialState,
  reducers: {
    setIsUpdateAvailable: (state, action) => {
      state.isUpdateAvailable = action.payload;
    },
  },
});

export const { setIsUpdateAvailable } = serviceWorkerSlice.actions;

export default serviceWorkerSlice.reducer;
