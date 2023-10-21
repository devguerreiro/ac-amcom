// lib components
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

// app services
import { SaleItem } from "@/domain/entities/sale";

import { convertToBRL } from "@/utils";

export default function SaleNewProducts() {
    const tableHeaders = [
        "Produtos/Serviços",
        "Quantidade",
        "Preço Unitário",
        "Total",
        "",
    ];

    const items: Array<SaleItem> = [];

    const renderTableHeader = () => {
        return tableHeaders.map((header: string) => (
            <TableCell key={header}>{header}</TableCell>
        ));
    };

    const renderTableRows = () => {
        return items.map((item: SaleItem) => (
            <TableRow key={item.product.id}>
                <TableCell>{item.product.label}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{convertToBRL(item.product.price)}</TableCell>
                <TableCell>
                    {convertToBRL(item.calculateTotalPrice())}
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

    return (
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
    );
}
