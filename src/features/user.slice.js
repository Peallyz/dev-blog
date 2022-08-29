import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        uid: null,
        displayName: [],
        like: [],
    },
    reducers: {
        setUid: (state, action) => {
            state.uid = action.payload;
        },
        setDisplayName: (state, action) => {
            state.displayName = action.payload;
        },
    },
});

export const { setUid, setDisplayName } = userSlice.actions;
export default userSlice.reducer;
