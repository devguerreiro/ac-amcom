// framework
import { useMemo } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// app services
import SellerService from "@/services/seller";
import ClientService from "@/services/client";

import NewSaleSchema, { TNewSaleSchema } from "@/domain/schemas/sale";

interface IProps {
    sellersData: any;
    clientsData: any;
}

export default function useNewSale(props: IProps) {
    const { sellersData, clientsData } = props;

    const form = useForm<TNewSaleSchema>({
        resolver: zodResolver(NewSaleSchema),
        defaultValues: {
            // @ts-ignore
            client: null,
            // @ts-ignore
            seller: null,
            items: [],
        },
    });

    const totalPrice = form
        .getValues("items")
        .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const sellers = useMemo(
        () => SellerService.fromAPIList(sellersData),
        [sellersData]
    );

    const clients = useMemo(
        () => ClientService.fromAPIList(clientsData),
        [clientsData]
    );

    const finishSale = () => {
        console.log("Finish!!!");
    };

    return {
        form,
        totalPrice,
        sellers,
        clients,
        finishSale,
    };
}
