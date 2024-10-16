import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// Style Sheets 
import '../assets/css/user/custom.css'
import '../assets/css/theme.css'
import '../assets/css/bootstrap.min.css'
import '../assets/css/custom.css'
import '../assets/css/fonts.css'

const UserAuthLayout = () => {
    var isLoggedIn = useSelector(store => store?.user?.isLoggedIn);
    return isLoggedIn ? (['/user/login', 'user/login'].includes(location.pathname.replace(import.meta.env.BASE_URL, '')) ? <Navigate to='/user/dashboard' /> : <Outlet />) : <Outlet />;
};

export default UserAuthLayout;    
