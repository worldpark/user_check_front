import {Link} from "react-router-dom";
import {useRef} from "react";

const Menu = (props) => {

    const drawerInput = useRef(null);
    let menuList = props.menuList;

    return(
        <div className="drawer">
            <input id="side-menu-drawer" type="checkbox" className="drawer-toggle" ref={drawerInput}/>
            <div className="drawer-content flex flex-col">

                <div className="navbar bg-base-300 w-full">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="side-menu-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>

                    <div className="hidden flex lg:block m-auto">
                        <ul className="menu menu-horizontal">
                            {
                                menuList.map((menuItem, index) => (
                                    <li key={index}>
                                        <Link to={menuItem.path}>
                                            <p>{menuItem.name}</p>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                </div>
            </div>

            <div className="drawer-side">
                <label htmlFor="side-menu-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">

                    {
                        menuList.map((menuItem, index) => (
                            <li key={index}>
                                <Link to={menuItem.path} onClick={() => drawerInput.current.checked = false}>
                                    <p>{menuItem.name}</p>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Menu;