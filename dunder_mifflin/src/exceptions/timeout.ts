import { AxiosError } from "axios";

export default class TimeoutException extends AxiosError {
    status: number = 503;

    constructor() {
        super("Tente novamente mais tarde");
    }
}
