import {Datagrid, DeleteButton, List, TextField, TextInput, BooleanInput} from "react-admin";
import * as React from "react";

const PotassiumArgonAgeCalculationFilters = [
    <TextInput source="id" label="Search by Sample ID" alwaysOn/>,
    <BooleanInput source="deleted" label="Deleted" defaultValue={false}/>,
];

export const PotassiumArgonAgeCalculationList = (props: any) => (
    <List {...props} filters={PotassiumArgonAgeCalculationFilters}>
        <Datagrid rowClick="edit">
            <TextField source="age" label="Age x 10^6 (Million years ago)"/>
            <TextField source="york_fit_error" label="+- York Fit Error (Million years ago)"/>
            <TextField source="dalrymple_error" label="+- Dalrymple Error (Million years ago)"/>
            <DeleteButton label=""/>
        </Datagrid>
    </List>
);