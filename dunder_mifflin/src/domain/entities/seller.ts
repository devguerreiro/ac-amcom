export interface ISeller {
    id: number;
    name: string;
    email: string;
    phone: string;
}

class Seller implements ISeller {
    id: number;
    name: string;
    email: string;
    phone: string;

    constructor(id: number, name: string, email: string, phone: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}

export class SellerFactory {
    static createSeller = (
        id: number,
        name: string,
        email: string,
        phone: string
    ): ISeller => {
        return new Seller(id, name, email, phone);
    };
}
