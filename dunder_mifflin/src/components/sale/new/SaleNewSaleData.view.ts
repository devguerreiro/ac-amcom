// framework
import { useFormContext } from "react-hook-form";

// app services
import Seller from "@/domain/entities/seller";
import Client from "@/domain/entities/client";

import { TNewSaleSchema } from "@/domain/schemas/sale";

export default function useSaleData() {
    const form = useFormContext<TNewSaleSchema>();

    // @ts-ignore
    const setSeller = (_: any, v: Seller | null) => form.setValue("seller", v);

    // @ts-ignore
    const setClient = (_: any, v: Client | null) => form.setValue("client", v);

    const getSellerLabel = (option: Seller) => option.name;

    const isSellerOptionEqualToValue = (option: Seller, value: Seller) =>
        option.id === value.id;

    const getClientLabel = (option: Client) => option.name;

    const isClientOptionEqualToValue = (option: Client, value: Client) =>
        option.id === value.id;

    return {
        form,
        setSeller,
        setClient,
        getSellerLabel,
        getClientLabel,
        isClientOptionEqualToValue,
        isSellerOptionEqualToValue,
    };
}
