export interface IProduct {
    id: number;
    code: string;
    description: string;
    price: number;
    commissionPercent: number;

    calculateCommission: () => number;
}

export default class Product implements IProduct {
    id: number;
    code: string;
    description: string;
    price: number;
    commissionPercent: number;

    constructor(
        id: number,
        code: string,
        description: string,
        price: number,
        commissionPercent: number
    ) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.price = price;
        this.commissionPercent = commissionPercent;
    }

    calculateCommission() {
        return this.price * (this.commissionPercent / 100);
    }
}

export class ProductFactory {
    static createProduct(
        id: number,
        code: string,
        description: string,
        price: number,
        commissionPercent: number
    ): IProduct {
        return new Product(id, code, description, price, commissionPercent);
    }
}
