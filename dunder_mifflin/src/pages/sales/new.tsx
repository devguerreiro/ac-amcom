// framework
import { useRouter } from "next/router";
import Head from "next/head";

import { FormProvider } from "react-hook-form";

// lib components
import { Box, Divider } from "@mui/material";

// app components
import SaleNewAddProduct from "@/components/sale/new/SaleNewAddProduct";
import SaleNewSaleData from "@/components/sale/new/SaleNewSaleData";

// app services
import SellerAPI from "@/services/api/seller";
import ClientAPI from "@/services/api/client";

import useNewSale from "./new.view";

interface IStaticProps {
    sellersData: any;
    clientsData: any;
}

export async function getStaticProps(): Promise<{ props: IStaticProps }> {
    const [sellersData, clientsData] = await Promise.all([
        SellerAPI.fetchSellers(),
        ClientAPI.fetchClients(),
    ]);

    return {
        props: {
            sellersData,
            clientsData,
        },
    };
}

interface IProps extends IStaticProps {}

export default function SalesNewPage(props: IProps) {
    console.log("NEW PAGE");

    const router = useRouter();

    const { form, sellers, clients, totalPrice, finishSale } =
        useNewSale(props);

    return (
        <>
            <Head>
                <title>Nova Venda</title>
            </Head>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(finishSale)}>
                    <Box mt={6} mx={2} display="flex" gap={6}>
                        <SaleNewAddProduct sx={sxSaleNewAddProduct} />
                        <Divider
                            variant="middle"
                            orientation="vertical"
                            flexItem
                        />
                        <SaleNewSaleData
                            sx={sxSaleNewSaleData}
                            totalPrice={totalPrice}
                            sellers={sellers}
                            clients={clients}
                            onCancel={router.back}
                        />
                    </Box>
                </form>
            </FormProvider>
        </>
    );
}

const sxSaleNewSaleData = {
    minWidth: 300,
};

const sxSaleNewAddProduct = { flex: 1 };
