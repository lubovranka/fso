import { createSlice } from '@reduxjs/toolkit';

const initialState = null;
const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            const user = action.payload;
            return user;
        },
    },
});

export const { setUser } = userReducer.actions;
export default userReducer;
