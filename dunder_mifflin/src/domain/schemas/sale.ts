import z from "@/config/zod";

import Seller from "../entities/seller";
import Product from "../entities/product";
import Client from "../entities/client";

export const AddProductSchema = z
    .object({
        product: z.instanceof(Product, { message: "Produto inválido" }),
        quantity: z.coerce.number().int().positive(),
    })
    .required();

const NewSaleSchema = z.object({
    seller: z.instanceof(Seller, { message: "Vendedor inválido" }),
    client: z.instanceof(Client, {
        message: "Cliente inválido",
    }),
    items: z
        .object(AddProductSchema.shape)
        .array()
        .min(1, "Necessário adicionar pelo menos um produto"),
});

export type TNewSaleSchema = z.infer<typeof NewSaleSchema>;
export type TAddProductSchema = z.infer<typeof AddProductSchema>;

export default NewSaleSchema;
