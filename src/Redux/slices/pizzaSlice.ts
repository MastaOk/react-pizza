import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type FetchPizzaArgs = {
  category:string, search:string, sortType:string, currentPage:number
}

export const fetchPizzas = createAsyncThunk<Pizza[],FetchPizzaArgs>(
  "pizza/fetchPizzas",
  async (params) => {
    const { category, search, sortType, currentPage } = params;
    const { data } =
      await axios.get(`https://64ffb07218c34dee0cd3e71c.mockapi.io/items?page=${currentPage}${search}&limit=10&${category}
&sortBy=${sortType}&order=desc`);
    return data;
  }
);

export type Pizza = {
  id:string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

interface PizzaSliceState {
  items:Pizza[] ;
  status:'loading'|'succsess'|'error';
}

export const initialState:PizzaSliceState = {
  items: [],
  status: "loading",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succsess";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const selectPizza = (state:RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
