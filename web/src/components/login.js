// LoginPage.js
import React from "react";
import { Login, LoginForm } from "react-admin";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/admin/#/login',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID
    ]
};

const SignInScreen = () => <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>;

const CustomLoginForm = props => (
    <div>
        <LoginForm {...props} />
        <SignInScreen />
    </div>
);

const CustomLoginPage = props => (
    <Login {...props}>
        <CustomLoginForm {...props}/>
    </Login>
);

export default CustomLoginPage;