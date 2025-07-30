import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    username: 'anonymous',
    role: 'anonymous',
    token: null,
    isAuthenticated: false,
    kakaoAccount: false
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
        },
        kakaoLogin: (state, action) => {
            state.username = action.payload.username;
            state.role = action.payload.role;
            state.token = action.payload.token;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.kakaoAccount = action.payload.kakaoAccount;

        },
        kakaoLogout: () => {
            let kakaoRestApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
            let kakaoLogoutURI = import.meta.env.VITE_KAKAO_LOGOUT_DIRECT_URL;
            // window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${kakaoRestApiKey}&logout_redirect_uri=${kakaoLogoutURI}`;
            window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${kakaoRestApiKey}&logout_redirect_uri=${kakaoLogoutURI}`;

            return initialState;
        },
    }

});

export const {login, logout, setAccessToken, kakaoLogin, kakaoLogout} = loginSlice.actions;
export default loginSlice.reducer;