export interface IClient {
    id: number;
    name: string;
    email: string;
    phone: string;
}

class Client implements IClient {
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

export class ClientFactory {
    static createClient = (
        id: number,
        name: string,
        email: string,
        phone: string
    ): IClient => {
        return new Client(id, name, email, phone);
    };
}
