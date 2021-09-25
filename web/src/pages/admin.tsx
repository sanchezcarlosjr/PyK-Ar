import React from "react"
import loadable from "@loadable/component"

import {RAFirebaseOptions} from "react-admin-firebase";
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';

const options: RAFirebaseOptions = {
    logging: process.env.NODE_ENV === "development"
};

const Firebase = loadable.lib(() => import('react-admin-firebase'));

const Admin = loadable(() => import("../components/Admin"))
const Resource = loadable(() => import("../components/Resource"))
const CustomLoginPage = loadable(() => import("../components/login"))

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
        async: false, // optional, default to false,
        defer: false, // optional, default to false
        appendTo: 'head', // optional, default to "head", can be "head" or "body",
        nonce: undefined // optional, default undefined
    }}
>
    <Firebase>
        {({default: firebase}) =>
            <Admin
                loginPage={CustomLoginPage}
                dataProvider={firebase.FirebaseDataProvider(firebaseConfig, options)}
                authProvider={firebase.FirebaseAuthProvider(firebaseConfig, options)}>
                <Resource
                    name="id"
                />
            </Admin>
        }
    </Firebase>
</GoogleReCaptchaProvider>);

export default IndexPage