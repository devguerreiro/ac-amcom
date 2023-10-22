import axios from "@/config/axios";

import { TNewSaleSchema } from "@/domain/schemas/sale";

export default class SaleAPI {
    static readonly BASE_URL = "/api/v1/sale/";

    static async fetchSales() {
        const response = await axios.get(this.BASE_URL);
        return response.data;
    }

    static async addSale(data: TNewSaleSchema) {
        const response = await axios.post(this.BASE_URL, {
            seller: data.seller.id,
            client: data.client.id,
            items: data.items.map((item) => ({
                product: item.product.id,
                quantity: item.quantity,
            })),
        });
        return response.data;
    }
}
