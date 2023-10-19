// lib components
import {
    Box,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

// app services
import { ISale } from "@/entities/sale";
import { convertToBRL, convertToPercentage } from "@/utils";

interface Props {
    sale: ISale;
    isExpanded: boolean;
}

export default function SaleListSaleItems(props: Props) {
    const { sale, isExpanded } = props;

    const tableHeaders = [
        "Produtos/Serviço",
        "Quantidade",
        "Preço Unitário",
        "Total do Produto",
        "% de Comissão",
        "Comissão",
    ];

    const renderTableHeader = () => {
        return tableHeaders.map((header) => {
            return <TableCell key={header}>{header}</TableCell>;
        });
    };

    const renderTableBody = () => {
        return (
            <>
                {sale.items.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            {item.product.code} - {item.product.description}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                            {convertToBRL(item.product.price)}
                        </TableCell>
                        <TableCell>
                            {convertToBRL(item.calculateTotalPrice())}
                        </TableCell>
                        <TableCell>
                            {convertToPercentage(
                                item.product.commissionPercent
                            )}
                        </TableCell>
                        <TableCell>
                            {convertToBRL(item.calculateTotalCommission())}
                        </TableCell>
                    </TableRow>
                ))}
                {/* total */}
                <TableRow
                    sx={{
                        color: "primary.main",
                        fontWeight: "bold",
                        "& .MuiTableCell-root": {
                            color: "inherit",
                            fontWeight: "inherit",
                        },
                    }}
                >
                    <TableCell>Total da Venda</TableCell>
                    <TableCell>{sale.totalItemsQuantity}</TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                        {convertToBRL(sale.calculateTotalPrice())}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                        {convertToBRL(sale.calculateTotalCommission())}
                    </TableCell>
                </TableRow>
            </>
        );
    };

    return (
        <TableRow>
            <TableCell
                sx={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={tableHeaders.length}
            >
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <Box sx={{ paddingBottom: 2, paddingTop: 2 }}>
                        <Table
                            aria-label="itens da venda"
                            size="small"
                            sx={{
                                "& .MuiTableCell-root": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableHead>
                                <TableRow>{renderTableHeader()}</TableRow>
                            </TableHead>
                            <TableBody>{renderTableBody()}</TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
}
