import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import warehouseReducer from "./warehouse";

const reducers = combineReducers({
  warehouse: warehouseReducer,
});

export default configureStore({
  reducer: {
    state: reducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
