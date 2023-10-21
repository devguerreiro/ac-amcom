// framework
import { useState } from "react";

// app services
import SellerAPI from "../api/seller";
import SellerService from "../seller";

import Seller from "@/domain/entities/seller";

export default function useFetchSellers() {
    const [sellers, setSellers] = useState<Array<Seller>>([]);

    const fetchSellers = async () => {
        try {
            const data = await SellerAPI.fetchSellers();
            const sellers = SellerService.fromAPIList(data);
            setSellers(sellers);
        } catch (e) {
            setSellers([]);
        }
    };

    return {
        sellers,
        fetchSellers,
    };
}
