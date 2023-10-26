import { memo } from "react";

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

import { convertToBRL } from "@/utils";

interface IProps {
    commissions: Array<Commission>;
}

export default memo(function CommissionList(props: IProps) {
    const { commissions } = props;

    const totalPeriod = () => {
        return commissions.reduce(
            (acc, v: Commission) => acc + v.total_commission,
            0
        );
    };

    const renderRows = () => {
        return commissions.map((c: Commission) => (
            <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.seller}</TableCell>
                <TableCell>{c.total_quantity}</TableCell>
                <TableCell>{convertToBRL(c.total_commission)}</TableCell>
            </TableRow>
        ));
    };

    const renderTotalRow = () => {
        return (
            <TableRow
                sx={{
                    color: "warning.dark",
                    fontWeight: "bold",
                    "& .MuiTableCell-root": {
                        color: "inherit",
                        fontWeight: "inherit",
                    },
                }}
            >
                <TableCell>Total de Comissões do Período</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>{convertToBRL(totalPeriod())}</TableCell>
            </TableRow>
        );
    };

    const renderLastRow = () => {
        return commissions.length > 0 ? renderTotalRow() : renderEmptyList();
    };

    return (
        <TableContainer sx={{ my: 8 }} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Cód.</TableCell>
                        <TableCell>Vendedor</TableCell>
                        <TableCell>Total de Vendas</TableCell>
                        <TableCell>Total de Comissões</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderRows()}
                    {renderLastRow()}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

const renderEmptyList = () => {
    return (
        <TableRow>
            <TableCell
                colSpan={10}
                sx={{
                    textAlign: "center",
                }}
            >
                Para visualizar o relatório, selecione um período nos campos
                acima.
            </TableCell>
        </TableRow>
    );
};
