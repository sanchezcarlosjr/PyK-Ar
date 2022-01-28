import {Datagrid, DeleteButton, DateField, List, TextField, TextInput, BooleanInput} from "react-admin";
import * as React from "react";

const PotassiumArgonAgeCalculationFilters = [
    <TextInput source="id" label="Search by Sample ID" alwaysOn/>,
    <TextInput source="spectrum_user_name" label="User" />,
    <BooleanInput source="deleted" label="Deleted" defaultValue={false}/>,
];

export const PotassiumArgonAgeCalculationList = (props: any) => (
    <List {...props} filters={PotassiumArgonAgeCalculationFilters}>
        <Datagrid rowClick="edit">
            <TextField source="age" label="Age (years)"/>
            <TextField source="spectrum_user_name" label="Spectrum user name" />
            <DateField source="analysis_date" label="Analysis Date"/>
            <TextField source="weight" label="Weight (grams)"/>
            <TextField source="delta" label="Delta"/>
            <TextField source="gramsOfK" label="K (grams)"/>
            <DeleteButton label=""/>
        </Datagrid>
    </List>
);