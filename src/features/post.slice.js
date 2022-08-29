import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
    },
    reducers: {
        getPosts: (state, action) => {
            state.posts = action.payload;
        },
        addPost: (state, { payload }) => {
            state.posts.push(payload);
        },
        deletePost: (state, { payload }) => {
            state.posts = state.posts.filter((post) => post.id !== payload);
        },
        addComment: (state, { payload }) => {
            state.posts = state.posts.map((post) => {
                if (post.id === payload[0]) {
                    return { ...post, comments: payload[1] };
                } else {
                    return post;
                }
            });
        },
        setLike: (state, { payload }) => {
            state.posts = state.posts.map((post) => {
                if (post.id === payload[0]) {
                    return { ...post, like: payload[1] };
                } else {
                    return post;
                }
            });
        },
    },
});

export const { getPosts, addPost, deletePost, addComment, setLike } =
    postsSlice.actions;
export default postsSlice.reducer;
