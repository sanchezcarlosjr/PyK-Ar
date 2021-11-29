require('dotenv').config({path: './.env.development'});

module.exports = {
    siteMetadata: {
        siteUrl: "https://pykar.sanchezcarlosjr.com",
        title: "PyK-Ar",
    },
    plugins: [
        "gatsby-plugin-image",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        "gatsby-plugin-remove-console",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/images/icon.png",
            },
        },
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
            resolve: "gatsby-plugin-firebase",
            options: {
                credentials: {
                    apiKey: process.env.GATSBY_API_KEY,
                    authDomain: process.env.GATSBY_AUTH_DOMAIN,
                    databaseURL: process.env.GATSBY_DATABASE_URL,
                    projectId: process.env.GATSBY_PROJECT_ID,
                    storageBucket: process.env.GATSBY_STORAGE_BUCKET,
                    messagingSenderId: process.env.GATSBY_MESSAGING_SEND_ID,
                    appId: process.env.GATSBY_APP_ID,
                    measurementId: process.env.GATSBY_MEASUREMENT_ID
                }
            }
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
