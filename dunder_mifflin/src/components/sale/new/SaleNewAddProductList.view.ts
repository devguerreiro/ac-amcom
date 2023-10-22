// framework
import { MutableRefObject } from "react";

import { FieldArrayWithId } from "react-hook-form";

// ui components
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import {
    GridRowId,
    GridValueFormatterParams,
    GridValueGetterParams,
} from "@mui/x-data-grid";

// app services
import { TNewSaleSchema } from "@/domain/schemas/sale";

import { convertToBRL } from "@/utils";

interface IItem extends FieldArrayWithId<TNewSaleSchema, "items", "id"> {}

interface IProps {
    apiRef: MutableRefObject<GridApiCommunity>;
    onSaveChange: (updated: IItem) => void;
    onRemove: (id: string) => void;
}

export default function useProductList(props: IProps) {
    const { apiRef, onSaveChange, onRemove } = props;

    const productGetter = ({ row }: GridValueGetterParams<IItem>) =>
        row.product.label;

    const priceGetter = ({ row }: GridValueGetterParams<IItem>) =>
        row.product.price;

    const totalPriceGetter = ({ row }: GridValueGetterParams<IItem>) =>
        row.product.price * row.quantity;

    const quantityParser = (v: string) => Number(v);

    const priceFormatter = ({ value }: GridValueFormatterParams) =>
        convertToBRL(value);

    const startEditing = (id: GridRowId) => {
        apiRef.current.startCellEditMode({
            id,
            field: "quantity",
        });
    };

    const saveChange = (updated: IItem) => {
        onSaveChange(updated);
        return updated;
    };

    const removeProduct = (id: string) => {
        onRemove(id);
    };

    return {
        productGetter,
        priceGetter,
        totalPriceGetter,
        quantityParser,
        priceFormatter,
        startEditing,
        saveChange,
        removeProduct,
    };
}
