import axios, { AxiosError } from "axios";

import BadRequestException from "@/services/exceptions/badRequest";
import ServerException from "@/services/exceptions/server";
import TimeoutException from "@/services/exceptions/timeout";

const _axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 1000,
});

_axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            console.log(error.response);
            if (error.response.status === 400) throw new BadRequestException();
            throw new ServerException();
        } else if (error.request) {
            throw new TimeoutException();
        }
        console.log(error);
    }
);

export default _axios;
