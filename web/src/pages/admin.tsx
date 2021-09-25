import React from "react"
import loadable from "@loadable/component"

import {RAFirebaseOptions} from "react-admin-firebase";
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';

const options: RAFirebaseOptions = {
    logging: false
};

const Firebase = loadable.lib(() => import('react-admin-firebase'));

const Admin = loadable(() => import("../components/Admin"))
const Resource = loadable(() => import("../components/Resource"))
const CustomLoginPage = loadable(() => import("../components/login"))

const firebaseConfig = {
    apiKey: "AIzaSyCtCyeVOQuFaqLng9KvOzwM61bIjiS2cGU",
    authDomain: "sanchezcarlosjr.com",
    databaseURL: "https://arsus-production.firebaseio.com",
    projectId: "arsus-production",
    storageBucket: "arsus-production.appspot.com",
    messagingSenderId: "809156660768",
    appId: "1:809156660768:web:63ae0da3eec3f507f9f645",
    measurementId: "G-3RCE8VK82F"
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
        {({default: firebase}) => <Admin
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