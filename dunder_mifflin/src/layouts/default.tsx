// framework
import React, { useState } from "react";

import Head from "next/head";

// lib components
import { Alert, Container, CssBaseline, Snackbar } from "@mui/material";

// app components
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

// app services
import useFeedback, { FeedbackContext } from "@/services/hooks/feedback";

interface ILayoutProps {
    children: React.ReactNode;
}

export default function Layout(props: ILayoutProps) {
    const { children } = props;

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
    const closeNavbar = () => setIsNavbarOpen(false);

    const { feedback, closeFeedback, showFeedback } = useFeedback();

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
                anchorOrigin={feedback.place}
                autoHideDuration={feedback.timeout}
                open={feedback.open}
                onClose={closeFeedback}
            >
                <Alert severity={feedback.severity} sx={{ width: "100%" }}>
                    {feedback.message}
                </Alert>
            </Snackbar>
            <Header onMenuClick={toggleNavbar} />
            <Navbar isOpen={isNavbarOpen} onClose={closeNavbar} />
            <main>
                <Container>
                    <FeedbackContext.Provider
                        value={{ feedback, closeFeedback, showFeedback }}
                    >
                        {children}
                    </FeedbackContext.Provider>
                </Container>
            </main>
        </>
    );
}
