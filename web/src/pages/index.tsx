import * as React from "react";
import {Link} from "gatsby";
import {Helmet} from "react-helmet";

const IndexPage = () => {
    return (
        <main>
            <Helmet>
                <title>My Title</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <p>Landing page</p>
            <Link to="/admin/">Admin</Link>
        </main>
    )
};

export default IndexPage
