import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    darkMode: false,
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setDarkMode(state, action) {
            state.darkMode = action.payload;
        }
    }
});

export const { setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;