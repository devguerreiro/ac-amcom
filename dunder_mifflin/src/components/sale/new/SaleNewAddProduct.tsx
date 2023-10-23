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
import useAddProduct from "@/components/sale/new/SaleNewAddProduct.view";

// app components
import SaleNewAddProductList from "./SaleNewAddProductList";

interface IProps {
    sx?: SxProps;
}

export default memo(function SaleNewAddProduct(props: IProps) {
    const { sx } = props;

    const {
        productOptions,
        isFetchingOptions,
        debouncedFetchOptions,
        saleItems,
        form,
        productController,
        getProductLabel,
        isProductOptionToValue,
        setProduct,
        addProduct,
        saveChange,
        removeProduct,
    } = useAddProduct();

    const {
        formState: { errors, isValid },
    } = form;

    return (
        <Box sx={sx}>
            <Typography
                variant="h5"
                component="h2"
                color="primary"
                fontWeight="bold"
            >
                Produtos
            </Typography>
            <Box mt={2} display="flex" alignItems="start" gap={2}>
                <Autocomplete
                    sx={{
                        flexGrow: 1,
                    }}
                    {...productController.field}
                    onChange={setProduct}
                    autoHighlight
                    clearOnEscape
                    filterSelectedOptions
                    options={productOptions}
                    filterOptions={(x) => x}
                    getOptionLabel={getProductLabel}
                    isOptionEqualToValue={isProductOptionToValue}
                    loading={isFetchingOptions}
                    loadingText="Buscando produtos..."
                    noOptionsText="Nenhum produto encontrado"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={!!productController.formState.errors.product}
                            helperText={
                                productController.formState.errors.product
                                    ?.message
                            }
                            label="Buscar pelo código de barras ou descrição"
                            placeholder="Digite o código ou nome do produto"
                            size="small"
                            onChange={debouncedFetchOptions}
                        />
                    )}
                />
                <TextField
                    sx={{
                        flexShrink: 1,
                    }}
                    {...form.register("quantity")}
                    error={!!errors.product}
                    helperText={errors.product?.message}
                    label="Quantidade de itens"
                    placeholder="0"
                    size="small"
                    type="number"
                />
                <Button
                    variant="contained"
                    size="large"
                    color="warning"
                    type="button"
                    onClick={addProduct}
                    disabled={!isValid}
                >
                    Adicionar
                </Button>
            </Box>
            <SaleNewAddProductList
                saleItems={saleItems}
                onSaveChange={saveChange}
                onRemove={removeProduct}
            />
        </Box>
    );
});
