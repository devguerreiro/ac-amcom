import axios from "@/config/axios";

export default class SellerAPI {
    static readonly BASE_URL = "/api/v1/seller/";

    static async fetchSellers() {
        const response = await axios.get(this.BASE_URL);
        return response.data;
    }
}
