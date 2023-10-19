import React, { useState } from "react";

import Head from "next/head";

import { Container, CssBaseline } from "@mui/material";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

interface ILayoutProps {
    children: React.ReactNode;
}

export default function Layout(props: ILayoutProps) {
    const { children } = props;

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
    const closeNavbar = () => setIsNavbarOpen(false);

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            </Head>
            <CssBaseline />
            <Header onMenuClick={toggleNavbar} />
            <Navbar isOpen={isNavbarOpen} onClose={closeNavbar} />
            <main>
                <Container>{children}</Container>
            </main>
        </>
    );
}
