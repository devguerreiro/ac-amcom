export default class Client {
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
    ): Client => {
        return new Client(id, name, email, phone);
    };
}
