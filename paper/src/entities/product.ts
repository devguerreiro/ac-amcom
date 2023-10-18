export default class Product {
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

export const createProduct = (
    id: number,
    name: string,
    price: number,
    commissionPercent: number,
    description?: string
): Product => {
    return new Product(id, name, price, commissionPercent, description);
};
