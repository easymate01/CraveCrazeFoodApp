import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  cartId: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
      if (!state.cartId) {
        state.cartId = action.payload.cartId;
      }
    },
    removeFromCart: (state, action) => {
      let newCart = [...state.items];
      let itemIndex = state.items.findIndex(
        (item) => item.id == action.payload.id
      );
      if (itemIndex >= 0) {
        newCart.splice(itemIndex, 1);
      } else {
        console.log("can't remove item as it is not in the basket");
      }
      state.items = newCart;
    },
    emptyCart: (state, action) => {
      state.items = [];
      state.cartId = null;
    },
  },
});

// Export action creators directly from the slice
export const { setCartId, addToCart, removeFromCart, emptyCart } =
  cartSlice.actions;

export const selectCartId = (state) => state.cart.cartId;
export const selectCartItems = (state) => state.cart.items;

export const selectCartItemsById = createSelector(
  [selectCartItems, (_, id) => id],
  (cartItems, id) => cartItems.filter((item) => item.id === id)
);
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, item) => total + item.price, 0)
);

export default cartSlice.reducer;
