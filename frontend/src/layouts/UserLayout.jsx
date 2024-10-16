import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logdedOutUser, updateUser } from "../redux/user/userSlice";
import { Navigate, Outlet, useLocation, useNavigation } from "react-router-dom";
import Footer from "../components/Website/Footer";
import Navbar from "../components/User/Navbar";
import Loader from "../components/Website/Loader";
import AxiosHelper from "../helper/AxiosHelper";

// Style Sheets 
import '../assets/css/user/custom.css'
import '../assets/css/theme.css'
import '../assets/css/bootstrap.min.css'
import '../assets/css/custom.css'
import '../assets/css/fonts.css'


const UserLayout = () => {
    const location = useLocation();

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [isLoggedIn, setIsLoggedIn] = useState(null)

    const updateDataUser = useCallback(async () => {
        const { data } = await AxiosHelper.getData(`/user/profile`);
        if (data?.status === true) {
            dispatch(updateUser(data?.data))
            setIsLoggedIn(true)
            return true;
        } else {
            dispatch(logdedOutUser())
            setIsLoggedIn(false)
            return false;
        }
    }, [])

    useEffect(() => { updateDataUser() }, [updateDataUser])
    if (navigation.state !== "idle" || isLoggedIn === null) return <Loader />
    return isLoggedIn ?
        <div className="main" id="top">
            <div data-layout="container">
                <div className="content">
                    <Navbar />
                    <div className=""><Outlet /></div>
                    <Footer />
                </div>
            </div>
        </div>
        :
        <Navigate to={`/user/login`} state={{ from: location.pathname }} replace />
};

export default UserLayout;