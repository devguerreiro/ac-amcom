import React, { useState } from "react";

import Head from "next/head";

import CssBaseline from "@mui/material/CssBaseline";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

interface ILayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const openNavbar = () => setIsNavbarOpen(true);
    const closeNavbar = () => setIsNavbarOpen(false);

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <CssBaseline />
            <Header onMenuClick={openNavbar} />
            <Navbar isOpen={isNavbarOpen} onClose={closeNavbar} />
            <main>{children}</main>
        </>
    );
}
