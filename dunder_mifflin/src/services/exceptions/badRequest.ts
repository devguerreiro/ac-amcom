import { AxiosError } from "axios";

export default class BadRequestException extends AxiosError {
    status: number = 400;

    constructor() {
        super("Verifique os campos e tente novamente");
    }
}
