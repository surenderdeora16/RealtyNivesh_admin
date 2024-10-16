import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { logdedOutUser } from "../../../redux/user/userSlice";
import AxiosHelper from "../../../helper/AxiosHelper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = useCallback(async () => {
        try {
            var { data } = await AxiosHelper.getData("user/logout");
            if (data?.status === true) {
                dispatch(logdedOutUser());
                toast.success(data?.message);
                navigate(`/user/login`);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            toast.error("An error occurred during logout.");
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        handleLogout();
    }, [handleLogout]);

    return null;
}

export default Logout;
