import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
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
      const findIndexProduct = cartItem.findIndex(item => item.id === payload.id)
      if (findProduct) {
        if (findProduct.quantity === 1) {
          cartItem.splice(findIndexProduct, 1)
        } else {
          findProduct.quantity--;
          findProduct.totalPrice = findProduct.quantity * findProduct.price;
        }
      }
    },
    deleteItem: ({cartItem}, {payload}) => {
      const findIndexProduct = cartItem.findIndex(
        (item) => item.id === payload
      );
      cartItem.splice(findIndexProduct, 1)
    }
  },
});

export const { addItemToCart, tambahQuantity, kurangQuantity, deleteItem } =
  cartSlice.actions;
export default cartSlice;
export const selectCartItem = (state) => state.cart.cartItem;
export const selectCartTotalItems = (state) =>
  state.cart.cartItem.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrices = (state) =>
  state.cart.cartItem.reduce((total, item) => total + item.price, 0);
