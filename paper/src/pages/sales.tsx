import { useState } from "react";

import {
    Box,
    Button,
    Collapse,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import {
    KeyboardArrowUp as KeyboardArrowUpIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

import Sale, { createSale } from "@/entities/sale";
import { createProduct } from "@/entities/product";

export default function SalesPage() {
    function Row(props: { row: Sale }) {
        const { row } = props;
        const [open, setOpen] = useState(false);

        return (
            <>
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                    <TableCell component="th" scope="row">
                        {row.nfe}
                    </TableCell>
                    <TableCell>{row.client.name}</TableCell>
                    <TableCell>{row.seller.name}</TableCell>
                    <TableCell>{row.createdAt}</TableCell>
                    <TableCell>
                        {row.items.reduce(
                            (p, c) => p + c.product.price * c.quantity,
                            0
                        )}
                    </TableCell>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? (
                                <KeyboardArrowUpIcon color="primary" />
                            ) : (
                                <KeyboardArrowDownIcon color="primary" />
                            )}
                        </IconButton>
                        <IconButton aria-label="edit sale" size="small">
                            <EditIcon color="primary" />
                        </IconButton>
                        <IconButton aria-label="delete sale" size="small">
                            <DeleteIcon color="error" />
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                    >
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    component="div"
                                >
                                    Itens da Venda
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Produtos/Serviço
                                            </TableCell>
                                            <TableCell>Quantidade</TableCell>
                                            <TableCell>
                                                Preço Unitário
                                            </TableCell>
                                            <TableCell>
                                                Total do Produto
                                            </TableCell>
                                            <TableCell>% de Comissão</TableCell>
                                            <TableCell>Comissão</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.items.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {item.product.name}
                                                </TableCell>
                                                <TableCell>
                                                    {item.quantity}
                                                </TableCell>
                                                <TableCell>
                                                    {item.product.price}
                                                </TableCell>
                                                <TableCell>
                                                    {item.product.price *
                                                        item.quantity}
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        item.product
                                                            .commissionPercent
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {(
                                                        (item.product
                                                            .commissionPercent /
                                                            100) *
                                                        item.product.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        );
    }

    const rows = Array(10)
        .fill(null)
        .map(() => {
            return createSale()
                .setBase(1, "00001005", "18/10/2023 - 04:22")
                .setClient(
                    1,
                    "Aparecida Helena Tatiane da Paz",
                    "example@example.com",
                    "+5547988776655"
                )
                .setSeller(
                    1,
                    "Aparecida Helena Tatiane da Paz",
                    "example@example.com",
                    "+5547988776655"
                )
                .addSaleItem(1, createProduct(1, "Mouse Gamer", 129.9, 9), 5)
                .make();
        });

    return (
        <Box my={6} mx={2}>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h5" component="h1">
                    Vendas Realizadas
                </Typography>
                <Button variant="contained">Inserir nova Venda</Button>
            </Box>
            <Box mt={6}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nota Fiscal</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Vendedor</TableCell>
                                <TableCell>Data da Venda</TableCell>
                                <TableCell>Valor Total</TableCell>
                                <TableCell>Opções</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.nfe} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}
