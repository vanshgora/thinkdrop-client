import axios from 'axios';

const apiURL = 'http://localhost:3000';

const signupService = async (data) => {
    try {
        const res = await axios.post(`${apiURL}/users/signup`, data);
        return res;
    } catch(err) {
        console.log("Error in signup service:",err);
        throw(err);
    }
    
}

const loginService = async (data) => {
    try {
        const res = await axios.post(`${apiURL}/users/login`, data);
        return res;
    } catch(err) {
        console.log("Error in signup service:",err);
        throw(err);
    }
}

export { signupService, loginService };