import { createSlice } from "@reduxjs/toolkit";

const initialState = { notification: null }
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, action) {
            const notification = action.payload
            return {...state, notification: `you voted for ${notification}`}
        },
        deleteNotification(state, action) {
            return {...state, notification: null}
        }
    }
})


export const { createNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice