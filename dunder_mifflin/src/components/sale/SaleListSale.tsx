// framework
import { memo, useState } from "react";

// lib components
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TableCell,
    TableRow,
} from "@mui/material";

import {
    KeyboardArrowUp as KeyboardArrowUpIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

// app services
import { Sale } from "@/domain/entities/sale";

import { convertToBRDate, convertToBRL } from "@/utils";

// app components
import SaleListSaleItems from "./SaleListSaleItems";
import useListSale from "./SaleListSale.view";

interface Props {
    sale: Sale;
}

export default memo(function SaleListSale(props: Props) {
    const { sale } = props;

    const [isExpanded, setIsExpanded] = useState(false);

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

    const {
        isDeleteDialogOpened,
        confirmDeletion,
        openDeleteDialog,
        closeDeleteDialog,
    } = useListSale({ sale });

    return (
        <>
            <Dialog
                open={isDeleteDialogOpened}
                onClose={closeDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" color="error">
                    Confirmação de exclusão
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deseja realmente excluir esta venda?{" "}
                        <strong>Esta ação não poderá ser revertida</strong>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog}>Não</Button>
                    <Button onClick={confirmDeletion} autoFocus color="error">
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
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
