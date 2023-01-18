import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  pizzasCount: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find(obj => obj.id === action.payload.id);
      if (findItem) {
        findItem.value++;
        findItem.price += action.payload.price;
      } else {
        state.items.push(action.payload);
      }
      state.pizzasCount += 1;
      state.totalPrice += action.payload.price;
    },
    incrementItem: (state, action) => {
      state.totalPrice += action.payload.price;
      state.items[action.payload.index].price += action.payload.price;
      state.items[action.payload.index].value += 1;
      state.pizzasCount += 1;
    },
    decrementItem: (state, action) => {
      state.totalPrice -= action.payload.price;
      state.items[action.payload.index].price -= action.payload.price;
      state.items[action.payload.index].value -= 1;
      state.pizzasCount -= 1;
    },
    removeItem: (state, action) => {
      state.totalPrice -= state.items[action.payload.index].price;
      state.pizzasCount -= state.items[action.payload.index].value;
      state.items = state.items.filter(obj => obj.id !== action.payload.id);
    },
    clearItems: state => {
      state.items = [];
      state.totalPrice = 0;
      state.pizzasCount = 0;
    },
  },
});

export const { addItem, incrementItem, decrementItem, removeItem, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
