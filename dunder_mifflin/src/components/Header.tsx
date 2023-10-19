import Link from "next/link";
import Image from "next/image";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import { Menu as MenuIcon } from "@mui/icons-material";

interface IProps {
    onMenuClick: () => void;
}

export const HEIGHT = 87;

export default function Header(props: IProps) {
    const { onMenuClick } = props;

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
                <Toolbar>
                    <Link
                        href="/"
                        style={{
                            textDecoration: "inherit",
                            color: "inherit",
                        }}
                    >
                        <Image
                            src="/logo.png"
                            width={150}
                            height={50}
                            alt="Dunder Mufflin Logo"
                        />
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
