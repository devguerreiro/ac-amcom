import { useState } from "react";
import Head from "next/head";

import { Box, Button, Typography } from "@mui/material";

import { Search as SearchIcon } from "@mui/icons-material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";

import Layout from "@/layouts/default";

import CommissionList from "@/components/commission/CommissionList";

import useFetchCommissions from "@/services/hooks/commission";

const TODAY = dayjs();

export default function Commissions() {
    const [hasError, setHasError] = useState(false);
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    const { commissions, getCommissions } = useFetchCommissions();

    return (
        <>
            <Head>
                <title>Relatório de Comissões</title>
            </Head>
            <Layout>
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
                                if (validationError) {
                                    setHasError(!!validationError);
                                }
                            }}
                            label="Início Período"
                        />
                        <DatePicker
                            onChange={(e, { validationError }) => {
                                setEndDate(e);
                                if (validationError) {
                                    setHasError(!!validationError);
                                }
                            }}
                            label="Fim Período"
                            maxDate={TODAY}
                        />
                    </LocalizationProvider>
                    <Button
                        variant="contained"
                        onClick={() => getCommissions(startDate, endDate)}
                        disabled={hasError || !startDate || !endDate}
                    >
                        <SearchIcon></SearchIcon>
                    </Button>
                </Box>
                <CommissionList commissions={commissions} />
            </Layout>
        </>
    );
}
