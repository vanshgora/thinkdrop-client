const { default: axios } = require("axios")

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const getUser = () => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('userData');
        return stored ? JSON.parse(stored) : null;
    }
    return null;
};

const setUser = (data) => {
    if (typeof window !== 'undefined') localStorage.setItem('userData', JSON.stringify(data));
};

const deleteUser = () => {
    localStorage.removeItem('userData');
}

const updateEmialDelivery = async (data) => {
    try {
        const res = await axios.patch(`${apiURL}/users/update-email-delivery`, data, {
            withCredentials: true
        });
        setUser(res.data.user);
        return res;
    } catch (err) {
        console.log("Error in update email delivery service:", err);
        throw (err);
    }
}

const reSchedule = async (data) => {
    try {
        const res = await axios.patch(`${apiURL}/users/reschedule`, data, {
            withCredentials: true
        });
        setUser(res.data.user);
        return res;
    } catch (err) {
        console.log("Error in reschedule service:", err);
        throw (err);
    }
}

const logout = async () => {
    try {
        deleteUser();
        const res = await axios.get(`${apiURL}/users/logout`);
    } catch (err) {
        console.log("Error in logout service:", err);
        throw (err);
    }
}

export { getUser, setUser, updateEmialDelivery, reSchedule, logout }