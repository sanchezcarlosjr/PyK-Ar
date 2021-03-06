import React from "react"
import loadable from "@loadable/component"

import {RAFirebaseOptions} from "react-admin-firebase";
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';
import {Helmet} from "react-helmet";
import PotassiumArgonAgeCalculationsIcon from '@material-ui/icons/InsertChart';
import {PotassiumArgonAgeCalculationList} from "../app/potassium-argon-age-calculation/PotassiumArgonAgeCalculationList";
import {PotassiumArgonAgeCalculationsCreate} from "../app/potassium-argon-age-calculation/create/PotassiumArgonAgeCalculationsCreate";
import {PotassiumArgonCalculationsEdit} from "../app/potassium-argon-age-calculation/PotassiumArgonCalculationsEdit";

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

const Admin = loadable(() => import("../app/Admin"));
const Resource = loadable(() => import("../app/Resource"));
const CustomLoginPage = loadable(() => import("../app/Login"));

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
import { createMuiTheme } from '@material-ui/core/styles';
import {PotassiumArgonAgeConstantList} from "../app/potassium-argon-age-constant/PotassiumArgonAgeConstantList";
import {
    PotassiumArgonConstantCreate,
    PotassiumArgonConstantEdit
} from "../app/potassium-argon-age-constant/PotassiumArgonAgeConstantUpsert";

const theme = createMuiTheme({
    typography: {
        fontFamily: '"IBM Plex Sans Regular", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    palette: {
        primary: {
            main: '#0E4471',
        },
        secondary: {
            main: '#2a5578',
        },
        error: {
            main: '#af3c0b',
        },
        warning: {
            main: '#AF870B',
        },
        info: {
            main: '#47a7f5',
        }
    },
});

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
                theme={theme}
                loginPage={CustomLoginPage}
                authProvider={firebase.FirebaseAuthProvider(firebaseConfig, options)}
                dataProvider={firebase.FirebaseDataProvider(firebaseConfig, options)}
            >
                <Resource name="potassium-argon-age-calculations" icon={PotassiumArgonAgeCalculationsIcon} options={{ label: 'List K-Ar Samples' }} list={PotassiumArgonAgeCalculationList} create={PotassiumArgonAgeCalculationsCreate} edit={PotassiumArgonCalculationsEdit}/>
                <Resource name="potassium-argon-age-constants" options={{ label: 'List K-Ar Constants' }} list={PotassiumArgonAgeConstantList} create={PotassiumArgonConstantCreate} edit={PotassiumArgonConstantEdit}/>
            </Admin>
        }
    </Firebase>
</GoogleReCaptchaProvider>);

export default IndexPage