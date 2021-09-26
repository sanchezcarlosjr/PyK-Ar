import * as React from "react";
import SEO from "../components/core/seo";
import "../components/layout.css";
import { center, container, title, button } from './index.module.css';
import {Link} from "gatsby";

const HomePage = () => {
    return (
        <main className={center}>
            <SEO title="PyK-Ar" description="Potassium-Argon dating project open-source by Carlos Eduardo Sanchez Torres and CICESE" />
            <div className={container}>
                <h1 className={title}>Potassium-Argon Dating with PyK-Ar web</h1>
                <Link className={button} to="/admin/">Sign in free</Link>
            </div>
        </main>
    )
};

export default HomePage
