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

import { HEIGHT } from "./Header";
import { useRouter } from "next/router";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Navbar({ isOpen, onClose }: IProps) {
    const router = useRouter();

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
                    <MenuItem onClick={() => router.push("/sales")}>
                        <ListItemIcon>
                            <PointOfSaleIcon />
                        </ListItemIcon>
                        <ListItemText>Vendas</ListItemText>
                        <ChevronRightIcon />
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <CalculateIcon />
                        </ListItemIcon>
                        <ListItemText>Comissões</ListItemText>
                        <ChevronRightIcon />
                    </MenuItem>
                </MenuList>
            </nav>
        </SwipeableDrawer>
    );
}
