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
      state.totalPrice += action.payload.price;
      state.items.push(action.payload);
    },
    iterateItem: (state, action) => {
      state.totalPrice += action.payload.price;
      state.items[action.payload.index].price += action.payload.price;
      state.items[action.payload.index].value += 1;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(obj => obj.id !== action.payload[0]);
    },
    clearItems: state => {
      state.items = [];
    },
  },
});

export const { addItem, iterateItem, removeItem, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
