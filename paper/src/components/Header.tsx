import Link from "next/link";
import Image from "next/image";

import { AppBar, Box, IconButton, Toolbar } from "@mui/material";

import { Menu as MenuIcon } from "@mui/icons-material";

interface IProps {
    onMenuClick: () => void;
}

export const HEIGHT = 87;

export default function Header({ onMenuClick }: IProps) {
    return (
        <Box>
            <AppBar
                position="static"
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
                <Link href="/">
                    <Image
                        src="/amcom-logo.png"
                        width={202}
                        height={56}
                        alt="Logo AMcom"
                    />
                </Link>
            </AppBar>
        </Box>
    );
}
