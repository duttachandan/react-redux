// store.js
import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts";

const store = configureStore({
    reducer: {
        posts: postReducer,
    },
});

export default store;
