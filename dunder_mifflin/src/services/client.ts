import Client, { ClientFactory } from "@/domain/entities/client";

export default class ClientService {
    static fromAPIList(data: any): Array<Client> {
        return data.map((item: any) => {
            return ClientFactory.createClient(
                item.id,
                item.name,
                item.email,
                item.phone
            );
        });
    }
}
