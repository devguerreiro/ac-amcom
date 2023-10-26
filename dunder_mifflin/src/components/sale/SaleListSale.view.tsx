// framework
import { useContext, useState } from "react";

// app services
import { Sale } from "@/domain/entities/sale";

import SaleAPI from "@/services/api/sale";

import AppStateContext from "@/services/contexts/app";
import SaleContext from "@/services/contexts/sale";

export default function useListSale() {
    const [isDeleteDialogOpened, setDeleteDialogStatus] = useState(false);

    const { feedback } = useContext(AppStateContext);
    const { onDelete } = useContext(SaleContext);

    const confirmDeletion = (sale: Sale) => {
        SaleAPI.deleteSale(sale)
            .then(() => {
                feedback.showFeedback("Venda excluida com sucesso", "success");
                onDelete(sale);
            })
            .catch((e: Error) => {
                feedback.showFeedback(e.message);
            })
            .finally(() => {
                closeDeleteDialog();
            });
    };

    const openDeleteDialog = () => {
        setDeleteDialogStatus(true);
    };

    const closeDeleteDialog = () => {
        setDeleteDialogStatus(false);
    };

    return {
        isDeleteDialogOpened,
        confirmDeletion,
        openDeleteDialog,
        closeDeleteDialog,
    };
}
