import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const signupService = async (data) => {
    console.log(apiURL)
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