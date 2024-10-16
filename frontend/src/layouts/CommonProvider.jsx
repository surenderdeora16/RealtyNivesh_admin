import { useCallback, useEffect } from "react";
import AxiosHelper from "../helper/AxiosHelper";
import { useDispatch } from "react-redux";
import { updateSettings } from '../redux/theme/themeSlice'

const CommonProvider = ({ children }) => {

    const dispatch = useDispatch();
    const loadSettings = useCallback(async () => {
        const { data } = await AxiosHelper.getData(`/settings/1,3`);
        if (data?.status === true) {
            dispatch(updateSettings(data?.data))
            return true;
        } else {
            return false;
        }
    }, [])

    useEffect(() => { loadSettings() }, [])

    return children
}

export default CommonProvider