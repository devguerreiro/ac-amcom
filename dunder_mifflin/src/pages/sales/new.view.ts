// framework
import { NextRouter } from "next/router";
import { useContext, useMemo } from "react";

import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// app services
import NewSaleSchema, { TNewSaleSchema } from "@/domain/schemas/sale";

import SellerService from "@/services/seller";
import ClientService from "@/services/client";

import SaleAPI from "@/services/api/sale";
import { FeedbackContext } from "@/services/hooks/feedback";

interface IProps {
    sellersData: any;
    clientsData: any;
    router: NextRouter;
}

export default function useNewSale(props: IProps) {
    const { sellersData, clientsData, router } = props;

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

    const { showFeedback } = useContext(FeedbackContext);

    const finishSale = (data: TNewSaleSchema) => {
        SaleAPI.addSale(data)
            .then(() => {
                showFeedback("Venda finalizada com sucesso!", "success");

                router.push("/sales");
            })
            .catch((e: Error) => {
                showFeedback(e.message);
            });
    };

    const onFormInvalid = (errors: FieldErrors<TNewSaleSchema>) => {
        if (errors.items?.message) {
            showFeedback(errors.items?.message);
        }
    };

    return {
        form,
        totalPrice,
        sellers,
        clients,
        finishSale,
        onFormInvalid,
    };
}
