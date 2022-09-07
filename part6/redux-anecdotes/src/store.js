import { configureStore } from "@reduxjs/toolkit";

import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationSlice from "./reducers/notificationReduder";

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notification: notificationSlice.reducer,
        filter: filterReducer.reducer,
    },
});

export default store;
