import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const createSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action) => {
      let newCart = [...state.items];
      let itemIndex = state.items.findIndex(
        (item) => item.id == action.payload.id
      );
      if (itemIndex >= 0) {
        newBasket.splice(itemIndex, 1);
      } else {
        console.log("can't remove item as it is not in the basket");
      }
      state.items = newBasket;
    },
    emptyCart: (state, action) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRestaurant } = createSlice.actions;

export const selectRestaurant = (state) => state.restaurant.restaurant;

export default createSlice.reducer;
