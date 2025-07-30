import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Page_404 from "./components/error/Page_404.jsx";
import Page_403 from "./components/error/Page_403.jsx";
import LoginControl from "./components/access-control/LoginControl.jsx";
import AdminDashBoard from "./components/admin/AdminDashBoard.jsx";
import DashBoardControl from "./components/access-control/DashBoardControl.jsx";
import ProtectedRoute from "./components/access-control/ProtectedRoute.jsx";
import UserDashBoard from "./components/user/UserDashBoard.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "./api/axiosInstance.jsx";
import {logout} from "./redux/features/loginSlice.js";
import AdminCheckStatus from "./components/admin/AdminCheckStatus.jsx";
import AdminCheckJoin from "./components/admin/AdminCheckJoin.jsx";
import UserCheckStatus from "./components/user/UserCheckStatus.jsx";
import "react-datepicker/dist/react-datepicker.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
    const dispatch = useDispatch();
    const loginInfo = useSelector(( state) => state.loginInfo);

    useEffect(() => {
        let authenticated = loginInfo.isAuthenticated;
        let token = loginInfo.token;

        if(authenticated){
            axios.get('/api/auth/validate-token', {
                headers: { Authorization: `Bearer ${token}` }
            }).then((response) => {

            }).catch((error) => {
                console.log(error);
                dispatch(logout());
            });
        }
    }, []);

    return (
        <>
            <div>
                <BrowserRouter>
                    <Routes>

                        <Route path="/user/dashboard" element={
                            <ProtectedRoute requiredRole="ROLE_USER">
                                <UserDashBoard/>
                            </ProtectedRoute>
                        }>
                            <Route path="/user/dashboard/status" element={<UserCheckStatus/>}/>
                        </Route>

                        <Route path="/admin/dashboard" element={
                            <ProtectedRoute requiredRole="ROLE_ADMIN">
                                <AdminDashBoard/>
                            </ProtectedRoute>
                        }>
                            <Route path="/admin/dashboard/status" element={<AdminCheckStatus/>}/>
                            <Route path="/admin/dashboard/join" element={<AdminCheckJoin/>}/>
                        </Route>

                        <Route path="/board-process" element={
                            <DashBoardControl>
                            </DashBoardControl>
                        }/>

                        <Route path="/404" element={
                            <Page_404/>
                        }/>

                        <Route path="/403" element={
                            <Page_403/>
                        }/>

                        <Route path="/" element={

                            <LoginControl>
                                <LoginForm/>
                            </LoginControl>
                        }/>

                        <Route path="*" element={
                            <Page_404/>
                        }/>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App
