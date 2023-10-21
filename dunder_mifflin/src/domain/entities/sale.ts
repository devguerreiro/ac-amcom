import Client from "./client";
import Seller from "./seller";
import Product from "./product";

export class SaleItem {
    id: number;
    product: Product;
    quantity: number;

    constructor(id: number, product: Product, quantity: number) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
    }

    calculateTotalPrice(): number {
        return this.product.price * this.quantity;
    }

    calculateTotalCommission(): number {
        return this.product.calculateCommission() * this.quantity;
    }
}

export class SaleItemFactory {
    static createSaleItem(
        id: number,
        product: Product,
        quantity: number
    ): SaleItem {
        return new SaleItem(id, product, quantity);
    }
}

export class Sale {
    id: number;
    nfe: string;
    client: Client;
    seller: Seller;
    items: Array<SaleItem>;
    createdAt: string;

    constructor(
        id: number,
        nfe: string,
        client: Client,
        seller: Seller,
        items: SaleItem[],
        createdAt: string
    ) {
        this.id = id;
        this.nfe = nfe;
        this.client = client;
        this.seller = seller;
        this.items = items;
        this.createdAt = createdAt;
    }

    calculateTotalPrice(): number {
        return this.items.reduce(
            (acc, item) => acc + item.calculateTotalPrice(),
            0
        );
    }

    calculateTotalCommission(): number {
        return this.items.reduce(
            (acc, item) => acc + item.calculateTotalCommission(),
            0
        );
    }

    get totalItemsQuantity(): number {
        return this.items.reduce((acc, item) => acc + item.quantity, 0);
    }
}

export class SaleFactory {
    static createSale(
        id: number,
        nfe: string,
        client: Client,
        seller: Seller,
        items: Array<SaleItem>,
        createdAt: string
    ): Sale {
        return new Sale(id, nfe, client, seller, items, createdAt);
    }
}
