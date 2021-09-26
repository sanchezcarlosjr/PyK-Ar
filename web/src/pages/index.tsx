import * as React from "react";
import {Link} from "gatsby";
import {Helmet} from "react-helmet";

const IndexPage = () => {
    return (
        <main>
            <Helmet>
                <title>PyK-Ar | Potassium-Argon Dating CICESE</title>
                <meta name="description" content="Potassium-Argon Dating (K-Ar) CICESE | Carlos Eduardo Sanchez Torres" />
            </Helmet>
            <p>Landing page</p>
            <Link to="/admin/">Admin</Link>
        </main>
    )
};

export default IndexPage
