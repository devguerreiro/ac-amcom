// framework
import { useMemo } from "react";

import Head from "next/head";
import Link from "next/link";

// lib components
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from "@mui/material";

// app components
import SaleList from "@/components/sale/SaleList";

// app services
import SaleAPI from "@/services/api/sale";
import SaleService from "@/services/sale";

import { Sale } from "@/domain/entities/sale";
import { SaleContext } from "@/services/contexts/sale";

import useSales from "./sales.view";

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

    let sales: Array<Sale> = useMemo(
        () => SaleService.fromAPIList(data),
        [data]
    );

    const {
        isDeleteDialogOpened,
        openDeleteDialog,
        closeDeleteDialog,
        confirmDeletion,
    } = useSales();

    return (
        <>
            <Head>
                <title>Vendas Realizadas</title>
            </Head>
            <Dialog
                open={isDeleteDialogOpened}
                onClose={closeDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" color="error">
                    Confirmação de exclusão
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deseja realmente excluir esta venda?{" "}
                        <strong>Esta ação não poderá ser revertida</strong>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog}>Não</Button>
                    <Button onClick={confirmDeletion} autoFocus color="error">
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
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
                    <SaleContext.Provider
                        value={{
                            openDeleteDialog,
                        }}
                    >
                        <SaleList sales={sales} />
                    </SaleContext.Provider>
                </Box>
            </Box>
        </>
    );
}
