import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import type { addCart } from "../hooks/useCart";

type CartItem = {
  product_id: string;
  type: string;
  quantity: number;
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<addCart>) => {
      const { product_id, type } = action.payload;

      const existing = state.items.find(
        (item) => item.product_id === product_id && item.type === type
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          product_id,
          type,
          quantity: 1,
        });
      }

      toast.success("Added to cart!");
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ product_id: string; type: string }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          item.product_id !== action.payload.product_id ||
          item.type !== action.payload.type
      );

      toast.success("Removed from cart.");
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items));
      toast.success("Cart cleared.");
    },
  },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
