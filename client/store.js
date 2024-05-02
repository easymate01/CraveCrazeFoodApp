import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import resturantSlice from "./slices/restaurantSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    restaurant: resturantSlice,
    auth: authSlice,
  },
});
