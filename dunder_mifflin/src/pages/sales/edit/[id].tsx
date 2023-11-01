// framework
import { memo } from "react";

import { useRouter } from "next/router";
import Head from "next/head";

import { FormProvider } from "react-hook-form";

// lib components
import { Box, Divider } from "@mui/material";

// app components
import SaleEditAddProduct from "@/components/sale/edit/SaleEditAddProduct";
import SaleEditSaleData from "@/components/sale/edit/SaleEditSaleData";

// app services
import SellerAPI from "@/services/api/seller";
import ClientAPI from "@/services/api/client";
import SaleAPI from "@/services/api/sale";

import useEditSale from "./view";

import Layout from "@/layouts/default";

export async function getStaticPaths() {
    const sales = await SaleAPI.fetchSales();
    const paths = sales.map((sale: any) => ({
        params: {
            id: String(sale.id),
        },
    }));
    return { paths, fallback: true };
}

interface IStaticProps {
    sellersData: any;
    clientsData: any;
    saleData: any;
}

export async function getStaticProps({
    params,
}: any): Promise<{ props: IStaticProps }> {
    const [sellersData, clientsData, saleData] = await Promise.all([
        SellerAPI.fetchSellers(),
        ClientAPI.fetchClients(),
        SaleAPI.fetchSaleByID(params.id),
    ]);

    return {
        props: {
            sellersData,
            clientsData,
            saleData,
        },
    };
}

interface IProps extends IStaticProps {}

export default memo(function SalesEditPage(props: IProps) {
    const { sellersData, clientsData, saleData } = props;

    const router = useRouter();

    const {
        form,
        sellers,
        clients,
        sale,
        totalPrice,
        saveSale,
        onFormInvalid,
    } = useEditSale({ sellersData, clientsData, saleData, router });

    return (
        <>
            <Head>
                <title>Editar Venda</title>
            </Head>
            <Layout>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(saveSale, onFormInvalid)}>
                        <Box mt={6} mx={2} display="flex" gap={6}>
                            <SaleEditAddProduct sx={sxSaleEditAddProduct} />
                            <Divider
                                variant="middle"
                                orientation="vertical"
                                flexItem
                            />
                            <SaleEditSaleData
                                sx={sxSaleEditSaleData}
                                totalPrice={totalPrice}
                                sellers={sellers}
                                clients={clients}
                                sale={sale}
                                onCancel={router.back}
                            />
                        </Box>
                    </form>
                </FormProvider>
            </Layout>
        </>
    );
});

const sxSaleEditSaleData = {
    minWidth: 300,
};

const sxSaleEditAddProduct = { flex: 1 };
