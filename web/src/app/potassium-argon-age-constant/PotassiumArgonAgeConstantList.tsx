import {Datagrid, List, TextField, TextInput} from "react-admin";
import * as React from "react";

const PotassiumArgonAgeConstantFilters = [
    <TextInput source="id" label="Search by name" alwaysOn/>
];

export const PotassiumArgonAgeConstantList = (props: any) => (
    <List {...props} filters={PotassiumArgonAgeConstantFilters}>
        <Datagrid rowClick="edit">
            <TextField source="id" label="Name"/>
            <TextField source="value" label="Value"/>
        </Datagrid>
    </List>
);