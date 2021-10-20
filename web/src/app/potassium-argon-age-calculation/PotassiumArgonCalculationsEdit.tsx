import {Edit, SimpleForm, TextInput} from "react-admin";
import * as React from "react";

export const PotassiumArgonCalculationsEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="age"/>
            <TextInput source="uncertainty"/>
        </SimpleForm>
    </Edit>
);