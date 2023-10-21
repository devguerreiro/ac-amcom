// framework
import { useState } from "react";

// app services
import ProductAPI from "@/services/api/product";
import ProductService from "@/services/product";

import Product from "@/domain/entities/product";

export default function useFetchProducts() {
    const [products, setProducts] = useState<Array<Product>>([]);
    const [isSearching, setIsSearching] = useState(false);

    const searchProducts = async (query: string) => {
        setIsSearching(true);
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
            setIsSearching(false);
        }
    };

    return {
        products,
        isSearching,
        searchProducts,
    };
}
