// framework
import Head from "next/head";

// lib components
import { Box, Divider } from "@mui/material";

// app components
import SaleNewAddProduct from "@/components/sale/SaleNewAddProduct";
import SaleNewSaleData from "@/components/sale/SaleNewSaleData";
import { useRouter } from "next/router";

export default function SalesNewPage() {
    const router = useRouter();

    const totalPrice = 7.5;

    return (
        <>
            <Head>
                <title>Nova Venda</title>
            </Head>
            <Box mt={6} mx={2}>
                <form
                    onSubmit={() => {}}
                    style={{
                        display: "flex",
                    }}
                >
                    <SaleNewAddProduct sx={{ flexGrow: 1 }} onAdd={() => {}} />
                    <Divider
                        variant="middle"
                        orientation="vertical"
                        flexItem
                        sx={{
                            mx: 6,
                        }}
                    />
                    <SaleNewSaleData
                        totalPrice={totalPrice}
                        onFinish={() => {}}
                        onCancel={() => router.back()}
                    />
                </form>
            </Box>
        </>
    );
}
