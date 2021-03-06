import React from "react";
import { Login, LoginForm } from "react-admin";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {Helmet} from "react-helmet";

const uiConfig = {
    signInFlow: 'redirect',
    signInSuccessUrl: '/admin/#/potassium-argon-age-calculations',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID
    ]
};

const SignInScreen = () => <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>;

const CustomLoginForm = (props: any) => (
    <div>
        <LoginForm redirect="/admin/#/potassium-argon-age-calculations"  {...props} />
        <SignInScreen />
    </div>
);

const CustomLoginPage = (props: any) => (
    <main>
        <Helmet>
            <title>Login | Potassium-Argon Dating CICESE</title>
            <meta name="description" content="Potassium-Argon Dating (K-Ar) CICESE | Carlos Eduardo Sanchez Torres" />
        </Helmet>
        <Login {...props}>
            <CustomLoginForm {...props}/>
        </Login>
    </main>
);

export default CustomLoginPage;