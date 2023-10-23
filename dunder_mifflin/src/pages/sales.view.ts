// framework
import { useContext, useRef, useState } from "react";

// app services
import { Sale } from "@/domain/entities/sale";

import SaleAPI from "@/services/api/sale";

import FeedbackContext from "@/services/contexts/feedback";

export default function useSales() {
    const [isDeleteDialogOpened, setDeleteDialogStatus] = useState(false);

    const saleDeletion = useRef<Sale | null>(null);

    const { showFeedback } = useContext(FeedbackContext);

    const confirmDeletion = () => {
        if (saleDeletion.current) {
            SaleAPI.deleteSale(saleDeletion.current)
                .then(() => {
                    showFeedback("Venda excluida com sucesso", "success");
                })
                .catch((e: Error) => {
                    showFeedback(e.message);
                })
                .finally(() => {
                    closeDeleteDialog();
                });
        }
    };

    const openDeleteDialog = (sale: Sale) => {
        setDeleteDialogStatus(true);
        saleDeletion.current = sale;
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
