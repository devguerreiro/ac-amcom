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
        return sale.items.map((item) => (
            <TableRow key={item.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.product.price}</TableCell>
                <TableCell>{item.calculateTotalSaleItem()}</TableCell>
                <TableCell>{item.product.commissionPercent}</TableCell>
                <TableCell>{item.calculateTotalSaleItemCommission()}</TableCell>
            </TableRow>
        ));
    };

    return (
        <TableRow>
            <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={tableHeaders.length}
            >
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <Box>
                        <Table aria-label="itens da venda">
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
