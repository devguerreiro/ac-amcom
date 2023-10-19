import type { AppProps } from "next/app";

import "@/styles/global.sass";

import Layout from "@/layouts/default";

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
