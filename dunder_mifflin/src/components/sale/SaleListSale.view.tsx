// framework
import { useContext, useState } from "react";

// app services
import { Sale } from "@/domain/entities/sale";

import SaleAPI from "@/services/api/sale";

import AppStateContext from "@/services/contexts/app";

export default function useListSale() {
    const [isDeleteDialogOpened, setDeleteDialogStatus] = useState(false);

    const { feedback } = useContext(AppStateContext);

    const confirmDeletion = (sale: Sale) => {
        SaleAPI.deleteSale(sale)
            .then(() => {
                feedback.showFeedback("Venda excluida com sucesso", "success");
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
