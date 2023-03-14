import { createSlice } from "@reduxjs/toolkit";

type TSort = {
  name: string;
  sortProperty: "rating" | "title" | "price" | "-rating" | "-price";
  index: number;
};

interface IFilterState {
  category: number;
  sort: TSort;
  search: string;
}

const initialState: IFilterState = {
  category: 0,
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
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setSearchValue: (state, action) => {
      state.search = action.payload;
      state.category = 0;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { setCategory, setSort, setSearchValue} =
  filterSlice.actions;

export default filterSlice.reducer;
