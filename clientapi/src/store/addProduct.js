import { createSlice } from "@reduxjs/toolkit";

// Creating Slice
export const addProductSlice = createSlice({
  name: "addProuct",
  initialState: {
    warehouseId: 0,
    productId: 0,
    quantity: 0,
    state: "",
    productName: "",
  },
  reducers: {
    setWarehouseId: (addProduct, action) => {
      addProduct.warehouseId = action.payload;
    },
    setProductId: (addProduct, action) => {
      addProduct.productId = action.payload;
    },
    setQuantity: (addProduct, action) => {
      addProduct.quantity = action.payload;
    },
    setState: (addProduct, action) => {
      addProduct.state = action.payload;
    },
  },
});

// Export Actions
export const { setWarehouseId, setProductId, setQuantity, setState } =
  addProductSlice.actions;

//Export Selector
export const selectAddProduct = (state) => state.state.addProduct;

//Export Reducer as Default
export default addProductSlice.reducer;
