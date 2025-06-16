import {useEffect, useState} from "react";
import KakaoMap from "@components/ui/KakaoMap.jsx";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import axios from "@/api/axiosInstance.jsx";
import {useSelector} from "react-redux";
import InfoBox from "@components/ui/InfoBox.jsx";

const UserCheckStatus = () => {

    const loginInfo = useSelector((state) => state.loginInfo);
    const [userInfo, setUserInfo] = useState({
        "attendanceId": "",
        "attendanceDate": "",
        "checkTime": null,
        "status": "",
        "userId": "",
        "username": ""
    });

    const [infoBoxData, setInfoBoxData] = useState([]);

    const [openCheckDialog, setOpenCheckDialog] = useState(false);

    const [distance, setDistance] = useState(9999999);

    const distanceInfo = {
        setDistance: setDistance
    }

    const userCheck = () => {
        if(distance <= 2000){
            attendanceCheck();
        }else{
            alert("출석 가능 범위를 벗어났습니다.");
        }
    }

    const attendanceCheck = () => {
        axios.put('/api/attendance/' + userInfo.attendanceId, {
        },{
            headers: {
                Authorization: 'Bearer ' + loginInfo.token
            }
        }).then(() => {
            alert("출석 처리 되었습니다.");
            setOpenCheckDialog(false);

        }).catch((error) => {
            console.log(error);
        })
    }

    const getUserCheckStatus = () => {
        axios.get('/api/attendance', {
            headers: {
                Authorization: 'Bearer ' + loginInfo.token
            }
        }).then((response) => {

            if(attendanceResponses.size > 0){
                setUserInfo(response.data.attendanceResponses[0]);
            }

        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getUserCheckStatus();
    }, []);

    useEffect(() => {
        let infoData = {};

        if(userInfo != undefined){

            Object.entries(userInfo).forEach(([key, value], index) => {
                if(key == 'status'){
                    infoData.출석상태 = value;
                }else if(key == 'checkTime'){
                    infoData.출석시간 = value;
                }
            });

            setInfoBoxData(infoData);
        }

    }, [userInfo]);

    return(
        <div className='flex flex-col'>
            <div className='mx-auto text-center w-[300px]'>
                <p className='font-bold text-xl'>출석 상태</p>

                {
                    userInfo.attendanceId === "" ?
                        <p>오늘 출결이 존재하지 않습니다.</p>
                        : <InfoBox
                            info={infoBoxData}
                        />
                }


                {
                    userInfo.checkTime !== null || userInfo.checkTime !== ""?
                        <></>
                        : <>
                            <button
                                className="btn btn-primary mt-5"
                                onClick={() => setOpenCheckDialog(true)}
                            >
                                출석하기
                            </button>
                        </>
                }


                <Dialog
                    open={openCheckDialog}
                    onClose={() => setOpenCheckDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                >
                    <DialogTitle id="alert-dialog-title">
                        <p className='text-center'>
                            출석체크
                        </p>
                    </DialogTitle>
                    <DialogContent>
                        <div className='mx-auto bg-gray-500 w-2/3 aspect-square'>
                            <KakaoMap
                                distanceInfo={distanceInfo}
                            />
                        </div>
                        <div className='flex w-2/3 mx-auto flex-col mt-5'>
                            <p>
                                거리 : {distance} m
                            </p>

                            <button
                                className="btn btn-primary w-full mt-5"
                                onClick={() => userCheck()}
                            >
                                출석
                            </button>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenCheckDialog(false)}>
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default UserCheckStatus;