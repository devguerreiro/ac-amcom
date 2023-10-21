import Product, { ProductFactory } from "@/domain/entities/product";

export default class ProductService {
    static fromAPIList(data: any): Array<Product> {
        return data.map((item: any) => {
            return ProductFactory.createProduct(
                item.id,
                item.code,
                item.description,
                item.price,
                item.commission_percent
            );
        });
    }
}
