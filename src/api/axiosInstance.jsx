import axios from 'axios';
import {logout, setAccessToken} from "../redux/features/loginSlice.js";
import {store} from "../redux/store.js";

const axiosInstance = axios.create({
    baseURL: 'http://192.168.0.8:8081',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originRequest = error.config;
        const reduxStore = store;

        if(error.status != null){
            let status = error.response.status;
        }

        if (status === 401 && !originRequest._retry) {

            originRequest._retry = true;

            try {
                // refresh token으로 새로운 access token 요청
                const response = await axios.post('http://192.168.0.8:8081/api/user/auth/refresh', {}, {withCredentials: true});
                const newAccessToken = response.data.accessToken;

                // 새 토큰 저장
                reduxStore.dispatch(setAccessToken({
                    token: newAccessToken
                }))

                // Authorization 헤더 업데이트
                originRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                // 요청 재시도
                return axiosInstance(originRequest);
            } catch (refreshError) {
                reduxStore.dispatch(logout());
                return Promise.reject(refreshError);
            }

        }

        return Promise.reject(error)
    }
);

async function retryRequest(config) {
    return axiosInstance(config);
}

export default axiosInstance;