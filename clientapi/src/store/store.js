import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import warehouseReducer from "./warehouse";
import addProductReducer from "./addProduct";

const reducers = combineReducers({
  warehouse: warehouseReducer,
  addProduct: addProductReducer,
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
