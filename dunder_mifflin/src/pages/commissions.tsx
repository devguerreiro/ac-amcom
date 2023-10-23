import Head from "next/head";

import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { Search as SearchIcon } from "@mui/icons-material";

import "dayjs/locale/pt-br";

export default function Commissions() {
    return (
        <>
            <Head>
                <title>Comissões</title>
            </Head>
            <Box mt={6}>
                <Box display="flex" justifyContent="end" gap={2}>
                    <Typography
                        variant="h5"
                        component="h1"
                        fontWeight="bold"
                        flexGrow={1}
                        color="primary"
                    >
                        Relatório de Comissões
                    </Typography>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="pt-br"
                    >
                        <DatePicker />
                        <DatePicker />
                    </LocalizationProvider>
                    <Button variant="contained">
                        <SearchIcon></SearchIcon>
                    </Button>
                </Box>
                <TableContainer sx={{ mt: 8 }} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Cód.</TableCell>
                                <TableCell>Vendedor</TableCell>
                                <TableCell>Total de Vendas</TableCell>
                                <TableCell>Total de Comissões</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>001</TableCell>
                                <TableCell>Regina Souza</TableCell>
                                <TableCell>25</TableCell>
                                <TableCell>R$ 1.245,25</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>001</TableCell>
                                <TableCell>Regina Souza</TableCell>
                                <TableCell>25</TableCell>
                                <TableCell>R$ 1.245,25</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>001</TableCell>
                                <TableCell>Regina Souza</TableCell>
                                <TableCell>25</TableCell>
                                <TableCell>R$ 1.245,25</TableCell>
                            </TableRow>
                            <TableRow
                                sx={{
                                    color: "primary.main",
                                    fontWeight: "bold",
                                    "& .MuiTableCell-root": {
                                        color: "inherit",
                                        fontWeight: "inherit",
                                    },
                                }}
                            >
                                <TableCell>
                                    Total de Comissões do Período
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>R$ 4.122,82</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}
