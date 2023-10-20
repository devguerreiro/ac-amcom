import z from "@/config/zod";

import Product from "@/domain/entities/product";

export const AddProductSchema = z
    .object({
        product: z.instanceof(Product, {
            message: "Produto inválido",
        }),
        quantity: z.coerce.number().int().positive(),
    })
    .required();

export type TAddProductSchema = z.infer<typeof AddProductSchema>;
