// framework
import { ChangeEvent } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// lib components
import {
    Autocomplete,
    Box,
    Button,
    SxProps,
    TextField,
    Typography,
} from "@mui/material";

import debounce from "@mui/utils/debounce";

// app services
import useFetchProducts from "@/services/hooks/product";

import Product from "@/domain/entities/product";

// app components
import SaleNewAddProductList from "./SaleNewAddProductList";
import AddProductSchema, {
    TAddProductSchema,
} from "./SaleNewAddProduct.schemas";

interface IProps {
    sx: SxProps;
    onAdd: () => void;
}

export default function SaleNewProducts(props: IProps) {
    const { sx, onAdd } = props;

    const { products, isSearching, searchProducts } = useFetchProducts();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm<TAddProductSchema>({
        resolver: zodResolver(AddProductSchema),
    });

    const addProduct = (data: TAddProductSchema) => {
        onAdd();
    };

    const debouncedProductSearch = debounce(
        async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const query = e.target.value;
            await searchProducts(query);
        },
        500
    );

    return (
        <Box sx={sx}>
            <Typography variant="h5" component="h2">
                Produtos
            </Typography>
            <Box mt={2} display="flex" alignItems="start">
                <Autocomplete
                    sx={{
                        flexGrow: 1,
                    }}
                    {...register("product")}
                    autoHighlight
                    clearOnEscape
                    filterSelectedOptions
                    options={products}
                    filterOptions={(x) => x}
                    getOptionLabel={(option: Product) => option.label}
                    isOptionEqualToValue={(option: Product, value: Product) =>
                        option.equal(value)
                    }
                    loading={isSearching}
                    loadingText="Buscando produtos..."
                    noOptionsText="Nenhum produto encontrado"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={!!errors.product}
                            helperText={errors.product?.message}
                            label="Buscar pelo código de barras ou descrição"
                            placeholder="Digite o código ou nome do produto"
                            size="small"
                            required
                            onChange={debouncedProductSearch}
                        />
                    )}
                    onChange={(_, value) => {
                        // @ts-ignore
                        setValue("product", value, {
                            shouldValidate: true,
                        });
                    }}
                />
                <TextField
                    sx={{
                        flexShrink: 1,
                        ml: 2,
                    }}
                    {...register("quantity")}
                    error={!!errors.quantity}
                    helperText={errors.quantity?.message}
                    label="Quantidade de itens"
                    placeholder="0"
                    size="small"
                    type="number"
                    required
                />
                <Button
                    sx={{
                        ml: 2,
                    }}
                    variant="contained"
                    size="large"
                    color="secondary"
                    type="button"
                    onClick={handleSubmit(addProduct)}
                    disabled={!isValid}
                >
                    Adicionar
                </Button>
            </Box>
            <SaleNewAddProductList />
        </Box>
    );
}
