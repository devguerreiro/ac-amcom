// framework
import { memo } from "react";

// lib components
import {
    Autocomplete,
    Box,
    Button,
    SxProps,
    TextField,
    Typography,
} from "@mui/material";

// app services
import Seller from "@/domain/entities/seller";
import Client from "@/domain/entities/client";

import useSaleData from "./SaleNewSaleData.view";

import { convertToBRDate, convertToBRL } from "@/utils";

interface IProps {
    sx?: SxProps;
    totalPrice: number;
    sellers: Array<Seller>;
    clients: Array<Client>;
    onCancel: () => void;
}

export default memo(function SaleNewSaleData(props: IProps) {
    const { sx, totalPrice, sellers, clients, onCancel } = props;

    const {
        form,
        setSeller,
        setClient,
        getSellerLabel,
        getClientLabel,
        isClientOptionEqualToValue,
        isSellerOptionEqualToValue,
    } = useSaleData();

    const {
        formState: { errors },
    } = form;

    return (
        <Box sx={sx} display="flex" flexDirection="column">
            <Typography variant="h5" component="h2">
                Dados da Venda
            </Typography>
            <Box display="flex" flexDirection="column" flexGrow={1}>
                <TextField
                    label="Data e Hora da Venda"
                    inputProps={{
                        readOnly: true,
                    }}
                    defaultValue={convertToBRDate(new Date())}
                    margin="normal"
                />
                <Autocomplete
                    {...form.register("seller")}
                    onChange={setSeller}
                    autoHighlight
                    autoComplete
                    clearOnEscape
                    filterSelectedOptions
                    options={sellers}
                    getOptionLabel={getSellerLabel}
                    isOptionEqualToValue={isSellerOptionEqualToValue}
                    noOptionsText="Nenhum vendedor encontrado"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={!!errors.seller}
                            helperText={errors.seller?.message}
                            label="Escolha um vendedor"
                            placeholder="Selecione o nome"
                            required
                            margin="normal"
                        />
                    )}
                />
                <Autocomplete
                    {...form.register("client")}
                    onChange={setClient}
                    autoHighlight
                    autoComplete
                    clearOnEscape
                    filterSelectedOptions
                    options={clients}
                    getOptionLabel={getClientLabel}
                    isOptionEqualToValue={isClientOptionEqualToValue}
                    noOptionsText="Nenhum cliente encontrado"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={!!errors.client}
                            helperText={errors.client?.message}
                            label="Escolha um cliente"
                            placeholder="Selecione o nome"
                            required
                            margin="normal"
                        />
                    )}
                />
            </Box>
            <Box
                mt={4}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="end"
                gap={1}
            >
                <Typography
                    variant="subtitle1"
                    component="strong"
                    fontWeight="bold"
                >
                    Valor total da venda:
                </Typography>
                <Typography
                    variant="h5"
                    component="strong"
                    fontWeight="bold"
                    color="success.light"
                    sx={{
                        wordBreak: "break-word",
                    }}
                >
                    {convertToBRL(totalPrice)}
                </Typography>
            </Box>
            <Box mt={6} display="flex" justifyContent="space-between">
                <Button color="error" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button variant="contained" type="submit" size="large">
                    Finalizar
                </Button>
            </Box>
        </Box>
    );
});
