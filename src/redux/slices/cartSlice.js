import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(obj => obj.id !== action.payload);
    },
    clearItems: state => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
