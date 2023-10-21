import axios from "@/config/axios";

export default class ClientAPI {
    static readonly BASE_URL = "/api/v1/client/";

    static async fetchClients() {
        const response = await axios.get(this.BASE_URL);
        return response.data;
    }
}
