import KakaoMap from "../ui/KakaoMap.jsx";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "@/api/axiosInstance.jsx";
import AdminAddTarget from "@components/admin/AdminAddTarget.jsx";
import {AgGridReact} from "ag-grid-react";
import {deleteArrayToValue} from "../../common/common.js";
import ResponsiveDiaLog from "@components/ui/ResponsiveDialog.jsx";

const AdminCheckJoin = () => {

    const loginInfo = useSelector((state) => state.loginInfo);
    const [settingData, setData] = useState({});

    const getAttendanceSetting = () => {
        axios.get('/api/setting',{
            headers: {
                Authorization: 'Bearer ' + loginInfo.token
            }
        }).then((response) => {
            setData(response.data);

        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getAttendanceSetting();
        getTargets();
    }, []);

    const distanceInfo = {
        setDistance: () => {}
    }

    const [openModal, setOpenModal] = useState(false);

    const [time, setTime] = useState("09:00:00");
    const timeSetting = (e) => {
        setTime(e.target.value);
    }

    const [saveTimeDialog, setSaveTimeDialog] = useState(false);
    const saveDialogState = {
        value: saveTimeDialog,
        setOpen : setSaveTimeDialog
    }

    const saveTime = () => {
        axios.put('/api/admin/setting/time',{
            attendanceTime: time
        },{
            headers: {
                Authorization: 'Bearer ' + loginInfo.token
            }
        }).then((response) => {
            setData(response.data);

        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        if(Object.keys(settingData).length !== 0){
            setTime(settingData.attendanceTime);
        }
    }, [settingData]);

    const [rowDatas, setRowDatas] = useState([]);

    const getTargets = () => {
        axios.get('/api/admin/attendance-target', {
            headers: {
                Authorization: 'Bearer ' + loginInfo.token
            }
        }).then((response) => {
            let userDatas = response.data;
            let numberExport = userDatas.map((data, index) => {
                data.rowNumber = index + 1;
                return data;
            });

            setRowDatas(numberExport);

        }).catch((error) => {
            console.log(error);
        });
    }

    const [deleteDialogOpen, setDeleteDialog] = useState(false);
    const deleteDialogState = {
        value: deleteDialogOpen,
        setOpen : setDeleteDialog
    }

    const [deleteParam, setDeleteParam] = useState(null);

    const agreeDelete = () => {

        if(deleteParam != null){

            deleteParam.api.applyTransaction({
                remove: [deleteParam.node.data]
            });

            let addData = deleteArrayToValue(rowDatas, deleteParam.node.data).map((data, index) => {
                data.rowNumber = index + 1;
                return data;
            });

            deleteTarget(deleteParam.node.data.targetId);
            setRowDatas(addData);
        }

        setDeleteParam(null);
    }

    const deleteTarget = (targetId) => {
        axios.delete('/api/admin/attendance-target/' + targetId, {
            headers: {
                Authorization: 'Bearer ' + loginInfo.token
            }
        }).then(() => {
        }).catch((error) => {
            console.log(error);
        });
    }

    const removeCellRenderer = () => {

        return(
            <div className='flex'>
                <button data-action="delete" className="btn bg-red-500 text-white">삭제</button>
            </div>
        )
    }
    const [colDefs, setColDefs] = useState([
        { headerName: '순번', field: "rowNumber", flex: 1 },
        { headerName: '이름', field: "name", flex: 1 },
        { headerName: '아이디', field: "username", flex: 1 },
        {
            headerName: "삭제",
            minWidth: 150,
            cellRenderer: removeCellRenderer,
            editable: false,
            colId: "action"
        }
    ]);

    const onCellClicked = (params) => {
        if (params.column.colId === "action" && params.event.target.dataset.action) {
            let action = params.event.target.dataset.action;

            if (action === "delete") {
                setDeleteParam(params);
                setDeleteDialog(true);
            }
        }
    }

    const [gridApi, setGridApi] = useState(null);
    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    return(
        <div className="flex w-full flex-col lg:flex-row">
            <div id='leftContent' className='w-full flex flex-1 flex-col px-2 pb-2'>

                <button
                    className="btn btn-primary ml-auto mb-5"
                    onClick={() => setOpenModal(!openModal)}
                >
                    출결 인원 추가
                </button>

                <div className='flex flex-col'>
                    <p className='text-center'>
                        출석 시간 지정
                    </p>
                    <div className='flex w-80 mx-auto my-2'>
                        <input
                            type="time"
                            className="input input-bordered w-full"
                            value={time}
                            onChange={timeSetting}
                        />
                        <button
                            className="btn ml-2"
                            onClick={() => setSaveTimeDialog(true)}
                        >
                            저장
                        </button>
                    </div>
                </div>

                <AgGridReact
                    rowData={rowDatas}
                    columnDefs={colDefs}
                    onCellClicked={onCellClicked}
                    onGridReady={onGridReady}
                />
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div id='rightContent' className='w-full flex flex-2 flex-col px-2 pb-2'>

                <p className='font-bold text-xl mx-2 my-5 text-center lg:my-auto'>
                    출석 장소 지정
                </p>
                <p className='text-center'>
                    출석 가능 장소는 마커의 반경 200미터 이내 입니다.
                </p>

                <div className='h-150'>
                    <KakaoMap
                        distanceInfo={distanceInfo}
                    />
                </div>
                <AdminAddTarget
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    getTargets={getTargets}
                />

            </div>

            <ResponsiveDiaLog
                open={deleteDialogState}
                contents={{
                    title: '해당 사용자를 삭제 하시겠습니까?',
                }}
                agreeFunc={agreeDelete}
            />

            <ResponsiveDiaLog
                open={saveDialogState}
                contents={{
                    title: '출석 시간 설정을 변경 하시겠습니까?',
                    content: '출석 시간을 변경할 경우 현재 날짜의 출석 대상자들 부터 적용됩니다.'
                }}
                agreeFunc={saveTime}
            />

        </div>
    )
}

export default AdminCheckJoin;