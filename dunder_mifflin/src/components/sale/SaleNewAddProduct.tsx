// framework
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// lib components
import {
    Box,
    Button,
    IconButton,
    Paper,
    SxProps,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";

import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

// app services
import { convertToBRL } from "@/utils";
import { ISaleItem } from "@/domain/entities/sale";
import {
    AddProductSchema,
    TAddProductSchema,
} from "./SaleNewAddProduct.schemas";

interface IProps {
    sx: SxProps;
    onAdd: () => void;
}

export default function SaleNewProducts(props: IProps) {
    const { sx, onAdd } = props;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TAddProductSchema>({
        resolver: zodResolver(AddProductSchema),
    });

    const tableHeaders = [
        "Produtos/Serviços",
        "Quantidade",
        "Preço Unitário",
        "Total",
        "",
    ];

    const items: Array<ISaleItem> = [];

    const renderTableHeader = () => {
        return tableHeaders.map((header: string) => (
            <TableCell key={header}>{header}</TableCell>
        ));
    };

    const renderTableRows = () => {
        return items.map((item: ISaleItem) => (
            <TableRow key={item.product.id}>
                <TableCell>
                    {item.product.code} - {item.product.description}
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{convertToBRL(item.product.price)}</TableCell>
                <TableCell>
                    {convertToBRL(item.product.price * item.quantity)}
                </TableCell>
                <TableCell>
                    <IconButton size="small" aria-label="editar item">
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        color="error"
                        aria-label="remover item"
                    >
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        ));
    };

    const addProduct = () => {
        handleSubmit(onAdd)();
    };

    return (
        <Box sx={sx}>
            <Typography variant="h5" component="h2">
                Produtos
            </Typography>
            <Box mt={2} display="flex" alignItems="center">
                <TextField
                    sx={{
                        flexGrow: 1,
                    }}
                    {...register("product")}
                    error={!!errors.product}
                    helperText={errors.product?.message}
                    label="Buscar pelo código de barras ou descrição"
                    placeholder="Digite o código ou nome do produto"
                    size="small"
                    type="search"
                    required
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
                        alignSelf: "start"
                    }}
                    variant="contained"
                    size="large"
                    color="secondary"
                    type="button"
                    onClick={addProduct}
                >
                    Adicionar
                </Button>
            </Box>
            <TableContainer
                component={Paper}
                elevation={1}
                sx={{
                    mt: 4,
                    maxHeight: 450,
                    "& .MuiTableCell-root": {
                        border: "none",
                    },
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>{renderTableHeader()}</TableRow>
                    </TableHead>
                    <TableBody>{renderTableRows()}</TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
