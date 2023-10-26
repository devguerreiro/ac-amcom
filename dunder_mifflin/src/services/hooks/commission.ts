import { useContext, useState } from "react";

import { Dayjs } from "dayjs";

import SaleAPI from "@/services/api/sale";

import AppStateContext from "@/services/contexts/app";

export default function useFetchCommissions() {
    const [commissions, setCommissions] = useState<Array<Commission>>([]);

    const { feedback } = useContext(AppStateContext);

    const getCommissions = (startDate: Dayjs | null, endDate: Dayjs | null) => {
        if (startDate && endDate) {
            SaleAPI.fetchCommissions(
                startDate.format("DD/MM/YYYY"),
                endDate.format("DD/MM/YYYY")
            )
                .then((data: any) => {
                    console.log(data);

                    if (data.length === 0)
                        feedback.showFeedback(
                            "Nenhuma venda foi encontrada!",
                            "info"
                        );
                    else setCommissions(data);
                })
                .catch((e: Error) => {
                    feedback.showFeedback(e.message);
                });
        }
    };

    return { commissions, getCommissions };
}
