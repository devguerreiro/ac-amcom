// framework
import { memo, useContext, useState } from "react";

// lib components
import { IconButton, TableCell, TableRow } from "@mui/material";
import {
    KeyboardArrowUp as KeyboardArrowUpIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

// app services
import { Sale } from "@/domain/entities/sale";

import { SaleContext } from "@/services/contexts/sale";

import { convertToBRDate, convertToBRL } from "@/utils";

// app components
import SaleListSaleItems from "./SaleListSaleItems";

interface Props {
    sale: Sale;
}

export default memo(function SaleListSale(props: Props) {
    const { sale } = props;

    const [isExpanded, setIsExpanded] = useState(false);

    const { openDeleteDialog } = useContext(SaleContext);

    const renderOptions = () => {
        return (
            <>
                <IconButton
                    aria-label="exibir itens da venda"
                    size="small"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? (
                        <KeyboardArrowUpIcon color="primary" />
                    ) : (
                        <KeyboardArrowDownIcon color="primary" />
                    )}
                </IconButton>
                <IconButton aria-label="editar venda" size="small">
                    <EditIcon color="primary" />
                </IconButton>
                <IconButton
                    aria-label="remover venda"
                    size="small"
                    onClick={() => openDeleteDialog(sale)}
                >
                    <DeleteIcon color="error" />
                </IconButton>
            </>
        );
    };

    return (
        <>
            <TableRow>
                <TableCell
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: 200,
                    }}
                    title={sale.nfe}
                >
                    {sale.nfe}
                </TableCell>
                <TableCell>{sale.client.name}</TableCell>
                <TableCell>{sale.seller.name}</TableCell>
                <TableCell>
                    {convertToBRDate(new Date(sale.createdAt))}
                </TableCell>
                <TableCell>
                    {convertToBRL(sale.calculateTotalPrice())}
                </TableCell>
                <TableCell>{renderOptions()}</TableCell>
            </TableRow>
            {/* expanded */}
            <SaleListSaleItems sale={sale} isExpanded={isExpanded} />
        </>
    );
});
