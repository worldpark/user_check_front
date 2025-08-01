import {kakaoLogout, logout} from "../../redux/features/loginSlice.js";
import {useDispatch, useSelector} from "react-redux";
import axios from "@/api/axiosInstance.jsx";

const BannerAndHeader = (props) => {

    const loginInfo = useSelector((state) => state.loginInfo);
    const dispatch = useDispatch();

    const logoutProcess = () => {

        axios.post("/api/logout", {
        }).then(() => {
            if(loginInfo.kakaoAccount){
                dispatch(kakaoLogout());
            }else{
                dispatch(logout());
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const title = props.title;

    return(
        <>
            <div className="text-right px-5 link link-info" onClick={() => logoutProcess()}>
                로그아웃
            </div>

            <div className="font-bold text-2xl h-30 flex lg:text-4xl">
                <p className="m-auto inline">
                    {title}
                </p>
            </div>
        </>
    )
}

export default BannerAndHeader;