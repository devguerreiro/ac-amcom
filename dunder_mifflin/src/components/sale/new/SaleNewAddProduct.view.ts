// framework
import { ChangeEvent, useCallback, useMemo } from "react";

import {
    FieldArrayWithId,
    useController,
    useFieldArray,
    useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// lib components
import debounce from "@mui/utils/debounce";

// app services
import Product from "@/domain/entities/product";

import useFetchProducts from "@/services/hooks/product";

import {
    AddProductSchema,
    TAddProductSchema,
    TNewSaleSchema,
} from "@/domain/schemas/sale";

interface IItem extends FieldArrayWithId<TNewSaleSchema, "items", "id"> {}

export default function useAddProduct() {
    const {
        products: productOptions,
        isFetching: isFetchingOptions,
        searchProducts,
    } = useFetchProducts();

    const form = useForm<TAddProductSchema>({
        resolver: zodResolver(AddProductSchema),
        defaultValues: {
            // @ts-ignore
            product: null,
            quantity: undefined,
        },
    });

    const productController = useController({
        name: "product",
        control: form.control,
    });

    const {
        fields: saleItems,
        append,
        update,
        remove,
    } = useFieldArray<TNewSaleSchema>({
        name: "items",
    });

    const debouncedFetchOptions = debounce(
        async (e: ChangeEvent<HTMLInputElement>) => {
            await searchProducts(e.target.value);
        },
        500
    );

    const getProductLabel = (option: Product) => option.label;

    const isProductOptionToValue = (option: Product, value: Product) =>
        option.equal(value);

    const setProduct = (_: any, v: Product | null) =>
        // @ts-ignore
        form.setValue("product", v);

    const addProduct = () => {
        const itemProduct = form.getValues("product");
        const itemQuantity = Number(form.getValues("quantity"));
        const existingProductIndex = saleItems.findIndex(
            (field) => field.product.id === itemProduct.id
        );
        if (existingProductIndex !== -1) {
            const existingProduct = saleItems[existingProductIndex];
            update(existingProductIndex, {
                product: existingProduct.product,
                quantity: existingProduct.quantity + itemQuantity,
            });
        } else {
            append({
                product: itemProduct,
                quantity: itemQuantity,
            });
        }
        form.reset();
    };

    const saveChange = useCallback(
        (updated: IItem) => {
            const productIndex = saleItems.findIndex(
                (item) => item.id === updated.id
            );
            update(productIndex, updated);
        },
        [saleItems, update]
    );

    const removeProduct = useCallback(
        (id: string) => {
            const productIndex = saleItems.findIndex(
                (item: IItem) => item.id === id
            );
            remove(productIndex);
        },
        [saleItems, remove]
    );

    return {
        productOptions,
        isFetchingOptions,
        debouncedFetchOptions,
        saleItems,
        form,
        productController,
        getProductLabel,
        isProductOptionToValue,
        setProduct,
        addProduct,
        saveChange,
        removeProduct,
    };
}
