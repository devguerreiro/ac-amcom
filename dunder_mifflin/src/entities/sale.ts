import { IClient } from "./client";
import { ISeller } from "./seller";
import { IProduct } from "./product";

export interface ISaleItem {
    id: number;
    product: IProduct;
    quantity: number;

    calculateTotalPrice: () => number;
    calculateTotalCommission: () => number;
}

class SaleItem implements ISaleItem {
    id: number;
    product: IProduct;
    quantity: number;

    constructor(id: number, product: IProduct, quantity: number) {
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
        product: IProduct,
        quantity: number
    ): ISaleItem {
        return new SaleItem(id, product, quantity);
    }
}

export interface ISale {
    id: number;
    nfe: string;
    client: IClient;
    seller: ISeller;
    items: Array<ISaleItem>;
    createdAt: string;

    calculateTotalPrice: () => number;
    calculateTotalCommission: () => number;

    totalItemsQuantity: number;
}

class Sale implements ISale {
    id: number;
    nfe: string;
    client: IClient;
    seller: ISeller;
    items: Array<ISaleItem>;
    createdAt: string;

    constructor(
        id: number,
        nfe: string,
        client: IClient,
        seller: ISeller,
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
        client: IClient,
        seller: ISeller,
        items: Array<ISaleItem>,
        createdAt: string
    ): ISale {
        return new Sale(id, nfe, client, seller, items, createdAt);
    }
}
