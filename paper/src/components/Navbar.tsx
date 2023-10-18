import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";

import PointOfSale from "@mui/icons-material/PointOfSale";
import Calculate from "@mui/icons-material/Calculate";
import ChevronRight from "@mui/icons-material/ChevronRight";

import { HEIGHT } from "./Header";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function Navbar({ isOpen, onClose }: IProps) {
    return (
        <SwipeableDrawer
            anchor="left"
            open={isOpen}
            onClose={onClose}
            onOpen={() => {}}
        >
            <Box sx={{ width: 273, marginTop: HEIGHT + "px" }}>
                <MenuList onClick={onClose}>
                    <MenuItem>
                        <ListItemIcon>
                            <PointOfSale />
                        </ListItemIcon>
                        <ListItemText>Vendas</ListItemText>
                        <ChevronRight />
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Calculate />
                        </ListItemIcon>
                        <ListItemText>Comissões</ListItemText>
                        <ChevronRight />
                    </MenuItem>
                </MenuList>
            </Box>
        </SwipeableDrawer>
    );
}
