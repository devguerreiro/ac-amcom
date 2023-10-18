import Image from "next/image";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";

interface IProps {
    onMenuClick: () => void;
}

export const HEIGHT = 87;

export default function Header({ onMenuClick }: IProps) {
    return (
        <Box>
            <AppBar
                position="fixed"
                sx={{
                    height: HEIGHT,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={onMenuClick}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                <Image
                    src="/amcom-logo.png"
                    width={202}
                    height={56}
                    alt="Logo AMcom"
                />
            </AppBar>
        </Box>
    );
}
