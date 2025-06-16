import {useSelector} from "react-redux";
import axios from "@/api/axiosInstance.jsx";
import {useEffect, useMemo, useRef, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

const AdminAddTarget = (props) => {

    const [gridApi, setGridApi] = useState(null);
    const [rowData, setRowData] = useState([]);

    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    const rowSelection = useMemo(() => {
        return {
            mode: 'multiRow'
        };
    }, []);

    const [colDefs, setColDefs] = useState([
        { headerName: '순번', field: "rowNumber", flex: 1 },
        { headerName: '이름', field: "name", flex: 1 },
        { headerName: '아이디', field: "username", flex: 1 }
    ]);

    const loginInfo = useSelector((state) => state.loginInfo);
    const addModal = useRef(null);

    const addTarget = () => {
        axios.get('/api/users/no-target', {
            headers: {
                Authorization: 'Bearer ' + loginInfo.token
            }
        }).then((response) => {
            let userDatas = response.data.users;
            let rowDatas = userDatas.map((data, index) => {
                data.rowNumber = index + 1;
                return data;
            });

            setRowData(rowDatas);
            props.getTargets();
            addModal.current.showModal();

        }).catch((error) => {
            console.log(error);
        });

    }

    useEffect(() => {

        if (props.openModal) {
            addTarget();
        } else {
            if (addModal.current.open) {
                addModal.current.close();
            }
        }
    }, [props.openModal]);

    const getSelectedRows = () => {
        const selectedNodes = gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);

        if(selectedData.length > 0){
            const targetRequests = selectedData.map((data) => {
                const targetData = {
                    userId: data.userId
                }

                return targetData;
            });

            axios.post('/api/admin/attendance-target', {
                targetRequests
            }, {
                headers: {
                    Authorization: 'Bearer ' + loginInfo.token
                }
            }).then(() => {
                props.getTargets();
                alert("성공적으로 등록하였습니다.");
                props.setOpenModal(false);
            }).catch((error) => {
                console.log(error);
            });
        }else{
            alert("선택한 사용자가 없습니다.");
        }
        
    };

    return(
        <>
            <dialog className="modal" ref={addModal}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">출석자 등록</h3>

                    <div style={{ height: 300, width: 100+'%'}}>
                        <AgGridReact
                            rowSelection={rowSelection}
                            rowData={rowData}
                            columnDefs={colDefs}
                            onGridReady={onGridReady}
                        />
                    </div>

                    <div className="modal-action">
                        <button
                            className="btn"
                            onClick={() => getSelectedRows()}
                        >
                            추가
                        </button>
                        
                        <button
                            className="btn"
                            onClick={() => props.setOpenModal(false)}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default AdminAddTarget;