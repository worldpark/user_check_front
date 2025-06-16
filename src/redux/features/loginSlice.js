import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    username: 'anonymous',
    role: 'anonymous',
    token: null,
    isAuthenticated: false
}

const loginSlice = createSlice({
    name: 'loginInfo',
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload.username;
            state.role = action.payload.role;
            state.token = action.payload.token;
            state.isAuthenticated = action.payload.isAuthenticated;
        },
        logout: () => {
            return initialState;
        },
        setAccessToken: (state, action) => {
            state.token = action.payload.token;
        }
    }

});

export const {login, logout, setAccessToken} = loginSlice.actions;
export default loginSlice.reducer;