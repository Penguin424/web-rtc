import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../stores/GlobalSlice";

export const globalStore = configureStore({
  reducer: {
    global: globalReducer,
  },
});
