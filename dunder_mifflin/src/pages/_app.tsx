// framework
import type { AppProps } from "next/app";

// app components
import "@/styles/global.sass";

import Layout from "@/layouts/default";

// app services
import useAppState from "@/services/hooks/app";
import AppStateContext from "@/services/contexts/app";

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    const appState = useAppState();

    return (
        <AppStateContext.Provider value={appState}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AppStateContext.Provider>
    );
}
