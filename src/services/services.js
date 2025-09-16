import axios from "axios";

export const getLoggedInUser = async (BACKEND_URL) => {
    try {
        const res = await axios.get(`${BACKEND_URL}`, {
            withCredentials: true, // 👈 send the cookie
        });
        console.log(res)
        return res.data.user; 
    } catch (err) {
        console.error("Error getting user:", err.response?.data?.message || err.message);
        return null;
    }
};
