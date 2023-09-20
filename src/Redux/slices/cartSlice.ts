import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItem = {
  id: string,
  title: string,
  type: string,
  price: number,
  count: number,
  imageUrl: string,
  size: number,
};

interface CartSliceState {
  totalPrice:Number;
  items:CartItem[];
}

export const initialState:CartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action:PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem?.count) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
       state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * (obj.count?obj.count:0) + sum;
      }, 0);
    },
    minusItem(state, action:PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem?.count && findItem.count > 1) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * (obj.count?obj.count:0) + sum;
      }, 0);
      
    },
    plusItem(state, action:PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem?.count) {
        findItem.count++;
        console.log(state.items)
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * (obj.count?obj.count:0) + sum;
      }, 0);
      
    },
    removeItem(state, action:PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * (obj.count?obj.count:0) + sum;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state:RootState) => state.cart;
export const SelectCartItemById = (id:string) => (state:RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem,plusItem} = cartSlice.actions;

export default cartSlice.reducer;
