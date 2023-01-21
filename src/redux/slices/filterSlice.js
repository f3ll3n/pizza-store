import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
  currentPage: 1,
  sort: {
    name: "полярности",
    sortProperty: "rating",
    index: 0,
  },
  search: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.currentPage = 1;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setSearchValue: (state, action) => {
      state.search = action.payload;
      state.category = 0;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategory, setSort, setSearchValue, setCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
