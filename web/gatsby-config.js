module.exports = {
    siteMetadata: {
        siteUrl: "https://pykar.sanchezcarlosjr.com",
        title: "PyK-Ar",
    },
    plugins: [
        `gatsby-plugin-theme-ui`,
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/images/icon.png",
            },
        },
        "gatsby-plugin-mdx",
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./src/images/",
            },
            __key: "images",
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "pages",
                path: "./src/pages/",
            },
            __key: "pages",
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `PyK-Ar`,
                short_name: `K-Ar`,
                start_url: `/admin`,
                icon: 'src/images/icon.png',
                cache_busting_mode: 'none',
                background_color: `#663399`,
                theme_color: `#663399`,
                description: "Potassium-Argon Dating.",
                display: `standalone`
            }
        },
        {
            resolve: `gatsby-plugin-prefetch-google-fonts`,
            options: {
                fonts: [
                    {
                        family: `DM Sans`,
                        variants: [`400`, `500`, `700`],
                    },
                ],
            },
        }
    ]
};
