module.exports = {
    siteMetadata: {
        siteUrl: "https://pykar.sanchezcarlosjr.com",
        title: "PyK-Ar",
    },
    plugins: [
        "gatsby-plugin-image",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/images/icon.png",
            },
        },
        "gatsby-plugin-mdx",
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
                background_color: "#0c0a59",
                theme_color: "#0c0a59",
                description: "Potassium-Argon Dating.",
                display: `standalone`
            }
        }
    ]
};
