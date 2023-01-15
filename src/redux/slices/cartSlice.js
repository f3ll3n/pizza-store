import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  pizzasValue: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.totalPrice += action.payload.price;
      state.pizzasValue += 1;
      state.items.push(action.payload);
    },
    incrementItem: (state, action) => {
      state.totalPrice += action.payload.price;
      state.items[action.payload.index].price += action.payload.price;
      state.items[action.payload.index].value += 1;
      state.pizzasValue += 1;
    },
    decrementItem: (state, action) => {
      state.totalPrice -= action.payload.price;
      state.items[action.payload.index].price -= action.payload.price;
      state.items[action.payload.index].value -= 1;
      state.pizzasValue -= 1;
    },
    removeItem: (state, action) => {
      state.totalPrice -= state.items[action.payload.index].price;
      state.pizzasValue -= state.items[action.payload.index].value;
      state.items = state.items.filter(obj => obj.id !== action.payload.id);
    },
    clearItems: state => {
      state.items = [];
    },
  },
});

export const { addItem, incrementItem, decrementItem, removeItem, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
