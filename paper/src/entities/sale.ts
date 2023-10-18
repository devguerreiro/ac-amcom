import Client from "./client";
import Seller from "./seller";
import Product from "./product";

class SaleItem {
    id: number;
    product: Product;
    quantity: number;

    constructor(id: number, product: Product, quantity: number) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
    }
}

export default class Sale {
    id!: number;
    nfe!: string;
    client!: Client;
    seller!: Seller;
    items!: SaleItem[];
    createdAt!: string;

    constructor() {}
}

export const createSale = () => {
    const sale = new Sale();

    return {
        setBase(id: number, nfe: string, createdAt: string) {
            sale.id = id;
            sale.nfe = nfe;
            sale.createdAt = createdAt;
            sale.items = [];
            return this;
        },
        setClient(id: number, name: string, email: string, phone: string) {
            sale.client = new Client(id, name, email, phone);
            return this;
        },
        setSeller(id: number, name: string, email: string, phone: string) {
            sale.seller = new Seller(id, name, email, phone);
            return this;
        },
        addSaleItem(id: number, product: Product, quantity: number) {
            sale.items.push(new SaleItem(id, product, quantity));
            return this;
        },
        make() {
            return sale;
        },
    };
};
