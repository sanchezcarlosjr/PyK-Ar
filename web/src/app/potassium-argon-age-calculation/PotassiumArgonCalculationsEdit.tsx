import {Edit, SimpleForm, TextInput, DateInput} from "react-admin";
import * as React from "react";

export const PotassiumArgonCalculationsEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm>
            <DateInput source="createdate" disabled label="Created date" />
            <TextInput source="age"/>
            <TextInput source="york_fit_error"/>
            <TextInput source="dalrymple_error"/>
        </SimpleForm>
    </Edit>
);