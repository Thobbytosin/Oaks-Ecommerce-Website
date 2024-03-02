import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { getTotals  } from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice"
import countdownReducer from "../features/countdownSales/countdownSlice"

export const store = configureStore({
    reducer : {
        cart: cartReducer,
        wishlist: wishlistReducer,
        countdown: countdownReducer
    }
})

store.dispatch(getTotals)
// store.dispatch(getVAT)