// framework
import { useState } from "react";

// app services
import ClientAPI from "../api/client";
import ClientService from "../client";

import Client from "@/domain/entities/client";

export default function useFetchClients() {
    const [clients, setClients] = useState<Array<Client>>([]);

    const fetchClients = async () => {
        try {
            const data = await ClientAPI.fetchClients();
            const clients = ClientService.fromAPIList(data);
            setClients(clients);
        } catch (e) {
            setClients([]);
        }
    };

    return {
        clients,
        fetchClients,
    };
}
