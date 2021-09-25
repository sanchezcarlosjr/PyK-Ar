import React from "react"
import { ListGuesser } from "react-admin"
import loadable from "@loadable/component"
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const Admin = loadable(() => import("../components/Admin"))
const Resource = loadable(() => import("../components/Resource"))

const IndexPage = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="users" list={ListGuesser} />
    </Admin>
)

export default IndexPage