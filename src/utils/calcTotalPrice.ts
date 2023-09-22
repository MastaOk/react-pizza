import { CartItem } from "../Redux/slices/cartSlice";

export const CalcTotalPrice = (items: CartItem[]): number => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
