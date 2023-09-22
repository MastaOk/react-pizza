import { CartItem } from "../Redux/slices/cartSlice";
import { CalcTotalPrice } from "./calcTotalPrice";

export const getCartFromLs = () => {
  const data = localStorage.getItem("cart");
  const items: CartItem[] = data ? JSON.parse(data) : [];
  const totalPrice = data ? CalcTotalPrice(items) : 0;
  return {
    items,
    totalPrice,
  };
};
