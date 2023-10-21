// framework
import React from "react";

// lib components
import {
    Box,
    Button,
    MenuItem,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

// app services
import Seller from "@/domain/entities/seller";
import Client from "@/domain/entities/client";

import { convertToBRDate, convertToBRL } from "@/utils";

interface IProps {
    totalPrice: number;
    onFinish: () => void;
    onCancel: () => void;
}

export default function SaleNewSaleData(props: IProps) {
    const { totalPrice, onFinish, onCancel } = props;

    const sellers: Array<Seller> = [];
    const clients: Array<Client> = [];

    const renderSellers = () => {
        return sellers.map((seller: Seller) => (
            <MenuItem key={seller.id} value={seller.id}>
                {seller.name}
            </MenuItem>
        ));
    };

    const renderClients = () => {
        return clients.map((client: Client) => (
            <MenuItem key={client.id} value={client.id}>
                {client.name}
            </MenuItem>
        ));
    };

    return (
        <Box display="flex" flexDirection="column">
            <Typography variant="h5" component="h2">
                Dados da Venda
            </Typography>
            <Box display="flex" flexDirection="column" flexGrow={1}>
                <TextField
                    id="currentDate"
                    label="Data e Hora da Venda"
                    inputProps={{
                        readOnly: true,
                    }}
                    defaultValue={convertToBRDate(new Date())}
                    margin="normal"
                />
                <TextField
                    id="seller"
                    label="Escolha um vendedor"
                    select
                    placeholder="Selecione o nome"
                    margin="normal"
                >
                    {renderSellers()}
                </TextField>
                <TextField
                    id="client"
                    label="Escolha um cliente"
                    select
                    placeholder="Selecione o nome"
                    margin="normal"
                >
                    {renderClients()}
                </TextField>
            </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
                <Typography
                    variant="subtitle1"
                    component="strong"
                    fontWeight="bold"
                >
                    Valor total da venda:
                </Typography>
                <Typography
                    ml={8}
                    variant="h5"
                    component="strong"
                    fontWeight="bold"
                    color="success.light"
                >
                    {convertToBRL(totalPrice)}
                </Typography>
            </Box>
            <Box mt={6} display="flex" justifyContent="space-between">
                <Button color="error" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    onClick={onFinish}
                >
                    Finalizar
                </Button>
            </Box>
        </Box>
    );
}
