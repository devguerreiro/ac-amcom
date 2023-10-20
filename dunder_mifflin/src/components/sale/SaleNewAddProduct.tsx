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
import { IProduct } from "@/domain/entities/product";

interface IItem {
    product: IProduct;
    quantity: number;
}

interface IProps {
    sx: SxProps;
    onAdd: () => void;
}

export default function SaleNewProducts(props: IProps) {
    const { sx, onAdd } = props;

    const tableHeaders = [
        "Produtos/Serviços",
        "Quantidade",
        "Preço Unitário",
        "Total",
        "",
    ];

    const items: Array<IItem> = [];

    const renderTableHeader = () => {
        return tableHeaders.map((header: string) => (
            <TableCell key={header}>{header}</TableCell>
        ));
    };

    const renderTableRows = () => {
        return items.map((item: IItem) => (
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
        onAdd();
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
                    id="productSearch"
                    label="Buscar pelo código de barras ou descrição"
                    placeholder="Digite o código ou nome do produto"
                    size="small"
                    type="search"
                />
                <TextField
                    sx={{
                        flexShrink: 1,
                        ml: 2,
                    }}
                    id="productQuantity"
                    label="Quantidade de itens"
                    placeholder="0"
                    size="small"
                    type="number"
                />
                <Button
                    sx={{
                        ml: 2,
                    }}
                    variant="contained"
                    size="large"
                    color="secondary"
                    type="button"
                    onClick={() => addProduct()}
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
