import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Sort = {
  name:string;
  sortProperty:string;
}

interface FilterSliceState{
  displayedSearchValue:string,
  searchValue:string,
  categoryId:string,
  currentPage:number,
  sort:Sort
}



export const initialState:FilterSliceState = {
  displayedSearchValue: "",
  searchValue: "",
  categoryId: "0",
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action:PayloadAction<string>) {
      state.categoryId = action.payload;
    },
    setSort(state, action:PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action:PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = (action.payload.categoryId);
      state.sort = action.payload.sort;
    },
    setSearchValue(state, action:PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setDisplayedSearchValue(state, action:PayloadAction<string>) {
      state.displayedSearchValue = action.payload;
    },
  },
});

export const selectFilter = (state:RootState) => state.filter;
export const selectSort = (state:RootState) => state.filter.sort;
export const selectSortProperty = (state:RootState) => state.filter.sort.sortProperty;
export const SelectDisplayedSearchValue = (state:RootState) =>
  state.filter.displayedSearchValue;

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
  setDisplayedSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
