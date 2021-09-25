import React from "react"
import loadable from "@loadable/component"

import {RAFirebaseOptions} from "react-admin-firebase";
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';
import {PostList, PostShow, PostCreate,PostEdit} from "../components/Post";
import {i18nProvider} from "../components/i18";
import PostIcon from '@material-ui/icons/Book';

const options: RAFirebaseOptions = {
    logging: process.env.NODE_ENV === "development",
    lazyLoading: {
        enabled: true,
    },
    persistence: 'local',
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
                locale="es"
                i18nProvider={i18nProvider}
                loginPage={CustomLoginPage}
                authProvider={firebase.FirebaseAuthProvider(firebaseConfig, options)}
                dataProvider={firebase.FirebaseDataProvider(firebaseConfig, options)}
            >
                <Resource name="content" icon={PostIcon} list={PostList} show={PostShow} create={PostCreate} edit={PostEdit}/>
            </Admin>
        }
    </Firebase>
</GoogleReCaptchaProvider>);

export default IndexPage