// framework
import Head from "next/head";
import Image from "next/image";

import Layout from "@/layouts/default";

export default function HomePage() {
    return (
        <>
            <Head>
                <title>Papelaria Dunder Mifflin</title>
                <meta
                    name="description"
                    content="Dunder Mifflin, a melhor papelaria de Scranton"
                />
            </Head>
            <Layout>
                <main>
                    <h1>Bem Vindo a Papelaria Dunder Mifflin</h1>
                    <Image
                        src="/team.webp"
                        height={476}
                        width={700}
                        alt="Foto da equipe Dunder Mifflin"
                    />
                </main>
            </Layout>
        </>
    );
}
