export interface IProduct {
    id: number;
    name: string;
    description?: string;
    price: number;
    commissionPercent: number;
}

class Product implements IProduct {
    id: number;
    name: string;
    description?: string;
    price: number;
    commissionPercent: number;

    constructor(
        id: number,
        name: string,
        price: number,
        commissionPercent: number,
        description?: string
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.commissionPercent = commissionPercent;
        this.description = description;
    }
}

export class ProductFactory {
    static createProduct(
        id: number,
        name: string,
        price: number,
        commissionPercent: number,
        description?: string
    ): IProduct {
        return new Product(id, name, price, commissionPercent, description);
    }
}
