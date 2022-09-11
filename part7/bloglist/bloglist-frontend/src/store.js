import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogsReducer';
import messageReducer from './reducers/messageReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
    reducer: {
        blogs: blogsReducer.reducer,
        user: userReducer.reducer,
        message: messageReducer.reducer,
    },
});

export default store;
