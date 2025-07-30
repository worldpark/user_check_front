import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import ServerSideGrid from "../ui/ServerSideGrid.jsx";
import axios from "@/api/axiosInstance.jsx";
import {useSelector} from "react-redux";
import StatDisplay from "@components/ui/StatDisplay.jsx";
import {socketOpen, socketClose} from "@/common/SocketProcess.js";


const AdminCheckStatus = () => {
    const [dateFilter,  setDateFilter] = useState(new Date());
    const loginInfo = useSelector((state) => state.loginInfo);

    const [page, setPage] = useState(0);
    const changePage = (pageIndex) => {
        setPage(pageIndex);
    }

    const headers = [
        {
            name: '이름',
            value: 'name',
            height: '25%'
        },
        {
            name: '아이디',
            value: 'username',
            height: '37%'
        },
        {
            name: '출석시간',
            value: 'checkTime',
            height: '20%'
        },
        {
            name: '상태',
            value: 'status',
            height: '15%'
        }
    ];

    const [gridData, setGridData] = useState({
        headers: headers
    });

    useEffect(() => {
        readAttendances();
    }, [page]);

    useEffect(() => {
        readAttendances();
        readAttendanceSummary();
    }, [dateFilter]);

    const readAttendances = () => {
        const kstString = new Intl.DateTimeFormat('sv-SE', {
            timeZone: 'Asia/Seoul',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(dateFilter).replace(' ', 'T');

        const url = '/api/admin/attendance?timestamp=' + encodeURIComponent(kstString) + '&page=' + page;

        axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + loginInfo.token
            }
        }).then((response) => {
            setGridData({
                headers: headers,
                contents: response.data.content,
                totalPages: response.data.totalPages
            })

        }).catch((error) => {
            console.log(error);
        });
    }

    const [progressData, setProgressData] = useState({});

    const readAttendanceSummary = () => {
        const isoDateStr = dateFilter.toISOString().replace("Z", "");
        const url = '/api/admin/attendance/summary?timestamp=' + encodeURIComponent(isoDateStr);

        axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + loginInfo.token
            }
        }).then((response) => {
            setProgressData(
                response.data
            )

        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {

        socketOpen("http://localhost:8080/ws?token=" + loginInfo.token, loginInfo.token, (socketMessage) => {
            if(socketMessage.sender == 'System' && socketMessage.content == 'Data refresh'){

                readAttendances();
                readAttendanceSummary();
            }
        });

        return() => {
            socketClose();
        }
    }, []);

    return(
        <div className='flex flex-col'>
            <div className='mx-auto'>
                <p className='font-bold text-xl mx-2 my-5 text-center lg:my-auto'>
                    출석 현황
                </p>

                <DatePicker
                    selected={dateFilter}
                    onChange={(date) => setDateFilter(date)}
                    dateFormat="yyyy-MM-dd"
                    locale={ko}
                    className="input input-bordered w-full mx-2 my-5"
                />
            </div>

            <div className="flex w-full flex-col lg:flex-row">
                <div id='leftContent' className='w-full flex flex-col px-2 pb-2'>

                    <div className='flex my-5'>
                        <div className='flex mx-auto flex-col lg:flex-row'>
                            <StatDisplay
                                statData={progressData}
                            />
                        </div>

                    </div>
                </div>

                <div className="divider lg:divider-horizontal"></div>

                <div id='rightContent' className='w-full flex flex-col px-2 pb-2'>

                    <div id='rightContentHeader' className='flex flex-col mx-auto h-1/3 my-5 lg:flex-row'>
                        <p className='font-bold text-xl mx-2 my-5 text-center lg:my-auto'>
                            개별 출결 상태
                        </p>
                    </div>

                    <div>

                        <ServerSideGrid
                            gridData={gridData}
                            changePage={changePage}
                        />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default AdminCheckStatus;