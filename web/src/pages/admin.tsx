import React from "react"
import loadable from "@loadable/component"

import {RAFirebaseOptions} from "react-admin-firebase";

const firebaseConfig = {
    apiKey: process.env.GATSBY_firebase_api_key,
    authDomain: process.env.GATSBY_firebase_authDomain,
    databaseURL: process.env.GATSBY_databaseURL,
    projectId: process.env.GATSBY_projectId,
    storageBucket: process.env.GATSBY_storageBucket,
    messagingSenderId: process.env.GATSBY_messagingSenderId,
    appId: process.env.GATSBY_appId,
    measurementId: process.env.GATSBY_measurementId
};

const options: RAFirebaseOptions = {
    logging: false
};

const Firebase = loadable.lib(() => import('react-admin-firebase'));

const Admin = loadable(() => import("../components/Admin"))
const Resource = loadable(() => import("../components/Resource"))
const CustomLoginPage = loadable(() => import("../components/login"))

const IndexPage = () => (
    <div>
        <Firebase>
            {({default: firebase}) => <Admin
                loginPage={CustomLoginPage}
                dataProvider={firebase.FirebaseDataProvider(firebaseConfig, options)}
                authProvider={firebase.FirebaseAuthProvider(firebaseConfig, options)}>
                <Resource
                    name="users"
                />
            </Admin>
            }
        </Firebase>
    </div>
)

export default IndexPage