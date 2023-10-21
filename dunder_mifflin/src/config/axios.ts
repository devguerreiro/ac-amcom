import axios from "axios";

const _axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 1000,
});

_axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error.message);
    }
);

export default _axios;
