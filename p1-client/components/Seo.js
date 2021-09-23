import Head from "next/head";

export default function Seo(props) {
    const {title, description} = props;

    return (
        <Head>
            <title>{title}</title>
            <meta property="description" content={description} />
        </Head>
    )
}

Seo.defaultProps = {
    title: "Zen-Chef - Tu sitio de comida vegana, saludable y deliciosa",
    description: "Recestas saludables, tuppers para que no tengas que cocinar y los productos veganos de mejor calidad por si te ateves con alguna de nuestras recetas."
}