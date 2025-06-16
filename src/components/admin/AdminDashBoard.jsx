import {Outlet} from "react-router-dom";
import BannerAndHeader from "../ui/BannerAndHeader.jsx";
import Menu from "../ui/Menu.jsx";


const AdminDashBoard = () => {

    const menuList = [
        {
            path: '/admin/dashboard/status',
            name: '출결 현황'
        },
        {
            path: '/admin/dashboard/join',
            name: '출결 등록'
        }
    ];

    return(
        <div className="min-h-screen bg-white">
            
            <BannerAndHeader title="출석 체크 시스템(ADMIN)"/>

            <Menu menuList={menuList}/>

            <div className='pt-10'>
                <Outlet/>
            </div>
        </div>
    )
}

export default AdminDashBoard;