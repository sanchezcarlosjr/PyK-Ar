import React from "react"
import loadable from "@loadable/component"

import {RAFirebaseOptions} from "react-admin-firebase";
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';
import {Helmet} from "react-helmet";
import PotassiumArgonAgeCalculationsIcon from '@material-ui/icons/InsertChart';
import {PotassiumArgonAgeCalculationList} from "../components/potassium-argon-age-calculation/PotassiumArgonAgeCalculationList";
import {PotassiumArgonAgeCalculationsCreate} from "../components/potassium-argon-age-calculation/PotassiumArgonAgeCalculationsCreate";
import {PotassiumArgonCalculationsEdit} from "../components/potassium-argon-age-calculation/PotassiumArgonCalculationsEdit";

const options: RAFirebaseOptions = {
    logging: process.env.NODE_ENV === "development",
    lazyLoading: {
        enabled: false
    },
    softDelete: true,
    persistence: 'local',
    associateUsersById: true
};

const Firebase = loadable.lib(() => import('react-admin-firebase'));

const Admin = loadable(() => import("../components/Admin"));
const Resource = loadable(() => import("../components/Resource"));
const CustomLoginPage = loadable(() => import("../components/Login"));

const firebaseConfig = {
    apiKey: process.env.GATSBY_API_KEY,
    authDomain: process.env.GATSBY_AUTH_DOMAIN,
    databaseURL: process.env.GATSBY_DATABASE_URL,
    projectId: process.env.GATSBY_PROJECT_ID,
    storageBucket: process.env.GATSBY_STORAGE_BUCKET,
    messagingSenderId: process.env.GATSBY_MESSAGING_SEND_ID,
    appId: process.env.GATSBY_APP_ID,
    measurementId: process.env.GATSBY_MEASUREMENT_ID
};

const IndexPage = () => (<GoogleReCaptchaProvider
    reCaptchaKey="6LcuZowcAAAAAGqrmumerjhdJFu6Gfwa-2kWZUAg"
    scriptProps={{
        async: true,
        defer: true,
        appendTo: 'body',
        nonce: undefined
    }}
>
    <Helmet>
        <title>PyK-Ar | Potassium-Argon Dating CICESE</title>
        <meta name="description" content="Potassium-Argon Dating (K-Ar) CICESE | Carlos Eduardo Sanchez Torres" />
    </Helmet>
    <Firebase>
        {({default: firebase}) =>
            <Admin
                loginPage={CustomLoginPage}
                authProvider={firebase.FirebaseAuthProvider(firebaseConfig, options)}
                dataProvider={firebase.FirebaseDataProvider(firebaseConfig, options)}
            >
                <Resource name="potassium-argon-age-calculations" icon={PotassiumArgonAgeCalculationsIcon} options={{ label: 'K-Ar Blog' }} list={PotassiumArgonAgeCalculationList} create={PotassiumArgonAgeCalculationsCreate} edit={PotassiumArgonCalculationsEdit}/>
            </Admin>
        }
    </Firebase>
</GoogleReCaptchaProvider>);

export default IndexPage