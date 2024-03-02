import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState  = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartCount: localStorage.getItem("cartCount") ? JSON.parse(localStorage.getItem("cartCount")) : 0,
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    cartExpressAmount: 3000,
    cartGrossTotal: 0,
    cartCounter: 1,
    cartShipping: "",
    cartSummaryDetails: [],
    productReviews: [],
    currentProduct: localStorage.getItem("reviews") ? JSON.parse(localStorage.getItem("reviews")) : null,
    deliveredOrders: [],
  
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if(itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity === state.cartItems[itemIndex].stock ? state.cartItems[itemIndex].cartQuantity : state.cartItems[itemIndex].cartQuantity += 1;

                state.cartItems[itemIndex].cartQuantity === state.cartItems[itemIndex].stock 
                    ? toast.warning(`${state.cartItems[itemIndex].name} maximum stock limit`, {
                        position: "bottom-right"
                    })
                    : toast.info(`increased ${state.cartItems[itemIndex].name} cart quantity`, {
                    position: "bottom-left"
                })

            } else {
                if(action.payload.stock > 0) {
                    const curProduct = { ...action.payload, cartQuantity: state.cartCounter > 0 ? state.cartCounter : 1 };
                    state.cartItems.push(curProduct);
                    state.cartCount +=1
                    toast.success(`${action.payload.name} added to cart`, {
                        position: "bottom-left"
                    })
                    
                } else {
                    toast.error(`Out of stock at the moment`, {
                        position: "top-center"
                    })
                }
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            localStorage.setItem("cartCount", JSON.stringify(state.cartCount))
        },

        removeCart(state, action) {
            state.cartItems.map((cartItem) => {
                if(cartItem.id === action.payload.id) {
                    const newStateItems = state.cartItems.filter((item) => item.id !== cartItem.id )
                     
                    state.cartCount -=1

                    state.cartItems = newStateItems

                    toast.error(`${cartItem.name} removed from cart`, {
                        position: "bottom-right"
                    })
                }
            })

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            localStorage.setItem("cartCount", JSON.stringify(state.cartCount))
        }, 

        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

            if(state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -=1
                toast.info(`${state.cartItems[itemIndex].name} cart quantity decreased`, {
                    position: "bottom-right"
                })
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const newStateItems = state.cartItems.filter((item) => item.id !== action.payload.id)

                state.cartItems = newStateItems

                state.cartCount -=1

                toast.error(`${state.cartItems[itemIndex].name} removed from cart`, {
                    position: "bottom-right"
                })
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            localStorage.setItem("cartCount", JSON.stringify(state.cartCount))
        },

        increaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

            if(state.cartItems[itemIndex].cartQuantity >= 1 && state.cartItems[itemIndex].cartQuantity < state.cartItems[itemIndex].stock ) {
                state.cartItems[itemIndex].cartQuantity +=1

                state.cartItems[itemIndex].cartQuantity === state.cartItems[itemIndex].stock 
                    ? toast.warning(`${state.cartItems[itemIndex].name} maximum stock limit`, {
                    position: "bottom-right"

                    }) 
                    : toast.info(`${state.cartItems[itemIndex].name} cart quanity increased.`, {
                        position: "bottom-left"
                    })



            } 

            

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },

        clearCart(state) {
            state.cartItems = [];
            state.cartCount = 0;

            toast.error(`Your Cart is cleared`, {
                position: "top-center"
            })

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            localStorage.setItem("cartCount", JSON.stringify(state.cartCount))
        },

        getTotals(state) {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;

                    cartTotal.total += itemTotal
                    cartTotal.quantity += cartQuantity

                    return cartTotal
                }, 
                {
                    total: 0,
                    quantity: 0,
                }
            )

            state.cartTotalAmount = total
            state.cartTotalQuantity = quantity
        },

        increaseCounter(state) {
            state.cartCounter += 1
        },

        decreaseCounter(state) {

            state.cartCounter === 1 ? state.cartCounter = 1 : state.cartCounter -= 1
        },

        logOut() {
            localStorage.clear()
        },

        shipping(state, action) {
           
            state.cartShipping = action.payload
        },

        cartTotal(state, action) {
            state.cartGrossTotal = action.payload
        },

        setSummary(state, action) {
            state.cartSummaryDetails.push(action.payload)

            localStorage.setItem("cartSummary", JSON.stringify(state.cartSummaryDetails))
        },

        updateProduct(state, action) {
            const itemIndex = state.productReviews.findIndex((item) => item.id === action.payload.id);

            if(itemIndex >= 0) {
                return

            } else {
                state.productReviews.push(action.payload)
            }
        },

        setCurrentProduct(state, action) {
            state.currentProduct = [action.payload]

            localStorage.setItem("reviews", JSON.stringify(state.currentProduct))
        }, 

        setDeliveredOrders(state, action) {
            state.deliveredOrders = action.payload
        }



        

            
        

    }
})

export const { addToCart, removeCart, decreaseCart, increaseCart, clearCart
, getTotals, increaseCounter, decreaseCounter, logOut, shipping, cartTotal, setSummary, updateProduct, setCurrentProduct, setDeliveredOrders } = cartSlice.actions;

export default cartSlice.reducer