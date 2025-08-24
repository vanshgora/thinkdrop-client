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
        const res = await axios.get(`${apiURL}/users/logout`, {
            withCredentials: true
        });
        if (res.status === 200) {
            deleteUser();
        }
        return res;
    } catch (err) {
        console.log("Error in logout service:", err);
        throw (err);
    }
}

const getTodaysTask = async () => {
    try {
        const res = await axios.get(`${apiURL}/users/gettodaystask`, {
            withCredentials: true
        });
        return res;
    } catch (err) {
        console.log("Error while getting task", err);
    }
}

const getUserTasks = async () => {
    try {
        const user = getUser();
        const res = await axios.get(`${apiURL}/users/getusertasks/${user._id}`, {
            withCredentials: true
        });
        return res;
    } catch (err) {
        console.log("Error while getting user tasks", err);
    }
}

const updateUserTasks = async (data) => {
    try {
        const user = getUser();
        data.userId = user._id;
        const res = await axios.patch(`${apiURL}/users/updateusertasks`, data, {
            withCredentials: true
        });
        return res;
    } catch (err) {
        console.log("Error while getting user tasks", err);
    }
}

const deleteAccount = async () => {
    try {
        const user = getUser();
        const res = await axios.delete(`${apiURL}/users/deleteaccount/${user._id}`, {
            withCredentials: true
        });
        if (res && res.status != 200) {
            throw ("Server side error while deleting account")
        }
        deleteUser();
        return res;
    } catch (err) {
        console.log("Error while deleting account", err);
        throw (err);
    }
}

const resetPassword = async (data) => {
    try {
        const user = getUser();
        data.userId = user._id;
        const res = await axios.patch(`${apiURL}/users/resetpassword`, data, {
            withCredentials: true
        });
        setUser(res.data.user);
    } catch (err) {
        console.log("Error while resetting password", err);
        throw (err);
    }
};

export { getUser, setUser, updateEmialDelivery, reSchedule, logout, getTodaysTask, deleteAccount, resetPassword, getUserTasks, updateUserTasks }