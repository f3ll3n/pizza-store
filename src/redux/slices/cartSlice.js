import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

//TODO: Function with check on double by id
// const checkOnDublicate = (items, id) => {
//   if (!items.length) {
//     return false;
//   }
//   const dublicate = [];
//   items.forEach((item, index) => {
//     console.log(item.id.includes(id));
//     //  ? dublicate.push(index, item) : dublicate.push(false);
//   });
//   return dublicate.length === 2 ? dublicate : false;
// };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      action.payload.id =
        action.payload.title
          .split("")
          .map(char => char.charCodeAt(0))
          .join("") +
        "-" +
        action.payload.size;
      // if (checkOnDublicate(state.items, action.payload.id)) {
      // console.log("Содержит");
      // } else {
      console.log("кликнуто");
      state.totalPrice += action.payload.price;
      state.items.push(action.payload);
      // }
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
export const { addItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
