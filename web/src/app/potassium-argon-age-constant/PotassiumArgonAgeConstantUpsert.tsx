import {Create, Edit, NumberInput, SimpleForm, TextInput} from "react-admin";
import * as React from "react";

const Form = (props: any) => (
    <SimpleForm {...props}>
        <TextInput source="id" label="Name" fullWidth/>
        <NumberInput source="value" label="Value" fullWidth/>
    </SimpleForm>
);

export const PotassiumArgonConstantCreate = (props: any) => (
    <Create {...props}>
        <Form/>
    </Create>
);

export const PotassiumArgonConstantEdit = (props: any) => (
    <Edit {...props}>
        <Form/>
    </Edit>
);