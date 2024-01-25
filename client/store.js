import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import resturantSlice from "./slices/restaurantSlice";

export const store = configureStore({
  reducer: {
    basket: cartSlice,
    resturant: resturantSlice,
  },
});
