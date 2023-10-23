import { useRef, useState } from "react";
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

import { Search as SearchIcon } from "@mui/icons-material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import SaleAPI from "@/services/api/sale";
import { convertToBRL } from "@/utils";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";

const tomorrow = dayjs().add(1, "day");

export default function Commissions() {
    const [commissions, setCommissions] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    const getCommissions = () => {
        if (startDate && endDate) {
            SaleAPI.fetchCommissions(
                startDate.format("DD/MM/YYYY"),
                endDate.format("DD/MM/YYYY")
            ).then((data) => {
                setCommissions(data);
            });
        }
    };

    const totalPeriod = () => {
        return commissions.reduce((acc, v: any) => acc + v.total_commission, 0);
    };

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
                        <DatePicker
                            onChange={(e, { validationError }) => {
                                setStartDate(e as Dayjs | null);
                                setHasError(!!validationError);
                            }}
                            label="Início Período"
                        />
                        <DatePicker
                            onChange={(e, { validationError }) => {
                                setEndDate(e);
                                setHasError(!!validationError);
                            }}
                            label="Fim Período"
                            maxDate={tomorrow}
                        />
                    </LocalizationProvider>
                    <Button
                        variant="contained"
                        onClick={getCommissions}
                        disabled={hasError || !startDate || !endDate}
                    >
                        <SearchIcon></SearchIcon>
                    </Button>
                </Box>
                <TableContainer sx={{ my: 8 }} component={Paper}>
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
                            {commissions.map((c: any) => (
                                <TableRow key={c.id}>
                                    <TableCell>{c.id}</TableCell>
                                    <TableCell>{c.seller}</TableCell>
                                    <TableCell>{c.total_quantity}</TableCell>
                                    <TableCell>
                                        {convertToBRL(c.total_commission)}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {commissions.length > 0 ? (
                                <TableRow
                                    sx={{
                                        color: "warning.dark",
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
                                    <TableCell>
                                        {convertToBRL(totalPeriod())}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={10}
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        Para visualizar o relatório, selecione
                                        um período nos campos acima.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}
