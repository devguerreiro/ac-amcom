import axios from "@/config/axios";

import { Sale } from "@/domain/entities/sale";

import { TEditSaleSchema, TNewSaleSchema } from "@/domain/schemas/sale";

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

    static async deleteSale(sale: Sale) {
        const response = await axios.delete(this.BASE_URL + sale.id + "/");
        return response.data;
    }

    static async fetchSaleByID(id: number) {
        const response = await axios.get(this.BASE_URL + id + "/");
        return response.data;
    }

    static async saveSale(id: number, data: TEditSaleSchema) {
        const response = await axios.put(this.BASE_URL + id + "/", {
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
