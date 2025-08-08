import axios from 'axios';
import { setUser } from './userServices';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const signupService = async (data) => {
    try {
        const res = await axios.post(`${apiURL}/users/signup`, data, {
            headers: {
                'Content-Type': 'application/josn'
            }
        });
        setUser(res.data.user);
        return res;
    } catch (err) {
        console.log("Error in signup service:", err);
        throw (err);
    }
}

const loginService = async (data) => {
    try {
        const res = await axios.post(`${apiURL}/users/login`, data, {
            withCredentials: true, // Important!
        });
        setUser(res.data.user);
        return res;
    } catch (err) {
        console.log("Error in signup service:", err);
        throw (err);
    }
}

export { signupService, loginService };