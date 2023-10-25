// framework
import type { AppProps } from "next/app";

// app components
import "@/styles/global.sass";

// app services
import useAppState from "@/services/hooks/app";
import AppStateContext from "@/services/contexts/app";

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    const appState = useAppState();

    return (
        <AppStateContext.Provider value={appState}>
            <Component {...pageProps} />
        </AppStateContext.Provider>
    );
}
