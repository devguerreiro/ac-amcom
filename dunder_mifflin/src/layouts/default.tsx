// framework
import React, { useContext, useState } from "react";

import Head from "next/head";

// lib components
import { Alert, Container, CssBaseline, Snackbar } from "@mui/material";

// app components
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

// app services
import AppStateContext from "@/services/contexts/app";

interface ILayoutProps {
    children: React.ReactNode;
}

export default function Layout(props: ILayoutProps) {
    const { children } = props;

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
    const closeNavbar = () => setIsNavbarOpen(false);

    const { feedback } = useContext(AppStateContext);

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
            <Snackbar
                anchorOrigin={feedback.state.place}
                autoHideDuration={feedback.state.timeout}
                open={feedback.state.open}
                onClose={feedback.closeFeedback}
            >
                <Alert
                    severity={feedback.state.severity}
                    sx={{ width: "100%" }}
                >
                    {feedback.state.message}
                </Alert>
            </Snackbar>
            <Header onMenuClick={toggleNavbar} />
            <Navbar isOpen={isNavbarOpen} onClose={closeNavbar} />
            <main>
                <Container>{children}</Container>
            </main>
        </>
    );
}
