import {useState} from 'react';
import axios from "../api/axiosInstance.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login, kakaoLogin} from "../redux/features/loginSlice.js";
import KakaoLogin from "react-kakao-login";

export default function LoginForm() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [message, setMessage] = useState('');

    const passwordEnterKeyDown = (e) => {if (e.key === 'Enter') {
        loginProcess();
    }

    }

    const loginProcess = () => {
        axios.post('/api/user/auth/login', {
            username: userId,
            password: password
        }).then((response) => {
            let token = response.data.data.accessToken;
            axios.get('/api/user',{
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((response) => {

                dispatch(login({
                    username: response.data.username,
                    role: response.data.role,
                    token: token,
                    isAuthenticated: true
                }));

            }).catch((error) => {
                console.log(error);
            });

        }).catch((error) => {
            setMessage(error.response.data.message);
            console.log(error);
        });
    };

    const javascriptKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

    const kakaoLoginProcess = (data) => {
        localStorage.setItem('kakaoToken', data.response.access_token);

        axios.post('/api/user/auth/kakao', {
            accessToken: data.response.access_token
        }).then((response) => {

            let token = response.data.accessToken;
            console.log(token);

            axios.get('/api/user',{
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((response) => {

                dispatch(kakaoLogin({
                    username: response.data.username,
                    role: response.data.role,
                    token: token,
                    isAuthenticated: true,
                    kakaoAccount: true
                }));

            }).catch((error) => {
                console.log(error);
            });

        }).catch((error) => {
            setMessage(error.response.data.message);
            console.log(error);
        });
    }

    const kakaoLoginFail = (error) => {
        alert("소셜 로그인에 실패하였습니다.");
        console.log(error);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-400">
            <div
                className="p-6 rounded-2xl shadow-lg max-w-sm space-y-4 bg-sky-700 w-[80%]"
            >
                <h2 className="text-2xl font-bold text-center text-white">로그인</h2>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white">
                        아이디
                    </label>
                    <input
                        type="text"
                        id="user_id"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 text-white"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-white">
                        비밀번호
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => passwordEnterKeyDown(e)}
                        required
                    />
                </div>

                <p className='text-red-300 whitespace-normal min-w-[211px]'>{message}</p>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-sky-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={loginProcess}
                >
                    로그인
                </button>

                {/*<div className='w-[100%] flex'>*/}
                {/*    <KakaoLogin*/}
                {/*        className='m-auto'*/}
                {/*        token={javascriptKey}*/}
                {/*        onSuccess={kakaoLoginProcess}*/}
                {/*        onFail={kakaoLoginFail}*/}
                {/*    />*/}
                {/*</div>*/}
            </div>
        </div>
    );
}