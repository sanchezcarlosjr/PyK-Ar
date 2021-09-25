import React from "react"
import { Admin } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
import loadable from "@loadable/component";

const history = loadable(() => import('history/createBrowserHistory'))();

const Profile = () => (
    <>
    </>
)
export default Profile