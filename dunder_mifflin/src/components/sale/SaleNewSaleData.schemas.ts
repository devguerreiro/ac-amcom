import z from "@/config/zod";

const SaleDataSchema = z.object({
    seller: z.coerce.number().int().positive("Vendedor inválido"),
    client: z.coerce.number().int().positive(" Cliente inválido"),
});

export type TSaleDataSchema = z.infer<typeof SaleDataSchema>;

export default SaleDataSchema;
