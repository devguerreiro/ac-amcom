// framework
import { useCallback, useState } from "react";

import Head from "next/head";
import Link from "next/link";

// lib components
import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";

// app components
import SaleList from "@/components/sale/SaleList";

// app services
import SaleAPI from "@/services/api/sale";
import SaleService from "@/services/sale";
import SaleContext from "@/services/contexts/sale";

import { Sale } from "@/domain/entities/sale";

import Layout from "@/layouts/default";

interface IStaticProps {
    data: any;
    error?: string;
}

export async function getServerSideProps(): Promise<{ props: IStaticProps }> {
    let props: IStaticProps;

    try {
        const data = await SaleAPI.fetchSales();
        props = {
            data,
        };
    } catch (e) {
        props = {
            data: null,
            error: "Não foi possível obter as vendas",
        };
    }

    return {
        props,
    };
}

interface IProps extends IStaticProps {}

export default function SalesPage(props: IProps) {
    const { data, error } = props;

    const [sales, setSales] = useState<Array<Sale>>(
        SaleService.fromAPIList(data)
    );

    const onDelete = useCallback((sale: Sale) => {
        setSales(sales.filter((s: Sale) => s.id !== sale.id));
    }, [sales])

    return (
        <>
            <Head>
                <title>Vendas Realizadas</title>
            </Head>
            <Layout>
                {error && (
                    <Box mb={4}>
                        <Alert severity="error">
                            <AlertTitle>Falha na solicitação</AlertTitle>
                            {error}
                        </Alert>
                    </Box>
                )}
                <Box display="flex" justifyContent="space-between">
                    <Typography
                        variant="h5"
                        component="h1"
                        fontWeight="bold"
                        color="primary"
                    >
                        Vendas Realizadas
                    </Typography>
                    <Link href="/sales/new">
                        <Button variant="contained" type="button">
                            Inserir nova Venda
                        </Button>
                    </Link>
                </Box>
                <Box mt={6}>
                    <SaleContext.Provider value={{ onDelete }}>
                        <SaleList sales={sales} />
                    </SaleContext.Provider>
                </Box>
            </Layout>
        </>
    );
}
