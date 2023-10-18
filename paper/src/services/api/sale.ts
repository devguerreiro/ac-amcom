import { SaleFactory, SaleItemFactory } from "@/entities/sale";
import { ProductFactory } from "@/entities/product";
import { ClientFactory } from "@/entities/client";
import { SellerFactory } from "@/entities/seller";

export const getSales = () => {
    return Array(10)
        .fill(null)
        .map(() => {
            const client = ClientFactory.createClient(
                1,
                "Aparecida Helena Tatiane da Paz",
                "example@example.com",
                "+5547988776655"
            );
            const seller = SellerFactory.createSeller(
                1,
                "Aparecida Helena Tatiane da Paz",
                "example@example.com",
                "+5547988776655"
            );
            const saleItem = SaleItemFactory.createSaleItem(
                1,
                ProductFactory.createProduct(1, "Mouse Gamer", 129.9, 9),
                5
            );
            return SaleFactory.createSale(
                1,
                "00001005",
                client,
                seller,
                [saleItem],
                "18/10/2023 - 04:22"
            );
        });
};
