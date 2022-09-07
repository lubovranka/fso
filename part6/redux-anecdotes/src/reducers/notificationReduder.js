import { createSlice } from "@reduxjs/toolkit";

const initialState = { notification: null };
const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        createNotification(state, action) {
            const notification = action.payload;
            if (state.timeoutId) { clearTimeout(state.timeoutId) }
            return { ...state, notification: `you voted for ${notification}` };
        },
        deleteNotification(state, action) {
            return { ...state, notification: null, timeoutId: action.payload };
        },
        setTimeoutId(state, action) {
            return {...state, timeoutId: action.payload}
        }
    },
});

export const createNewNotification = (text, time) => {
    return async (dispatch) => {
        dispatch(createNotification(text));
        const timeoutId = setTimeout(() => {
            dispatch(deleteNotification());
        }, time);
        dispatch(setTimeoutId(timeoutId))
    };
};

export const { createNotification, deleteNotification, setTimeoutId } =
    notificationSlice.actions;
export default notificationSlice;
