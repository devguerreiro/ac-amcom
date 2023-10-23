import { createContext } from "react";

import { Sale } from "@/domain/entities/sale";

interface ISaleContext {
    deleteSale: (sale: Sale) => void;
}

// @ts-ignore
export const SaleContext = createContext<ISaleContext>(null);
