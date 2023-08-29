import { createSlice } from "@reduxjs/toolkit";

// Creating Slice
export const warehouseSlice = createSlice({
  name: "warehouse",
  initialState: {},
  reducers: {
    setWarehouse: (warehouse, action) => ({ ...action.payload }),
  },
});

// Export Actions
export const { setWarehouse } = warehouseSlice.actions;

// Export Selector
export const selectWarehouse = (state) => state.state.warehouse;

// Export Reducer as Default
export default warehouseSlice.reducer;
