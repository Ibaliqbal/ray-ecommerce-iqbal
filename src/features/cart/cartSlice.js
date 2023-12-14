import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
  totalItem: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: ({ cartItem }, { payload }) => {
      const newItem = payload;
      const selectCartIndex = cartItem.findIndex(
        (product) => product.id === newItem.id
      );
      if (selectCartIndex !== -1) {
        cartItem[selectCartIndex].quantity++;
        cartItem[selectCartIndex].totalPrice =
          cartItem[selectCartIndex].quantity * cartItem[selectCartIndex].price;
      } else {
        cartItem.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
          checked: false,
        });
      }
    },
    tambahQuantity: ({ cartItem }, { payload }) => {
      const findProduct = cartItem.find((item) => item.id === payload.id);
      if (findProduct) {
        findProduct.quantity++;
        findProduct.totalPrice = findProduct.quantity * findProduct.price;
      }
    },
    kurangQuantity: ({ cartItem }, { payload }) => {
      const findProduct = cartItem.find((item) => item.id === payload.id);
      const findIndexProduct = cartItem.findIndex(
        (item) => item.id === payload.id
      );
      if (findProduct) {
        if (findProduct.quantity === 1) {
          cartItem.splice(findIndexProduct, 1);
        } else {
          findProduct.quantity--;
          findProduct.totalPrice = findProduct.quantity * findProduct.price;
        }
      }
    },
    deleteItem: ({ cartItem }, { payload }) => {
      const findIndexProduct = cartItem.findIndex(
        (item) => item.id === payload
      );
      cartItem.splice(findIndexProduct, 1);
    },
    checkedItem: (state, { payload }) => {
      const findIndexProduct = state.cartItem.findIndex(
        (item) => item.id === payload
      );
      state.cartItem[findIndexProduct].checked =
        !state.cartItem[findIndexProduct].checked;
    },
  },
});

export const {
  addItemToCart,
  tambahQuantity,
  kurangQuantity,
  deleteItem,
  checkedItem,
} = cartSlice.actions;
export default cartSlice;
export const selectCartItem = (state) => state.cart.cartItem;
export const selectCartTotalItems = (state) =>
  state.cart.cartItem
    .filter((item) => item.checked === true)
    .reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotalPrices = (state) =>
  state.cart.cartItem
    .filter((item) => item.checked === true)
    .reduce((sum, item) => sum + item.totalPrice, 0);
