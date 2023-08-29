import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const reducers = combineReducers({});

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
