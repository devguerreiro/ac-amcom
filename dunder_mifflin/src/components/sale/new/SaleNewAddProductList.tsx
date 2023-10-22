// framework
import { memo, useMemo } from "react";

import { FieldArrayWithId } from "react-hook-form";

// lib components
import { Box } from "@mui/material";

import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    useGridApiRef,
} from "@mui/x-data-grid";

import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

// app services
import { TNewSaleSchema } from "@/domain/schemas/sale";

import useProductList from "./SaleNewAddProductList.view";

interface IItem extends FieldArrayWithId<TNewSaleSchema, "items", "id"> {}

interface IProps {
    saleItems: Array<IItem>;
    onSaveChange: (updated: IItem) => void;
    onRemove: (id: string) => void;
}

export default memo(function SaleNewAddProductList(props: IProps) {
    const { saleItems, onSaveChange, onRemove } = props;

    const apiRef = useGridApiRef();

    const {
        productGetter,
        priceGetter,
        totalPriceGetter,
        quantityParser,
        priceFormatter,
        startEditing,
        saveChange,
        removeProduct,
    } = useProductList({
        apiRef,
        onSaveChange,
        onRemove,
    });

    const columns: Array<GridColDef<IItem>> = useMemo(
        () => [
            {
                field: "product",
                headerName: "Produtos/Serviços",
                type: "string",
                flex: 2,
                valueGetter: productGetter,
            },
            {
                field: "quantity",
                headerName: "Quantidade",
                type: "number",
                flex: 1,
                editable: true,
                valueParser: quantityParser,
            },
            {
                field: "price",
                headerName: "Preço Unitário",
                type: "number",
                flex: 1,
                valueGetter: priceGetter,
                valueFormatter: priceFormatter,
            },
            {
                field: "totalPrice",
                headerName: "Preço Total",
                type: "number",
                flex: 1,
                valueGetter: totalPriceGetter,
                valueFormatter: priceFormatter,
            },
            {
                field: "actions",
                type: "actions",
                flex: 1,
                getActions: (params) => [
                    <GridActionsCellItem
                        key={1}
                        icon={<EditIcon />}
                        onClick={() => startEditing(params.id)}
                        label="Editar item"
                    />,
                    <GridActionsCellItem
                        key={2}
                        icon={<DeleteIcon color="error" />}
                        onClick={() => removeProduct(params.row.id)}
                        label="Remover item"
                    />,
                ],
            },
        ],
        [
            productGetter,
            priceGetter,
            totalPriceGetter,
            quantityParser,
            priceFormatter,
            startEditing,
            removeProduct,
        ]
    );

    return (
        <Box mt={4} height={450}>
            <DataGrid
                apiRef={apiRef}
                rows={saleItems}
                columns={columns}
                hideFooter
                disableColumnSelector
                slots={slots}
                processRowUpdate={saveChange}
            />
        </Box>
    );
});

const customNoRowOverlay = () => (
    <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
    >
        Nenhum produto adicionado
    </Box>
);

const slots = {
    noRowsOverlay: customNoRowOverlay,
};
