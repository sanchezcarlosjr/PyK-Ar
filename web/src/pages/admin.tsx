import React from "react"
import loadable from "@loadable/component"

import {RAFirebaseOptions} from "react-admin-firebase";

// @ts-ignore
const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

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