import {kakaoLogout, logout} from "../../redux/features/loginSlice.js";
import {useDispatch, useSelector} from "react-redux";
import axios from "@/api/axiosInstance.jsx";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {useState} from "react";
import ChatUI from "@components/ui/ChatUI.jsx";

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

    const [chatOpen, setChatOpen] = useState(false);

    return(
        <>
            <div className="flex px-5 link link-info w-full">
                <div className="ml-auto" onClick={() => setChatOpen(true)}>
                    AI 도우미 봇
                </div>

                <div className="px-5" onClick={() => logoutProcess()}>
                    로그아웃
                </div>
            </div>

            <div className="font-bold text-2xl h-30 flex lg:text-4xl">
                <p className="m-auto inline">
                    {title}
                </p>
            </div>

            <Dialog
                open={chatOpen}
                onClose={() => setChatOpen(false)}
                maxWidth={false}
                keepMounted
            >
                <DialogTitle>
                    AI 도우미 봇
                </DialogTitle>
                <DialogContent
                    style={{height: '80vh', width: "60vw"}}
                >
                    <ChatUI/>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default BannerAndHeader;