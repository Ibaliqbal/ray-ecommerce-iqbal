import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import productListSlice from "./features/productList/productListSlice";
export default configureStore({
    reducer: {
        cart: cartSlice.reducer,
        product: productListSlice.reducer
    }
})