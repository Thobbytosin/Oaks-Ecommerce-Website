import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timerEnd: false,
}

export const countdownSlice = createSlice({
    name: 'countdown',
    initialState,
    reducers: {
        setToEnd(state, action) {
            state.timerEnd = action.payload
        }
    }
})

export const { setToEnd } = countdownSlice.actions
export default countdownSlice.reducer