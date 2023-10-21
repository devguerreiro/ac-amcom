export default class Product {
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

    get label() {
        return `${this.code} - ${this.description}`;
    }

    equal(obj: Product) {
        return this.id === obj.id;
    }
}

export class ProductFactory {
    static createProduct(
        id: number,
        code: string,
        description: string,
        price: number,
        commissionPercent: number
    ): Product {
        return new Product(id, code, description, price, commissionPercent);
    }
}
