import { ClientFactory } from "@/domain/entities/client";
import { ProductFactory } from "@/domain/entities/product";
import { Sale, SaleFactory, SaleItemFactory } from "@/domain/entities/sale";
import { SellerFactory } from "@/domain/entities/seller";

import MapperException from "@/services/exceptions/mapper";

export default class SaleService {
    static fromAPIList(data: any): Array<Sale> {
        try {
            return data.map((sale: any) => {
                const client = ClientFactory.createClient(
                    sale.client.id,
                    sale.client.name,
                    sale.client.email,
                    sale.client.phone
                );
                const seller = SellerFactory.createSeller(
                    sale.seller.id,
                    sale.seller.name,
                    sale.seller.email,
                    sale.seller.phone
                );
                const items = sale.items.map((item: any) => {
                    const product = ProductFactory.createProduct(
                        item.product.id,
                        item.product.code,
                        item.product.description,
                        item.product.price,
                        item.product.commission_percent
                    );
                    return SaleItemFactory.createSaleItem(
                        item.id,
                        product,
                        item.quantity
                    );
                });
                return SaleFactory.createSale(
                    sale.id,
                    sale.nfe,
                    client,
                    seller,
                    items,
                    sale.created_at
                );
            });
        } catch (e) {
            throw new MapperException(
                "Não foi possível mapear os dados de retorno do endpoint de listagem de vendas"
            );
        }
    }
}
