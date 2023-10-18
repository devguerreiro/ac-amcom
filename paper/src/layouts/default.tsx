import React from "react";

import Head from "next/head";

import CssBaseline from "@mui/material/CssBaseline";

import Header from "@/components/Header";

interface ILayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <CssBaseline />
            <Header />
            <main>{children}</main>
        </>
    );
}
