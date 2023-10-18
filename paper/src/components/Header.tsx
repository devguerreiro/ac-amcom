import Image from "next/image";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";

interface IProps {
    toggleNavbar: () => void;
}

export default function Header({ toggleNavbar }: IProps) {
    return (
        <Box>
            <AppBar
                position="static"
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Toolbar onClick={() => toggleNavbar}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                <Image
                    src="/amcom-logo.png"
                    width={50}
                    height={50}
                    alt="Logo AMcom"
                />
            </AppBar>
        </Box>
    );
}
