import BannerAndHeader from "../ui/BannerAndHeader.jsx";
import Menu from "../ui/Menu.jsx";
import {Outlet} from "react-router-dom";


const UserDashBoard = () => {

    const menuList = [
        {
            path: '/user/dashboard/status',
            name: '출결 상태'
        }
    ];

    return(
        <div className="min-h-screen bg-white">

            <BannerAndHeader title="출석 체크 시스템(USER)"/>

            <Menu menuList={menuList}/>

            <div className='p-10'>
                <Outlet/>
            </div>
        </div>
    )
}

export default UserDashBoard;