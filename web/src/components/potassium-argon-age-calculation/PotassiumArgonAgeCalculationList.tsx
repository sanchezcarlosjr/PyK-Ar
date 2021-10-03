import {Datagrid, DeleteButton, List, TextField, TextInput} from "react-admin";
import * as React from "react";

const PotassiumArgonAgeCalculationFilters = [
    <TextInput source="age" label="Search" alwaysOn/>,
    <TextInput source="uncertainty" label="Uncertainty"/>
];

export const PotassiumArgonAgeCalculationList = (props: any) => (
    <List {...props} filters={PotassiumArgonAgeCalculationFilters}>
        <Datagrid rowClick="edit">
            <TextField source="age"/>
            <TextField source="uncertainty"/>
            <DeleteButton label=""/>
        </Datagrid>
    </List>
);