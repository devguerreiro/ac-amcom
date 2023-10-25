// framework
import { memo } from "react";

import Link from "next/link";

// lib components
import {
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    SwipeableDrawer,
} from "@mui/material";

import {
    PointOfSale as PointOfSaleIcon,
    Calculate as CalculateIcon,
    ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

// app components
import { HEIGHT } from "./Header";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export default memo(function Navbar(props: IProps) {
    const { isOpen, onClose } = props;

    return (
        <SwipeableDrawer
            sx={{
                "& .MuiDrawer-paper": {
                    width: 273,
                    mt: HEIGHT + "px",
                },
            }}
            anchor="left"
            open={isOpen}
            onClose={onClose}
            onOpen={() => {}}
        >
            <nav>
                <MenuList onClick={onClose}>
                    <Link
                        href="/sales"
                        style={{
                            textDecoration: "inherit",
                            color: "inherit",
                        }}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <PointOfSaleIcon />
                            </ListItemIcon>
                            <ListItemText>Vendas</ListItemText>
                            <ChevronRightIcon />
                        </MenuItem>
                    </Link>
                    <Link
                        href="/commissions"
                        style={{
                            textDecoration: "inherit",
                            color: "inherit",
                        }}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <CalculateIcon />
                            </ListItemIcon>
                            <ListItemText>Comissões</ListItemText>
                            <ChevronRightIcon />
                        </MenuItem>
                    </Link>
                </MenuList>
            </nav>
        </SwipeableDrawer>
    );
});
