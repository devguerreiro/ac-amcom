import { createContext } from "react";

import { Sale } from "@/domain/entities/sale";

interface ISaleContext {
    openDeleteDialog: (sale: Sale) => void;
}

// @ts-ignore
export const SaleContext = createContext<ISaleContext>(null);
