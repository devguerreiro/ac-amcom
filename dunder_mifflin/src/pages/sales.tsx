// framework
import Head from "next/head";
import Link from "next/link";

// lib components
import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";

// app components
import SaleList from "@/components/sale/SaleList";

// app services
import { ISale } from "@/domain/entities/sale";
import SaleAPI from "@/services/api/sale";
import SaleService from "@/services/sale";

interface IStaticProps {
    data: any;
    error?: string;
}

export async function getStaticProps(): Promise<{ props: IStaticProps }> {
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

    let sales: Array<ISale> = [];

    if (!error) {
        sales = SaleService.fromAPIList(data);
    }

    return (
        <>
            <Head>
                <title>Vendas Realizadas</title>
            </Head>
            <Box mt={6} mx={2}>
                {error && (
                    <Box mb={4}>
                        <Alert severity="error">
                            <AlertTitle>Falha na solicitação</AlertTitle>
                            {error}
                        </Alert>
                    </Box>
                )}
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5" component="h1">
                        Vendas Realizadas
                    </Typography>
                    <Link href="/sales/new">
                        <Button variant="contained" type="button">
                            Inserir nova Venda
                        </Button>
                    </Link>
                </Box>
                <Box mt={6}>
                    <SaleList sales={sales} />
                </Box>
            </Box>
        </>
    );
}
