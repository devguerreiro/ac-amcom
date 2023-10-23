import { AxiosError } from "axios";

export default class ServerException extends AxiosError {
    status: number = 500;

    constructor() {
        super(
            "Ocorreu um erro inexperado, aguarde um momento e tente novamente"
        );
    }
}
