// framework
import { useRouter } from "next/router";
import Head from "next/head";

// lib components
import { Box, Divider } from "@mui/material";

// app components
import SaleNewAddProduct from "@/components/sale/SaleNewAddProduct";
import SaleNewSaleData from "@/components/sale/SaleNewSaleData";

// app services
import SellerAPI from "@/services/api/seller";
import ClientAPI from "@/services/api/client";
import SellerService from "@/services/seller";
import ClientService from "@/services/client";

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
    const { sellersData, clientsData } = props;

    const sellers = SellerService.fromAPIList(sellersData);
    const clients = ClientService.fromAPIList(clientsData);

    const router = useRouter();

    const totalPrice = 7.5;

    const finishSale = () => {
        console.log("Finish!!!");
    };

    return (
        <>
            <Head>
                <title>Nova Venda</title>
            </Head>
            <Box mt={6} mx={2}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
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
                        sellers={sellers}
                        clients={clients}
                        onFinish={finishSale}
                        onCancel={router.back}
                    />
                </form>
            </Box>
        </>
    );
}
