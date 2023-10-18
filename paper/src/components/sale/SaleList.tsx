// lib components
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

// app services
import { ISale } from "@/entities/sale";
import { getSales } from "@/services/api/sale";

// app components
import SaleListSale from "./SaleListSale";

export default function SaleList() {
    const tableHeaders = [
        "Nota Fiscal",
        "Cliente",
        "Vendedor",
        "Data da Venda",
        "Valor Total",
        "Opções",
    ];

    const renderTableHeader = () => {
        return tableHeaders.map((header: string) => (
            <TableCell key={header}>{header}</TableCell>
        ));
    };

    const renderTableBody = () => {
        return getSales().map((sale: ISale) => (
            <SaleListSale key={sale.nfe} sale={sale} />
        ));
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="Tabela das vendas realizadas">
                <TableHead>
                    <TableRow>{renderTableHeader()}</TableRow>
                </TableHead>
                <TableBody>{renderTableBody()}</TableBody>
            </Table>
        </TableContainer>
    );
}
