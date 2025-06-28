import axios from "axios";
// import { useAppContext } from "../utils/getLoggedInUser"

export const getLoggedInUser = async (BACKEND_URL) => {
    //   const {BACKEND_URL} = useAppContext();
    try {
        const res = await axios.get(`${BACKEND_URL}/user/check-logged-in-user`, {
            withCredentials: true, // 👈 send the cookie
        });
        console.log(res.data.user)
        return res.data.user; 
    } catch (err) {
        console.error("Error getting user:", err.response?.data?.message || err.message);
        return null;
    }
};
