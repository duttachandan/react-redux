// store.js
import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts";
import loadingReducer from '../features/loadingSlice'

const store = configureStore({
    reducer: {
        posts: postReducer,
        loading: loadingReducer,
    },
});

export default store;
