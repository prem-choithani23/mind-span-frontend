import axios from "axios";
import { getAccessToken } from "../utils/auth.js";

const API = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
})


API.interceptors.request.use((req) => {
    const token = getAccessToken();
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

API.interceptors.response.use((res)=> res,
    async (err)=>{
        if(err.response && err.response.status === 401){
            console.log(err)
        }

        return Promise.reject(err);
    }
)

export default API