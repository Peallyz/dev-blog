import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user.slice";
import postsReducer from "../features/post.slice";

export default configureStore({
    reducer: { user: userReducer, posts: postsReducer },
});
