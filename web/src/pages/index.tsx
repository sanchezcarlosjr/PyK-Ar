import * as React from "react";
import Layout from "../components/layout";
import Banner from "../sections/banner";
import SEO from "../components/seo";

const IndexPage = () => {
    return (
        <Layout>
            <SEO title="PyK-Ar | Potassium-Argon dating software" />
            <Banner />
        </Layout>
    )
};

export default IndexPage
