import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const authFormSlice = createSlice({
    name: 'authForm',
    initialState,
    reducers: {
        setAuthForm(state, action) {
            return action.payload;
        },
    },
});

export const { setAuthForm } = authFormSlice.actions;
export default authFormSlice.reducer;
