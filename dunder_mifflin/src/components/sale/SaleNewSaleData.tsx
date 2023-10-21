// framework
import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// lib components
import {
    Autocomplete,
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";

// app services
import Seller from "@/domain/entities/seller";
import Client from "@/domain/entities/client";

import SaleDataSchema, { TSaleDataSchema } from "./SaleNewSaleData.schemas";

import { convertToBRDate, convertToBRL } from "@/utils";

interface IProps {
    totalPrice: number;
    sellers: Array<Seller>;
    clients: Array<Client>;
    onFinish: () => void;
    onCancel: () => void;
}

export default function SaleNewSaleData(props: IProps) {
    const { totalPrice, sellers, clients, onFinish, onCancel } = props;

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm<TSaleDataSchema>({
        resolver: zodResolver(SaleDataSchema),
    });

    return (
        <Box display="flex" flexDirection="column">
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
                    {...register("seller")}
                    autoHighlight
                    clearOnEscape
                    filterSelectedOptions
                    options={sellers}
                    getOptionLabel={(option: Seller) => option.name}
                    isOptionEqualToValue={(option: Seller, value: Seller) =>
                        option.equal(value)
                    }
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
                    onChange={(_, value) => {
                        // @ts-ignore
                        setValue("seller", value && value.id, {
                            shouldValidate: true,
                        });
                    }}
                />
                <Autocomplete
                    {...register("client")}
                    autoHighlight
                    clearOnEscape
                    filterSelectedOptions
                    options={clients}
                    getOptionLabel={(option: Client) => option.name}
                    isOptionEqualToValue={(option: Client, value: Client) =>
                        option.equal(value)
                    }
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
                    onChange={(_, value) => {
                        // @ts-ignore
                        setValue("client", value && value.id, {
                            shouldValidate: true,
                        });
                    }}
                />
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
                    onClick={handleSubmit(onFinish)}
                    disabled={!isValid}
                >
                    Finalizar
                </Button>
            </Box>
        </Box>
    );
}
