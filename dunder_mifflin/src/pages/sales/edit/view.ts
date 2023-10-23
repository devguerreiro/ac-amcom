// framework
import { NextRouter } from "next/router";
import { useContext, useMemo } from "react";

import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// app services
import { EditSaleSchema, TEditSaleSchema } from "@/domain/schemas/sale";

import SellerService from "@/services/seller";
import ClientService from "@/services/client";
import SaleService from "@/services/sale";

import SaleAPI from "@/services/api/sale";

import AppStateContext from "@/services/contexts/app";

interface IProps {
    sellersData: any;
    clientsData: any;
    saleData: any;
    router: NextRouter;
}

export default function useEditSale(props: IProps) {
    const { sellersData, clientsData, saleData, router } = props;

    const sellers = useMemo(
        () => SellerService.fromAPIList(sellersData),
        [sellersData]
    );

    const clients = useMemo(
        () => ClientService.fromAPIList(clientsData),
        [clientsData]
    );

    const sale = useMemo(
        () => SaleService.fromAPIRetrieve(saleData),
        [saleData]
    );

    const form = useForm<TEditSaleSchema>({
        resolver: zodResolver(EditSaleSchema),
        defaultValues: {
            // @ts-ignore
            client: sale.client,
            // @ts-ignore
            seller: sale.seller,
            items: sale.items,
        },
    });

    const totalPrice = form
        .getValues("items")
        .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const { feedback } = useContext(AppStateContext);

    const saveSale = (data: TEditSaleSchema) => {
        SaleAPI.saveSale(sale.id, data)
            .then(() => {
                feedback.showFeedback(
                    "Venda atualizada com sucesso!",
                    "success"
                );

                router.push("/sales");
            })
            .catch((e: Error) => {
                feedback.showFeedback(e.message);
            });
    };

    const onFormInvalid = (errors: FieldErrors<TEditSaleSchema>) => {
        if (errors.items?.message) {
            feedback.showFeedback(errors.items?.message);
        }
    };

    return {
        form,
        totalPrice,
        sellers,
        clients,
        sale,
        saveSale,
        onFormInvalid,
    };
}
