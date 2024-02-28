import axios from "axios";
import {Globals} from "@/app/common/globals"

const axiosPrepared = axios.create({
    baseURL: Globals.baseUrl,
});


axiosPrepared.interceptors.request.use(
    (config) => {
        const token =  Globals.token
        return {
            ...config,
            headers: {
                ...(token !== null && { Authorization: `Bearer ${token}` }),
                ...config.headers,
            },
        };
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosPrepared.interceptors.response.use(
    (response) => {
        //const url = response.config.url;

        //setLocalStorageToken(token);
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            //(`unauthorized :)`);
            //localStorage.removeItem("persist:root");
            //removeLocalStorageToken
            //window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosPrepared;