// framework
import { useState } from "react";

import { useRouter } from "next/router";

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

export default function SaleListSale(props: Props) {
    const { sale } = props;

    const router = useRouter();

    const [isExpanded, setIsExpanded] = useState(false);

    const {
        isDeleteDialogOpened,
        confirmDeletion,
        openDeleteDialog,
        closeDeleteDialog,
    } = useListSale();

    const renderOptions = () => {
        return (
            <>
                <IconButton
                    aria-label="exibir itens da venda"
                    size="small"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? (
                        <KeyboardArrowUpIcon color="warning" />
                    ) : (
                        <KeyboardArrowDownIcon color="warning" />
                    )}
                </IconButton>
                <IconButton
                    aria-label="editar venda"
                    size="small"
                    onClick={() => router.push("/sales/edit/" + sale.id)}
                >
                    <EditIcon color="primary" />
                </IconButton>
                <IconButton
                    aria-label="remover venda"
                    size="small"
                    onClick={openDeleteDialog}
                >
                    <DeleteIcon color="error" />
                </IconButton>
            </>
        );
    };

    const renderDialog = () => {
        return (
            <Dialog
                open={isDeleteDialogOpened}
                onClose={closeDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" color="warning.dark">
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
                    <Button
                        onClick={() => confirmDeletion(sale)}
                        autoFocus
                        color="warning"
                    >
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    return (
        <>
            {renderDialog()}
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
}
