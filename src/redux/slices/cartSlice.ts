import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { RootState } from "../store";

export type CartItem = {
  title?: string;
  img?: string;
  price: number;
  size?: number;
  type?: number;
  value?: number;
  id?: string;
  index: number;
};

interface CartSliceState {
  totalPrice: number;
  pizzasCount: number;
  items: CartItem[];
}

const {items, totalPrice, totalValue} = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  pizzasCount: totalValue,
  items,
};



export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find(obj => obj.id === action.payload.id);

      if (findItem && findItem.value) {
        findItem.value++;
        findItem.price += action.payload.price;
      } else {
        state.items.push(action.payload);
      }
      state.pizzasCount += 1;
      state.totalPrice += action.payload.price;
    },

    decrementItem: (state, action: PayloadAction<CartItem>) => {
      state.totalPrice -= action.payload.price;
      const actionItem = state.items[action.payload.index];
      if (actionItem.value && actionItem) {
        state.items[action.payload.index].price -= action.payload.price;
        actionItem.value -= 1;
      }

      state.pizzasCount -= 1;
    },
    removeItem: (state, action) => {
      state.totalPrice -= state.items[action.payload.index].price;
      const actionItem = state.items[action.payload.index];
      if (actionItem.value && actionItem) {
        state.pizzasCount -= actionItem.value;
      }
      state.items = state.items.filter(obj => obj.id !== action.payload.id);
    },
    clearItems: state => {
      state.items = [];
      state.totalPrice = 0;
      state.pizzasCount = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { addItem, decrementItem, removeItem, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
