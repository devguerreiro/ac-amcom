// framework
import { useState } from "react";

// app services
import ProductAPI from "@/services/api/product";
import ProductService from "@/services/product";

import Product from "@/domain/entities/product";

export default function useFetchProducts() {
    const [products, setProducts] = useState<Array<Product>>([]);
    const [isFetching, setIsFetching] = useState(false);

    const searchProducts = async (query: string) => {
        setIsFetching(true);
        try {
            const data = await ProductAPI.fetchProducts({
                code: query,
                description: query,
            });
            const products = ProductService.fromAPIList(data);
            setProducts(products);
        } catch (e) {
            setProducts([]);
        } finally {
            setIsFetching(false);
        }
    };

    return {
        products,
        isFetching,
        searchProducts,
    };
}
