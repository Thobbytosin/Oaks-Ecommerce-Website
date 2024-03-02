import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    wishlist: localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist")) : []
}

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist(state, action) {
            const itemIndex = state.wishlist.findIndex((item) => item.id === action.payload.id);
            if(itemIndex >= 0) {
                toast.info(`${state.wishlist[itemIndex].name} is already in your wishlist`, {
                    position: 'top-center'
                })
            } else {
                const curProduct = {...action.payload, added: true}
                state.wishlist.push(curProduct)
                toast.success(`${action.payload.name} added to wishlist`, {
                    position: 'top-center'
                })
            }

            localStorage.setItem("wishlist", JSON.stringify(state.wishlist))
        },

        removeFromWishlist(state, action) {
            state.wishlist.map((wishlistItem) => {
                if(wishlistItem.id === action.payload.id) {
                    const newWishlist = state.wishlist.filter((item) => item.id !== wishlistItem.id )
                     

                    state.wishlist = newWishlist

                    toast.error(`${wishlistItem.name} removed from wishlist`, {
                        position: "bottom-right"
                    })
                }
            })

            localStorage.setItem("wishlist", JSON.stringify(state.wishlist))
        }
    }

})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer