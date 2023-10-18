import { IClient } from "./client";
import { ISeller } from "./seller";
import { IProduct } from "./product";

export interface ISaleItem {
    id: number;
    product: IProduct;
    quantity: number;

    calculateTotalSaleItem: () => number;
    calculateTotalSaleItemCommission: () => number;
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

    calculateTotalSaleItem(): number {
        return this.product.price * this.quantity;
    }

    calculateTotalSaleItemCommission(): number {
        return Number(
            (
                (this.product.commissionPercent / 100) *
                this.product.price *
                this.quantity
            ).toFixed(2)
        );
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

    calculateTotalSale: () => number;
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

    calculateTotalSale(): number {
        return this.items.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
        );
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
