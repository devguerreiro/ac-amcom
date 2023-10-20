import axios from "@/config/axios";

export default class SaleAPI {
    static readonly BASE_URL = "/api/v1/sale/";

    static async fetchSales() {
        const response = await axios.get(this.BASE_URL);
        return response.data;
    }
}
