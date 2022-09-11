import { createSlice } from '@reduxjs/toolkit';

const initialState = null;
const messageReducer = createSlice({
    name: 'message',
    initialState,
    reducers: {
        createMessage(_, action) {
            return {
                message: action.payload.message,
                type: action.payload.type,
            };
        },
        deleteMessage() {
            return null;
        },
    },
});

export const { createMessage, deleteMessage } = messageReducer.actions;
export default messageReducer;
