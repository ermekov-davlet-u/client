
import Selects from './../Blogs/Selects/index';
import { Outlet } from "react-router-dom";

function Main() {
    return ( 
        <>
            <Selects />
            <Outlet />
        </>
     );
}

export default Main;