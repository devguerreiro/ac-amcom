// framework
import Head from "next/head";

// lib components
import { Box, Button, Typography } from "@mui/material";

// app components
import SaleList from "@/components/sale/SaleList";

export default function SalesPage() {
    return (
        <>
            <Head>
                <title>Vendas Realizadas</title>
            </Head>
            <Box mt={6} mx={2}>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5" component="h1">
                        Vendas Realizadas
                    </Typography>
                    <Button variant="contained">Inserir nova Venda</Button>
                </Box>
                <Box mt={6}>
                    <SaleList />
                </Box>
            </Box>
        </>
    );
}
