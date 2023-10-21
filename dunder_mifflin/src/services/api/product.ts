import axios from "@/config/axios";

export default class ProductAPI {
    static readonly BASE_URL = "/api/v1/product/";

    static async fetchProducts(params?: Record<string, string>) {
        const response = await axios.get(this.BASE_URL, {
            params: new URLSearchParams(params),
        });
        return response.data;
    }
}
