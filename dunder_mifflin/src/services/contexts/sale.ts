import { createContext } from "react";

import { Sale } from "@/domain/entities/sale";

interface ISaleContext {
    onDelete: (sale: Sale) => void;
}

// @ts-ignore
const SaleContext = createContext<ISaleContext>(null);

export default SaleContext;
