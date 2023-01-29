import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type FetchPizzasArgs = Record<string, string>;

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: FetchPizzasArgs) => {
    const { currentPage, categoryBy, sortBy, orderBy, searchBy } = params;
    const { data } = await axios.get(
      `https://63ab80f2fdc006ba605f873f.mockapi.io/items?page=${currentPage}&limit=4&${categoryBy}&sortBy=${sortBy}&order=${orderBy}&${searchBy}`,
    );
    return data;
  },
);

type TPizzaItem = {
  category: number;
  description: string;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

interface IPizzaSliceState {
  items: TPizzaItem[];
  status: "loading" | "success" | "error";
}

const initialState: IPizzaSliceState = {
  items: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = "loading";
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
