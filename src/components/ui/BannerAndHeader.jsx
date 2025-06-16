import {logout} from "../../redux/features/loginSlice.js";
import {useDispatch} from "react-redux";

const BannerAndHeader = (props) => {

    const dispatch = useDispatch();

    const logoutProcess = () => {
        dispatch(logout());
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